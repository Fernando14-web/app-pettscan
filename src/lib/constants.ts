// Constantes do POOPSCAN

export const BRAND_COLORS = {
  primary: "#9AE2C9", // Verde menta
  white: "#FFFFFF",
  graphite: "#1E1E1E",
  lightGray: "#EDEDED",
} as const;

export const SUBSCRIPTION_PLANS = {
  free: {
    name: "Gratuito",
    price: 0,
    currency: "R$",
    analysisLimit: 3,
    features: [
      "3 análises por mês",
      "Relatório básico",
      "Gráfico semanal",
    ],
  },
  premium: {
    name: "Premium",
    price: 19.90,
    currency: "R$",
    analysisLimit: -1, // ilimitado
    features: [
      "Análises ilimitadas",
      "Relatório completo",
      "Alertas semanais",
      "Recomendação nutricional",
      "Teleconsulta com desconto",
      "Multi-pets",
    ],
  },
  professional: {
    name: "Profissional",
    price: 129,
    currency: "R$",
    analysisLimit: -1,
    features: [
      "Para veterinários",
      "Painel de pacientes",
      "Acompanhamento remoto",
      "Alertas automáticos",
      "Relatórios mensais",
    ],
  },
} as const;

export const ONBOARDING_STEPS = [
  {
    title: "Seu pet fala. O cocô traduz.",
    description: "Descubra o que a saúde do seu pet está dizendo através das fezes.",
  },
  {
    title: "Analise em segundos com Inteligência Artificial",
    description: "Nossa IA veterinária analisa cor, consistência e sinais de alerta.",
  },
  {
    title: "Previna doenças e monitore a saúde do seu pet",
    description: "Acompanhe a evolução e receba alertas quando necessário.",
  },
] as const;

export const ANALYSIS_INDICATORS = {
  color: [
    { value: "brown", label: "Marrom", status: "normal" },
    { value: "dark-brown", label: "Marrom escuro", status: "normal" },
    { value: "yellow", label: "Amarelo", status: "attention" },
    { value: "green", label: "Verde", status: "moderate" },
    { value: "red", label: "Vermelho", status: "high" },
    { value: "black", label: "Preto", status: "high" },
    { value: "white", label: "Branco/Cinza", status: "moderate" },
  ],
  consistency: [
    { value: "firm", label: "Firme", status: "normal" },
    { value: "soft", label: "Macio", status: "attention" },
    { value: "liquid", label: "Líquido", status: "high" },
    { value: "hard", label: "Duro", status: "moderate" },
  ],
} as const;

export const CAMERA_INSTRUCTIONS = [
  "Centralize as fezes na moldura",
  "Aproxime mais para melhor análise",
  "Melhore a iluminação",
  "Tire 2 a 3 fotos de ângulos diferentes",
] as const;

export const PROCESSING_STEPS = [
  "Analisando cor…",
  "Analisando consistência…",
  "Detectando anomalias…",
  "Comparando com base veterinária…",
] as const;
