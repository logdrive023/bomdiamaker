"use client"

import { usePathname } from "next/navigation"
import Head from "next/head"
import { SiteConfig } from "@/config/site"

interface HelmetProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

export function Helmet({ title, description, canonical, ogImage = "/og-image.jpg" }: HelmetProps) {
  const pathname = usePathname()

  const pageTitle = title ? `${title} | ${SiteConfig.name}` : SiteConfig.name
  const pageDescription = description || SiteConfig.description
  const url = canonical ? `${SiteConfig.url}${canonical}` : `${SiteConfig.url}${pathname}`
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SiteConfig.url}${ogImage}`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Head>
  )
}
