"use client"

import { AdConsentBanner } from "@/components/ad-consent-banner"
import { AdHelper } from "@/components/ad-helper"

export function ClientComponentsWrapper() {
  return (
    <>
      <AdConsentBanner />
      <AdHelper />
    </>
  )
}
