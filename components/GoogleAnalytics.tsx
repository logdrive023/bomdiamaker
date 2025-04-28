"use client";

import Script from "next/script";
import { useEffect } from "react";

type GoogleAnalyticsProps = {
  trackingId: string;
};

export function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', trackingId, {
        page_path: window.location.pathname,
      });
    }
  }, [trackingId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
    </>
  );
}
