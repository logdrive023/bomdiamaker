import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import type { Metadata } from "next"
import { SiteConfig } from "@/config/site"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Sobre o Bom Dia Maker - Nossa História e Missão",
  description:
    "Conheça a história do Bom Dia Maker, nossa missão de espalhar positividade através de mensagens personalizadas e como entrar em contato conosco.",
  alternates: {
    canonical: `${SiteConfig.url}/about`,
  },
}

export default function AboutPage() {
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
            name: "Sobre",
            item: `${SiteConfig.url}/about`,
          },
        ]}
      />

      <div className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-center text-3xl font-bold">Sobre o Bom Dia Maker</h1>

        <div className="rounded-lg bg-slate-50 p-8 shadow-sm dark:bg-slate-900">
          <h2 className="mb-4 text-2xl font-semibold">Nossa História</h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            O Bom Dia Maker nasceu da ideia de facilitar a criação e compartilhamento de mensagens positivas.
            Acreditamos que uma simples mensagem de bom dia pode transformar o dia de alguém, trazendo um sorriso e
            energia positiva logo pela manhã.
          </p>

          <h2 className="mb-4 text-2xl font-semibold">Nossa Missão</h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            Queremos espalhar positividade e carinho através de mensagens personalizadas. Nossa ferramenta foi
            desenvolvida para ser simples e intuitiva, permitindo que qualquer pessoa, independente de habilidades
            técnicas, possa criar imagens bonitas para compartilhar com quem ama.
          </p>

          {/* Anúncio no meio do conteúdo */}
          <div className="my-8">
            <AdBanner slot="1234567895" format="rectangle" />
          </div>

          <h2 className="mb-4 text-2xl font-semibold">Entre em Contato</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </Button>
          </div>
        </div>

        {/* Anúncio no final da página */}
        <div className="mt-8">
          <AdBanner slot="1234567896" format="auto" responsive={true} />
        </div>
      </div>
    </>
  )
}
