"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, Check } from "lucide-react";
import type { PetProfile } from "@/lib/types";

export default function PetProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    weight: "",
    diet: "",
    history: "",
    photo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const petProfile: PetProfile = {
      id: Date.now().toString(),
      name: formData.name,
      breed: formData.breed,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      diet: formData.diet,
      history: formData.history,
      photo: formData.photo,
      createdAt: new Date(),
    };

    // Salvar no localStorage
    localStorage.setItem("poopscan_current_pet", JSON.stringify(petProfile));
    localStorage.setItem("poopscan_onboarded", "true");

    // Inicializar subscription gratuita
    localStorage.setItem(
      "poopscan_subscription",
      JSON.stringify({
        plan: "free",
        startDate: new Date(),
        analysisCount: 0,
        analysisLimit: 3,
      })
    );

    router.push("/");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#9AE2C9]/10">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#1E1E1E]">Cadastro do Pet</h1>
              <p className="text-sm text-gray-500">Preencha as informações do seu pet</p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-[#9AE2C9]/20 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Pet"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-12 h-12 text-[#9AE2C9]" />
                )}
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#9AE2C9] flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#8AD3BA] transition-colors"
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">Adicione uma foto do seu pet</p>
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Rex"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="breed">Raça *</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                placeholder="Ex: Labrador"
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Idade (anos) *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Ex: 3"
                  required
                  min="0"
                  step="0.1"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="weight">Peso (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="Ex: 25"
                  required
                  min="0"
                  step="0.1"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="diet">Dieta *</Label>
              <Input
                id="diet"
                value={formData.diet}
                onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                placeholder="Ex: Ração premium + alimentação natural"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="history">Histórico de Saúde (opcional)</Label>
              <Textarea
                id="history"
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                placeholder="Descreva problemas de saúde anteriores, alergias, cirurgias, etc."
                className="mt-1 min-h-24"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-[#9AE2C9] hover:bg-[#8AD3BA] text-white text-lg font-semibold rounded-xl"
          >
            <Check className="w-5 h-5 mr-2" />
            Salvar e Continuar
          </Button>
        </form>
      </main>
    </div>
  );
}
