import React, { useState } from 'react';
import { UserData, StressLevel, FitnessGoal } from '../types';
import { Activity, Moon, Utensils, Zap, User, Target } from 'lucide-react';

interface Props {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

export default function WorkoutForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<UserData>({
    age: 25,
    gender: 'Other',
    weight: 70,
    height: 170,
    fitnessGoal: 'maintenance',
    weeklySchedule: 'Mon, Wed, Fri',
    sleepHours: 7,
    dailySteps: 8000,
    dietAdherence: 5,
    stressLevel: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' || name === 'sleepHours' || name === 'dailySteps' || name === 'dietAdherence' 
        ? Number(value) 
        : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-black/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-zinc-800">
            <User className="w-5 h-5 text-indigo-500" />
            Personal Profile
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">Weight (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">Height (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* Fitness Goals */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-zinc-800">
            <Target className="w-5 h-5 text-emerald-500" />
            Fitness Objectives
          </h3>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">Primary Goal</label>
            <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              <option value="fat loss">Fat Loss</option>
              <option value="muscle gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">Current Weekly Schedule</label>
            <textarea name="weeklySchedule" value={formData.weeklySchedule} onChange={handleChange} placeholder="e.g. Mon, Wed, Fri morning" className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24 resize-none" />
          </div>
        </div>

        {/* Habits */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-zinc-800">
            <Activity className="w-5 h-5 text-orange-500" />
            Daily Habits
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-bold text-zinc-400 flex items-center gap-1">
                <Moon className="w-3 h-3" /> Sleep (hrs)
              </label>
              <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">Daily Steps</label>
              <input type="number" name="dailySteps" value={formData.dailySteps} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-zinc-800">
            <Zap className="w-5 h-5 text-yellow-500" />
            Lifestyle Factors
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-bold text-zinc-400 flex items-center gap-1">
                <Utensils className="w-3 h-3" /> Diet (days/wk)
              </label>
              <input type="number" max="7" min="0" name="dietAdherence" value={formData.dietAdherence} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">Stress Level</label>
              <select name="stressLevel" value={formData.stressLevel} onChange={handleChange} className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg shadow-zinc-200"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analyzing Patterns...
          </>
        ) : (
          'Generate Consistency Analysis'
        )}
      </button>
    </form>
  );
}
