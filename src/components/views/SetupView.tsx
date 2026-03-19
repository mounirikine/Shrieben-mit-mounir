import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { WritingPrompt, Level, Category } from '../../types';
import { ChevronRight, Loader2, BookOpen, MessageSquare, Briefcase, Mail, PenTool, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SetupViewProps {
  onGenerate: (level: Level, category: Category) => void;
  isGenerating: boolean;
}

const LEVELS: { id: Level; label: string; desc: string }[] = [
  { id: 'A1', label: 'A1 Beginner', desc: 'Simple sentences, basic vocabulary' },
  { id: 'A2', label: 'A2 Elementary', desc: 'Everyday topics, routine tasks' },
  { id: 'B1', label: 'B1 Intermediate', desc: 'Connected text, personal interests' },
  { id: 'B2', label: 'B2 Upper Intermediate', desc: 'Clear, detailed text on many subjects' },
];

const CATEGORIES: { id: Category; icon: React.ReactNode }[] = [
  { id: 'Story', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'Email', icon: <Mail className="w-5 h-5" /> },
  { id: 'Text', icon: <FileText className="w-5 h-5" /> },
  { id: 'Article', icon: <FileText className="w-5 h-5" /> },
  { id: 'Dialogue', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'Essay', icon: <PenTool className="w-5 h-5" /> },
  { id: 'Formal letter', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'Informal letter', icon: <Mail className="w-5 h-5" /> },
  { id: 'Opinion text', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'Description', icon: <FileText className="w-5 h-5" /> },
  { id: 'Report', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'Review', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'Invitation', icon: <Mail className="w-5 h-5" /> },
  { id: 'Complaint', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'Message', icon: <MessageSquare className="w-5 h-5" /> },
];

export function SetupView({ onGenerate, isGenerating }: SetupViewProps) {
  const [level, setLevel] = useState<Level>('A2');
  const [category, setCategory] = useState<Category>('Email');

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Configure Your Practice</h2>
          <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto">Select your target CEFR level and the type of text you want to write. Our AI will generate a unique prompt for you.</p>
        </div>

        <div className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="text-xl font-bold text-gray-900">Select your CEFR Level</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={cn(
                    "relative flex flex-col p-6 rounded-2xl border-2 text-left transition-all duration-200",
                    level === l.id
                      ? "border-primary-500 bg-primary-50/50 shadow-md shadow-primary-500/10 scale-[1.02]"
                      : "border-gray-100 bg-white hover:border-primary-200 hover:bg-gray-50"
                  )}
                >
                  <span className={cn(
                    "text-xl font-bold mb-2",
                    level === l.id ? "text-primary-700" : "text-gray-900"
                  )}>
                    {l.label}
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">{l.desc}</span>
                  {level === l.id && (
                    <div className="absolute top-4 right-4 text-primary-500">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <div className="h-px w-full bg-gray-100" />

          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="text-xl font-bold text-gray-900">Select a Category</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 gap-3",
                    category === c.id
                      ? "border-primary-500 bg-primary-50 shadow-md shadow-primary-500/10 scale-[1.02]"
                      : "border-gray-100 bg-white text-gray-600 hover:border-primary-200 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-xl transition-colors",
                    category === c.id ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500"
                  )}>
                    {c.icon}
                  </div>
                  <span className={cn(
                    "text-sm font-semibold text-center",
                    category === c.id ? "text-primary-900" : "text-gray-700"
                  )}>{c.id}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-center pt-4 pb-12">
          <Button
            size="lg"
            onClick={() => onGenerate(level, category)}
            disabled={isGenerating}
            className="w-full sm:w-auto min-w-[280px] text-lg h-14"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Generating Prompt...
              </>
            ) : (
              <>
                Generate Writing Prompt
                <ChevronRight className="ml-2 h-6 w-6" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
