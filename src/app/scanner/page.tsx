"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Check, X } from "lucide-react";
import { CAMERA_INSTRUCTIONS } from "@/lib/constants";

export default function ScannerPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPhotos.push(reader.result as string);
          if (newPhotos.length === files.length) {
            setPhotos([...photos, ...newPhotos]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    if (photos.length > 0) {
      // Salvar fotos no localStorage
      localStorage.setItem("poopscan_current_photos", JSON.stringify(photos));
      router.push("/processing");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Scanner de Fezes</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      {/* Camera View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions */}
        <div className="bg-[#9AE2C9]/10 border border-[#9AE2C9]/30 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-[#9AE2C9] mb-4">Instruções:</h2>
          <ul className="space-y-2">
            {CAMERA_INSTRUCTIONS.map((instruction, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#9AE2C9]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#9AE2C9] text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-white/80">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Camera Frame */}
        <div className="relative mb-6">
          <div className="aspect-[4/3] bg-black/50 rounded-2xl border-4 border-[#9AE2C9]/30 overflow-hidden flex items-center justify-center">
            {photos.length === 0 ? (
              <div className="text-center">
                <Camera className="w-16 h-16 text-[#9AE2C9] mx-auto mb-4" />
                <p className="text-white/60">Toque no botão abaixo para capturar</p>
              </div>
            ) : (
              <div className="w-full h-full p-4 overflow-auto">
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={photo}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scanner overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#9AE2C9] rounded-2xl">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#9AE2C9] rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#9AE2C9] rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#9AE2C9] rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#9AE2C9] rounded-br-2xl" />
            </div>
          </div>
        </div>

        {/* Photo Counter */}
        <div className="text-center mb-6">
          <p className="text-white/60">
            {photos.length} {photos.length === 1 ? "foto capturada" : "fotos capturadas"}
          </p>
          <p className="text-[#9AE2C9] text-sm mt-1">
            Recomendamos 2-3 fotos de ângulos diferentes
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            onChange={handleCapture}
            className="hidden"
          />
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-16 bg-[#9AE2C9] hover:bg-[#8AD3BA] text-white text-lg font-bold rounded-xl"
          >
            <Camera className="w-6 h-6 mr-2" />
            Capturar Foto
          </Button>

          {photos.length > 0 && (
            <Button
              onClick={handleAnalyze}
              className="w-full h-16 bg-gradient-to-r from-[#9AE2C9] to-[#7DD4B4] hover:from-[#8AD3BA] hover:to-[#6EC5A5] text-white text-lg font-bold rounded-xl"
            >
              <Check className="w-6 h-6 mr-2" />
              Analisar Fezes
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
