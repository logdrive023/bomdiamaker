"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // importante

export function AdHelper() {
  const router = useRouter();

  useEffect(() => {
    const refreshAds = () => {
      try {
        if (typeof window !== "undefined" && (window as any).adsbygoogle?.push) {
          const adElements = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status="done"])');
          adElements.forEach(() => {
            (window as any).adsbygoogle.push({});
          });
        }
      } catch (error) {
        console.error("Erro ao carregar anúncios:", error);
      }
    };

    refreshAds();

    const handleRouteChange = () => {
      setTimeout(refreshAds, 300);
    };

    router.events?.on?.("routeChangeComplete", handleRouteChange);

    return () => {
      router.events?.off?.("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return null;
}
