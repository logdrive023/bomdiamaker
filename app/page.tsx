import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExampleGallery } from "@/components/example-gallery"
import { AdBanner } from "@/components/ad-banner"
import { AdSection } from "@/components/ad-section"
import type { Metadata } from "next"
import { SiteConfig } from "@/config/site"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld"
import { ImageGalleryJsonLd } from "@/components/seo/image-gallery-json-ld"

export const metadata: Metadata = {
  title: "Crie imagens de bom dia para WhatsApp em segundos",
  description:
    "Personalize e compartilhe mensagens de bom dia com imagens bonitas para WhatsApp, Facebook e outras redes sociais. Ferramenta gratuita e fácil de usar.",
  alternates: {
    canonical: SiteConfig.url,
  },
}

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            position: 1,
            name: "Início",
            item: SiteConfig.url,
          },
        ]}
      />
      <ImageGalleryJsonLd />

      <div className="container mx-auto px-4 py-12">
        <section className="flex flex-col items-center justify-center space-y-6 py-12 text-center md:py-24">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Crie imagens incríveis de   <strong style={{ color: "#eab308" }}>bom dia</strong> &nbsp;em segundos!
        </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Personalize, compartilhe e espalhe mensagens positivas para seus amigos e familiares no WhatsApp e outras
            redes sociais.
          </p>
          <Link href="/editor">
            <Button size="lg" className="mt-4 bg-yellow-500 text-lg hover:bg-yellow-600">
              Começar agora
            </Button>
          </Link>
        </section>

        {/* Anúncio após a seção principal */}
        <div className="my-8 max-w-3xl mx-auto">
          <AdBanner slot="1234567890" format="horizontal" className="hidden md:block" />
          <AdBanner slot="1234567891" format="rectangle" className="md:hidden" />
        </div>

        <section className="py-12" id="exemplos">
          <h2 className="mb-8 text-center text-3xl font-bold">Exemplos de imagens</h2>
          <ExampleGallery />
        </section>

        {/* Seção de anúncios */}
        <AdSection />

        <section className="mx-auto max-w-3xl py-12 text-center" id="como-funciona">
          <h2 className="mb-6 text-2xl font-bold">Como funciona?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-medium">Escolha o fundo</h3>
              <p className="text-muted-foreground">Selecione entre nossa galeria ou faça upload do seu próprio fundo</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-medium">Escreva sua mensagem</h3>
              <p className="text-muted-foreground">Personalize o texto, fonte, cor e tamanho</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-medium">Compartilhe ❤️</h3>
              <p className="text-muted-foreground">Baixe a imagem ou compartilhe diretamente no WhatsApp</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl py-12 text-center" id="beneficios">
          <h2 className="mb-6 text-2xl font-bold">Por que usar o Bom Dia Maker?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-xl font-medium">Rápido e Fácil</h3>
              <p>Crie imagens bonitas em segundos, sem necessidade de conhecimentos técnicos</p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-xl font-medium">Totalmente Gratuito</h3>
              <p>Sem custos escondidos ou necessidade de cadastro para usar</p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-xl font-medium">Compartilhamento Direto</h3>
              <p>Envie suas criações diretamente para o WhatsApp com um clique</p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-xl font-medium">Diversos Templates</h3>
              <p>Escolha entre dezenas de modelos prontos para personalizar</p>
            </div>
          </div>
        </section>

        {/* Anúncio no final da página */}
        <div className="my-8 max-w-3xl mx-auto">
          <AdBanner slot="1234567892" format="auto" responsive={true} />
        </div>
      </div>
    </>
  )
}
