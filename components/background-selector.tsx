"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useEditor } from "./editor-provider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, AlertTriangle, HelpCircle, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"

// Sample backgrounds
const backgrounds = [
  {
    id: 1,
    url: "/floral-sunrise-glow.png",
    alt: "Nascer do sol com flores",
  },
  {
    id: 2,
    url: "/coastal-dawn-greeting.png",
    alt: "Praia ao amanhecer",
  },
  {
    id: 3,
    url: "/sunlit-peaks.png",
    alt: "Montanhas com sol",
  },
  {
    id: 4,
    url: "/good-morning-coffee.png",
    alt: "Café da manhã",
  },
  {
    id: 5,
    url: "/sunlit-garden-bloom.png",
    alt: "Jardim florido",
  },
  {
    id: 6,
    url: "/blue-sky-morning.png",
    alt: "Céu azul com nuvens",
  },
  {
    id: 7,
    url: "/templates/sunrise-blessing.png",
    alt: "Nascer do sol abençoado",
  },
  {
    id: 8,
    url: "/templates/coffee-morning-joy.png",
    alt: "Café da manhã com alegria",
  },
  {
    id: 9,
    url: "/templates/flower-blessing.png",
    alt: "Flores com bênçãos",
  },
  {
    id: 10,
    url: "/templates/bird-morning-song.png",
    alt: "Pássaro cantando pela manhã",
  },
  {
    id: 11,
    url: "/templates/beach-morning.png",
    alt: "Praia pela manhã",
  },
  {
    id: 12,
    url: "/templates/mountain-dawn.png",
    alt: "Montanhas ao amanhecer",
  },
  {
    id: 13,
    url: "/templates/garden-morning.png",
    alt: "Jardim pela manhã",
  },
  {
    id: 14,
    url: "/templates/sunflower-morning.png",
    alt: "Girassol pela manhã",
  },
  {
    id: 15,
    url: "/templates/bible-morning.jpg",
    alt: "Bíblia pela manhã",
  },
  {
    id: 16,
    url: "/templates/butterfly-morning.png",
    alt: "Borboleta pela manhã",
  },
  {
    id: 17,
    url: "/templates/rainbow-blessing.png",
    alt: "Arco-íris abençoado",
  },
  {
    id: 18,
    url: "/templates/tea-meditation.png",
    alt: "Chá e meditação",
  },
  {
    id: 19,
    url: "/templates/gratitude-morning.png",
    alt: "Gratidão pela manhã",
  },
  {
    id: 20,
    url: "/templates/window-morning.png",
    alt: "Janela pela manhã",
  },
]

// Lista de sites com restrições conhecidas
const restrictedSites = [
  { name: "Pinterest", icon: "🖼️" },
  { name: "Instagram", icon: "📷" },
  { name: "Facebook", icon: "👥" },
  { name: "Twitter/X", icon: "🐦" },
  { name: "Flickr", icon: "📸" },
  { name: "DeviantArt", icon: "🎨" },
  { name: "Tumblr", icon: "📝" },
]

export function BackgroundSelector() {
  const { setBackgroundUrl } = useEditor()
  const [customUrl, setCustomUrl] = useState("")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  // Check if URL is from an external domain that might have CORS restrictions
  const isExternalUrl = (url: string): boolean => {
    if (!url) return false
    try {
      // Check if it's a relative URL
      if (url.startsWith("/")) return false

      const urlObj = new URL(url)
      // Check if it's from known problematic domains
      const restrictedDomains = [
        "pinterest",
        "instagram",
        "facebook",
        "twitter",
        "x.com",
        "flickr",
        "deviantart",
        "tumblr",
      ]
      return restrictedDomains.some((domain) => urlObj.hostname.includes(domain))
    } catch (e) {
      return false
    }
  }

  const handleSelectBackground = (url: string) => {
    setBackgroundUrl(url)
    setError("")
  }

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customUrl) {
      setError("Por favor, insira uma URL válida")
      return
    }

    // Check if URL is valid
    try {
      new URL(customUrl)

      // Check if URL is from a restricted domain
      if (isExternalUrl(customUrl)) {
        setError(
          "URLs de sites como Pinterest, Instagram e outros podem não funcionar devido a restrições de segurança. Por favor, tente outra imagem ou faça upload do arquivo.",
        )
        return
      }

      setBackgroundUrl(customUrl)
      setError("")
    } catch (err) {
      setError("URL inválida. Por favor, insira uma URL completa (começando com http:// ou https://)")
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is a JPG or PNG image
    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!validTypes.includes(file.type)) {
      setError("Por favor, selecione apenas arquivos JPG ou PNG")
      e.target.value = "" // Reset the input
      return
    }

    try {
      // Create a FileReader to read the file as a data URL
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          // Use the data URL directly instead of creating a blob URL
          const dataUrl = event.target.result

          // Set the uploaded image in state for reference
          setUploadedImage(dataUrl)

          // Set the background URL to update the main canvas immediately
          setBackgroundUrl(dataUrl)

          setError("")
        }
      }

      reader.onerror = () => {
        setError("Erro ao processar a imagem. Por favor, tente novamente.")
      }

      // Read the file as a data URL
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error processing file:", error)
      setError("Erro ao processar a imagem. Por favor, tente novamente.")
    }

    // Reset the input value to allow selecting the same file again
    e.target.value = ""
  }

  // Function to trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Tabs defaultValue="gallery">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="gallery" className="text-base">
          Galeria
        </TabsTrigger>
        <TabsTrigger value="upload" className="text-base">
          Upload
        </TabsTrigger>
        <TabsTrigger value="url" className="text-base">
          URL
        </TabsTrigger>
      </TabsList>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <TabsContent value="gallery" className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {backgrounds.map((bg) => (
            <div
              key={bg.id}
              className="cursor-pointer overflow-hidden rounded-md border-2 transition-all hover:opacity-90"
              onClick={() => handleSelectBackground(bg.url)}
              role="button"
              aria-label={`Selecionar fundo: ${bg.alt}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleSelectBackground(bg.url)
                }
              }}
            >
              <div className="relative aspect-[4/3]">
                <Image src={bg.url || "/placeholder.svg"} alt={bg.alt} fill className="object-cover" unoptimized />
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="upload" className="space-y-4 pt-4">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="mb-2 text-base text-muted-foreground">
            Arraste e solte uma imagem JPG ou PNG, ou clique para selecionar
          </p>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileUpload}
            aria-label="Selecionar arquivo de imagem para upload"
          />

          {/* Button that triggers the file input */}
          <Button
            variant="outline"
            className="mt-2 text-base py-6 w-full sm:w-auto"
            onClick={triggerFileInput}
            type="button"
          >
            <ImageIcon className="mr-2 h-5 w-5" />
            Selecionar imagem (JPG, PNG)
          </Button>

          <p className="mt-4 text-sm text-muted-foreground">Formatos suportados: JPG e PNG</p>

          {/* Show a message when image is uploaded */}
          {uploadedImage && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Imagem carregada com sucesso!
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="url" className="space-y-4 pt-4">
        <form onSubmit={handleCustomUrlSubmit}>
          <div className="space-y-2">
            <Label htmlFor="image-url" className="text-base">
              URL da imagem
            </Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="image-url"
                type="text"
                placeholder="https://exemplo.com/imagem.jpg"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="text-base h-12"
                aria-label="URL da imagem"
              />
              <Button type="submit" className="sm:w-auto w-full text-base h-12" aria-label="Usar esta URL de imagem">
                Usar
              </Button>
            </div>

            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <AlertTitle className="text-blue-800 font-medium text-base">
                Atenção: Nem todas as imagens da internet funcionam
              </AlertTitle>
              <AlertDescription>
                <div className="text-blue-700">
                  <p className="mb-2">
                    Alguns sites não permitem que suas imagens sejam usadas diretamente. Para melhores resultados, faça
                    upload da imagem do seu dispositivo.
                  </p>

                  <div className="mt-3 mb-2">
                    <strong className="text-blue-900">Sites que NÃO funcionam:</strong>
                  </div>

                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3">
                    {restrictedSites.map((site, index) => (
                      <li key={index} className="flex items-center gap-2 bg-white p-2 rounded border border-blue-100">
                        <span className="text-xl" aria-hidden="true">
                          {site.icon}
                        </span>
                        <span className="font-medium">{site.name}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center mt-4">
                    <Link
                      href="/ajuda"
                      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium"
                    >
                      <HelpCircle className="h-5 w-5 mr-2" />
                      Ver lista completa e soluções
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  )
}
