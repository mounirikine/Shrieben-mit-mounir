export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  lastPracticeDate: string | null;
  totalPractices: number;
}

const STORAGE_KEY = 'german_coach_stats';

export const getInitialStats = (): UserStats => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const stats = JSON.parse(stored);
      // Check streak
      if (stats.lastPracticeDate) {
        const lastDate = new Date(stats.lastPracticeDate);
        lastDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diffTime = today.getTime() - lastDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays > 1) {
          stats.streak = 0; // Lost streak
        }
      }
      return stats;
    } catch (e) {
      console.error('Failed to parse stats', e);
    }
  }
  return {
    xp: 0,
    level: 1,
    streak: 0,
    lastPracticeDate: null,
    totalPractices: 0,
  };
};

export const calculateLevel = (xp: number) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const getNextLevelXp = (level: number) => {
  return Math.pow(level, 2) * 100;
};

export const getCurrentLevelProgress = (xp: number, level: number) => {
  const prevLevelXp = Math.pow(level - 1, 2) * 100;
  const nextLevelXp = Math.pow(level, 2) * 100;
  const xpInCurrentLevel = xp - prevLevelXp;
  const xpNeededForNextLevel = nextLevelXp - prevLevelXp;
  return {
    current: xpInCurrentLevel,
    total: xpNeededForNextLevel,
    percentage: Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForNextLevel) * 100))
  };
};

export const awardXp = (score: number): { earnedXp: number, newStats: UserStats, leveledUp: boolean } => {
  const stats = getInitialStats();
  
  // Base XP for completing + bonus for score
  const earnedXp = 50 + Math.round(score * 10);
  
  const newXp = stats.xp + earnedXp;
  const newLevel = calculateLevel(newXp);
  const leveledUp = newLevel > stats.level;
  
  // Update streak
  const today = new Date().toISOString().split('T')[0];
  let newStreak = stats.streak;
  if (stats.lastPracticeDate !== today) {
    newStreak += 1;
  }

  const newStats: UserStats = {
    xp: newXp,
    level: newLevel,
    streak: newStreak,
    lastPracticeDate: today,
    totalPractices: stats.totalPractices + 1,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
  
  return { earnedXp, newStats, leveledUp };
};
