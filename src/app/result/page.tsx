"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Save,
  MessageCircle,
  History,
  Share2,
} from "lucide-react";
import type { AnalysisResult } from "@/lib/types";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const resultData = localStorage.getItem("poopscan_last_analysis");
    if (!resultData) {
      router.push("/");
      return;
    }
    setResult(JSON.parse(resultData));
  }, [router]);

  if (!result) {
    return null;
  }

  const getStatusIcon = () => {
    switch (result.status) {
      case "normal":
        return <CheckCircle2 className="w-16 h-16 text-[#9AE2C9]" />;
      case "attention":
        return <AlertTriangle className="w-16 h-16 text-yellow-500" />;
      case "moderate":
        return <AlertCircle className="w-16 h-16 text-orange-500" />;
      case "high":
        return <XCircle className="w-16 h-16 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case "normal":
        return "from-[#9AE2C9] to-[#7DD4B4]";
      case "attention":
        return "from-yellow-400 to-yellow-500";
      case "moderate":
        return "from-orange-400 to-orange-500";
      case "high":
        return "from-red-400 to-red-500";
    }
  };

  const getStatusLabel = () => {
    switch (result.status) {
      case "normal":
        return "Normal";
      case "attention":
        return "Atenção";
      case "moderate":
        return "Alerta Moderado";
      case "high":
        return "Alerta Alto";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#9AE2C9]/10">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#1E1E1E]">Resultado da Análise</h1>
              <p className="text-sm text-gray-500">
                {new Date(result.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Card */}
        <div className={`bg-gradient-to-r ${getStatusColor()} rounded-2xl p-8 mb-6 text-white text-center shadow-lg`}>
          <div className="flex justify-center mb-4">{getStatusIcon()}</div>
          <h2 className="text-3xl font-bold mb-2">{getStatusLabel()}</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-bold">{result.score}</span>
            <span className="text-xl">/100</span>
          </div>
          <p className="mt-2 text-white/90">Pontuação de Saúde</p>
        </div>

        {/* Indicators */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">Indicadores Detectados</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Cor</p>
              <p className="text-sm font-bold text-[#1E1E1E] capitalize">{result.color}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Consistência</p>
              <p className="text-sm font-bold text-[#1E1E1E] capitalize">{result.consistency}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Formato</p>
              <p className="text-sm font-bold text-[#1E1E1E] capitalize">{result.format}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Textura</p>
              <p className="text-sm font-bold text-[#1E1E1E] capitalize">{result.texture}</p>
            </div>
          </div>

          {/* Alerts */}
          <div className="mt-4 space-y-2">
            {result.mucus && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">Presença de muco detectada</span>
              </div>
            )}
            
            {result.blood && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800 font-semibold">Sangue visível detectado</span>
              </div>
            )}
            
            {result.parasites && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800 font-semibold">Possíveis parasitas detectados</span>
              </div>
            )}
            
            {result.diarrhea && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-800">Diarreia possível</span>
              </div>
            )}
            
            {result.constipation && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-800">Constipação possível</span>
              </div>
            )}
            
            {result.dehydration && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-800">Desidratação possível</span>
              </div>
            )}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">Análise Completa da IA</h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{result.aiAnalysis}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">Recomendações</h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#9AE2C9]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#9AE2C9] text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vet Required Alert */}
        {result.vetRequired && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">
                  Consulta Veterinária Recomendada
                </h3>
                <p className="text-red-800">
                  Os sinais detectados requerem avaliação profissional. Recomendamos agendar uma consulta com veterinário o mais breve possível.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => router.push("/telemedicine")}
            className="h-16 bg-[#9AE2C9] hover:bg-[#8AD3BA] text-white font-semibold rounded-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Falar com Veterinário
          </Button>
          
          <Button
            onClick={() => router.push("/history")}
            variant="outline"
            className="h-16 font-semibold rounded-xl"
          >
            <History className="w-5 h-5 mr-2" />
            Ver Histórico
          </Button>
        </div>

        {/* Photos */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">Fotos Analisadas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {result.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Análise ${index + 1}`}
                className="w-full aspect-square object-cover rounded-xl"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
