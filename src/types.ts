export type Level = 'A1' | 'A2' | 'B1' | 'B2';

export type Category = 
  | 'Story' | 'Email' | 'Text' | 'Article' | 'Dialogue' 
  | 'Essay' | 'Formal letter' | 'Informal letter' | 'Opinion text' 
  | 'Description' | 'Report' | 'Review' | 'Invitation' 
  | 'Complaint' | 'Message';

export interface WritingPrompt {
  title: string;
  description: string;
  instructions: string[];
  suggestedWordCount: number;
  pointsToCover: string[];
}

export interface Mistake {
  original: string;
  correction: string;
  explanation: string;
  type: 'grammar' | 'spelling' | 'vocabulary' | 'style' | 'sentence structure';
}

export interface VocabularySuggestion {
  word: string;
  translation: string;
  example: string;
}

export interface FeedbackScores {
  grammar: number;
  vocabulary: number;
  coherence: number;
  taskCompletion: number;
  style: number;
}

export interface WritingFeedback {
  correctedText: string;
  betterVersion: string;
  nativeSpeakerVersion: string;
  estimatedLevel: string;
  scores: FeedbackScores;
  mistakes: Mistake[];
  strengths: string[];
  weaknesses: string[];
  adviceToImprove: string[];
  vocabularyToReuse: VocabularySuggestion[];
  grammarPointsToReview: string[];
}
