"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Editor", path: "/editor" },
    { name: "Templates", path: "/templates" },
    { name: "Sobre", path: "/about" },
    { name: "Ajuda", path: "/ajuda" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Sun className="h-6 w-6 text-yellow-500" />
          <span>Bom Dia Maker</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden rounded-md p-2 text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                pathname === item.path ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/editor">
            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
              Criar Imagem
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                  pathname === item.path ? "text-foreground bg-muted" : "text-foreground/60"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 py-3">
              <Link href="/editor" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600">
                  Criar Imagem
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
