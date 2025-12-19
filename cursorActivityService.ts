// Service to fetch Cursor activity data
// See CURSOR_API_INTEGRATION.md for integration options

export interface CursorActivityData {
  isActive: boolean;
  hours: {
    today: number;
    week: number;
    month: number;
  };
}

// WakaTime API Integration
export async function fetchCursorActivity(): Promise<CursorActivityData> {
  const apiKey = import.meta.env.VITE_WAKATIME_API_KEY;
  
  if (!apiKey) {
    console.warn('WakaTime API key not found. Add VITE_WAKATIME_API_KEY to .env.local');
    return {
      isActive: false,
      hours: {
        today: 0,
        week: 0,
        month: 0
      }
    };
  }

  try {
    // Use Vite proxy to avoid CORS issues
    // The proxy adds the API key automatically from vite.config.ts
    const baseUrl = '/api/wakatime/users/current';
    
    // Calculate date ranges
    const today = new Date().toISOString().split('T')[0];
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const weekStartStr = weekStart.toISOString().split('T')[0];
    const monthStart = new Date();
    monthStart.setDate(1);
    const monthStartStr = monthStart.toISOString().split('T')[0];
    
    // Use status_bar for today (includes today's data)
    const todayRes = await fetch(`${baseUrl}/status_bar/today`);
    
    // Use summaries for week (free tier supports up to 7 days)
    const weekRes = await fetch(`${baseUrl}/summaries?start=${weekStartStr}&end=${today}`);
    
    // Use stats endpoint for month (last_30_days - free tier supports this)
    const monthRes = await fetch(`${baseUrl}/stats/last_30_days`);
    
    // Get heartbeats for active status (requires date parameter)
    const heartbeatRes = await fetch(`${baseUrl}/heartbeats?date=${today}&limit=5`);

    // Check for API errors
    if (!todayRes.ok) {
      const errorText = await todayRes.text();
      console.error('WakaTime Today Stats API Error:', todayRes.status, errorText);
    }
    if (!weekRes.ok) {
      const errorText = await weekRes.text();
      console.error('WakaTime Week Stats API Error:', weekRes.status, errorText);
    }
    if (!monthRes.ok) {
      const errorText = await monthRes.text();
      console.error('WakaTime Month Stats API Error:', monthRes.status, errorText);
    }
    if (!heartbeatRes.ok) {
      const errorText = await heartbeatRes.text();
      console.error('WakaTime Heartbeat API Error:', heartbeatRes.status, errorText);
    }

    const [todayData, weekData, monthData, heartbeatData] = await Promise.all([
      todayRes.ok ? todayRes.json() : { data: { editors: [] } },
      weekRes.ok ? weekRes.json() : { data: [] },
      monthRes.ok ? monthRes.json() : { data: { editors: [] } },
      heartbeatRes.ok ? heartbeatRes.json() : { data: [] }
    ]);

    // Log month data structure for debugging
    if (monthData.data) {
      console.log('Month Stats Response Structure:', {
        hasEditors: !!monthData.data.editors,
        editorsCount: monthData.data.editors?.length || 0,
        totalSeconds: monthData.data.total_seconds
      });
    }

    // Extract Cursor hours from status_bar (today)
    const extractTodayHours = (data: any): number => {
      if (!data.data) {
        console.warn('Today - No data in response');
        return 0;
      }

      console.log('Today Status Bar Full Response:', JSON.stringify(data.data, null, 2));

      if (data.data.editors && Array.isArray(data.data.editors) && data.data.editors.length > 0) {
        console.log('Today - All editors:', data.data.editors.map((e: any) => ({ 
          name: e.name, 
          seconds: e.total_seconds,
          text: e.text 
        })));
        
        const cursorEditor = data.data.editors.find((editor: any) => {
          const name = editor.name || '';
          return name === 'Cursor' || 
                 name.toLowerCase().includes('cursor') ||
                 name === 'cursor' ||
                 name === 'CURSOR';
        });
        
        if (cursorEditor) {
          console.log('Today - Found Cursor editor:', cursorEditor);
          if (cursorEditor.total_seconds) {
            return Math.round((cursorEditor.total_seconds / 3600) * 10) / 10;
          }
        } else {
          console.warn('Today - Cursor editor not found. Available:', data.data.editors.map((e: any) => e.name));
          // If no Cursor found but there's data, use grand_total (might be all Cursor)
          if (data.data.grand_total && data.data.grand_total.total_seconds > 0) {
            console.log('Today - Using grand_total as fallback:', data.data.grand_total);
            return Math.round((data.data.grand_total.total_seconds / 3600) * 10) / 10;
          }
        }
      } else if (data.data.grand_total && data.data.grand_total.total_seconds > 0) {
        // No editors array but has grand_total
        console.log('Today - Using grand_total (no editors breakdown):', data.data.grand_total);
        return Math.round((data.data.grand_total.total_seconds / 3600) * 10) / 10;
      } else {
        console.warn('Today - No editors array or grand_total in response');
      }
      
      return 0;
    };

    // Extract Cursor hours from summaries (week)
    const extractSummaryHours = (data: any, period: string): number => {
      if (!data.data || !Array.isArray(data.data)) {
        console.warn(`${period} - No data array in response`);
        return 0;
      }

      console.log(`${period} Summary - Number of days:`, data.data.length);
      let totalHours = 0;
      let hasEditorData = false;
      
      data.data.forEach((day: any, index: number) => {
        if (day.editors && Array.isArray(day.editors) && day.editors.length > 0) {
          hasEditorData = true;
          if (index === 0) {
            console.log(`${period} - First day editors:`, day.editors.map((e: any) => ({ 
              name: e.name, 
              seconds: e.total_seconds 
            })));
          }
          
          day.editors.forEach((editor: any) => {
            const editorName = editor.name || '';
            if (editorName === 'Cursor' || 
                editorName.toLowerCase().includes('cursor') ||
                editorName === 'cursor' ||
                editorName === 'CURSOR') {
              totalHours += (editor.total_seconds || 0) / 3600;
            }
          });
        }
        // Fallback: if no editors but has grand_total, use it (might be all Cursor)
        if (!hasEditorData && day.grand_total && day.grand_total.total_seconds > 0) {
          totalHours += (day.grand_total.total_seconds / 3600);
        }
      });
      
      if (totalHours > 0) {
        console.log(`${period} - Total Cursor hours:`, totalHours);
      } else if (hasEditorData) {
        console.warn(`${period} - No Cursor editor found in summaries`);
      } else {
        console.warn(`${period} - No editor data available (might be disabled in WakaTime settings)`);
      }
      
      return Math.round(totalHours * 10) / 10;
    };

    // Extract Cursor hours from stats endpoint (month)
    const extractStatsHours = (data: any, period: string): number => {
      if (!data.data) {
        console.warn(`${period} - No data in response`);
        return 0;
      }

      // Log full month stats for debugging
      console.log(`${period} Stats Full Response:`, JSON.stringify(data.data, null, 2));

      if (data.data.editors && Array.isArray(data.data.editors) && data.data.editors.length > 0) {
        console.log(`${period} Stats - All editors:`, data.data.editors.map((e: any) => ({ 
          name: e.name, 
          seconds: e.total_seconds,
          text: e.text 
        })));
        
        const cursorEditor = data.data.editors.find((editor: any) => {
          const name = editor.name || '';
          return name === 'Cursor' || 
                 name.toLowerCase().includes('cursor') ||
                 name === 'cursor' ||
                 name === 'CURSOR';
        });
        
        if (cursorEditor) {
          console.log(`${period} - Found Cursor editor:`, cursorEditor);
          if (cursorEditor.total_seconds) {
            return Math.round((cursorEditor.total_seconds / 3600) * 10) / 10;
          }
        } else {
          console.warn(`${period} - Cursor editor not found. Available:`, data.data.editors.map((e: any) => e.name));
        }
      } else {
        // If editors array is empty but total_seconds exists, use it as fallback
        // (assuming all time is Cursor if only one editor is used)
        if (data.data.total_seconds && data.data.total_seconds > 0) {
          console.log(`${period} - Using total_seconds as fallback (editors array empty):`, data.data.total_seconds);
          return Math.round((data.data.total_seconds / 3600) * 10) / 10;
        }
        console.warn(`${period} - No editors array or total_seconds in stats response`);
      }
      
      return 0;
    };


    // Check if active (last heartbeat within 2 minutes and editor is Cursor)
    let isActive = false;
    if (heartbeatData.data && Array.isArray(heartbeatData.data) && heartbeatData.data.length > 0) {
      // Get the most recent heartbeat (first in array)
      const lastHeartbeat = heartbeatData.data[0];
      console.log('Last heartbeat full object (all fields):', JSON.stringify(lastHeartbeat, null, 2));
      
      // Heartbeat time is in seconds (Unix timestamp)
      const heartbeatTime = lastHeartbeat.time * 1000; // Convert to milliseconds
      const timeDiff = Date.now() - heartbeatTime;
      
      // Check all possible editor field names
      const editorName = (lastHeartbeat.editor || 
                         lastHeartbeat.editor_name || 
                         lastHeartbeat.client || 
                         lastHeartbeat.client_name || 
                         '').toString();
      
      // Also check if project matches (might indicate Cursor usage)
      const projectName = (lastHeartbeat.project || '').toString();
      const isCursorProject = projectName.toLowerCase().includes('cursor') || 
                             projectName.toLowerCase().includes('bhanu-nama');
      
      console.log('Heartbeat check:', {
        editor: editorName,
        client: lastHeartbeat.client,
        project: projectName,
        time: new Date(heartbeatTime).toLocaleString(),
        timeDiffSeconds: Math.round(timeDiff / 1000),
        timeDiffMinutes: Math.round(timeDiff / 60000),
        isWithin2Min: timeDiff < 120000,
        allFields: Object.keys(lastHeartbeat)
      });
      
      // Check if active: within 2 minutes AND (editor is Cursor OR project matches)
      // If editor field is empty but time is recent, assume active if it's from today
      const isRecent = timeDiff < 120000; // 2 minutes
      const isToday = timeDiff < 86400000; // 24 hours
      const isCursorEditor = editorName === 'Cursor' || editorName.toLowerCase().includes('cursor');
      
      isActive = isRecent && (isCursorEditor || (isCursorProject && isToday));
      
      console.log('Active status calculation:', {
        isRecent,
        isCursorEditor,
        isCursorProject,
        isToday,
        finalIsActive: isActive
      });
    } else {
      console.warn('No heartbeat data available');
    }

    const todayHours = extractTodayHours(todayData);
    const weekHours = extractSummaryHours(weekData, 'Week');
    const monthHours = extractStatsHours(monthData, 'Month');

    // Log heartbeat data
    if (heartbeatData.data && heartbeatData.data.length > 0) {
      console.log('Last heartbeat:', heartbeatData.data[0]);
      console.log('All recent heartbeats:', heartbeatData.data.slice(0, 5).map((h: any) => ({ 
        editor: h.editor, 
        time: new Date(h.time * 1000).toLocaleString() 
      })));
    }

    // Debug logging
    console.log('=== WakaTime Final Results ===');
    console.log({
      today: todayHours,
      week: weekHours,
      month: monthHours,
      isActive,
      todayMinutes: (todayHours * 60).toFixed(1),
      weekMinutes: (weekHours * 60).toFixed(1),
      monthMinutes: (monthHours * 60).toFixed(1)
    });
    console.log('==============================');

    return {
      isActive,
      hours: {
        today: todayHours,
        week: weekHours,
        month: monthHours
      }
    };
  } catch (error) {
    console.error('WakaTime API Error:', error);
    return {
      isActive: false,
      hours: {
        today: 0,
        week: 0,
        month: 0
      }
    };
  }
}

// Polling function for real-time updates
export function startCursorActivityPolling(
  callback: (data: CursorActivityData) => void,
  interval: number = 30000 // 30 seconds default
): () => void {
  let isPolling = true;
  
  const poll = async () => {
    if (!isPolling) return;
    
    try {
      const data = await fetchCursorActivity();
      callback(data);
    } catch (error) {
      console.error('Error fetching cursor activity:', error);
    }
    
    if (isPolling) {
      setTimeout(poll, interval);
    }
  };
  
  // Initial fetch
  poll();
  
  // Return cleanup function
  return () => {
    isPolling = false;
  };
}

