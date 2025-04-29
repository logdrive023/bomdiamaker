"use client"
import { ImageEditor } from "@/components/image-editor"
import { EditorSidebar } from "@/components/editor-sidebar"
import { EditorProvider } from "@/components/editor-provider"
import { AdBanner } from "@/components/ad-banner"
import { useEffect, Suspense } from "react"
import { Helmet } from "@/components/seo/helmet"
import { Loader2 } from "lucide-react"

// Componente de loading para o Suspense
function EditorLoading() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mb-4" />
      <h2 className="text-xl font-medium">Carregando o editor...</h2>
      <p className="text-muted-foreground mt-2">Preparando as ferramentas para sua criação.</p>
    </div>
  )
}

// Componente principal do editor
function EditorContent() {
  // Add keyboard shortcuts for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S to save (prevent browser save dialog)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        // The auto-save feature in EditorProvider handles saving
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <Helmet
        title="Editor de Imagens de Bom Dia - Crie sua mensagem personalizada"
        description="Use nosso editor para criar mensagens de bom dia personalizadas. Adicione texto, escolha fontes e cores, e compartilhe com quem você ama."
        canonical="/editor"
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold" id="editor-title">
          Editor de Imagem
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Crie sua mensagem de bom dia personalizada. Clique na imagem para posicionar o texto.
        </p>

        {/* Anúncio antes do editor (apenas em desktop) */}
        <div className="mb-8 hidden md:block">
          <AdBanner slot="1234567899" format="horizontal" />
        </div>

        <div
          className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_400px]"
          aria-labelledby="editor-title"
          role="main"
        >
          <ImageEditor />
          <EditorSidebar />
        </div>

        {/* Anúncio após o editor */}
        <div className="mt-8">
          <AdBanner slot="1234567900" format="auto" responsive={true} />
        </div>
      </div>
    </>
  )
}

// Componente principal que envolve o conteúdo com Suspense
export default function EditorPage() {
  return (
    <EditorProvider>
      <Suspense fallback={<EditorLoading />}>
        <EditorContent />
      </Suspense>
    </EditorProvider>
  )
}
