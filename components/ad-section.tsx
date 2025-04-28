"use client";

import { AdBanner } from "@/components/ad-banner";

interface AdSectionProps {
  className?: string;
  slot?: string;         // Slot agora é configurável
  title?: string;        // Título também pode ser customizado
}

export function AdSection({
  className = "",
  slot = "1234567890",    // Slot padrão
  title = "Você pode gostar também", // Título padrão
}: AdSectionProps) {
  return (
    <section className={`my-8 px-4 ${className}`}>
      <div className="container mx-auto">
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <h2 className="mb-4 text-center text-2xl font-bold">{title}</h2>
          <div className="flex justify-center">
            <AdBanner slot={slot} format="auto" responsive />
          </div>
        </div>
      </div>
    </section>
  );
}
