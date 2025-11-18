// Types para o POOPSCAN

export type PetProfile = {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  diet: string;
  history?: string;
  photo?: string;
  createdAt: Date;
};

export type AnalysisStatus = "normal" | "attention" | "moderate" | "high";

export type AnalysisResult = {
  id: string;
  petId: string;
  date: Date;
  status: AnalysisStatus;
  score: number;
  color: string;
  consistency: string;
  format: string;
  texture: string;
  mucus: boolean;
  blood: boolean;
  parasites: boolean;
  diarrhea: boolean;
  constipation: boolean;
  dehydration: boolean;
  recommendations: string[];
  vetRequired: boolean;
  photos: string[];
  aiAnalysis: string;
};

export type SubscriptionPlan = "free" | "premium" | "professional";

export type UserSubscription = {
  plan: SubscriptionPlan;
  startDate: Date;
  endDate?: Date;
  analysisCount: number;
  analysisLimit: number;
};

export type OnboardingStep = 1 | 2 | 3;
