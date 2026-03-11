import { useState } from 'react';
import { UserData, AnalysisResult } from './types';
import { analyzeConsistency } from './services/gemini';
import WorkoutForm from './components/WorkoutForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ShieldCheck, BrainCircuit } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: UserData) => {
    setIsLoading(true);
    setError(null);
    try {
      const analysis = await analyzeConsistency(data);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze consistency. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-black tracking-tighter text-xl">CONSISTENCY<span className="text-indigo-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Science Based</span>
            <span className="flex items-center gap-1.5"><BrainCircuit className="w-4 h-4" /> AI Powered</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-none"
          >
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">Fitness Habits</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-2xl mx-auto text-lg"
          >
            We don't just track your workouts. We analyze the behavioral patterns that hold you back from long-term consistency.
          </motion.p>
        </header>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3"
            >
              <Activity className="w-5 h-5" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}

          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <WorkoutForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AnalysisDashboard result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-24 pt-8 border-t border-black/5 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Built for Behavioral Fitness & Habit Formation
          </p>
          <div className="flex justify-center gap-8 opacity-30 grayscale contrast-200">
             {/* Simple visual placeholders for "partners" or "tech" */}
             <div className="font-black text-xl">GEMINI</div>
             <div className="font-black text-xl">REACT</div>
             <div className="font-black text-xl">TAILWIND</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
