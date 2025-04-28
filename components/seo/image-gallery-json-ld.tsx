import Script from "next/script"
import { SiteConfig } from "@/config/site"

export function ImageGalleryJsonLd() {
  const galleryData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Galeria de Imagens de Bom Dia",
    description: "Coleção de imagens de bom dia para compartilhar com amigos e familiares",
    url: `${SiteConfig.url}/templates`,
    image: [
      `${SiteConfig.url}/templates/flower-blessing.png`,
      `${SiteConfig.url}/templates/sunrise-blessing.png`,
      `${SiteConfig.url}/templates/coffee-morning-joy.png`,
      `${SiteConfig.url}/templates/mountain-dawn.png`,
    ],
  }

  return (
    <Script
      id="image-gallery-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryData) }}
    />
  )
}
