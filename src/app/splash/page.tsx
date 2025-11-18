"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PawPrint } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9AE2C9] to-[#7DD4B4] flex flex-col items-center justify-center p-4">
      {/* Logo animado */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
            <PawPrint className="w-12 h-12 text-[#9AE2C9]" />
          </div>
        </div>
        
        {/* Scanner animation */}
        <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
        <div className="absolute inset-0 rounded-full border-4 border-white/50" style={{ animation: "spin 3s linear infinite" }} />
      </div>

      {/* Brand */}
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">POOPSCAN</h1>
        <p className="text-white/90 text-lg font-medium">Health Check for Pets</p>
        <p className="text-white/70 text-sm mt-2">A saúde do seu pet começa no cocô</p>
      </div>

      {/* Loading indicator */}
      <div className="mt-12 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
