"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface AdBannerProps {
  slot: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  responsive?: boolean
  className?: string
}

export function AdBanner({ slot, format = "auto", responsive = true, className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adInitialized, setAdInitialized] = useState(false)
  const uniqueId = `ad-${slot}-${format}`

  useEffect(() => {
    // Apenas execute no lado do cliente
    if (typeof window === "undefined") return

    // Referência ao elemento atual
    const currentAdElement = adRef.current
    if (!currentAdElement) return

    // Verificar se este anúncio já foi inicializado
    if (adInitialized || currentAdElement.getAttribute("data-ad-initialized") === "true") {
      console.log(`Anúncio ${uniqueId} já inicializado, pulando`)
      return
    }

    // Marcar este anúncio como inicializado
    currentAdElement.setAttribute("data-ad-initialized", "true")
    setAdInitialized(true)

    // O AdHelper cuidará da inicialização real do anúncio
    console.log(`Anúncio ${uniqueId} preparado para inicialização`)

    // Cleanup function
    return () => {
      // Nada a fazer aqui, pois o AdHelper gerencia a inicialização
    }
  }, [uniqueId, adInitialized])

  // Determine ad size based on format
  let adStyle = {}
  let adClass = "block mx-auto text-center "

  switch (format) {
    case "rectangle":
      adStyle = { minHeight: "250px", minWidth: "300px" }
      adClass += "adsbygoogle-rectangle"
      break
    case "horizontal":
      adStyle = { minHeight: "90px", minWidth: "728px" }
      adClass += "adsbygoogle-horizontal"
      break
    case "vertical":
      adStyle = { minHeight: "600px", minWidth: "160px" }
      adClass += "adsbygoogle-vertical"
      break
    default:
      adStyle = responsive ? {} : { minHeight: "100px" }
      adClass += "adsbygoogle"
  }

  return (
    <Card className={`overflow-hidden p-0 ${className}`}>
      <div className="bg-muted/30 p-2 text-center text-sm font-medium text-muted-foreground">Publicidade</div>
      <div
        ref={adRef}
        className={adClass}
        style={adStyle}
        id={uniqueId}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Substitua pelo seu ID de cliente AdSense
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></div>
    </Card>
  )
}
