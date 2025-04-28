"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useEditor } from "./editor-provider"
import { Card } from "@/components/ui/card"
import { Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useImageCache } from "./image-cache-provider"

export function ImageEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { backgroundUrl, textElements, selectedTextId, setSelectedTextId, updateTextElement, setBackgroundUrl } =
    useEditor()
  const { getCachedImage, preloadImage } = useImageCache()

  const [isLoading, setIsLoading] = useState(true)
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [loadError, setLoadError] = useState<string | null>(null)
  const isMobile = useMobile()

  // Use refs for values that shouldn't trigger re-renders
  const isDraggingRef = useRef(false)
  const lastRenderRef = useRef(0)
  const dragPositionRef = useRef({ x: 0, y: 0 })
  const requestRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  // Load background image
  useEffect(() => {
    setIsLoading(true)
    setLoadError(null)

    // Create a new image element
    const img = new Image()

    // Handle successful image load
    const onImageLoad = () => {
      setBackgroundImage(img)
      setIsLoading(false)
      setLoadError(null)

      // Cache the image for future use if it's not a data URL
      if (!backgroundUrl.startsWith("data:")) {
        try {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0)
            const dataUrl = canvas.toDataURL("image/png")
            preloadImage(backgroundUrl).catch(console.error)
          }
        } catch (error) {
          console.error("Error caching image:", error)
        }
      }
    }

    // Handle image load error
    const onImageError = () => {
      console.error("Error loading image:", backgroundUrl)
      loadFallbackImage(`Não foi possível carregar a imagem. Por favor, escolha outra imagem.`)
    }

    // Set up image loading
    img.onload = onImageLoad
    img.onerror = onImageError

    // Handle different types of image sources
    if (backgroundUrl.startsWith("data:")) {
      // For data URLs (base64), just set the src directly
      img.src = backgroundUrl
    } else {
      // For regular URLs, check cache first
      const cachedDataUrl = getCachedImage(backgroundUrl)
      if (cachedDataUrl) {
        img.src = cachedDataUrl
      } else {
        // If not in cache, load directly
        // Only set crossOrigin for external URLs
        if (backgroundUrl.startsWith("http")) {
          img.crossOrigin = "anonymous"
        }
        img.src = backgroundUrl
      }
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [backgroundUrl, setBackgroundUrl, getCachedImage, preloadImage])

  // Function to load a fallback image
  const loadFallbackImage = (errorMessage: string) => {
    setLoadError(errorMessage)

    // Try to load a local fallback image
    const fallbackImg = new Image()
    fallbackImg.src = "/floral-sunrise-glow.png"

    fallbackImg.onload = () => {
      setBackgroundImage(fallbackImg)
      setIsLoading(false)
      // Optionally update the backgroundUrl in the editor state
      setBackgroundUrl("/floral-sunrise-glow.png")
    }

    fallbackImg.onerror = () => {
      console.error("Error loading fallback image")
      createCanvasFallback()
    }
  }

  // Create a canvas-based fallback if all image loading fails
  const createCanvasFallback = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 600
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // Fill with a gradient as a last resort
      const gradient = ctx.createLinearGradient(0, 0, 800, 600)
      gradient.addColorStop(0, "#f7e9d7")
      gradient.addColorStop(1, "#f9d976")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 800, 600)

      // Add text indicating fallback
      ctx.fillStyle = "#333"
      ctx.font = "24px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Imagem não disponível", 400, 300)

      // Convert canvas to image
      const blankImg = new Image()
      blankImg.src = canvas.toDataURL()
      blankImg.onload = () => {
        setBackgroundImage(blankImg)
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  // Handle responsive canvas size
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        // Maintain aspect ratio of 4:3
        const containerHeight = containerWidth * 0.75
        setCanvasSize({
          width: containerWidth,
          height: containerHeight,
        })
      }
    }

    // Initial size
    updateCanvasSize()

    // Update on resize
    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Draw canvas function
  const drawCanvas = () => {
    if (!canvasRef.current || !backgroundImage) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Only redraw at most 30 times per second during dragging
    const now = Date.now()
    if (isDraggingRef.current && now - lastRenderRef.current < 33) {
      requestRef.current = requestAnimationFrame(drawCanvas)
      return
    }

    lastRenderRef.current = now

    // Set canvas dimensions
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    // Calculate scale factor for responsive positioning
    const scaleX = canvasSize.width / 800
    const scaleY = canvasSize.height / 600

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply zoom if needed
    ctx.save()
    if (zoomLevel !== 1) {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      ctx.translate(centerX, centerY)
      ctx.scale(zoomLevel, zoomLevel)
      ctx.translate(-centerX, -centerY)
    }

    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

    // Add semi-transparent overlay for better text visibility
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw each text element
    textElements.forEach((element) => {
      const { text, fontFamily, fontSize, textAlign, fontColor, position, id } = element
      const isSelected = id === selectedTextId

      // Scale font size based on canvas size
      const scaledFontSize = fontSize * Math.min(scaleX, scaleY)

      // Draw text
      ctx.fillStyle = fontColor
      ctx.font = `${scaledFontSize}px ${fontFamily}`
      ctx.textAlign = textAlign as CanvasTextAlign

      // Handle multiline text
      const lineHeight = scaledFontSize * 1.2
      const maxWidth = canvas.width - 80 * Math.min(scaleX, scaleY)
      const words = text.split(" ")
      let line = ""

      // Use the current position (from ref during dragging, from state otherwise)
      const currentPosition = isDraggingRef.current && isSelected ? dragPositionRef.current : position

      // Scale position based on canvas size
      const scaledX = currentPosition.x * scaleX
      const scaledY = currentPosition.y * scaleY

      // Calculate starting y position
      let y = scaledY

      // Process and draw text lines
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " "
        const metrics = ctx.measureText(testLine)

        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, scaledX, y)
          line = words[i] + " "
          y += lineHeight
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, scaledX, y)

      // Draw a selection indicator for the selected text
      if (isSelected) {
        // Draw a small indicator at the text position
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(scaledX, scaledY, 6 * Math.min(scaleX, scaleY), 0, Math.PI * 2)
        ctx.fill()

        // Calculate text width for the selection box
        const textWidth = ctx.measureText(text).width
        const textHeight = scaledFontSize * 1.5

        // Position the selection box based on text alignment
        let boxX = scaledX
        if (textAlign === "center") {
          boxX = scaledX - textWidth / 2
        } else if (textAlign === "right") {
          boxX = scaledX - textWidth
        }

        // Draw a dashed rectangle around the text area
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(
          boxX - 10 * Math.min(scaleX, scaleY),
          scaledY - scaledFontSize,
          textWidth + 20 * Math.min(scaleX, scaleY),
          textHeight,
        )
        ctx.setLineDash([])
      }
    })

    ctx.restore()

    // Continue animation loop only when dragging
    if (isDraggingRef.current) {
      requestRef.current = requestAnimationFrame(drawCanvas)
    }
  }

  // Effect for drawing the canvas - only run when necessary props change
  useEffect(() => {
    drawCanvas()

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [backgroundImage, textElements, selectedTextId, canvasSize, zoomLevel])

  // Handle mouse events for dragging text
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    // Get position in canvas coordinates
    const canvasX = e.clientX - rect.left
    const canvasY = e.clientY - rect.top

    // Convert to original 800x600 coordinates
    const x = canvasX * (800 / canvasSize.width)
    const y = canvasY * (600 / canvasSize.height)

    // Check if click is near any text element
    let clickedTextId: string | null = null
    let minDistance = 50 // Minimum distance to consider a click on text

    textElements.forEach((element) => {
      const distance = Math.sqrt(Math.pow(x - element.position.x, 2) + Math.pow(y - element.position.y, 2))

      if (distance < minDistance) {
        minDistance = distance
        clickedTextId = element.id
      }
    })

    if (clickedTextId) {
      // If clicked on a text element, select it and start dragging
      setSelectedTextId(clickedTextId)
      isDraggingRef.current = true

      // Find the selected element
      const selectedElement = textElements.find((el) => el.id === clickedTextId)
      if (selectedElement) {
        dragPositionRef.current = { ...selectedElement.position }
      }

      requestRef.current = requestAnimationFrame(drawCanvas)
    } else if (selectedTextId) {
      // If clicked elsewhere and there's a selected text, move it there
      updateTextElement(selectedTextId, { position: { x, y } })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !canvasRef.current || !selectedTextId) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    // Get position in canvas coordinates
    const canvasX = e.clientX - rect.left
    const canvasY = e.clientY - rect.top

    // Convert to original 800x600 coordinates
    const x = canvasX * (800 / canvasSize.width)
    const y = canvasY * (600 / canvasSize.height)

    // Update the ref directly for smooth dragging
    dragPositionRef.current = { x, y }
  }

  const handleMouseUp = () => {
    if (isDraggingRef.current && selectedTextId) {
      // Only update the state when dragging stops
      updateTextElement(selectedTextId, { position: dragPositionRef.current })
      isDraggingRef.current = false

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }

  const handleMouseLeave = () => {
    if (isDraggingRef.current && selectedTextId) {
      updateTextElement(selectedTextId, { position: dragPositionRef.current })
      isDraggingRef.current = false

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    // Prevent scrolling while interacting with canvas
    e.preventDefault()

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]

    // Get position in canvas coordinates
    const canvasX = touch.clientX - rect.left
    const canvasY = touch.clientY - rect.top

    // Convert to original 800x600 coordinates
    const x = canvasX * (800 / canvasSize.width)
    const y = canvasY * (600 / canvasSize.height)

    // Check if touch is near any text element
    let touchedTextId: string | null = null
    let minDistance = 50 // Minimum distance to consider a touch on text

    textElements.forEach((element) => {
      const distance = Math.sqrt(Math.pow(x - element.position.x, 2) + Math.pow(y - element.position.y, 2))

      if (distance < minDistance) {
        minDistance = distance
        touchedTextId = element.id
      }
    })

    if (touchedTextId) {
      // If touched on a text element, select it and start dragging
      setSelectedTextId(touchedTextId)
      isDraggingRef.current = true

      // Find the selected element
      const selectedElement = textElements.find((el) => el.id === touchedTextId)
      if (selectedElement) {
        dragPositionRef.current = { ...selectedElement.position }
      }

      requestRef.current = requestAnimationFrame(drawCanvas)
    } else if (selectedTextId) {
      // If touched elsewhere and there's a selected text, move it there
      updateTextElement(selectedTextId, { position: { x, y } })
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !canvasRef.current || !selectedTextId) return

    // Prevent scrolling while dragging
    e.preventDefault()

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]

    // Get position in canvas coordinates
    const canvasX = touch.clientX - rect.left
    const canvasY = touch.clientY - rect.top

    // Convert to original 800x600 coordinates
    const x = canvasX * (800 / canvasSize.width)
    const y = canvasY * (600 / canvasSize.height)

    // Update the ref directly for smooth dragging
    dragPositionRef.current = { x, y }
  }

  const handleTouchEnd = () => {
    if (isDraggingRef.current && selectedTextId) {
      // Only update the state when dragging stops
      updateTextElement(selectedTextId, { position: dragPositionRef.current })
      isDraggingRef.current = false

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.8))
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
  }

  return (
    <div className="flex flex-col space-y-4">
      {loadError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      )}

      <Card className="flex aspect-[4/3] items-center justify-center overflow-hidden p-0 relative" ref={containerRef}>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              className="h-full w-full object-contain cursor-pointer"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              aria-label="Editor de imagem - Clique para posicionar o texto"
              role="img"
              tabIndex={0}
              // Keyboard navigation for accessibility
              onKeyDown={(e) => {
                if (!selectedTextId) return
                const selectedElement = textElements.find((el) => el.id === selectedTextId)
                if (!selectedElement) return

                const step = e.shiftKey ? 10 : 5
                const newPosition = { ...selectedElement.position }

                switch (e.key) {
                  case "ArrowUp":
                    newPosition.y -= step
                    break
                  case "ArrowDown":
                    newPosition.y += step
                    break
                  case "ArrowLeft":
                    newPosition.x -= step
                    break
                  case "ArrowRight":
                    newPosition.x += step
                    break
                }

                if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
                  e.preventDefault()
                  updateTextElement(selectedTextId, { position: newPosition })
                }
              }}
            />
            {/* Accessibility instructions overlay */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-md text-sm text-center">
              <p className="text-sm">Clique na imagem para posicionar o texto selecionado</p>
            </div>
          </>
        )}
      </Card>

      {/* Zoom controls */}
      <div className="flex justify-center space-x-2" aria-label="Controles de zoom">
        <Button
          onClick={handleZoomOut}
          variant="outline"
          size="sm"
          className="text-lg font-bold"
          aria-label="Diminuir zoom"
        >
          -
        </Button>
        <Button onClick={handleResetZoom} variant="outline" size="sm" className="text-base" aria-label="Resetar zoom">
          {Math.round(zoomLevel * 100)}%
        </Button>
        <Button
          onClick={handleZoomIn}
          variant="outline"
          size="sm"
          className="text-lg font-bold"
          aria-label="Aumentar zoom"
        >
          +
        </Button>
      </div>
    </div>
  )
}
