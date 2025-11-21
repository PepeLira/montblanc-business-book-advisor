"use client"
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react"
import { ChevronDown, MessageCircle, BookOpen, Gift } from 'lucide-react'
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
          className="w-full flex items-center justify-between px-4 md:px-6 h-18 md:h-22 cursor-pointer"
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
            <ChevronDown
              className={cn(
                "w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 text-white",
                isExpanded && "rotate-180"
              )}
            />
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded ? "max-h-[66vh]" : "max-h-0"
          )}
        >
          <div className="px-4 md:px-6 py-8 h-[calc(66vh-7rem)] overflow-y-auto bg-[rgba(27,54,93,1)]">
            <div className="max-w-5xl mx-auto text-white">
              <div className="text-center mb-8">
                <h2 className="mb-4 leading-tight font-aller">
                  <span className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg tracking-[0.01em]">Montblanc</span>
                  <span className="font-bold text-3xl md:text-4xl text-white">{' te invita a encontrar tu próximo libro con '}</span>
                  <span className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg tracking-wide">IA</span>
                </h2>
                <p className="text-white/90 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
                  Porque queremos regalarte esa obra que conecte contigo, ya sea para inspirarte, aprender o simplemente disfrutar de una gran historia. En <strong> Montblanc Consulting </strong> estuvimos trabajando en un agente que te ayude a encontrarla.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white text-[#1B365D] rounded-full flex items-center justify-center mx-auto font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold mb-2 text-base">Cuéntanos tus intereses</h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Qué te gusta leer, qué temas te llaman la atención o qué autores te inspiran.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white text-[#1B365D] rounded-full flex items-center justify-center mx-auto font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold mb-2 text-base">Nosotros buscamos por ti</h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Seleccionamos un top de libros que encajen con tu estilo y lo que estás buscando.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white text-[#1B365D] rounded-full flex items-center justify-center mx-auto font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold mb-2 text-base">Elige tu favorito</h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Pregunta o compara cualquiera de los títulos y cuando estés listo encárgalo directamente.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-white/90 text-sm">
                {'Cuando estés listo, continúa con un pequeño formulario con el botón '}
                <span className="font-semibold">"Encargar libro"</span>
                {'.'}
              </p>
              <p className="text-center text-white/90 text-sm mb-6 mt-2">
                {'La información de esta conversación se manejan de forma privada, segura y exclusivamente para esta consulta.'}
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={() => setIsExpanded(false)}
                  className="bg-white text-[#1B365D] hover:bg-white/90 font-semibold px-8 py-3 rounded-full text-base shadow-lg transition-all hover:scale-105"
                >
                  Comenzar a buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
