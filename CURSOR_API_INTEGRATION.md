# Cursor Activity Real-Time Data Integration Guide

This guide explains how to integrate real-time Cursor activity data into your portfolio.

## Option 1: WakaTime API (Recommended)

WakaTime tracks time spent in editors including Cursor.

### Steps:

1. **Sign up for WakaTime**
   - Go to https://wakatime.com
   - Create an account and install the WakaTime extension in Cursor
   - Get your API key from https://wakatime.com/settings/api-key

2. **Add API Key to Environment**
   - Add to `.env.local`:
   ```
   WAKATIME_API_KEY=your_api_key_here
   ```

3. **Update `cursorActivityService.ts`**:
   ```typescript
   export async function fetchCursorActivity(): Promise<CursorActivityData> {
     const apiKey = import.meta.env.WAKATIME_API_KEY;
     
     if (!apiKey) {
       throw new Error('WakaTime API key not found');
     }

     try {
       // Get today's summary
       const todayResponse = await fetch(
         'https://wakatime.com/api/v1/users/current/summaries?start=today&end=today',
         {
           headers: {
             'Authorization': `Basic ${btoa(apiKey)}`
           }
         }
       );
       const todayData = await todayResponse.json();

       // Get this week's summary
       const weekStart = new Date();
       weekStart.setDate(weekStart.getDate() - weekStart.getDay());
       const weekResponse = await fetch(
         `https://wakatime.com/api/v1/users/current/summaries?start=${weekStart.toISOString().split('T')[0]}&end=today`,
         {
           headers: {
             'Authorization': `Basic ${btoa(apiKey)}`
           }
         }
       );
       const weekData = await weekResponse.json();

       // Get this month's summary
       const monthStart = new Date();
       monthStart.setDate(1);
       const monthResponse = await fetch(
         `https://wakatime.com/api/v1/users/current/summaries?start=${monthStart.toISOString().split('T')[0]}&end=today`,
         {
           headers: {
             'Authorization': `Basic ${btoa(apiKey)}`
           }
         }
       );
       const monthData = await monthResponse.json();

       // Check if Cursor is currently active (last heartbeat within 2 minutes)
       const heartbeatResponse = await fetch(
         'https://wakatime.com/api/v1/users/current/heartbeats',
         {
           headers: {
             'Authorization': `Basic ${btoa(apiKey)}`
           }
         }
       );
       const heartbeatData = await heartbeatResponse.json();
       const lastHeartbeat = heartbeatData.data?.[0];
       const isActive = lastHeartbeat && 
         lastHeartbeat.editor === 'Cursor' &&
         (Date.now() - new Date(lastHeartbeat.time * 1000).getTime()) < 120000; // 2 minutes

       // Extract Cursor hours from summaries
       const extractCursorHours = (data: any) => {
         let cursorHours = 0;
         data.data?.forEach((day: any) => {
           day.editors?.forEach((editor: any) => {
             if (editor.name === 'Cursor') {
               cursorHours += editor.total_seconds / 3600;
             }
           });
         });
         return cursorHours;
       };

       return {
         isActive: isActive || false,
         hours: {
           today: extractCursorHours(todayData),
           week: extractCursorHours(weekData),
           month: extractCursorHours(monthData)
         }
       };
     } catch (error) {
       console.error('WakaTime API Error:', error);
       throw error;
     }
   }
   ```

4. **Update `vite.config.ts`**:
   ```typescript
   define: {
     'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
     'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
     'process.env.WAKATIME_API_KEY': JSON.stringify(env.WAKATIME_API_KEY)
   }
   ```

---

## Option 2: Code Time API

Code Time is another time tracking service.

### Steps:

1. **Install Code Time extension in Cursor**
2. **Get API credentials from Code Time dashboard**
3. **Update the service**:
   ```typescript
   export async function fetchCursorActivity(): Promise<CursorActivityData> {
     const apiKey = import.meta.env.CODETIME_API_KEY;
     
     const response = await fetch('https://api.software.com/v1/user/status', {
       headers: {
         'Authorization': `Bearer ${apiKey}`
       }
     });
     
     const data = await response.json();
     
     return {
       isActive: data.isActive || false,
       hours: {
         today: data.today || 0,
         week: data.week || 0,
         month: data.month || 0
       }
     };
   }
   ```

---

## Option 3: Custom Backend API

Create your own backend to track Cursor activity.

### Backend Example (Node.js/Express):

```javascript
// backend/routes/cursor-activity.js
const express = require('express');
const router = express.Router();

router.get('/cursor-activity', async (req, res) => {
  // Query your database for Cursor activity
  const today = await getTodayHours();
  const week = await getWeekHours();
  const month = await getMonthHours();
  const isActive = await checkIfActive();

  res.json({
    isActive,
    hours: {
      today,
      week,
      month
    }
  });
});
```

### Frontend Service Update:

```typescript
export async function fetchCursorActivity(): Promise<CursorActivityData> {
  const response = await fetch('https://your-backend.com/api/cursor-activity');
  
  if (!response.ok) {
    throw new Error('Failed to fetch cursor activity');
  }
  
  return await response.json();
}
```

---

## Option 4: Cursor Extension API (If Available)

If Cursor provides an API, you can use it directly:

```typescript
export async function fetchCursorActivity(): Promise<CursorActivityData> {
  const response = await fetch('https://api.cursor.sh/v1/activity', {
    headers: {
      'Authorization': `Bearer ${import.meta.env.CURSOR_API_KEY}`
    }
  });
  
  return await response.json();
}
```

---

## Option 5: Local File System (Development Only)

For development, you can read from a local file that a script updates:

```typescript
export async function fetchCursorActivity(): Promise<CursorActivityData> {
  // Only works in development with a local server
  const response = await fetch('/api/cursor-activity.json');
  return await response.json();
}
```

---

## Security Notes

⚠️ **Important**: Never expose API keys in client-side code!

1. **Use a Backend Proxy**: Create a backend endpoint that makes the API calls
2. **Environment Variables**: Store keys in `.env.local` (not committed to git)
3. **Rate Limiting**: Implement rate limiting to prevent abuse

### Example Backend Proxy:

```javascript
// backend/api/cursor-activity.js
export default async function handler(req, res) {
  const apiKey = process.env.WAKATIME_API_KEY;
  
  // Make API call server-side
  const data = await fetchWakaTimeData(apiKey);
  
  res.json(data);
}
```

Then update frontend:
```typescript
export async function fetchCursorActivity(): Promise<CursorActivityData> {
  const response = await fetch('/api/cursor-activity');
  return await response.json();
}
```

---

## Testing

After integration, test with:

1. Check browser console for errors
2. Verify data updates every 30 seconds
3. Test Active/Inactive status
4. Verify Today/Week/Month toggles work

---

## Current Implementation

The current `cursorActivityService.ts` uses mock data. Replace the `fetchCursorActivity()` function with one of the options above based on your chosen service.

