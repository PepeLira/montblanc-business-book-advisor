"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between bg-[var(--background)]/95 px-4 shadow-md backdrop-blur md:hidden">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Home"
        >
          <Image
            src="/images/Montblanc-Logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="h-12 w-auto"
          />
        </Link>

        <button
          type="button"
          className="rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-secondary)] hover:shadow-[0_18px_35px_rgba(27,54,92,0.45)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          aria-label="Encargar Libro"
          onClick={() => {
            if (process.env.NODE_ENV !== "production") {
              console.info("[UI] Ready button clicked");
            }
          }}
        >
          {"Encargar Libro"}
        </button>
      </header>

      <Link
        href="/"
        className="fixed top-4 left-4 z-50 hidden items-center gap-2 md:flex"
        aria-label="Home"
      >
        <Image
          src="/images/Montblanc-Logo.png"
          alt="Logo"
          width={400/2}
          height={129/2}
        />
      </Link>


      <button
        type="button"
        className="fixed bottom-4 right-4 z-50 hidden rounded-full bg-[var(--brand-primary)] px-4 py-3 text-white shadow-[0_18px_45px_rgba(27,54,92,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-secondary)] hover:shadow-[0_28px_55px_rgba(27,54,92,0.5)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] md:inline-flex"
        aria-label="Encargar Libro"
        onClick={() => {
          if (process.env.NODE_ENV !== "production") {
            console.info("[UI] Ready button clicked");
          }
        }}
      >
        {"Encargar Libro"}
      </button>

      <main className="flex min-h-screen items-center justify-end bg-slate-100 pt-24 dark:bg-slate-950 md:pt-0">
        <div className="mx-auto w-full max-w-5xl">
          <ChatKitPanel
            theme={scheme}
            onWidgetAction={handleWidgetAction}
            onResponseEnd={handleResponseEnd}
            onThemeRequest={setScheme}
          />
        </div>
      </main>
    </>
  );
}
