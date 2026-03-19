import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { PenTool, Sparkles, BookOpen, ArrowRight, CheckCircle2, Star, TrendingUp, Zap } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden bg-white">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 font-bold text-xl">
            S
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Schreiben mit <span className="text-primary-600">Mounir</span></span>
        </div>
        <Button onClick={onStart} variant="outline" className="hidden sm:flex">
          Start Practicing
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16 lg:pt-12 lg:pb-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary-50/80 to-transparent -z-10 blur-3xl" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[120px] -z-10" />

        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-8 border border-primary-100 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Your Personal German Writing Coach</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.1]">
            Master German <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
              with Mounir
            </span>
          </h1>
          
          <p className="text-base lg:text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Practice writing in German with instant, native-level AI feedback. 
            Prepare for Goethe, TestDaF, or daily life with personalized prompts and deep grammar analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button size="lg" onClick={onStart} className="w-full sm:w-auto group text-lg px-8">
              Start Practicing Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-4 sm:mt-0">
              <CheckCircle2 className="w-5 h-5 text-primary-500" />
              No signup required
            </div>
          </div>
        </motion.div>

        {/* Right Visual / Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 relative w-full max-w-lg mx-auto lg:max-w-none"
        >
          <div className="relative rounded-3xl bg-white border border-gray-200 shadow-2xl shadow-primary-900/5 overflow-hidden">
            {/* Mockup Header */}
            <div className="h-12 border-b border-gray-100 bg-gray-50/80 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            {/* Mockup Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-4 w-24 bg-gray-200 rounded-md" />
                  <div className="h-6 w-48 bg-primary-100 rounded-md" />
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-primary-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-600">9/10</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <div className="text-sm text-red-600 line-through mb-1 font-medium">Ich bin gegangen zum Supermarkt.</div>
                  <div className="text-sm text-emerald-700 font-bold">Ich bin zum Supermarkt gegangen.</div>
                  <div className="text-xs text-gray-600 mt-2">Word order: The past participle "gegangen" must be placed at the end of the sentence.</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-sm text-blue-800 font-bold mb-1 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Better Version
                  </div>
                  <div className="text-sm text-gray-700">Ich habe meine Einkäufe im Supermarkt erledigt.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-10 lg:top-20 bg-white p-3 lg:p-4 rounded-2xl shadow-xl border border-gray-100 items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">B2 Level</div>
              <div className="text-xs text-gray-500">Estimated</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden sm:flex absolute -left-4 lg:-left-8 bottom-10 lg:bottom-20 bg-white p-3 lg:p-4 rounded-2xl shadow-xl border border-gray-100 items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Instant Feedback</div>
              <div className="text-xs text-gray-500">AI-powered</div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="w-full bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to improve</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our AI analyzes your text across multiple dimensions to give you the most comprehensive feedback possible.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tailored Topics</h3>
              <p className="text-gray-600 leading-relaxed">
                Unique writing prompts adapted to your level (A1-B2) and chosen category. Never write about the same thing twice.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                <PenTool className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deep Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Get precise grammar corrections, vocabulary suggestions, and native-speaker alternatives for every sentence you write.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive an estimated CEFR level and detailed scores for grammar, vocabulary, coherence, and style on every submission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
