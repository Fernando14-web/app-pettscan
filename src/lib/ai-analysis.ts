// Análise de IA para fezes de pets

import type { AnalysisResult, AnalysisStatus } from "./types";

export async function analyzePoopWithAI(photos: string[]): Promise<Partial<AnalysisResult>> {
  // Simulação de análise de IA (em produção, usar OpenAI Vision API)
  
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Análise simulada baseada em padrões veterinários
  const mockAnalysis = generateMockAnalysis();
  
  return mockAnalysis;
}

function generateMockAnalysis(): Partial<AnalysisResult> {
  // Gerar análise aleatória para demonstração
  const colors = ["brown", "dark-brown", "yellow", "green"];
  const consistencies = ["firm", "soft", "liquid", "hard"];
  const formats = ["cilíndrico", "segmentado", "irregular", "pastoso"];
  const textures = ["lisa", "rugosa", "com resíduos", "brilhante"];
  
  const color = colors[Math.floor(Math.random() * colors.length)];
  const consistency = consistencies[Math.floor(Math.random() * consistencies.length)];
  const format = formats[Math.floor(Math.random() * formats.length)];
  const texture = textures[Math.floor(Math.random() * textures.length)];
  
  const mucus = Math.random() > 0.8;
  const blood = Math.random() > 0.9;
  const parasites = Math.random() > 0.95;
  const diarrhea = consistency === "liquid";
  const constipation = consistency === "hard";
  const dehydration = consistency === "hard" || color === "dark-brown";
  
  // Determinar status baseado nos indicadores
  let status: AnalysisStatus = "normal";
  let score = 85;
  
  if (blood || parasites) {
    status = "high";
    score = 35;
  } else if (color === "green" || color === "yellow" || mucus || diarrhea) {
    status = "moderate";
    score = 55;
  } else if (constipation || dehydration) {
    status = "attention";
    score = 70;
  }
  
  // Gerar recomendações
  const recommendations: string[] = [];
  
  if (diarrhea) {
    recommendations.push("Aumente a hidratação do pet");
    recommendations.push("Considere dieta leve (arroz e frango)");
  }
  
  if (constipation) {
    recommendations.push("Adicione mais fibras à dieta");
    recommendations.push("Incentive exercícios físicos");
  }
  
  if (blood || parasites) {
    recommendations.push("Consulte um veterinário IMEDIATAMENTE");
    recommendations.push("Não administre medicamentos sem orientação");
  }
  
  if (mucus) {
    recommendations.push("Monitore por 24-48 horas");
    recommendations.push("Evite mudanças bruscas na alimentação");
  }
  
  if (dehydration) {
    recommendations.push("Garanta água fresca sempre disponível");
    recommendations.push("Monitore a ingestão de líquidos");
  }
  
  if (status === "normal") {
    recommendations.push("Continue com a dieta atual");
    recommendations.push("Mantenha a rotina de exercícios");
  }
  
  // Gerar análise textual
  const aiAnalysis = generateAIAnalysisText({
    color,
    consistency,
    format,
    texture,
    mucus,
    blood,
    parasites,
    status,
  });
  
  return {
    status,
    score,
    color,
    consistency,
    format,
    texture,
    mucus,
    blood,
    parasites,
    diarrhea,
    constipation,
    dehydration,
    recommendations,
    vetRequired: blood || parasites || status === "high",
    aiAnalysis,
  };
}

function generateAIAnalysisText(data: any): string {
  const { color, consistency, format, texture, mucus, blood, parasites, status } = data;
  
  let analysis = `Análise completa das fezes do seu pet:\n\n`;
  
  // Status geral
  if (status === "normal") {
    analysis += `✅ Status: NORMAL\nAs fezes apresentam características saudáveis. Continue monitorando regularmente.\n\n`;
  } else if (status === "attention") {
    analysis += `⚠️ Status: ATENÇÃO\nAlgumas características merecem atenção. Monitore nas próximas 24-48 horas.\n\n`;
  } else if (status === "moderate") {
    analysis += `🟡 Status: ALERTA MODERADO\nIdentificamos sinais que requerem atenção. Considere consultar um veterinário.\n\n`;
  } else {
    analysis += `🔴 Status: ALERTA ALTO\nSinais preocupantes detectados. Recomendamos consulta veterinária urgente.\n\n`;
  }
  
  // Detalhes da análise
  analysis += `📊 Características detectadas:\n`;
  analysis += `• Cor: ${translateColor(color)}\n`;
  analysis += `• Consistência: ${translateConsistency(consistency)}\n`;
  analysis += `• Formato: ${format}\n`;
  analysis += `• Textura: ${texture}\n`;
  
  if (mucus) analysis += `• Presença de muco detectada\n`;
  if (blood) analysis += `• ⚠️ SANGUE VISÍVEL DETECTADO\n`;
  if (parasites) analysis += `• ⚠️ POSSÍVEIS PARASITAS DETECTADOS\n`;
  
  analysis += `\n`;
  
  // Interpretação
  analysis += `🔍 Interpretação:\n`;
  
  if (blood || parasites) {
    analysis += `A presença de sangue ou parasitas é um sinal de alerta importante. Pode indicar infecções, parasitoses ou problemas gastrointestinais que requerem tratamento veterinário imediato.\n\n`;
  } else if (consistency === "liquid") {
    analysis += `Fezes líquidas podem indicar diarreia, que pode ser causada por mudanças na dieta, infecções ou intolerâncias alimentares. Monitore a hidratação do pet.\n\n`;
  } else if (consistency === "hard") {
    analysis += `Fezes muito duras podem indicar constipação. Isso pode ser causado por desidratação, falta de fibras ou baixa atividade física.\n\n`;
  } else if (color === "yellow" || color === "green") {
    analysis += `Alterações na cor podem indicar problemas digestivos, mudanças na dieta ou trânsito intestinal acelerado.\n\n`;
  } else {
    analysis += `As características observadas estão dentro dos padrões esperados para um pet saudável.\n\n`;
  }
  
  // Aviso legal
  analysis += `⚕️ Aviso importante:\nEsta análise é baseada em inteligência artificial e não substitui a avaliação de um veterinário. Em caso de dúvidas ou sinais persistentes, consulte um profissional.`;
  
  return analysis;
}

function translateColor(color: string): string {
  const translations: Record<string, string> = {
    "brown": "Marrom (normal)",
    "dark-brown": "Marrom escuro (normal)",
    "yellow": "Amarelo (atenção)",
    "green": "Verde (alerta)",
  };
  return translations[color] || color;
}

function translateConsistency(consistency: string): string {
  const translations: Record<string, string> = {
    "firm": "Firme (ideal)",
    "soft": "Macio (atenção)",
    "liquid": "Líquido (alerta)",
    "hard": "Duro (constipação)",
  };
  return translations[consistency] || consistency;
}

// Função para análise real com OpenAI Vision (para implementação futura)
export async function analyzePoopWithOpenAI(photos: string[]): Promise<Partial<AnalysisResult>> {
  // Implementação futura com OpenAI Vision API
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [
  //     {
  //       role: "user",
  //       content: [
  //         { type: "text", text: "Analise estas fezes de cachorro..." },
  //         { type: "image_url", image_url: { url: photos[0] } },
  //       ],
  //     },
  //   ],
  // });
  
  return analyzePoopWithAI(photos);
}
