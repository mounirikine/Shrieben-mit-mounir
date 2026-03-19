/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LandingView } from './components/views/LandingView';
import { SetupView } from './components/views/SetupView';
import { WritingView } from './components/views/WritingView';
import { FeedbackView } from './components/views/FeedbackView';
import { TopNav } from './components/ui/TopNav';
import { Level, Category, WritingPrompt, WritingFeedback } from './types';
import { generatePrompt, analyzeText } from './services/geminiService';
import { awardXp } from './lib/gamification';

type AppState = 'landing' | 'setup' | 'writing' | 'feedback';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  
  const [level, setLevel] = useState<Level>('A2');
  const [category, setCategory] = useState<Category>('Email');
  const [prompt, setPrompt] = useState<WritingPrompt | null>(null);
  const [userText, setUserText] = useState<string>('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStart = () => setCurrentState('setup');

  const handleGeneratePrompt = async (selectedLevel: Level, selectedCategory: Category) => {
    setLevel(selectedLevel);
    setCategory(selectedCategory);
    setIsGenerating(true);
    try {
      const generatedPrompt = await generatePrompt(selectedLevel, selectedCategory);
      setPrompt(generatedPrompt);
      setCurrentState('writing');
    } catch (error) {
      console.error('Error generating prompt:', error);
      alert('Failed to generate prompt. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitText = async (text: string) => {
    if (!prompt) return;
    setUserText(text);
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeText(level, category, prompt, text);
      setFeedback(analysis);
      
      // Award XP based on the average score
      const avgScore =
        (analysis.scores.grammar +
          analysis.scores.vocabulary +
          analysis.scores.coherence +
          analysis.scores.taskCompletion) /
        4;
      awardXp(avgScore);
      window.dispatchEvent(new Event('gamification-update'));
      
      setCurrentState('feedback');
    } catch (error) {
      console.error('Error analyzing text:', error);
      alert('Failed to analyze text. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRestart = () => {
    setPrompt(null);
    setUserText('');
    setFeedback(null);
    setCurrentState('setup');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 selection:bg-primary-200 selection:text-primary-900">
      {currentState !== 'landing' && <TopNav />}
      {currentState === 'landing' && <LandingView onStart={handleStart} />}
      {currentState === 'setup' && (
        <SetupView 
          onGenerate={handleGeneratePrompt} 
          isGenerating={isGenerating} 
        />
      )}
      {currentState === 'writing' && prompt && (
        <WritingView 
          prompt={prompt} 
          level={level} 
          category={category} 
          onBack={() => setCurrentState('setup')} 
          onSubmit={handleSubmitText} 
          isAnalyzing={isAnalyzing} 
        />
      )}
      {currentState === 'feedback' && feedback && prompt && (
        <FeedbackView 
          feedback={feedback} 
          prompt={prompt} 
          level={level} 
          category={category} 
          userText={userText} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
}
