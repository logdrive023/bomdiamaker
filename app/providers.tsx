"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { EditorProvider } from "@/components/editor-provider"
import { ImageCacheProvider } from "@/components/image-cache-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ImageCacheProvider>
        <EditorProvider>{children}</EditorProvider>
      </ImageCacheProvider>
    </ThemeProvider>
  )
}
