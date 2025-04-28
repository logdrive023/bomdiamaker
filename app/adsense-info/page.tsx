import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AdsenseInfoPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-center text-3xl font-bold">Sobre Nossos Anúncios</h1>

      <div className="rounded-lg bg-slate-50 p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">Por que exibimos anúncios?</h2>
        <p className="mb-6 leading-relaxed text-muted-foreground text-lg">
          O Bom Dia Maker é um serviço gratuito que oferecemos para ajudar você a criar e compartilhar mensagens
          positivas com seus amigos e familiares. Para manter nosso site funcionando e continuar oferecendo este serviço
          sem cobrar dos usuários, exibimos anúncios do Google AdSense.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Como funcionam os anúncios?</h2>
        <p className="mb-6 leading-relaxed text-muted-foreground text-lg">
          Os anúncios que você vê são selecionados pelo Google com base em vários fatores. Todos os anúncios são
          claramente marcados com a palavra "Publicidade" para que você possa identificá-los facilmente.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Sua privacidade</h2>
        <p className="mb-6 leading-relaxed text-muted-foreground text-lg">
          Respeitamos sua privacidade. O Google pode usar cookies para exibir anúncios mais relevantes para você. Você
          pode ajustar suas preferências de anúncios a qualquer momento nas configurações do Google.
        </p>

        {/*
        <h2 className="mb-4 text-2xl font-semibold">Dúvidas ou problemas?</h2>
        <p className="mb-6 leading-relaxed text-muted-foreground text-lg">
          Se você tiver alguma dúvida sobre os anúncios exibidos ou encontrar algum anúncio inadequado, entre em contato
          conosco através da página "Sobre". Estamos sempre à disposição para ajudar.
        </p> */}

        <div className="mt-8 text-center">
          <Link href="/">
            <Button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-lg">
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para o início</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
