import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { WritingPrompt, Level, Category } from '../../types';
import { Loader2, Send, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';

interface WritingViewProps {
  prompt: WritingPrompt;
  level: Level;
  category: Category;
  onBack: () => void;
  onSubmit: (text: string) => void;
  isAnalyzing: boolean;
}

export function WritingView({ prompt, level, category, onBack, onSubmit, isAnalyzing }: WritingViewProps) {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = text.trim().split(/\\s+/);
    setWordCount(text.trim() === '' ? 0 : words.length);
  }, [text]);

  const canSubmit = text.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} disabled={isAnalyzing} className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Setup
          </Button>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold tracking-wide uppercase">
              {level}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold tracking-wide uppercase">
              {category}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Prompt Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{prompt.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-base">{prompt.description}</p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary-500" />
                    Instructions
                  </h3>
                  <ul className="space-y-3">
                    {prompt.instructions.map((inst, idx) => (
                      <li key={idx} className="text-base text-gray-600 flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary-200 mt-2 shrink-0" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Points to Cover
                  </h3>
                  <ul className="space-y-3">
                    {prompt.pointsToCover.map((point, idx) => (
                      <li key={idx} className="text-base text-gray-600 flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-200 mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                    <span className="font-medium">Suggested length:</span>
                    <span className="font-bold text-primary-700">~{prompt.suggestedWordCount} words</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editor Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 flex flex-col"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col h-[400px] sm:h-[500px] lg:h-[calc(100vh-8rem)] overflow-hidden transition-all duration-200 focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-50">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Your Text</span>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className={wordCount < prompt.suggestedWordCount * 0.5 ? "text-amber-600 bg-amber-50 px-3 py-1 rounded-full" : "text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"}>
                    {wordCount} / {prompt.suggestedWordCount} words
                  </span>
                </div>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start writing your text here in German..."
                className="flex-1 w-full p-5 sm:p-6 resize-none focus:outline-none text-gray-800 text-base sm:text-lg leading-relaxed font-sans bg-transparent placeholder:text-gray-300"
                spellCheck={false}
                disabled={isAnalyzing}
              />
              
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                <Button 
                  size="lg"
                  onClick={() => onSubmit(text)} 
                  disabled={!canSubmit || isAnalyzing}
                  className="min-w-[180px]"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Submit for Correction
                      <Send className="w-5 h-5 ml-3" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
