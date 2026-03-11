import React from 'react';
import { AnalysisResult } from '../types';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp, RefreshCcw } from 'lucide-react';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

export default function AnalysisDashboard({ result, onReset }: Props) {
  const chartData = [
    { name: 'Consistency', value: result.consistencyScore },
    { name: 'Remaining', value: 100 - result.consistencyScore },
  ];

  const COLORS = ['#10b981', '#f4f4f5'];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex flex-col md:flex-row items-center gap-8"
        >
          <div className="w-48 h-48 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-zinc-900">{result.consistencyScore}</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Score</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3 h-3" /> Consistency Score
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">Your Behavioral Analysis</h2>
            <p className="text-zinc-600 leading-relaxed">{result.scoreExplanation}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3 h-3" /> Root Cause
            </div>
            <h3 className="text-xl font-bold leading-tight">Primary Barrier Identified</h3>
            <p className="text-white/70 text-sm leading-relaxed italic">"{result.rootCause}"</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <AlertCircle className="w-32 h-32" />
          </div>
        </motion.div>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insights */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Behavioral Insights
          </h3>
          <div className="space-y-3">
            {result.insights.map((insight, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm hover:border-indigo-200 transition-colors">
                <h4 className="font-bold text-zinc-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-zinc-600">{insight.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Actionable Adjustments
          </h3>
          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors">
                <h4 className="font-bold text-emerald-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-emerald-700">{rec.action}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Motivational Message */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-indigo-600 text-white p-8 rounded-3xl text-center space-y-4 shadow-lg shadow-indigo-100"
      >
        <p className="text-xl font-medium italic">"{result.motivationalMessage}"</p>
        <div className="pt-4">
          <button 
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Start New Analysis
          </button>
        </div>
      </motion.div>
    </div>
  );
}
