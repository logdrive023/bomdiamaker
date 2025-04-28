"use client"

import { useEffect } from "react"

export function AdHelper() {
  useEffect(() => {
    // Função para recarregar anúncios quando necessário
    const refreshAds = () => {
      try {
        if (window.adsbygoogle && window.adsbygoogle.push) {
          const adElements = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status="done"])')
          adElements.forEach(() => {
            window.adsbygoogle.push({})
          })
        }
      } catch (error) {
        console.error("Erro ao carregar anúncios:", error)
      }
    }

    // Tenta carregar anúncios quando o componente montar
    refreshAds()

    // Adiciona um listener para recarregar anúncios quando a rota mudar
    const handleRouteChange = () => {
      setTimeout(refreshAds, 300)
    }

    window.addEventListener("routeChangeComplete", handleRouteChange)
    return () => {
      window.removeEventListener("routeChangeComplete", handleRouteChange)
    }
  }, [])

  return null
}
