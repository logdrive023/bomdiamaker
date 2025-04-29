import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script"
import { Providers } from "./providers"
import { SiteConfig } from "@/config/site"
import { ClientComponentsWrapper } from "@/components/client-components-wrapper"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: SiteConfig.name,
    template: `%s | ${SiteConfig.name}`,
  },
  description: SiteConfig.description,
  keywords: [
    "bom dia",
    "mensagens de bom dia",
    "imagens de bom dia",
    "criar imagens",
    "compartilhar mensagens",
    "whatsapp",
    "bom dia para família",
    "bom dia religioso",
    "bom dia com café",
  ],
  authors: [
    {
      name: SiteConfig.author,
      url: SiteConfig.url,
    },
  ],
  creator: SiteConfig.author,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SiteConfig.url,
    title: SiteConfig.name,
    description: SiteConfig.description,
    siteName: SiteConfig.name,
    images: [
      {
        url: `${SiteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SiteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SiteConfig.name,
    description: SiteConfig.description,
    images: [`${SiteConfig.url}/og-image.jpg`],
    creator: SiteConfig.links.twitter,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${SiteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4488733165053759" />
        {/* Preconnect to Google domains for AdSense */}
        <link rel="preconnect" href="https://www.googletagservices.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://adservice.google.com" />
        <link rel="preconnect" href="https://tpc.googlesyndication.com" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* Usando o wrapper de componentes cliente */}
          <ClientComponentsWrapper />
        </Providers>

        {/* Scripts carregados após a interação do usuário */}
        <Script
          id="adsbygoogle-init"
          strategy="lazyOnload"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4488733165053759"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <GoogleAnalytics trackingId="G-XXXXXXXXXX" />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
