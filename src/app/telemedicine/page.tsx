"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle, Video, Send, Phone, MapPin } from "lucide-react";

export default function TelemedicinePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"chat" | "video" | "clinics">("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "vet"; text: string }>>([
    {
      sender: "vet",
      text: "Olá! Sou Dr. Carlos, veterinário. Como posso ajudar você e seu pet hoje?",
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: "user", text: message }]);
      setMessage("");

      // Simular resposta do veterinário
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "vet",
            text: "Obrigado pela mensagem. Vou analisar o relatório e retornar em breve com recomendações específicas.",
          },
        ]);
      }, 2000);
    }
  };

  const mockClinics = [
    {
      name: "Clínica Veterinária PetCare",
      address: "Rua das Flores, 123 - Centro",
      distance: "1.2 km",
      phone: "(11) 98765-4321",
      rating: 4.8,
    },
    {
      name: "Hospital Veterinário Animal Life",
      address: "Av. Principal, 456 - Jardim",
      distance: "2.5 km",
      phone: "(11) 98765-1234",
      rating: 4.9,
    },
    {
      name: "Pet Vet 24h",
      address: "Rua do Comércio, 789 - Vila Nova",
      distance: "3.8 km",
      phone: "(11) 98765-5678",
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#9AE2C9]/10 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#1E1E1E]">Telemedicina</h1>
              <p className="text-sm text-gray-500">Fale com veterinários especializados</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "chat"
                  ? "border-[#9AE2C9] text-[#9AE2C9]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "video"
                  ? "border-[#9AE2C9] text-[#9AE2C9]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Video className="w-4 h-4 inline mr-2" />
              Videochamada
            </button>
            <button
              onClick={() => setActiveTab("clinics")}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "clinics"
                  ? "border-[#9AE2C9] text-[#9AE2C9]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Clínicas
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "chat" && (
          <div className="flex flex-col h-[calc(100vh-280px)]">
            {/* Messages */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.sender === "user"
                          ? "bg-[#9AE2C9] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#9AE2C9] hover:bg-[#8AD3BA]"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "video" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <Video className="w-16 h-16 text-[#9AE2C9] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">
                Videochamada com Veterinário
              </h3>
              <p className="text-gray-600 mb-6">
                Agende uma consulta por vídeo com um veterinário especializado
              </p>
              <Button className="bg-[#9AE2C9] hover:bg-[#8AD3BA] h-12 px-8">
                Agendar Videochamada
              </Button>
            </div>

            {/* Available Vets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">
                Veterinários Disponíveis
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Dr. Carlos Silva", specialty: "Clínico Geral", available: true },
                  { name: "Dra. Ana Costa", specialty: "Gastroenterologia", available: true },
                  { name: "Dr. Pedro Santos", specialty: "Nutrição", available: false },
                ].map((vet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#9AE2C9]/20 flex items-center justify-center">
                        <span className="text-[#9AE2C9] font-bold text-lg">
                          {vet.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1E1E1E]">{vet.name}</p>
                        <p className="text-sm text-gray-500">{vet.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          vet.available ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      <span className="text-sm text-gray-600">
                        {vet.available ? "Disponível" : "Ocupado"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "clinics" && (
          <div className="space-y-4">
            {mockClinics.map((clinic, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#1E1E1E] mb-1">{clinic.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(clinic.rating) ? "text-yellow-500" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{clinic.rating}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#9AE2C9]">{clinic.distance}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{clinic.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                  <Button className="w-full bg-[#9AE2C9] hover:bg-[#8AD3BA]">
                    <MapPin className="w-4 h-4 mr-2" />
                    Ver Mapa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
