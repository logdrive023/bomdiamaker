"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useEditor } from "./editor-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackgroundSelector } from "./background-selector"
import { Loader2, Share2, RotateCcw, Plus, Trash2, Type, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function EditorSidebar() {
  const router = useRouter()
  const {
    textElements,
    selectedTextId,
    setSelectedTextId,
    addTextElement,
    updateTextElement,
    removeTextElement,
    generateImage,
    resetEditor,
    saveEditorState,
  } = useEditor()

  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("text")

  // Get the currently selected text element
  const selectedElement = textElements.find((el) => el.id === selectedTextId) || textElements[0]

  // Auto-save editor state when changes are made
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      saveEditorState()
    }, 1000)

    return () => clearTimeout(saveTimeout)
  }, [textElements, selectedTextId, saveEditorState])

  const handleGenerateImage = async () => {
    setIsGenerating(true)
    try {
      const imageUrl = await generateImage()
      router.push(`/success?image=${encodeURIComponent(imageUrl)}`)
    } catch (error) {
      console.error("Error generating image:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const shareOnWhatsApp = async () => {
    setIsGenerating(true)
    try {
      const imageUrl = await generateImage()
      const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "Criei esta imagem com Bom Dia Maker! " +
          window.location.origin +
          "/success?image=" +
          encodeURIComponent(imageUrl),
      )}`
      window.open(shareUrl, "_blank")
    } catch (error) {
      console.error("Error sharing image:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Update the selected text element
  const updateSelectedText = (field: string, value: any) => {
    if (!selectedTextId) return
    updateTextElement(selectedTextId, { [field]: value })
  }

  return (
    <Card className="h-fit">
      <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="text" className="text-base">
            Texto
          </TabsTrigger>
          <TabsTrigger value="background" className="text-base">
            Fundo
          </TabsTrigger>
          <TabsTrigger value="actions" className="text-base">
            Ações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <CardContent className="space-y-4 pt-6">
            {/* Text elements selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base">Mensagens</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addTextElement}
                        className="h-10 px-3 text-base"
                        aria-label="Adicionar nova mensagem de texto"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Adicionar
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Adicionar nova mensagem de texto</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {textElements.map((element, index) => (
                  <Badge
                    key={element.id}
                    variant={selectedTextId === element.id ? "default" : "outline"}
                    className="cursor-pointer text-base py-1 px-3"
                    onClick={() => setSelectedTextId(element.id)}
                  >
                    <Type className="h-3 w-3 mr-1" /> Texto {index + 1}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedElement && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message" className="text-base">
                      Mensagem
                    </Label>
                    {textElements.length > 1 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTextElement(selectedElement.id)}
                              className="h-10 px-3 text-base text-destructive hover:text-destructive"
                              aria-label="Remover esta mensagem de texto"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remover
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remover esta mensagem de texto</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <textarea
                    id="message"
                    value={selectedElement.text}
                    onChange={(e) => updateSelectedText("text", e.target.value)}
                    className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Digite sua mensagem de bom dia..."
                    aria-label="Texto da mensagem"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-family" className="text-base">
                    Fonte
                  </Label>
                  <Select
                    value={selectedElement.fontFamily}
                    onValueChange={(value) => updateSelectedText("fontFamily", value)}
                    aria-label="Selecione o tipo de fonte"
                  >
                    <SelectTrigger id="font-family" className="text-base h-12">
                      <SelectValue placeholder="Selecione uma fonte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial" className="text-base">
                        Arial
                      </SelectItem>
                      <SelectItem value="Verdana" className="text-base">
                        Verdana
                      </SelectItem>
                      <SelectItem value="Georgia" className="text-base">
                        Georgia
                      </SelectItem>
                      <SelectItem value="Times New Roman" className="text-base">
                        Times New Roman
                      </SelectItem>
                      <SelectItem value="Courier New" className="text-base">
                        Courier New
                      </SelectItem>
                      <SelectItem value="Impact" className="text-base">
                        Impact
                      </SelectItem>
                      <SelectItem value="Comic Sans MS" className="text-base">
                        Comic Sans MS
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size" className="text-base">
                      Tamanho da Fonte: {selectedElement.fontSize}px
                    </Label>
                  </div>
                  <Slider
                    id="font-size"
                    min={16}
                    max={72}
                    step={1}
                    value={[selectedElement.fontSize]}
                    onValueChange={(value) => updateSelectedText("fontSize", value[0])}
                    aria-label={`Tamanho da fonte: ${selectedElement.fontSize} pixels`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-color" className="text-base">
                    Cor do Texto
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="font-color"
                      type="color"
                      value={selectedElement.fontColor}
                      onChange={(e) => updateSelectedText("fontColor", e.target.value)}
                      className="h-12 w-12 cursor-pointer p-1"
                      aria-label="Selecione a cor do texto"
                    />
                    <Input
                      type="text"
                      value={selectedElement.fontColor}
                      onChange={(e) => updateSelectedText("fontColor", e.target.value)}
                      className="flex-1 text-base h-12"
                      aria-label="Código da cor do texto"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text-align" className="text-base">
                    Alinhamento
                  </Label>
                  <Select
                    value={selectedElement.textAlign}
                    onValueChange={(value) => updateSelectedText("textAlign", value)}
                    aria-label="Selecione o alinhamento do texto"
                  >
                    <SelectTrigger id="text-align" className="text-base h-12">
                      <SelectValue placeholder="Selecione o alinhamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left" className="text-base">
                        Esquerda
                      </SelectItem>
                      <SelectItem value="center" className="text-base">
                        Centro
                      </SelectItem>
                      <SelectItem value="right" className="text-base">
                        Direita
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-base">Posição do Texto</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                            <HelpCircle className="h-4 w-4" />
                            <span className="sr-only">Ajuda sobre posicionamento</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Clique na imagem para posicionar o texto ou use os controles deslizantes abaixo</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Clique na imagem para posicionar o texto onde desejar
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="position-x" className="text-sm">
                        Posição X: {selectedElement.position.x}
                      </Label>
                      <Slider
                        id="position-x"
                        min={50}
                        max={750}
                        step={1}
                        value={[selectedElement.position.x]}
                        onValueChange={(value) =>
                          updateSelectedText("position", { ...selectedElement.position, x: value[0] })
                        }
                        aria-label={`Posição horizontal: ${selectedElement.position.x}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="position-y" className="text-sm">
                        Posição Y: {selectedElement.position.y}
                      </Label>
                      <Slider
                        id="position-y"
                        min={50}
                        max={550}
                        step={1}
                        value={[selectedElement.position.y]}
                        onValueChange={(value) =>
                          updateSelectedText("position", { x: selectedElement.position.x, y: value[0] })
                        }
                        aria-label={`Posição vertical: ${selectedElement.position.y}`}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </TabsContent>

        <TabsContent value="background">
          <CardContent className="pt-6">
            <BackgroundSelector />
          </CardContent>
        </TabsContent>

        <TabsContent value="actions">
          <CardContent className="space-y-4 pt-6">
            <Button
              onClick={handleGenerateImage}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-lg py-6"
              disabled={isGenerating}
              aria-label="Gerar imagem final"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>Gerar Imagem</>
              )}
            </Button>

            {/*<Button
              onClick={shareOnWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
              disabled={isGenerating}
              aria-label="Compartilhar no WhatsApp"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-5 w-5" />
                  Compartilhar no WhatsApp
                </>
              )}
            </Button>*/}

            <Button
              variant="outline"
              onClick={resetEditor}
              className="w-full text-lg py-6"
              disabled={isGenerating}
              aria-label="Resetar editor e começar novamente"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Resetar
            </Button>

            {/* <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Seu trabalho é salvo automaticamente. Se você sair e voltar depois, poderá continuar de onde parou.
              </p>
            </div> */}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
