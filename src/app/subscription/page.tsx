"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Crown, Zap } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";
import type { UserSubscription } from "@/lib/types";

export default function SubscriptionPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);

  useEffect(() => {
    const subData = localStorage.getItem("poopscan_subscription");
    if (subData) {
      setSubscription(JSON.parse(subData));
    }
  }, []);

  const handleSelectPlan = (plan: "free" | "premium" | "professional") => {
    const newSubscription: UserSubscription = {
      plan,
      startDate: new Date(),
      analysisCount: 0,
      analysisLimit: SUBSCRIPTION_PLANS[plan].analysisLimit,
    };

    localStorage.setItem("poopscan_subscription", JSON.stringify(newSubscription));
    setSubscription(newSubscription);

    // Simular sucesso
    alert(`Plano ${SUBSCRIPTION_PLANS[plan].name} ativado com sucesso!`);
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "premium":
        return <Crown className="w-6 h-6" />;
      case "professional":
        return <Zap className="w-6 h-6" />;
      default:
        return <Check className="w-6 h-6" />;
    }
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
              <h1 className="text-xl font-bold text-[#1E1E1E]">Planos e Assinatura</h1>
              <p className="text-sm text-gray-500">Escolha o melhor plano para você</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Plan */}
        {subscription && (
          <div className="bg-gradient-to-r from-[#9AE2C9] to-[#7DD4B4] rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Plano Atual</p>
                <h2 className="text-2xl font-bold">
                  {SUBSCRIPTION_PLANS[subscription.plan].name}
                </h2>
              </div>
              {getPlanIcon(subscription.plan)}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 text-sm">Análises Usadas</p>
                <p className="text-xl font-bold">
                  {subscription.analysisCount}
                  {subscription.analysisLimit > 0 ? ` / ${subscription.analysisLimit}` : " / ∞"}
                </p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Valor</p>
                <p className="text-xl font-bold">
                  {SUBSCRIPTION_PLANS[subscription.plan].currency}{" "}
                  {SUBSCRIPTION_PLANS[subscription.plan].price.toFixed(2)}
                  {subscription.plan !== "free" && "/mês"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Plans */}
        <div className="space-y-6">
          {/* Free Plan */}
          <div
            className={`bg-white rounded-2xl shadow-sm border-2 p-6 ${
              subscription?.plan === "free" ? "border-[#9AE2C9]" : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#1E1E1E] mb-1">
                  {SUBSCRIPTION_PLANS.free.name}
                </h3>
                <p className="text-3xl font-bold text-[#1E1E1E]">
                  {SUBSCRIPTION_PLANS.free.currency} {SUBSCRIPTION_PLANS.free.price}
                </p>
              </div>
              <Check className="w-6 h-6 text-gray-400" />
            </div>

            <ul className="space-y-3 mb-6">
              {SUBSCRIPTION_PLANS.free.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#9AE2C9] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {subscription?.plan !== "free" && (
              <Button
                onClick={() => handleSelectPlan("free")}
                variant="outline"
                className="w-full"
              >
                Voltar para Gratuito
              </Button>
            )}
          </div>

          {/* Premium Plan */}
          <div
            className={`bg-white rounded-2xl shadow-lg border-2 p-6 relative overflow-hidden ${
              subscription?.plan === "premium" ? "border-[#9AE2C9]" : "border-gray-200"
            }`}
          >
            {/* Popular badge */}
            <div className="absolute top-0 right-0 bg-[#9AE2C9] text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              POPULAR
            </div>

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#1E1E1E] mb-1">
                  {SUBSCRIPTION_PLANS.premium.name}
                </h3>
                <p className="text-3xl font-bold text-[#1E1E1E]">
                  {SUBSCRIPTION_PLANS.premium.currency}{" "}
                  {SUBSCRIPTION_PLANS.premium.price.toFixed(2)}
                  <span className="text-base font-normal text-gray-500">/mês</span>
                </p>
              </div>
              <Crown className="w-6 h-6 text-[#9AE2C9]" />
            </div>

            <ul className="space-y-3 mb-6">
              {SUBSCRIPTION_PLANS.premium.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#9AE2C9] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSelectPlan("premium")}
              className="w-full h-12 bg-[#9AE2C9] hover:bg-[#8AD3BA] text-white font-semibold"
              disabled={subscription?.plan === "premium"}
            >
              {subscription?.plan === "premium" ? "Plano Atual" : "Assinar Premium"}
            </Button>
          </div>

          {/* Professional Plan */}
          <div
            className={`bg-white rounded-2xl shadow-sm border-2 p-6 ${
              subscription?.plan === "professional" ? "border-[#9AE2C9]" : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#1E1E1E] mb-1">
                  {SUBSCRIPTION_PLANS.professional.name}
                </h3>
                <p className="text-3xl font-bold text-[#1E1E1E]">
                  {SUBSCRIPTION_PLANS.professional.currency}{" "}
                  {SUBSCRIPTION_PLANS.professional.price.toFixed(2)}
                  <span className="text-base font-normal text-gray-500">/mês</span>
                </p>
              </div>
              <Zap className="w-6 h-6 text-[#9AE2C9]" />
            </div>

            <ul className="space-y-3 mb-6">
              {SUBSCRIPTION_PLANS.professional.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#9AE2C9] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSelectPlan("professional")}
              variant="outline"
              className="w-full h-12 font-semibold"
              disabled={subscription?.plan === "professional"}
            >
              {subscription?.plan === "professional"
                ? "Plano Atual"
                : "Assinar Profissional"}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-[#9AE2C9]/10 border border-[#9AE2C9]/30 rounded-2xl p-6">
          <h4 className="font-bold text-[#1E1E1E] mb-2">💳 Pagamento Seguro</h4>
          <p className="text-sm text-gray-700">
            Todos os pagamentos são processados de forma segura. Cancele a qualquer momento sem
            taxas adicionais.
          </p>
        </div>
      </main>
    </div>
  );
}
