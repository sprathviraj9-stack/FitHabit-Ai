export type StressLevel = 'low' | 'medium' | 'high';
export type FitnessGoal = 'fat loss' | 'muscle gain' | 'maintenance';

export interface UserData {
  age: number;
  gender: string;
  weight: number;
  height: number;
  fitnessGoal: FitnessGoal;
  weeklySchedule: string;
  sleepHours: number;
  dailySteps: number;
  dietAdherence: number; // days per week
  stressLevel: StressLevel;
}

export interface Insight {
  title: string;
  description: string;
}

export interface Recommendation {
  title: string;
  action: string;
}

export interface AnalysisResult {
  rootCause: string;
  insights: Insight[];
  recommendations: Recommendation[];
  consistencyScore: number;
  scoreExplanation: string;
  motivationalMessage: string;
}
