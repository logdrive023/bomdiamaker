"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function AdConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const hasConsent = localStorage.getItem("adConsent")
    if (!hasConsent) {
      // Mostrar banner após um pequeno delay para não interromper o carregamento inicial
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptConsent = () => {
    localStorage.setItem("adConsent", "true")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl border-2 p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Anúncios e Cookies</h3>
            <p className="mt-2 text-base">
              Utilizamos cookies e exibimos anúncios para melhorar sua experiência. Ao continuar navegando, você
              concorda com nossa política de privacidade.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={acceptConsent} className="bg-green-600 text-lg font-medium hover:bg-green-700" size="lg">
              Aceitar
            </Button>
            <Button variant="outline" onClick={acceptConsent} className="text-lg font-medium" size="lg">
              Recusar Anúncios
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
