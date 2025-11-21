import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "¿Qué puedes hacer?",
    prompt: "¿Qué puedes hacer?",
    icon: "circle-question",
  },
  {
    label: "Me gustaría leer sobre Libros de negocios y Liderazgo",
    prompt: "Me gustaría leer sobre Libros de negocios y Liderazgo",
    icon: "book-open",
  },
  {
    label: "Cuentame sobre el libro Superintelligence (2020), quién lo escribió y sus puntos clave",
    prompt: "Cuentame sobre el libro Superintelligence (2020), quién lo escribió y sus puntos clave",
    icon: "search",
  },
];

export const PLACEHOLDER_INPUT = "Pregúntame cualquier cosa...";

export const GREETING = "Hola 👋 ¿sobre qué te gustaría leer hoy?";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => {
  // Mark theme as used to avoid lint warning
  void theme;
  
  return {
    color: {
      grayscale: {
        hue: 220,
        tint: 6,
        shade: -4, // Always use light theme
      },
      accent: {
        primary: "#1b365c", // Always use light theme brand color
        level: 1,
      },
    },
    radius: "round",
    // Add other theme options here
    // chatkit.studio/playground to explore config options
  };
};
