import { motion } from 'motion/react';
import * as React from 'react';
import confetti from 'canvas-confetti';
import { WritingFeedback, WritingPrompt, Level, Category } from '../../types';
import { Button } from '../ui/Button';
import { ArrowLeft, CheckCircle, AlertTriangle, BookOpen, Sparkles, TrendingUp, Award, MessageSquare, PenTool } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FeedbackViewProps {
  feedback: WritingFeedback;
  prompt: WritingPrompt;
  level: Level;
  category: Category;
  userText: string;
  onRestart: () => void;
}

export function FeedbackView({ feedback, prompt, level, category, userText, onRestart }: FeedbackViewProps) {
  React.useEffect(() => {
    // Trigger confetti when feedback is shown
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const totalScore = Math.round(
    (feedback.scores.grammar +
      feedback.scores.vocabulary +
      feedback.scores.coherence +
      feedback.scores.taskCompletion +
      feedback.scores.style) / 5
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button variant="ghost" onClick={onRestart} className="text-gray-500 hover:text-gray-900 -ml-2 sm:ml-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start New Practice
          </Button>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold tracking-wide uppercase">
              {level}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold tracking-wide uppercase">
              {category}
            </span>
          </div>
        </div>

        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8"
        >
          <div className="flex-1 text-center md:text-left w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Feedback & Analysis</h1>
            <p className="text-gray-600">
              Estimated Level: <strong className="text-primary-600">{feedback.estimatedLevel}</strong>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-primary-600 mb-1">{totalScore}/10</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall Score</div>
            </div>
            <div className="h-px w-full sm:w-px sm:h-16 bg-gray-200 block" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full sm:w-auto text-sm">
              <ScoreItem label="Grammar" score={feedback.scores.grammar} />
              <ScoreItem label="Vocabulary" score={feedback.scores.vocabulary} />
              <ScoreItem label="Coherence" score={feedback.scores.coherence} />
              <ScoreItem label="Task" score={feedback.scores.taskCompletion} />
              <ScoreItem label="Style" score={feedback.scores.style} />
            </div>
          </div>
        </motion.div>

        {/* Text Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
          >
            <div className="bg-red-50/50 p-5 border-b border-red-100 flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-xl text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-red-900">Your Original Text</h3>
            </div>
            <div className="p-5 sm:p-8 text-gray-800 leading-relaxed whitespace-pre-wrap font-sans text-base sm:text-lg flex-1">
              {userText}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
          >
            <div className="bg-emerald-50/50 p-5 border-b border-emerald-100 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-emerald-900">Corrected Version</h3>
            </div>
            <div className="p-5 sm:p-8 text-gray-800 leading-relaxed whitespace-pre-wrap font-sans text-base sm:text-lg flex-1">
              {feedback.correctedText}
            </div>
          </motion.div>
        </div>

        {/* Mistakes & Corrections */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-xl text-primary-600">
              <PenTool className="w-6 h-6" />
            </div>
            Detailed Corrections
          </h2>
          {feedback.mistakes.length === 0 ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-center font-medium">
              No major mistakes found! Great job.
            </div>
          ) : (
            <div className="space-y-6">
              {feedback.mistakes.map((mistake, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-primary-100 hover:bg-primary-50/30 transition-colors">
                  <div className="sm:w-1/3 space-y-2 sm:space-y-3">
                    <div className="text-base font-medium text-red-600 line-through decoration-red-300">
                      {mistake.original}
                    </div>
                    <div className="text-base font-bold text-emerald-600">
                      {mistake.correction}
                    </div>
                    <span className="inline-block px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-white border border-gray-200 text-gray-600 shadow-sm">
                      {mistake.type}
                    </span>
                  </div>
                  <div className="sm:w-2/3 text-base text-gray-700 leading-relaxed sm:border-l-2 sm:border-gray-200 sm:pl-6">
                    {mistake.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Better & Native Versions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              Better Version
            </h3>
            <p className="text-gray-600 text-base mb-6">A significantly improved version using better vocabulary and structures appropriate for your level.</p>
            <div className="p-5 sm:p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-gray-800 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
              {feedback.betterVersion}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                <Award className="w-5 h-5" />
              </div>
              Native Speaker Version
            </h3>
            <p className="text-gray-600 text-base mb-6">How a native German speaker would naturally write this text.</p>
            <div className="p-5 sm:p-6 bg-purple-50/50 rounded-2xl border border-purple-100 text-gray-800 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
              {feedback.nativeSpeakerVersion}
            </div>
          </motion.div>
        </div>

        {/* Learning Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                <Sparkles className="w-5 h-5" />
              </div>
              Strengths & Weaknesses
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-3">Strengths</h4>
                <ul className="space-y-2">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="text-base text-gray-600 flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5 font-bold">+</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-3">Weaknesses</h4>
                <ul className="space-y-2">
                  {feedback.weaknesses.map((w, i) => (
                    <li key={i} className="text-base text-gray-600 flex items-start gap-3">
                      <span className="text-red-500 mt-0.5 font-bold">-</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                <BookOpen className="w-5 h-5" />
              </div>
              Vocabulary to Reuse
            </h3>
            <div className="space-y-4">
              {feedback.vocabularyToReuse.map((v, i) => (
                <div key={i} className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                  <div className="font-bold text-indigo-900 text-base">{v.word}</div>
                  <div className="text-sm text-indigo-700 mb-2">{v.translation}</div>
                  <div className="text-sm text-gray-600 italic leading-relaxed">"{v.example}"</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col gap-6"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-teal-50 rounded-xl text-teal-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                Advice to Improve
              </h3>
              <ul className="space-y-3">
                {feedback.adviceToImprove.map((a, i) => (
                  <li key={i} className="text-base text-gray-600 flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-teal-300 mt-2 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                Grammar to Review
              </h3>
              <ul className="space-y-3">
                {feedback.grammarPointsToReview.map((g, i) => (
                  <li key={i} className="text-base text-gray-600 flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose-300 mt-2 shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ScoreItem({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full" 
            style={{ width: `${(score / 10) * 100}%` }}
          />
        </div>
        <span className="font-medium text-gray-900 w-4 text-right">{score}</span>
      </div>
    </div>
  );
}
