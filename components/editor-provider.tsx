"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

// Define the text element type
type TextElement = {
  id: string
  text: string
  fontFamily: string
  fontSize: number
  fontColor: string
  textAlign: "left" | "center" | "right"
  position: { x: number; y: number }
}

// Define the template type
type Template = {
  id: number
  backgroundUrl: string
  textElements: TextElement[]
}

// Define the editor state type for localStorage
type EditorState = {
  backgroundUrl: string
  textElements: TextElement[]
  selectedTextId: string | null
  lastUpdated: number
}

// Define the editor context type
type EditorContextType = {
  backgroundUrl: string
  setBackgroundUrl: (url: string) => void
  textElements: TextElement[]
  setTextElements: (elements: TextElement[]) => void
  selectedTextId: string | null
  setSelectedTextId: (id: string | null) => void
  addTextElement: () => void
  updateTextElement: (id: string, updates: Partial<Omit<TextElement, "id">>) => void
  removeTextElement: (id: string) => void
  generateImage: () => Promise<string>
  resetEditor: () => void
  saveEditorState: () => void
  loadEditorState: () => boolean
  clearEditorState: () => void
}

// Generate a unique ID
const generateId = () => `text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

// Create default text element
const createDefaultTextElement = (): TextElement => ({
  id: generateId(),
  text: "Bom dia! Tenha um dia abençoado!",
  fontFamily: "Arial",
  fontSize: 36,
  fontColor: "#ffffff",
  textAlign: "center",
  position: { x: 400, y: 300 },
})

// Local storage key
const EDITOR_STATE_KEY = "bom_dia_maker_editor_state"

// Sample templates data
const templates: Template[] = [
  {
    id: 1,
    backgroundUrl: "/friday-coffee-joy.png",
    textElements: [
      {
        id: "template_1_text_1",
        text: "Bom dia! Sexta-feira chegou! ☕",
        fontFamily: "Arial",
        fontSize: 36,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 2,
    backgroundUrl: "/heart-filled-morning.png",
    textElements: [
      {
        id: "template_2_text_1",
        text: "Bom dia, meu amor! ❤️",
        fontFamily: "Verdana",
        fontSize: 40,
        fontColor: "#ff6b6b",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 3,
    backgroundUrl: "/templates/family-morning.png",
    textElements: [
      {
        id: "template_3_text_1",
        text: "Bom dia, família!",
        fontFamily: "Georgia",
        fontSize: 42,
        fontColor: "#ffd43b",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
      {
        id: "template_3_text_2",
        text: "Que Deus abençoe nosso dia!",
        fontFamily: "Georgia",
        fontSize: 32,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 400 },
      },
    ],
  },
  {
    id: 4,
    backgroundUrl: "/new-day-wisdom.png",
    textElements: [
      {
        id: "template_4_text_1",
        text: "Bom dia! Hoje será um dia incrível!",
        fontFamily: "Impact",
        fontSize: 42,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 5,
    backgroundUrl: "/templates/coffee-morning-joy.png",
    textElements: [
      {
        id: "template_5_text_1",
        text: "Bom dia!",
        fontFamily: "Courier New",
        fontSize: 48,
        fontColor: "#e6b980",
        textAlign: "center",
        position: { x: 400, y: 250 },
      },
      {
        id: "template_5_text_2",
        text: "Primeiro o café, depois os compromissos.",
        fontFamily: "Courier New",
        fontSize: 28,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 350 },
      },
    ],
  },
  {
    id: 6,
    backgroundUrl: "/templates/mountain-dawn.png",
    textElements: [
      {
        id: "template_6_text_1",
        text: "Bom dia! A natureza nos ensina a renovar a cada manhã.",
        fontFamily: "Tahoma",
        fontSize: 34,
        fontColor: "#4ade80",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 7,
    backgroundUrl: "/templates/prayer-morning.png",
    textElements: [
      {
        id: "template_7_text_1",
        text: "Bom dia! Que Deus abençoe seu caminho hoje.",
        fontFamily: "Times New Roman",
        fontSize: 38,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 8,
    backgroundUrl: "/templates/monday-motivation.png",
    textElements: [
      {
        id: "template_8_text_1",
        text: "Bom dia!",
        fontFamily: "Arial",
        fontSize: 48,
        fontColor: "#60a5fa",
        textAlign: "center",
        position: { x: 400, y: 250 },
      },
      {
        id: "template_8_text_2",
        text: "Segunda-feira com energia e foco!",
        fontFamily: "Arial",
        fontSize: 32,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 350 },
      },
    ],
  },
  {
    id: 9,
    backgroundUrl: "/templates/sunrise-blessing.png",
    textElements: [
      {
        id: "template_9_text_1",
        text: "Bom dia! Que o sol traga luz para sua vida!",
        fontFamily: "Georgia",
        fontSize: 40,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 10,
    backgroundUrl: "/templates/flower-blessing.png",
    textElements: [
      {
        id: "template_10_text_1",
        text: "Bom dia! Floresça onde estiver plantado.",
        fontFamily: "Verdana",
        fontSize: 38,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 11,
    backgroundUrl: "/templates/bird-morning-song.png",
    textElements: [
      {
        id: "template_11_text_1",
        text: "Bom dia! Cante como os pássaros ao amanhecer.",
        fontFamily: "Comic Sans MS",
        fontSize: 36,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 12,
    backgroundUrl: "/templates/beach-morning.png",
    textElements: [
      {
        id: "template_12_text_1",
        text: "Bom dia! Que seu dia seja tranquilo como o mar.",
        fontFamily: "Arial",
        fontSize: 38,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 13,
    backgroundUrl: "/templates/garden-morning.png",
    textElements: [
      {
        id: "template_13_text_1",
        text: "Bom dia! Cultive pensamentos positivos.",
        fontFamily: "Georgia",
        fontSize: 40,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 14,
    backgroundUrl: "/templates/sunflower-morning.png",
    textElements: [
      {
        id: "template_14_text_1",
        text: "Bom dia! Seja como o girassol: sempre voltado para a luz.",
        fontFamily: "Impact",
        fontSize: 36,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 15,
    backgroundUrl: "/templates/bible-morning.png",
    textElements: [
      {
        id: "template_15_text_1",
        text: "Bom dia! As misericórdias do Senhor se renovam a cada manhã.",
        fontFamily: "Times New Roman",
        fontSize: 34,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 16,
    backgroundUrl: "/templates/butterfly-morning.png",
    textElements: [
      {
        id: "template_16_text_1",
        text: "Bom dia! Transforme-se como a borboleta a cada novo dia.",
        fontFamily: "Verdana",
        fontSize: 36,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 17,
    backgroundUrl: "/templates/rainbow-blessing.png",
    textElements: [
      {
        id: "template_17_text_1",
        text: "Bom dia! Após a chuva, sempre vem o arco-íris.",
        fontFamily: "Arial",
        fontSize: 38,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 18,
    backgroundUrl: "/templates/tea-meditation.png",
    textElements: [
      {
        id: "template_18_text_1",
        text: "Bom dia! Aprecie cada momento com calma e serenidade.",
        fontFamily: "Georgia",
        fontSize: 36,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 19,
    backgroundUrl: "/templates/gratitude-morning.png",
    textElements: [
      {
        id: "template_19_text_1",
        text: "Bom dia! Comece o dia com gratidão no coração.",
        fontFamily: "Courier New",
        fontSize: 36,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 20,
    backgroundUrl: "/templates/window-morning.png",
    textElements: [
      {
        id: "template_20_text_1",
        text: "Bom dia! Abra as janelas da alma para a luz do sol.",
        fontFamily: "Tahoma",
        fontSize: 38,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 21,
    backgroundUrl: "/templates/bread-breakfast.png",
    textElements: [
      {
        id: "template_21_text_1",
        text: "Bom dia! Que seu dia seja tão gostoso quanto um café da manhã fresco.",
        fontFamily: "Arial",
        fontSize: 34,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 22,
    backgroundUrl: "/templates/cat-morning.png",
    textElements: [
      {
        id: "template_22_text_1",
        text: "Bom dia! Espreguice-se como um gatinho e comece o dia com energia.",
        fontFamily: "Comic Sans MS",
        fontSize: 34,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 23,
    backgroundUrl: "/templates/friday-celebration.png",
    textElements: [
      {
        id: "template_23_text_1",
        text: "Bom dia! Sexta-feira chegou, vamos celebrar!",
        fontFamily: "Impact",
        fontSize: 40,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
  {
    id: 24,
    backgroundUrl: "/blessed-morning-garden.png",
    textElements: [
      {
        id: "template_24_text_1",
        text: "Bom dia! Que seu dia seja abençoado e cheio de paz.",
        fontFamily: "Times New Roman",
        fontSize: 38,
        fontColor: "#ffffff",
        textAlign: "center",
        position: { x: 400, y: 300 },
      },
    ],
  },
]

// Create the context
const EditorContext = createContext<EditorContextType | undefined>(undefined)

// Default values
const defaultValues = {
  backgroundUrl: "/floral-sunrise-glow.png",
  textElements: [createDefaultTextElement()],
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const templateId = searchParams.get("template")
  const returnToEdit = searchParams.get("returnToEdit") === "true"

  // State for editor properties
  const [backgroundUrl, setBackgroundUrl] = useState(defaultValues.backgroundUrl)
  const [textElements, setTextElements] = useState<TextElement[]>(defaultValues.textElements)
  const [selectedTextId, setSelectedTextId] = useState<string | null>(defaultValues.textElements[0]?.id || null)

  // Load template or saved state on initial render
  useEffect(() => {
    if (returnToEdit) {
      // Try to load saved state if returning to edit
      const loaded = loadEditorState()
      if (!loaded && templateId) {
        // If no saved state but template ID is provided, load the template
        loadTemplateById(templateId)
      }
    } else if (templateId) {
      // If not returning to edit but template ID is provided, load the template
      loadTemplateById(templateId)
    }
  }, [templateId, returnToEdit])

  // Function to load a template by ID
  const loadTemplateById = (id: string) => {
    const template = templates.find((t) => t.id === Number.parseInt(id))
    if (template) {
      setBackgroundUrl(template.backgroundUrl)
      setTextElements(template.textElements)
      setSelectedTextId(template.textElements[0]?.id || null)
    }
  }

  // Function to save editor state to localStorage
  const saveEditorState = () => {
    if (typeof window === "undefined") return

    try {
      const state: EditorState = {
        backgroundUrl,
        textElements,
        selectedTextId,
        lastUpdated: Date.now(),
      }
      localStorage.setItem(EDITOR_STATE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error("Error saving editor state:", error)
    }
  }

  // Function to load editor state from localStorage
  const loadEditorState = (): boolean => {
    if (typeof window === "undefined") return false

    try {
      const savedState = localStorage.getItem(EDITOR_STATE_KEY)
      if (!savedState) return false

      const state: EditorState = JSON.parse(savedState)

      // Check if state is too old (24 hours)
      const isExpired = Date.now() - state.lastUpdated > 24 * 60 * 60 * 1000
      if (isExpired) {
        localStorage.removeItem(EDITOR_STATE_KEY)
        return false
      }

      setBackgroundUrl(state.backgroundUrl)
      setTextElements(state.textElements)
      setSelectedTextId(state.selectedTextId)
      return true
    } catch (error) {
      console.error("Error loading editor state:", error)
      return false
    }
  }

  // Function to clear editor state from localStorage
  const clearEditorState = () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(EDITOR_STATE_KEY)
  }

  // Function to add a new text element
  const addTextElement = () => {
    const newElement = createDefaultTextElement()
    setTextElements((prev) => [...prev, newElement])
    setSelectedTextId(newElement.id)
  }

  // Function to update a text element
  const updateTextElement = (id: string, updates: Partial<Omit<TextElement, "id">>) => {
    setTextElements((prev) => prev.map((element) => (element.id === id ? { ...element, ...updates } : element)))
  }

  // Function to remove a text element
  const removeTextElement = (id: string) => {
    setTextElements((prev) => prev.filter((element) => element.id !== id))
    if (selectedTextId === id) {
      setSelectedTextId(textElements.find((el) => el.id !== id)?.id || null)
    }
  }

  // Function to generate the image
  const generateImage = async (): Promise<string> => {
    // Save the current state before generating the image
    saveEditorState()

    // Create a canvas to render the final image
    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 600
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      console.error("Could not get canvas context")
      return backgroundUrl // Fallback to just returning the background URL
    }

    // Load the background image
    const backgroundImage = new Image()
    backgroundImage.crossOrigin = "anonymous"

    try {
      // Wait for the background image to load
      await new Promise<void>((resolve, reject) => {
        backgroundImage.onload = () => resolve()
        backgroundImage.onerror = () => reject(new Error("Failed to load background image"))

        // Handle different types of image sources
        if (backgroundUrl.startsWith("data:")) {
          // For data URLs (base64), just set the src directly
          backgroundImage.src = backgroundUrl
        } else {
          // For regular URLs
          // Only set crossOrigin for external URLs
          if (backgroundUrl.startsWith("http")) {
            backgroundImage.crossOrigin = "anonymous"
          }

          // If it's a relative path, add base URL
          if (backgroundUrl.startsWith("/") && !backgroundUrl.startsWith("//") && typeof window !== "undefined") {
            backgroundImage.src = window.location.origin + backgroundUrl
          } else {
            backgroundImage.src = backgroundUrl
          }
        }
      })

      // Draw background
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

      // Add semi-transparent overlay for better text visibility
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw each text element
      for (const element of textElements) {
        const { text, fontFamily, fontSize, textAlign, fontColor, position } = element

        // Draw text
        ctx.fillStyle = fontColor
        ctx.font = `${fontSize}px ${fontFamily}`
        ctx.textAlign = textAlign as CanvasTextAlign

        // Handle multiline text
        const lineHeight = fontSize * 1.2
        const maxWidth = canvas.width - 80
        const words = text.split(" ")
        let line = ""

        // Calculate starting y position
        let y = position.y

        // Calculate x position based on text alignment
        const x = position.x

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " "
          const metrics = ctx.measureText(testLine)

          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line, x, y)
            line = words[i] + " "
            y += lineHeight
          } else {
            line = testLine
          }
        }
        ctx.fillText(line, x, y)
      }

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png")

      // Generate a random temporary filename
      const randomId = Math.floor(Math.random() * 1000000)
      const tempFilename = `temp${randomId}`

      // Store the image data as a structured object
      if (typeof window !== "undefined") {
        try {
          const imageData = {
            tempName: tempFilename,
            image: dataUrl,
          }

          // Check if localStorage is available
          if (!localStorage) {
            console.error("localStorage is not available")
            throw new Error("localStorage is not available")
          }

          // Try to store the data
          const key = `temp_image_${tempFilename}`
          console.log(`Storing image data with key: ${key}`)

          // Check if this key already exists and has been loaded
          const isAlreadyLoaded = localStorage.getItem(`${key}_loaded`) === "true"
          if (!isAlreadyLoaded) {
            localStorage.setItem(key, JSON.stringify(imageData))
            console.log(`Stored image data with key: ${key}`)
          }

          // Verify the data was stored
          const storedData = localStorage.getItem(key)
          if (!storedData) {
            console.error("Failed to verify stored data")
            throw new Error("Failed to store image data")
          }

          console.log("Image data stored successfully")

          // Set a timeout to clean up this temporary storage after 5 minutes
          setTimeout(
            () => {
              localStorage.removeItem(`temp_image_${tempFilename}`)
              console.log(`Cleaned up temporary storage for ${key}`)
            },
            30 * 60 * 1000, // 30 minutes
          )
        } catch (error) {
          console.error("Error storing image data in localStorage:", error)

          // Try an alternative approach - use sessionStorage as fallback
          try {
            const imageData = {
              tempName: tempFilename,
              image: dataUrl,
            }

            sessionStorage.setItem(`temp_image_${tempFilename}`, JSON.stringify(imageData))
            console.log("Used sessionStorage as fallback")
          } catch (sessionError) {
            console.error("Error using sessionStorage fallback:", sessionError)
          }
        }
      }

      // Return the temporary filename
      return tempFilename
    } catch (error) {
      console.error("Error generating image:", error)

      // Fallback to just returning the background URL
      if (backgroundUrl.startsWith("data:")) {
        const randomId = Math.floor(Math.random() * 1000000)
        const tempFilename = `temp${randomId}`

        if (typeof window !== "undefined") {
          const imageData = {
            tempName: tempFilename,
            image: backgroundUrl,
          }

          localStorage.setItem(`temp_image_${tempFilename}`, JSON.stringify(imageData))
          setTimeout(() => localStorage.removeItem(`temp_image_${tempFilename}`), 5 * 60 * 1000)
        }

        return tempFilename
      }

      return backgroundUrl
    }
  }

  // Function to reset the editor to default values
  const resetEditor = () => {
    setBackgroundUrl(defaultValues.backgroundUrl)
    setTextElements(defaultValues.textElements)
    setSelectedTextId(defaultValues.textElements[0]?.id || null)
    clearEditorState()
  }

  return (
    <EditorContext.Provider
      value={{
        backgroundUrl,
        setBackgroundUrl,
        textElements,
        setTextElements,
        selectedTextId,
        setSelectedTextId,
        addTextElement,
        updateTextElement,
        removeTextElement,
        generateImage,
        resetEditor,
        saveEditorState,
        loadEditorState,
        clearEditorState,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

// Custom hook to use the editor context
export function useEditor() {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider")
  }
  return context
}
