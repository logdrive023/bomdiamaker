"use client"

import { useEffect, useRef } from "react"

export function AdHelper() {
  // Usar uma ref para rastrear quais anúncios já foram inicializados
  const initializedAdsRef = useRef<Set<string>>(new Set())
  const isProcessingRef = useRef(false)

  // Função para gerar um ID único para cada elemento de anúncio
  const getAdElementId = (element: Element): string => {
    // Usar o data-ad-slot como identificador único se disponível
    const slot = element.getAttribute("data-ad-slot")
    if (slot) return `ad-${slot}`

    // Caso contrário, usar uma combinação de atributos ou posição no DOM
    const format = element.getAttribute("data-ad-format") || "unknown"
    const index = Array.from(document.querySelectorAll(".adsbygoogle")).indexOf(element)
    return `ad-${format}-${index}`
  }

  const refreshAds = () => {
    // Evitar processamento concorrente
    if (isProcessingRef.current) {
      console.log("Já está processando anúncios, aguardando...")
      return
    }

    isProcessingRef.current = true

    try {
      if (typeof window === "undefined" || !window.adsbygoogle) {
        console.log("AdSense não está disponível")
        isProcessingRef.current = false
        return
      }

      // IMPORTANTE: Selecionar APENAS anúncios que NÃO têm status definido
      // Esta é a chave para evitar o erro
      const adElements = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status="done"])')

      if (adElements.length === 0) {
        console.log("Nenhum anúncio novo para inicializar")
        isProcessingRef.current = false
        return
      }

      console.log(`Encontrados ${adElements.length} anúncios não inicializados`)

      // Criar uma lista de anúncios para inicializar
      const adsToInitialize = []

      for (let i = 0; i < adElements.length; i++) {
        const element = adElements[i]
        const adId = getAdElementId(element)

        // Verificações múltiplas para garantir que não inicializamos duas vezes
        if (initializedAdsRef.current.has(adId)) {
          console.log(`Anúncio ${adId} já foi rastreado localmente, pulando`)
          continue
        }

        if (element.getAttribute("data-adsbygoogle-status") === "done") {
          console.log(`Anúncio ${adId} já foi processado pelo Google, pulando`)
          initializedAdsRef.current.add(adId)
          continue
        }

        if (element.getAttribute("data-ad-initialized") === "true") {
          console.log(`Anúncio ${adId} já foi marcado como inicializado, pulando`)
          initializedAdsRef.current.add(adId)
          continue
        }

        if (element.querySelector("iframe")) {
          console.log(`Anúncio ${adId} já tem iframe interno, pulando`)
          initializedAdsRef.current.add(adId)
          element.setAttribute("data-adsbygoogle-status", "done") // Forçar marcação
          continue
        }

        // Se chegou aqui, o anúncio precisa ser inicializado
        console.log(`Preparando anúncio para inicialização: ${adId}`)
        adsToInitialize.push({ element, adId })
      }

      // Inicializar os anúncios um por um com um pequeno atraso entre eles
      if (adsToInitialize.length > 0) {
        console.log(`Inicializando ${adsToInitialize.length} anúncios`)

        // Inicializar apenas o primeiro anúncio imediatamente
        const firstAd = adsToInitialize[0]
        initializedAdsRef.current.add(firstAd.adId)
        firstAd.element.setAttribute("data-ad-initialized", "true")

        try {
          // Usar uma abordagem mais segura para inicializar
          if (!window.adsbygoogle) window.adsbygoogle = []
          if (typeof window.adsbygoogle.push === "function") {
            window.adsbygoogle.push({})
          }
        } catch (error) {
          console.error(`Erro ao inicializar anúncio ${firstAd.adId}:`, error)
          initializedAdsRef.current.delete(firstAd.adId)
        }

        // Se houver mais anúncios, agendar sua inicialização para mais tarde
        if (adsToInitialize.length > 1) {
          setTimeout(() => {
            isProcessingRef.current = false
            refreshAds() // Chamar novamente para processar os próximos anúncios
          }, 1000) // Esperar 1 segundo antes de processar o próximo lote
        } else {
          isProcessingRef.current = false
        }
      } else {
        isProcessingRef.current = false
      }
    } catch (error) {
      console.error("Erro ao processar anúncios:", error)
      isProcessingRef.current = false
    }
  }

  useEffect(() => {
    // Inicializar o conjunto de anúncios rastreados
    initializedAdsRef.current = new Set()
    isProcessingRef.current = false

    // Aguardar um pouco antes da primeira inicialização
    const initialTimer = setTimeout(() => {
      refreshAds()
    }, 1000)

    // Configurar um MutationObserver para detectar novos anúncios adicionados ao DOM
    const observer = new MutationObserver((mutations) => {
      let hasNewAds = false

      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Verificar se o elemento adicionado é um anúncio ou contém anúncios
              const element = node as Element
              if (
                (element.classList && element.classList.contains("adsbygoogle")) ||
                element.querySelectorAll(".adsbygoogle:not([data-adsbygoogle-status='done'])").length > 0
              ) {
                hasNewAds = true
              }
            }
          })
        }
      })

      if (hasNewAds && !isProcessingRef.current) {
        console.log("Novos anúncios detectados no DOM")
        // Usar um timeout para evitar múltiplas chamadas em rápida sucessão
        setTimeout(refreshAds, 500)
      }
    })

    // Iniciar observação de mudanças no DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Adicionar um intervalo para verificar periodicamente por anúncios não inicializados
    const checkInterval = setInterval(() => {
      const uninitializedAds = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status="done"])')
      if (uninitializedAds.length > 0 && !isProcessingRef.current) {
        console.log(`Verificação periódica: encontrados ${uninitializedAds.length} anúncios não inicializados`)
        refreshAds()
      }
    }, 5000) // Verificar a cada 5 segundos

    return () => {
      clearTimeout(initialTimer)
      clearInterval(checkInterval)
      observer.disconnect()
      isProcessingRef.current = false
    }
  }, [])

  return null
}
