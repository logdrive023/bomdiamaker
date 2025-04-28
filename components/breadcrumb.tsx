import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center text-muted-foreground hover:text-foreground"
            aria-label="Página inicial"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Início</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {item.active ? (
              <span className="ml-1 font-medium text-foreground" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="ml-1 text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
