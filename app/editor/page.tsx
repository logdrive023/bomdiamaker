"use client"
import { ImageEditor } from "@/components/image-editor"
import { EditorSidebar } from "@/components/editor-sidebar"
import { EditorProvider } from "@/components/editor-provider"
import { AdBanner } from "@/components/ad-banner"
import { useEffect } from "react"
import { Helmet } from "@/components/seo/helmet"

export default function EditorPage() {
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
    <EditorProvider>
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
    </EditorProvider>
  )
}
