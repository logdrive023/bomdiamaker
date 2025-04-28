"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, Download, Edit3, Sun } from "lucide-react"
import Link from "next/link"
import { AdBanner } from "@/components/ad-banner"
import { AdSection } from "@/components/ad-section"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const imageParam = searchParams.get("image") || ""
  const [imageUrl, setImageUrl] = useState("")
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [storageKey, setStorageKey] = useState<string | null>(null)
  const [storageType, setStorageType] = useState<"localStorage" | "sessionStorage" | null>(null)

  // Add this useEffect to handle temp images
  useEffect(() => {
    // Check if the image parameter is a temp filename
    if (imageParam.startsWith("temp") && typeof window !== "undefined") {
      const key = `temp_image_${imageParam}`
      console.log(`Looking for image data with key: ${key}`)

      // Try to get the actual data URL from localStorage
      let storedImageData = localStorage.getItem(key)
      let type = "localStorage"

      // If not in localStorage, try sessionStorage as fallback
      if (!storedImageData && sessionStorage) {
        console.log("Not found in localStorage, trying sessionStorage")
        storedImageData = sessionStorage.getItem(key)
        type = "sessionStorage"
      }

      if (storedImageData) {
        try {
          console.log(`Found image data in ${type}`)

          // Parse the JSON data
          const imageData = JSON.parse(storedImageData)

          // Set the image URL from the parsed data
          console.log("Image data parsed successfully")
          setImageUrl(imageData.image)

          // Save the storage key and type for later cleanup
          // We'll remove it only after the image is successfully loaded
          setStorageKey(key)
          setStorageType(type as "localStorage" | "sessionStorage")
        } catch (error) {
          console.error("Error parsing stored image data:", error)
          setImageUrl("/floral-sunrise-glow.png")
          setImageError(true)
        }
      } else {
        // If not found, use a fallback
        console.error("No stored image data found in any storage")
        setImageUrl("/floral-sunrise-glow.png")
        setImageError(true)
      }
    } else {
      // Regular image URL
      setImageUrl(imageParam)
    }
  }, [imageParam])

  // Improved loadImageToCanvas function with better debugging and error handling
  const loadImageToCanvas = () => {
    if (!imageUrl) {
      console.error("URL da imagem não fornecida")
      setImageError(true)
      return
    }

    console.log("Loading image to canvas:", imageUrl.substring(0, 50) + "...")

    // Create image element
    const img = new Image()
    imgRef.current = img

    // Error handler
    img.onerror = (e) => {
      console.error("Erro ao carregar imagem:", e)
      setImageError(true)

      // Display the image directly as fallback
      const container = document.getElementById("image-preview-container")
      if (container) {
        // Clear container
        container.innerHTML = ""

        // Create an img element instead of using canvas
        const directImg = document.createElement("img")
        directImg.src = imageUrl
        directImg.style.maxWidth = "100%"
        directImg.style.height = "auto"
        directImg.style.borderRadius = "0.5rem"
        directImg.alt = "Imagem de bom dia gerada"

        container.appendChild(directImg)
      }
    }

    // Success handler
    img.onload = () => {
      console.log("Image loaded successfully, dimensions:", img.width, "x", img.height)

      const canvas = canvasRef.current
      if (!canvas) {
        console.error("Canvas não encontrado")
        setImageError(true)
        return
      }

      // Set canvas dimensions to match the image
      canvas.width = img.width
      canvas.height = img.height
      console.log("Canvas dimensions set to:", canvas.width, "x", canvas.height)

      // Get the 2D context
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        console.error("Contexto 2D não disponível")
        setImageError(true)
        return
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw image
      ctx.drawImage(img, 0, 0)
      console.log("Image drawn to canvas")

      setImageLoaded(true)
    }

    // Set the image source
    // No need to modify the URL for base64 data
    img.src = imageUrl
  }

  // Update the useEffect that calls loadImageToCanvas to depend on imageUrl instead of imageParam
  useEffect(() => {
    if (imageUrl) {
      loadImageToCanvas()
    }

    // Cleanup
    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null
        imgRef.current.onerror = null
        imgRef.current = null
      }
    }
  }, [imageUrl])

  // Add a new useEffect to handle cleanup after successful image loading
  useEffect(() => {
    // Only clean up storage after the image has been successfully loaded
    if (imageLoaded && storageKey && storageType) {
      console.log(`Image loaded successfully, now safe to clean up ${storageType} key: ${storageKey}`)

      // Wait a bit to ensure everything is complete before cleaning up
      const timer = setTimeout(() => {
        if (storageType === "localStorage") {
          localStorage.removeItem(storageKey)
        } else {
          sessionStorage.removeItem(storageKey)
        }
        console.log(`Removed image data from ${storageType}`)
      }, 2000) // 2 second delay to be safe

      return () => clearTimeout(timer)
    }
  }, [imageLoaded, storageKey, storageType])

  // Função para compartilhar a imagem
  const shareImage = async () => {
    try {
      if (navigator.share && canvasRef.current) {
        // Converter canvas para blob
        const blob = await new Promise<Blob>((resolve) => {
          canvasRef.current?.toBlob((blob) => {
            if (blob) resolve(blob)
            else throw new Error("Falha ao converter canvas para blob")
          }, "image/png")
        })

        // Criar arquivo para compartilhamento
        const file = new File([blob], "bom-dia.png", { type: "image/png" })

        // Compartilhar
        await navigator.share({
          title: "Mensagem de Bom Dia",
          text: "Criei esta mensagem de bom dia para você!",
          files: [file],
        })
      } else {
        // Fallback para navegadores que não suportam Web Share API
        alert("Seu navegador não suporta compartilhamento direto. Faça o download da imagem e compartilhe manualmente.")
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error)
      alert("Não foi possível compartilhar a imagem. Tente fazer o download.")
    }
  }

  // Função para baixar a imagem
  const downloadImage = () => {
    if (!canvasRef.current) return

    try {
      // Criar link de download
      const link = document.createElement("a")
      link.download = "bom-dia.png"
      link.href = canvasRef.current.toDataURL("image/png")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Erro ao baixar imagem:", error)
      alert("Não foi possível baixar a imagem. Tente novamente mais tarde.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Sua imagem foi criada com sucesso! <Sun className="inline-block h-8 w-8 text-yellow-500" />
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Agora você pode compartilhar sua mensagem de bom dia com quem quiser!
      </p>

      {/* Anúncio antes da imagem (apenas em desktop) */}
      <div className="mb-8 hidden md:block">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div>
          {/* Container para a imagem */}
          <Card className="mb-6 overflow-hidden p-4" id="image-preview-container">
            {!imageError ? (
              <canvas
                ref={canvasRef}
                className="mx-auto max-w-full rounded border border-border"
                style={{ display: "block" }}
                aria-label="Prévia da imagem de bom dia gerada"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center rounded border border-border bg-muted p-4 text-center">
                <p>
                  Não foi possível carregar a imagem.
                  <Link href="/editor" className="ml-1 text-blue-600 hover:underline">
                    Voltar ao editor
                  </Link>
                </p>
              </div>
            )}
          </Card>

          {/* Botões de ação */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={shareImage}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              size="lg"
              disabled={!imageLoaded && !imageError}
            >
              <Share2 className="h-5 w-5" />
              Compartilhar
            </Button>
            <Button
              onClick={downloadImage}
              className="flex items-center gap-2"
              size="lg"
              disabled={!imageLoaded && !imageError}
            >
              <Download className="h-5 w-5" />
              Baixar
            </Button>
            <Link href={`/editor?returnToEdit=true`}>
              <Button variant="outline" className="flex items-center gap-2" size="lg">
                <Edit3 className="h-5 w-5" />
                Editar
              </Button>
            </Link>
          </div>

          {/* Anúncio após a imagem (mobile) */}
          <div className="mb-8 md:hidden">
            <AdBanner slot="1234567891" format="rectangle" />
          </div>
        </div>

        {/* Coluna lateral com anúncios */}
        <div className="space-y-6">
          <AdSection title="Mais Opções" slot="1234567892" format="rectangle" />
          <AdSection title="Recomendados" slot="1234567893" format="rectangle" />
        </div>
      </div>

      {/* Anúncio no final da página */}
      <div className="mt-8">
        <AdBanner slot="1234567894" format="auto" responsive={true} />
      </div>

      {/* Link para voltar */}
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
