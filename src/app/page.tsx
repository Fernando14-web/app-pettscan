"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera, History, Settings, PawPrint, TrendingUp } from "lucide-react";
import type { PetProfile, AnalysisResult } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [currentPet, setCurrentPet] = useState<PetProfile | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Verificar se já passou pelo onboarding
    const onboarded = localStorage.getItem("poopscan_onboarded");
    const petData = localStorage.getItem("poopscan_current_pet");
    const lastAnalysisData = localStorage.getItem("poopscan_last_analysis");

    if (!onboarded) {
      router.push("/splash");
      return;
    }

    setHasOnboarded(true);
    
    if (petData) {
      setCurrentPet(JSON.parse(petData));
    }
    
    if (lastAnalysisData) {
      setLastAnalysis(JSON.parse(lastAnalysisData));
    }
  }, [router]);

  if (!hasOnboarded) {
    return null;
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "normal":
        return "text-[#9AE2C9]";
      case "attention":
        return "text-yellow-500";
      case "moderate":
        return "text-orange-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "normal":
        return "Normal";
      case "attention":
        return "Atenção";
      case "moderate":
        return "Alerta Moderado";
      case "high":
        return "Alerta Alto";
      default:
        return "Sem análises";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9AE2C9]/10 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#9AE2C9] flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1E1E1E]">POOPSCAN</h1>
                <p className="text-xs text-gray-500">Health Check for Pets</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pet Info */}
        {currentPet && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#9AE2C9]/20 flex items-center justify-center">
                {currentPet.photo ? (
                  <img
                    src={currentPet.photo}
                    alt={currentPet.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <PawPrint className="w-8 h-8 text-[#9AE2C9]" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#1E1E1E]">{currentPet.name}</h2>
                <p className="text-sm text-gray-500">
                  {currentPet.breed} • {currentPet.age} anos • {currentPet.weight}kg
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Scan Button */}
        <div className="mb-8">
          <Button
            onClick={() => router.push("/scanner")}
            className="w-full h-32 bg-gradient-to-r from-[#9AE2C9] to-[#7DD4B4] hover:from-[#8AD3BA] hover:to-[#6EC5A5] text-white text-xl font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Camera className="w-8 h-8 mr-3" />
            ESCANEAR FEZES
          </Button>
        </div>

        {/* Last Analysis */}
        {lastAnalysis ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1E1E1E]">Última Análise</h3>
              <span className={`text-sm font-semibold ${getStatusColor(lastAnalysis.status)}`}>
                {getStatusLabel(lastAnalysis.status)}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pontuação de Saúde</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        lastAnalysis.score >= 80
                          ? "bg-[#9AE2C9]"
                          : lastAnalysis.score >= 60
                          ? "bg-yellow-500"
                          : lastAnalysis.score >= 40
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${lastAnalysis.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#1E1E1E]">
                    {lastAnalysis.score}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Cor</p>
                  <p className="text-sm font-medium text-[#1E1E1E] capitalize">
                    {lastAnalysis.color}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Consistência</p>
                  <p className="text-sm font-medium text-[#1E1E1E] capitalize">
                    {lastAnalysis.consistency}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => router.push("/result")}
                variant="outline"
                className="w-full mt-4"
              >
                Ver Relatório Completo
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#9AE2C9]/20 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-[#9AE2C9]" />
            </div>
            <h3 className="text-lg font-bold text-[#1E1E1E] mb-2">
              Nenhuma análise ainda
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Faça sua primeira análise para começar a monitorar a saúde do seu pet
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => router.push("/history")}
            variant="outline"
            className="h-24 flex-col gap-2 border-2"
          >
            <History className="w-6 h-6 text-[#9AE2C9]" />
            <span className="text-sm font-medium">Histórico</span>
          </Button>
          
          <Button
            onClick={() => router.push("/subscription")}
            variant="outline"
            className="h-24 flex-col gap-2 border-2"
          >
            <TrendingUp className="w-6 h-6 text-[#9AE2C9]" />
            <span className="text-sm font-medium">Planos</span>
          </Button>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-[#9AE2C9]/20 to-[#7DD4B4]/20 rounded-2xl p-6 border border-[#9AE2C9]/30">
          <h4 className="font-bold text-[#1E1E1E] mb-2">
            💡 Dica do dia
          </h4>
          <p className="text-sm text-gray-700">
            A saúde do seu pet começa no cocô. Análises regulares ajudam a detectar problemas antes que se tornem graves.
          </p>
        </div>
      </main>
    </div>
  );
}
