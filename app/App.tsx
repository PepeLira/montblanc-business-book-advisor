"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import CollapsibleHeader from "@/components/CollapsibleHeader";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  // Force light theme only
  const { setScheme } = useColorScheme();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CollapsibleHeader />
      
      {/* Main area with mountain logo watermark */}
      <main className="relative pt-16 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="fixed bottom-8 right-8 opacity-20 pointer-events-none z-0">
          <img 
            src="/images/montblanc-logo-icon.png"
            alt="Montblanc Logo"
            className="w-32 h-32 md:w-32 md:h-32 object-contain"
          />
        </div>

        {/* ChatKit Panel centered */}
        <div className="w-full md:w-4/7 relative z-10">
          <ChatKitPanel
            theme="light"
            onWidgetAction={handleWidgetAction}
            onResponseEnd={handleResponseEnd}
            onThemeRequest={setScheme}
          />
        </div>
      </main>
    </div>
  );
}
