"use client"
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react"
import { ChevronDown, MessageCircle, BookOpen, Gift, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LOGO_SIZES = {
  horizontal: {
    collapsed: "h-[80px] sm:h-[70px] md:h-[80px]",
    expanded: "h-[80px] sm:h-[90px] md:h-[140px]"
  },
  square: {
    size: "h-[80px] sm:h-[90px] md:h-[100px]"
  },
  container: {
    maxWidth: "400px",
    maxHeight: "140px",
    minWidth: "170px"
  }
}

const FORM_URL = process.env.NEXT_PUBLIC_FORM_URL || "#";

export default function CollapsibleHeader() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showSquareLogo, setShowSquareLogo] = useState(false)
  const [isTransitioningBack, setIsTransitioningBack] = useState(false)

  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (e: MouseEvent) => {
      const header = document.getElementById('collapsible-header')
      if (header && !header.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpanded])

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setShowSquareLogo(true), 300)
      return () => clearTimeout(timer)
    } else {
      if (showSquareLogo) {
        setIsTransitioningBack(true)
        const timer = setTimeout(() => {
          setShowSquareLogo(false)
          setIsTransitioningBack(false)
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [isExpanded, showSquareLogo])

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (FORM_URL && FORM_URL !== "#") {
      window.open(FORM_URL, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      {isExpanded && (
        <div className="fixed inset-0 z-40 bg-black/20" />
      )}
      
      <header id="collapsible-header" className="fixed top-0 left-0 right-0 z-50 shadow-md" style={{ backgroundColor: '#1B365D' }}>
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 md:px-6 h-18 md:h-22 cursor-pointer relative"
        >
          <div 
            className={cn(
              "flex items-center relative",
              isExpanded && "mt-3 sm:mt-4 md:mt-6"
            )}
            style={{ 
              maxWidth: LOGO_SIZES.container.maxWidth, 
              maxHeight: LOGO_SIZES.container.maxHeight, 
              minWidth: LOGO_SIZES.container.minWidth 
            }}
          >
            {!showSquareLogo ? (
              <img 
                key="horizontal-logo"
                src="/images/montblanc-logo-blanco_crop.png"
                alt="Montblanc Consulting"
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out object-contain mb-4 w-auto max-w-full",
                  isExpanded 
                    ? `${LOGO_SIZES.horizontal.expanded} animate-fade-out`
                    : isTransitioningBack
                    ? `${LOGO_SIZES.horizontal.collapsed} animate-fade-in`
                    : LOGO_SIZES.horizontal.collapsed
                )}
              />
            ) : (
              <img 
                key="square-logo"
                src="/images/montblanc-logo-blanco-cuadrado.png"
                alt="Montblanc Consulting"
                className={cn(
                  `${LOGO_SIZES.square.size} w-auto absolute left-1/2 -translate-x-1/2 object-contain`,
                  isTransitioningBack ? "animate-fade-out" : "animate-fade-in"
                )}
              />
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button 
              variant="default" 
              className="text-sm sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2 h-auto bg-white text-[#1B365D] hover:bg-white/90 font-bold"
              onClick={handleFormClick}
            >
              Encargar Libro
            </Button>
          </div>

          {/* Arrow indicator at bottom center of collapsed navbar */}
          {!isExpanded && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
              <ChevronDown className="w-5 h-5 text-white/70 animate-bounce" />
            </div>
          )}
        </div>

        <div
          onClick={() => isExpanded && setIsExpanded(false)}
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out flex flex-col cursor-pointer",
            isExpanded ? "h-[calc(100vh-5rem)]" : "h-0"
          )}
        >
          <div className="px-4 md:px-6 py-10 flex-1 overflow-y-auto bg-[rgba(27,54,93,1)]">
            <div className="max-w-5xl mx-auto text-white" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-6">
                <h2 className="mb-5 leading-tight font-aller">
                  <span className="font-bold text-4xl md:text-5xl text-white drop-shadow-lg tracking-[0.01em]">Montblanc</span>
                  <span className="font-bold text-4xl md:text-5xl text-white">{' te invita a encontrar tu próximo libro con '}</span>
                  <span className="font-bold text-4xl md:text-5xl text-white drop-shadow-lg tracking-wide">IA</span>
                </h2>
                <p className="text-white/90 leading-relaxed max-w-3xl mx-auto text-lg md:text-xl">
                  Porque queremos regalarte esa obra que conecte contigo, ya sea para inspirarte, aprender o simplemente disfrutar de una gran historia. En <strong> Montblanc Consulting </strong> estuvimos trabajando en un agente que te ayude a encontrarla.
                </p>
              </div>

              <div className="flex flex-col gap-5 mb-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold mb-2 text-base md:text-lg">Cuéntanos tus intereses</h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      Qué te gusta leer, qué temas te llaman la atención o qué autores te inspiran.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold mb-2 text-base md:text-lg">Nosotros buscamos por ti</h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      Seleccionamos un top de libros que encajen con tu estilo y lo que estás buscando.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold mb-2 text-base md:text-lg">Elige tu favorito</h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      Pregunta o compara cualquiera de los títulos y cuando estés listo encárgalo directamente.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-white/90 text-base md:text-lg">
                {'Cuando estés listo, continúa con un pequeño formulario con el botón '}
                <span className="font-semibold">"Encargar libro"</span>
                {'.'}
              </p>
              <p className="text-center text-white/90 text-base md:text-lg mb-4 mt-2">
                {'La información de esta conversación se manejan de forma privada, segura y exclusivamente para esta consulta.'}
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={() => setIsExpanded(false)}
                  className="bg-white text-[#1B365D] hover:bg-white/90 font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105"
                >
                  Comenzar a buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Collapse indicator at the bottom center */}
          <div className="flex justify-center pb-6 pt-4">
            <ChevronUp className="w-6 h-6 text-white animate-bounce" />
          </div>
        </div>
      </header>
    </>
  )
}
