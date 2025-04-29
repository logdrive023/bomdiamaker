"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

// Componente de loading para o Suspense
function NotFoundLoading() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mb-4" />
      <h2 className="text-xl font-medium">Carregando...</h2>
    </div>
  )
}

// Componente principal
function NotFoundContent() {
  return (
    <div className="container flex h-[calc(100vh-200px)] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
      <p className="text-xl text-muted-foreground mb-8">Ops! A página que você está procurando não existe.</p>
      <Link href="/">
        <Button className="bg-yellow-500 hover:bg-yellow-600">Voltar para o início</Button>
      </Link>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<NotFoundLoading />}>
      <NotFoundContent />
    </Suspense>
  )
}
