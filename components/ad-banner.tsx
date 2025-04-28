"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface AdBannerProps {
  slot: string;        // Slot do anúncio (obrigatório)
  format?: "auto" | "rectangle" | "horizontal" | "vertical"; // Formato do anúncio
  responsive?: boolean;  // Para tornar o banner responsivo
  className?: string;  // Classe para personalização
}

export function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar se o código de anúncios está presente
    if (typeof window === "undefined") return;

    try {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (error) {
      console.error("Erro ao carregar o anúncio:", error);
    }
  }, []);

  // Definir estilo do anúncio com base no formato
  let adStyle: React.CSSProperties = {};
  let adClass = "adsbygoogle block mx-auto";

  switch (format) {
    case "rectangle":
      adStyle = { minHeight: "250px", minWidth: "300px" };
      adClass += " adsbygoogle-rectangle";
      break;
    case "horizontal":
      adStyle = { minHeight: "90px", minWidth: "728px" };
      adClass += " adsbygoogle-horizontal";
      break;
    case "vertical":
      adStyle = { minHeight: "600px", minWidth: "160px" };
      adClass += " adsbygoogle-vertical";
      break;
    default:
      adStyle = responsive ? {} : { minHeight: "100px" };
      adClass += " adsbygoogle";
  }

  return (
    <Card className={`overflow-hidden p-0 ${className}`}>
      <div className="bg-muted/30 p-2 text-center text-sm font-medium text-muted-foreground">
        Publicidade
      </div>
      <div
        ref={adRef}
        className={adClass}
        style={adStyle}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Substitua pelo seu ID de cliente AdSense
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
        aria-label="Anúncio publicitário"
      ></div>
    </Card>
  );
}
