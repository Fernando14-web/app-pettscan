"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, TrendingUp, Filter } from "lucide-react";
import type { AnalysisResult } from "@/lib/types";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [filter, setFilter] = useState<"all" | "normal" | "alert">("all");

  useEffect(() => {
    const historyData = localStorage.getItem("poopscan_history");
    if (historyData) {
      setHistory(JSON.parse(historyData));
    }
  }, []);

  const filteredHistory = history.filter((item) => {
    if (filter === "all") return true;
    if (filter === "normal") return item.status === "normal";
    if (filter === "alert") return item.status !== "normal";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-[#9AE2C9] text-white";
      case "attention":
        return "bg-yellow-500 text-white";
      case "moderate":
        return "bg-orange-500 text-white";
      case "high":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "normal":
        return "Normal";
      case "attention":
        return "Atenção";
      case "moderate":
        return "Moderado";
      case "high":
        return "Alto";
      default:
        return "Desconhecido";
    }
  };

  const calculateAverageScore = () => {
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, item) => acc + item.score, 0);
    return Math.round(sum / history.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#9AE2C9]/10">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#1E1E1E]">Histórico</h1>
              <p className="text-sm text-gray-500">{history.length} análises realizadas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#9AE2C9]" />
              <span className="text-sm text-gray-600">Média de Saúde</span>
            </div>
            <p className="text-3xl font-bold text-[#1E1E1E]">{calculateAverageScore()}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#9AE2C9]" />
              <span className="text-sm text-gray-600">Total de Análises</span>
            </div>
            <p className="text-3xl font-bold text-[#1E1E1E]">{history.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-[#9AE2C9] hover:bg-[#8AD3BA]" : ""}
            >
              Todas
            </Button>
            <Button
              variant={filter === "normal" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("normal")}
              className={filter === "normal" ? "bg-[#9AE2C9] hover:bg-[#8AD3BA]" : ""}
            >
              Normal
            </Button>
            <Button
              variant={filter === "alert" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("alert")}
              className={filter === "alert" ? "bg-[#9AE2C9] hover:bg-[#8AD3BA]" : ""}
            >
              Alertas
            </Button>
          </div>
        </div>

        {/* Timeline */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  localStorage.setItem("poopscan_last_analysis", JSON.stringify(item));
                  router.push("/result");
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Photo */}
                  <img
                    src={item.photos[0]}
                    alt="Análise"
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <p className="text-xs text-gray-500">Pontuação</p>
                        <p className="text-lg font-bold text-[#1E1E1E]">{item.score}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Consistência</p>
                        <p className="text-sm font-medium text-[#1E1E1E] capitalize">
                          {item.consistency}
                        </p>
                      </div>
                    </div>

                    {item.vetRequired && (
                      <div className="flex items-center gap-2 text-xs text-red-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                        Veterinário recomendado
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#1E1E1E] mb-2">
              Nenhuma análise encontrada
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === "all"
                ? "Faça sua primeira análise para começar"
                : "Nenhuma análise corresponde ao filtro selecionado"}
            </p>
            <Button
              onClick={() => router.push("/scanner")}
              className="bg-[#9AE2C9] hover:bg-[#8AD3BA]"
            >
              Fazer Análise
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
