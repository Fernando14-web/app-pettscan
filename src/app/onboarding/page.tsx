"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight, Camera, TrendingUp, Shield } from "lucide-react";
import { ONBOARDING_STEPS } from "@/lib/constants";
import type { OnboardingStep } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as OnboardingStep);
    } else {
      router.push("/pet-profile");
    }
  };

  const handleSkip = () => {
    router.push("/pet-profile");
  };

  const getIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Camera className="w-16 h-16 text-[#9AE2C9]" />;
      case 2:
        return <TrendingUp className="w-16 h-16 text-[#9AE2C9]" />;
      case 3:
        return <Shield className="w-16 h-16 text-[#9AE2C9]" />;
      default:
        return null;
    }
  };

  const step = ONBOARDING_STEPS[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#9AE2C9]/10 flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
          Pular
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Icon */}
        <div className="w-32 h-32 rounded-full bg-[#9AE2C9]/10 flex items-center justify-center mb-8">
          {getIcon(currentStep)}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#1E1E1E] text-center mb-4 max-w-md">
          {step.title}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 text-center max-w-md mb-12">
          {step.description}
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`h-2 rounded-full transition-all duration-300 ${
                dot === currentStep
                  ? "w-8 bg-[#9AE2C9]"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next button */}
      <div className="p-6 bg-white border-t border-gray-200">
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-[#9AE2C9] hover:bg-[#8AD3BA] text-white text-lg font-semibold rounded-xl"
        >
          {currentStep === 3 ? "Começar" : "Próximo"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
