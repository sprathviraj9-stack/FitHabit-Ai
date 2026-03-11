import { GoogleGenAI, Type } from "@google/genai";
import { UserData, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeConsistency(userData: UserData): Promise<AnalysisResult> {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = `
    As an AI fitness behavior coach, analyze the following user data and provide insights on their workout consistency.
    
    User Data:
    - Age: ${userData.age}
    - Gender: ${userData.gender}
    - Weight: ${userData.weight}kg
    - Height: ${userData.height}cm
    - Fitness Goal: ${userData.fitnessGoal}
    - Weekly Schedule: ${userData.weeklySchedule}
    - Sleep Hours: ${userData.sleepHours}
    - Daily Steps: ${userData.dailySteps}
    - Diet Adherence: ${userData.dietAdherence} days/week
    - Stress Level: ${userData.stressLevel}

    Your goal is to identify WHY they might be inconsistent and how to fix it.
    Focus on behavioral patterns, recovery, and lifestyle factors.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rootCause: { type: Type.STRING, description: "The primary reason for inconsistency" },
          insights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "description"]
            }
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                action: { type: Type.STRING }
              },
              required: ["title", "action"]
            }
          },
          consistencyScore: { type: Type.NUMBER, description: "Score from 1-100" },
          scoreExplanation: { type: Type.STRING },
          motivationalMessage: { type: Type.STRING }
        },
        required: ["rootCause", "insights", "recommendations", "consistencyScore", "scoreExplanation", "motivationalMessage"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
