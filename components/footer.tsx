import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Bom Dia Maker. Todos os direitos reservados.
            </p>
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            {/*<Link href="/about" className="hover:underline">
              Sobre
            </Link>*/}
            <Link href="/ajuda" className="hover:underline">
              Ajuda
            </Link>
            <Link href="/politica-de-privacidade" className="hover:underline">
              Política de Privacidade
            </Link>
            <Link href="/adsense-info" className="hover:underline">
              Anúncios
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
