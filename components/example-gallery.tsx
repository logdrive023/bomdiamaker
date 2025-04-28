import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Função para gerar URL de placeholder com descrição específica
const getImageUrl = (image: string, title: string) => {
  // Lista de imagens que sabemos que existem
  const existingImages = [
    "/templates/flower-blessing.png",
    "/templates/sunrise-blessing.png",
    "/templates/coffee-morning-joy.png",
  ]

  // Se a imagem existe, use-a
  if (existingImages.includes(image)) {
    return image
  }

  // Gerar descrições específicas baseadas no título
  let description = title
  if (title === "Bom dia com flores") {
    description = "Rosa rosa com gotas de orvalho em close-up"
  } else if (title === "Bom dia motivacional") {
    description = "Nascer do sol sobre o oceano com reflexo na água"
  } else if (title === "Bom dia com café") {
    description = "Xícara de café fumegante em mesa de madeira com luz do sol"
  } 
  {/*else if (title === "Bom dia natureza") {
    description = "Montanhas verdes com cachoeira e céu azul"
  }*/}

  // Gerar um placeholder com a descrição
  return `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(description)}`
}

const examples = [
  {
    id: 1,
    title: "Bom dia com flores",
    image: "/templates/flower-blessing.png",
    templateId: 10, // ID do template correspondente
  },
  {
    id: 2,
    title: "Bom dia motivacional",
    image: "/templates/sunrise-blessing.png",
    templateId: 9, // ID do template correspondente
  },
  {
    id: 3,
    title: "Bom dia com café",
    image: "/templates/coffee-morning-joy.png",
    templateId: 5, // ID do template correspondente
  },
  {
    id: 4,
    title: "Bom dia natureza",
    image: "/templates/mountain-dawn.png",
    templateId: 6, // ID do template correspondente
  }
]

export function ExampleGallery() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {examples.map((example) => (
        <div
          key={example.id}
          className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={getImageUrl(example.image, example.title) || "/placeholder.svg"}
              alt={example.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          </div>
          <div className="p-4">
            <h3 className="mb-2 font-medium">{example.title}</h3>
            <Link href={`/editor?template=${example.templateId}`}>
              <Button variant="outline" size="sm" className="w-full">
                Criar similar
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
