"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { PROCESSING_STEPS } from "@/lib/constants";
import { analyzePoopWithAI } from "@/lib/ai-analysis";
import type { AnalysisResult } from "@/lib/types";

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const processAnalysis = async () => {
      // Obter fotos do localStorage
      const photosData = localStorage.getItem("poopscan_current_photos");
      if (!photosData) {
        router.push("/");
        return;
      }

      const photos = JSON.parse(photosData);

      // Simular progresso das etapas
      const stepDuration = 750;
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        setCurrentStep(i);
        setProgress((i + 1) * 25);
        await new Promise((resolve) => setTimeout(resolve, stepDuration));
      }

      // Executar análise de IA
      const analysis = await analyzePoopWithAI(photos);

      // Obter pet atual
      const petData = localStorage.getItem("poopscan_current_pet");
      const pet = petData ? JSON.parse(petData) : null;

      // Criar resultado completo
      const result: AnalysisResult = {
        id: Date.now().toString(),
        petId: pet?.id || "unknown",
        date: new Date(),
        photos,
        ...analysis,
      } as AnalysisResult;

      // Salvar resultado
      localStorage.setItem("poopscan_last_analysis", JSON.stringify(result));

      // Adicionar ao histórico
      const historyData = localStorage.getItem("poopscan_history");
      const history = historyData ? JSON.parse(historyData) : [];
      history.unshift(result);
      localStorage.setItem("poopscan_history", JSON.stringify(history));

      // Atualizar contador de análises
      const subscriptionData = localStorage.getItem("poopscan_subscription");
      if (subscriptionData) {
        const subscription = JSON.parse(subscriptionData);
        subscription.analysisCount += 1;
        localStorage.setItem("poopscan_subscription", JSON.stringify(subscription));
      }

      // Redirecionar para resultado
      router.push("/result");
    };

    processAnalysis();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9AE2C9] to-[#7DD4B4] flex flex-col items-center justify-center p-4">
      {/* Scanner Animation */}
      <div className="relative mb-12">
        <div className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-white/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-[#9AE2C9] animate-spin" />
            </div>
          </div>
        </div>
        
        {/* Scanning lines */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="absolute inset-x-0 h-1 bg-white/50"
            style={{
              top: `${progress}%`,
              transition: "top 0.3s ease-out",
            }}
          />
        </div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-md mb-8">
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Analisando...</h2>
        <p className="text-white/90 text-lg">
          {PROCESSING_STEPS[currentStep]}
        </p>
      </div>

      {/* Info */}
      <div className="mt-12 text-center">
        <p className="text-white/70 text-sm">
          Nossa IA está comparando com milhares de padrões veterinários
        </p>
      </div>
    </div>
  );
}
