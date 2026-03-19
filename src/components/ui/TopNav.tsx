import * as React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, Trophy } from 'lucide-react';
import { getInitialStats, getCurrentLevelProgress } from '../../lib/gamification';

export function TopNav() {
  const [stats, setStats] = React.useState(getInitialStats());

  // Listen for custom event to update stats
  React.useEffect(() => {
    const handleStatsUpdate = () => {
      setStats(getInitialStats());
    };
    window.addEventListener('gamification-update', handleStatsUpdate);
    return () => window.removeEventListener('gamification-update', handleStatsUpdate);
  }, []);

  const progress = getCurrentLevelProgress(stats.xp, stats.level);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
            S
          </div>
          <span className="font-bold text-gray-900 hidden sm:block">Schreiben mit Mounir</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Streak */}
          <div className="flex items-center gap-1.5" title="Daily Streak">
            <Flame className={`w-5 h-5 ${stats.streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}`} />
            <span className={`font-bold ${stats.streak > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
              {stats.streak}
            </span>
          </div>

          {/* XP & Level */}
          <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-gray-700 text-sm">{stats.xp} XP</span>
            </div>
            
            <div className="w-px h-4 bg-gray-300" />
            
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-primary-500" />
              <span className="font-bold text-primary-700 text-sm">Lvl {stats.level}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar at the very bottom of the nav */}
      <div className="w-full h-1 bg-gray-100">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-400 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.header>
  );
}
