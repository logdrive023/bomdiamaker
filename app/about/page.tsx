import { RestrictedSitesList } from "@/components/restricted-sites-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Upload, ImageIcon, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"

export default function AjudaPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-center text-3xl font-bold">Ajuda - Bom Dia Maker</h1>

      <div className="rounded-lg bg-slate-900 p-8 shadow-sm text-white">
        <h2 className="mb-6 text-2xl font-semibold text-white">Problemas com Carregamento de Imagens</h2>

        <p className="mb-6 leading-relaxed text-white">
          Ao usar o Bom Dia Maker, você pode encontrar dificuldades ao tentar usar imagens de certos sites. Isso
          acontece devido a restrições de segurança chamadas CORS (Cross-Origin Resource Sharing) que muitos sites
          implementam para proteger suas imagens.
        </p>

        <Alert className="bg-amber-50 border-amber-200 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-lg text-amber-800">
                <strong>Importante:</strong> Se você está tentando usar uma imagem do Pinterest, Instagram, Facebook ou
                outros sites de redes sociais, provavelmente não funcionará.
              </p>
            </div>
          </div>
        </Alert>

        <h3 className="mb-4 text-xl font-semibold text-white">Sites com Restrições Conhecidas</h3>

        <RestrictedSitesList />

        <h3 className="mb-4 mt-8 text-xl font-semibold text-white">Como Resolver Este Problema</h3>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="border-green-800 bg-slate-800">
            <CardContent className="pt-6">
              <h4 className="text-lg font-medium flex items-center mb-4 text-green-400">
                <Check className="h-5 w-5 mr-2 text-green-400" />
                Método Recomendado
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-900/50 p-2 rounded-full">
                    <Upload className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Faça download da imagem</p>
                    <p className="text-gray-300">Salve a imagem no seu celular ou computador primeiro</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-900/50 p-2 rounded-full">
                    <ImageIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Depois faça upload</p>
                    <p className="text-gray-300">Use a opção "Upload" no editor para enviar a imagem salva</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800">
            <CardContent className="pt-6">
              <h4 className="text-lg font-medium mb-4 text-white">Outras Opções</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="bg-blue-900/50 p-1 rounded-full">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white">Use nossos templates pré-definidos</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-blue-900/50 p-1 rounded-full">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white">Use sites como Unsplash ou Pexels</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-blue-900/50 p-1 rounded-full">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white">Tire uma foto com seu celular</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h3 className="mb-4 text-xl font-semibold text-white">Exemplo Visual</h3>

        <div className="border border-slate-700 rounded-lg p-4 mb-8 bg-slate-800">
          <p className="mb-4 text-center font-medium text-white">Como salvar uma imagem do Pinterest:</p>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="text-center">
              <div className="border border-slate-600 rounded p-2 mb-2">
                <p className="mb-1 text-white">1. Toque na imagem</p>
                <div className="bg-slate-700 h-24 flex items-center justify-center">
                  <span className="text-3xl">🖼️</span>
                </div>
              </div>
              <p className="text-sm text-gray-300">Abra a imagem</p>
            </div>
            <div className="text-2xl text-white">→</div>
            <div className="text-center">
              <div className="border border-slate-600 rounded p-2 mb-2">
                <p className="mb-1 text-white">2. Toque em ⋮</p>
                <div className="bg-slate-700 h-24 flex items-center justify-center">
                  <span className="text-3xl">⋮</span>
                </div>
              </div>
              <p className="text-sm text-gray-300">Menu de opções</p>
            </div>
            <div className="text-2xl text-white">→</div>
            <div className="text-center">
              <div className="border border-slate-600 rounded p-2 mb-2">
                <p className="mb-1 text-white">3. Salvar imagem</p>
                <div className="bg-slate-700 h-24 flex items-center justify-center">
                  <span className="text-3xl">💾</span>
                </div>
              </div>
              <p className="text-sm text-gray-300">Salve no dispositivo</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-lg py-6">
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para o início</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
