import { TemplateGallery } from "@/components/template-gallery"
import { AdBanner } from "@/components/ad-banner"
import type { Metadata } from "next"
import { SiteConfig } from "@/config/site"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Templates de Bom Dia - Escolha entre dezenas de modelos prontos",
  description:
    "Explore nossa galeria de templates de bom dia para personalizar e compartilhar. Modelos para todas as ocasiões: religiosos, com café, natureza e muito mais.",
  alternates: {
    canonical: `${SiteConfig.url}/templates`,
  },
}

export default function TemplatesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            position: 1,
            name: "Início",
            item: SiteConfig.url,
          },
          {
            position: 2,
            name: "Templates",
            item: `${SiteConfig.url}/templates`,
          },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-center text-3xl font-bold">Galeria de Templates</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Escolha um template pronto e personalize com sua mensagem
        </p>

        {/* Anúncio antes da galeria */}
        <div className="my-8 max-w-3xl mx-auto">
          <AdBanner slot="1234567893" format="rectangle" />
        </div>

        <TemplateGallery />

        {/* Anúncio após a galeria */}
        <div className="my-8 max-w-3xl mx-auto">
          <AdBanner slot="1234567894" format="auto" responsive={true} />
        </div>
      </div>
    </>
  )
}
