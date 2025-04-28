import { AlertCircle } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export function RestrictedSitesList() {
  const restrictedSites = [
    {
      name: "Pinterest",
      reason: "Implementa proteções rigorosas contra hotlinking e CORS",
      icon: "🖼️",
      example: "pinterest.com/pin/123456789",
    },
    {
      name: "Instagram",
      reason: "Bloqueia acesso direto a imagens de fora da plataforma",
      icon: "📷",
      example: "instagram.com/p/abc123",
    },
    {
      name: "Facebook",
      reason: "Utiliza tokens temporários para URLs de imagens",
      icon: "👥",
      example: "facebook.com/photo/?fbid=123456789",
    },
    {
      name: "Twitter/X",
      reason: "Implementa proteções contra acesso direto a mídia",
      icon: "🐦",
      example: "twitter.com/usuario/status/123456789",
    },
    {
      name: "Flickr",
      reason: "Pode bloquear acesso externo dependendo das configurações do usuário",
      icon: "📸",
      example: "flickr.com/photos/usuario/123456789",
    },
    {
      name: "DeviantArt",
      reason: "Implementa proteções contra hotlinking",
      icon: "🎨",
      example: "deviantart.com/usuario/art/titulo-123456789",
    },
    {
      name: "Tumblr",
      reason: "Pode bloquear acesso externo a imagens",
      icon: "📝",
      example: "usuario.tumblr.com/post/123456789",
    },
    {
      name: "Sites com proteção de hotlinking",
      reason: "Verificam o referenciador e bloqueiam acesso externo",
      icon: "🛡️",
      example: "exemplo.com/imagem-protegida.jpg",
    },
    {
      name: "Sites com autenticação",
      reason: "Requerem login para acessar recursos",
      icon: "🔒",
      example: "site-privado.com/imagens/foto.jpg",
    },
    {
      name: "CDNs com restrições",
      reason: "Alguns CDNs configuram cabeçalhos CORS restritivos",
      icon: "☁️",
      example: "cdn.exemplo.com/imagem.jpg",
    },
  ]

  return (
    <div className="my-6">
      <Alert className="mb-4 bg-amber-50 border-amber-200">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <AlertTitle className="text-amber-800 font-medium text-lg">Restrições de Imagens</AlertTitle>
        <AlertDescription className="text-amber-700">
          Alguns sites implementam proteções que impedem o carregamento direto de suas imagens em aplicações externas.
        </AlertDescription>
      </Alert>

      <ul className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
        {restrictedSites.map((site, index) => (
          <li key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
            <span className="text-2xl" aria-hidden="true">
              {site.icon}
            </span>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{site.name}</h3>
              <p className="text-muted-foreground">{site.reason}</p>
              <div className="mt-1 p-2 bg-gray-50 rounded text-sm border border-gray-100 overflow-x-auto">
                <code className="text-red-500">❌ {site.example}</code>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-blue-800 text-center text-lg">
          <strong>Dica:</strong> Para melhores resultados, faça upload direto de imagens do seu dispositivo ou use
          nossos templates.
        </p>
      </div>
    </div>
  )
}
