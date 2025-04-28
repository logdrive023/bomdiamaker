import { AdBanner } from "@/components/ad-banner"

interface AdSectionProps {
  className?: string
}

export function AdSection({ className = "" }: AdSectionProps) {
  return (
    <section className={`my-8 px-4 ${className}`}>
      <div className="container mx-auto">
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <h3 className="mb-4 text-center text-xl font-semibold">Você pode gostar também</h3>
          <AdBanner slot="1234567890" format="auto" responsive={true} />
        </div>
      </div>
    </section>
  )
}
