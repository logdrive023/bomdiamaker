import type { Metadata } from "next"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { AdBanner } from "@/components/ad-banner"

export const metadata: Metadata = {
  title: "Política de Privacidade | Bom Dia Maker",
  description: "Política de privacidade e termos de uso do Bom Dia Maker",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">Política de Privacidade</h1>

      <Card className="mb-8 p-6">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2 className="text-xl font-semibold">Introdução</h2>
          <p>
            Bem-vindo à Política de Privacidade do Bom Dia Maker. Esta política explica como funciona nosso site em
            relação à sua privacidade.
          </p>

          <h2 className="mt-6 text-xl font-semibold">Não Armazenamos Seus Dados</h2>
          <p>
            <strong>Importante:</strong> O Bom Dia Maker <strong>não armazena</strong> nenhuma informação pessoal dos
            usuários. Nosso site funciona de forma temporária - você entra, cria sua imagem, e se atualizar a página
            (F5), tudo volta ao estado inicial.
          </p>
          <p>
            Não mantemos histórico de imagens criadas, textos inseridos ou quaisquer outras informações que você forneça
            durante o uso do site.
          </p>

          <h2 className="mt-6 text-xl font-semibold">Dados Temporários</h2>
          <p>
            Durante sua sessão no site, alguns dados temporários podem ser armazenados localmente em seu navegador (como
            a imagem que você está criando) para permitir o funcionamento do editor. Estes dados são temporários e são
            apagados quando você fecha a página ou atualiza o navegador.
          </p>

          <h2 className="mt-6 text-xl font-semibold">Cookies</h2>
          <p>
            Utilizamos apenas cookies essenciais para o funcionamento básico do site. Estes cookies não armazenam
            informações pessoais e são excluídos quando você fecha o navegador.
          </p>

          <h2 className="mt-6 text-xl font-semibold">Anúncios</h2>
          <p>
            Nosso site exibe anúncios fornecidos pelo Google AdSense. O Google AdSense pode usar cookies para exibir
            anúncios relevantes. Importante ressaltar que:
          </p>
          <ul>
            <li>Não compartilhamos seus dados com o Google, pois não coletamos dados</li>
            <li>
              O Google pode coletar informações sobre sua navegação para exibir anúncios personalizados, conforme a
              política de privacidade deles
            </li>
            <li>
              Você pode optar por não participar da publicidade personalizada visitando as{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                configurações de anúncios do Google
              </a>
            </li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">Imagens Geradas</h2>
          <p>
            As imagens que você cria no Bom Dia Maker são processadas apenas no seu navegador. Não armazenamos cópias
            dessas imagens em nossos servidores. Quando você compartilha uma imagem, ela é enviada diretamente do seu
            dispositivo para o destinatário, sem passar por nossos servidores.
          </p>

          <h2 className="mt-6 text-xl font-semibold">Análise de Uso</h2>
          <p>
            Podemos utilizar ferramentas de análise como o Google Analytics para entender como o site é utilizado de
            forma agregada e anônima. Estas ferramentas não identificam usuários individuais e os dados são utilizados
            apenas para melhorar o serviço.
          </p>

          <h2 className="mt-6 text-xl font-semibold">Segurança</h2>
          <p>
            Como não armazenamos seus dados, não há risco de vazamento de informações pessoais de nossos servidores.
            Toda a interação com o site acontece localmente no seu navegador.
          </p>

          <h2 className="mt-6 text-xl font-semibold">Alterações nesta Política</h2>
          <p>
            Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer
            alterações publicando a nova Política de Privacidade nesta página.
          </p>

          {/*<h2 className="mt-6 text-xl font-semibold">Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo e-mail:
            contato@bomdiaker.com.br
          </p>*/}

          <p className="mt-6 text-sm text-gray-500">Última Atualização: 28 de Abril de 2025</p>
        </div>
      </Card>

      {/* Anúncio após o conteúdo */}
      <div className="my-8">
        <AdBanner slot="1234567890" format="rectangle" />
      </div>

      <div className="text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
