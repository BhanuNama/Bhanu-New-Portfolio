import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import GlassCard from './GlassCard';
import { useTheme } from '../contexts/ThemeContext';
import { fetchCursorActivity, startCursorActivityPolling, CursorActivityData } from '../cursorActivityService';

type TimeRange = 'today' | 'week' | 'month';

const CursorIcon = () => {
  const { theme } = useTheme();
  
  return (
    <svg 
      fill="currentColor" 
      fillRule="evenodd" 
      height="1em" 
      style={{ flex: 'none', lineHeight: 1 }} 
      viewBox="0 0 24 24" 
      width="1em" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <title>Cursor</title>
      <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"></path>
    </svg>
  );
};

const EditorActivity: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('today');
  const [activityData, setActivityData] = useState<CursorActivityData>({
    isActive: false,
    hours: {
      today: 0,
      week: 0,
      month: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchCursorActivity();
        setActivityData(data);
      } catch (error) {
        console.error('Error loading cursor activity:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Start polling for real-time updates
    const stopPolling = startCursorActivityPolling((data) => {
      setActivityData(data);
      setLoading(false);
    }, 30000); // Update every 30 seconds

    return () => {
      stopPolling();
    };
  }, []);

  const formatHours = (hours: number): string => {
    if (hours < 1) {
      const minutes = Math.floor(hours * 60);
      return `${minutes}m`;
    }
    if (hours < 10) {
      return `${hours.toFixed(1)}h`;
    }
    return `${Math.floor(hours)}h`;
  };

  const currentHours = activityData.hours[timeRange];
  const timeRangeLabels = {
    today: 'Today',
    week: 'Week'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6 w-fit"
    >
      <h3 className="text-xl font-semibold text-theme-secondary mb-2">Cursor</h3>
      <GlassCard className="relative overflow-hidden group p-4">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl" />
        
        <div className="relative z-10 flex items-center gap-4">
          {/* Icon and Status */}
          <div className="flex items-center gap-3">
            <div className="text-theme-primary">
              <CursorIcon />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${activityData.isActive ? 'bg-green-500' : 'bg-red-500'} ${activityData.isActive ? 'animate-pulse' : ''}`} />
              <span className={`text-xs font-semibold uppercase tracking-wider ${activityData.isActive ? 'text-green-500' : 'text-red-500'}`}>
                {activityData.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Time Range Toggle */}
          <div className="flex gap-2">
            {(['today', 'week'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 border ${
                  timeRange === range
                    ? 'bg-blue-600/90 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'dark:bg-white/5 light:bg-black/5 text-theme-secondary dark:border-white/10 light:border-black/10 dark:hover:bg-white/10 light:hover:bg-black/10 hover:text-theme-primary'
                }`}
              >
                {timeRangeLabels[range]}
              </button>
            ))}
          </div>

          {/* Hours Display */}
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-theme-secondary" />
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-theme-primary">
                  {formatHours(currentHours)}
                </span>
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default EditorActivity;
