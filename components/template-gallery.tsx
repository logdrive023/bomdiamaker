// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Search } from "lucide-react"
// import { CachedImage } from "@/components/cached-image"

// // Definição das categorias
// type TemplateCategory =
//   | "Todos"
//   | "Religioso"
//   | "Natureza"
//   | "Café"
//   | "Família"
//   | "Motivacional"
//   | "Animais"
//   | "Dias da Semana"

// interface Template {
//   id: number
//   title: string
//   description: string
//   image: string
//   categories: TemplateCategory[]
// }

// const templates: Template[] = [
//   {
//     id: 1,
//     title: "Bom dia sexta-feira",
//     description: "Celebre o fim da semana com esta mensagem animada",
//     image: "/friday-coffee-joy.png",
//     categories: ["Café", "Dias da Semana"],
//   },
//   {
//     id: 2,
//     title: "Bom dia com amor",
//     description: "Mensagem carinhosa para enviar a quem você ama",
//     image: "/heart-filled-morning.png",
//     categories: ["Motivacional"],
//   },
//   {
//     id: 3,
//     title: "Bom dia para família",
//     description: "Mensagem especial para compartilhar com a família",
//     image: "/templates/family-morning.png",
//     categories: ["Família", "Religioso"],
//   },
//   {
//     id: 4,
//     title: "Bom dia motivacional",
//     description: "Comece o dia com motivação e energia positiva",
//     image: "/new-day-wisdom.png",
//     categories: ["Motivacional"],
//   },
//   {
//     id: 5,
//     title: "Bom dia com café",
//     description: "Para os amantes de café começarem bem o dia",
//     image: "/templates/coffee-morning-joy.png",
//     categories: ["Café"],
//   },
//   {
//     id: 6,
//     title: "Bom dia natureza",
//     description: "Mensagem com belas paisagens naturais",
//     image: "/templates/mountain-dawn.png",
//     categories: ["Natureza"],
//   },
//   {
//     id: 7,
//     title: "Bom dia religioso",
//     description: "Mensagem com bênçãos para o novo dia",
//     image: "/templates/prayer-morning.png",
//     categories: ["Religioso"],
//   },
//   {
//     id: 8,
//     title: "Bom dia segunda-feira",
//     description: "Comece a semana com o pé direito",
//     image: "/templates/monday-motivation.png",
//     categories: ["Motivacional", "Dias da Semana"],
//   },
//   {
//     id: 9,
//     title: "Nascer do sol abençoado",
//     description: "Comece o dia com a beleza do nascer do sol",
//     image: "/templates/sunrise-blessing.png",
//     categories: ["Natureza", "Religioso"],
//   },
//   {
//     id: 10,
//     title: "Bom dia com flores",
//     description: "Mensagem florida para alegrar o dia de alguém especial",
//     image: "/templates/flower-blessing.png",
//     categories: ["Natureza"],
//   },
//   {
//     id: 11,
//     title: "Bom dia com pássaros",
//     description: "Desperte com o canto dos pássaros e muita alegria",
//     image: "/templates/bird-morning-song.png",
//     categories: ["Natureza", "Animais"],
//   },
//   {
//     id: 12,
//     title: "Bom dia praia",
//     description: "Mensagem com a tranquilidade do mar pela manhã",
//     image: "/templates/beach-morning.png",
//     categories: ["Natureza"],
//   },
//   {
//     id: 13,
//     title: "Bom dia jardim",
//     description: "Comece o dia com a beleza das flores do jardim",
//     image: "/templates/garden-morning.png",
//     categories: ["Natureza"],
//   },
//   {
//     id: 14,
//     title: "Bom dia girassol",
//     description: "Mensagem radiante como um girassol pela manhã",
//     image: "/templates/sunflower-morning.png",
//     categories: ["Natureza"],
//   },
//   {
//     id: 15,
//     title: "Bom dia bíblico",
//     description: "Comece o dia com uma mensagem de fé e esperança",
//     image: "/templates/bible-morning.png",
//     categories: ["Religioso"],
//   },
//   {
//     id: 16,
//     title: "Bom dia borboleta",
//     description: "Mensagem de transformação e novos começos",
//     image: "/templates/butterfly-morning.png",
//     categories: ["Natureza", "Animais", "Motivacional"],
//   },
//   {
//     id: 17,
//     title: "Bom dia arco-íris",
//     description: "Mensagem de esperança após a tempestade",
//     image: "/templates/rainbow-blessing.png",
//     categories: ["Natureza", "Motivacional"],
//   },
//   {
//     id: 18,
//     title: "Bom dia chá",
//     description: "Momento tranquilo de reflexão com uma xícara de chá",
//     image: "/templates/tea-meditation.png",
//     categories: ["Café"],
//   },
//   {
//     id: 19,
//     title: "Bom dia gratidão",
//     description: "Comece o dia agradecendo pelas bênçãos",
//     image: "/templates/gratitude-morning.png",
//     categories: ["Religioso", "Motivacional"],
//   },
//   {
//     id: 20,
//     title: "Bom dia janela",
//     description: "Desperte com a luz do sol entrando pela janela",
//     image: "/templates/window-morning.png",
//     categories: ["Natureza"],
//   },
//   {
//     id: 21,
//     title: "Bom dia café da manhã",
//     description: "Mensagem com um delicioso café da manhã",
//     image: "/templates/bread-breakfast.png",
//     categories: ["Café"],
//   },
//   {
//     id: 22,
//     title: "Bom dia gatinho",
//     description: "Mensagem fofa com um gatinho para alegrar o dia",
//     image: "/templates/cat-morning.png",
//     categories: ["Animais"],
//   },
//   {
//     id: 23,
//     title: "Bom dia sexta-feira",
//     description: "Celebre a chegada do fim de semana",
//     image: "/templates/friday-celebration.png",
//     categories: ["Dias da Semana", "Motivacional"],
//   },
//   {
//     id: 24,
//     title: "Bom dia abençoado",
//     description: "Mensagem de bênçãos para um novo dia",
//     image: "/blessed-morning-garden.png",
//     categories: ["Religioso"],
//   },
// ]

// // Lista de todas as categorias disponíveis
// const allCategories: TemplateCategory[] = [
//   "Todos",
//   "Religioso",
//   "Natureza",
//   "Café",
//   "Família",
//   "Motivacional",
//   "Animais",
//   "Dias da Semana",
// ]

// export function TemplateGallery() {
//   const [activeCategory, setActiveCategory] = useState<TemplateCategory>("Todos")
//   const [searchQuery, setSearchQuery] = useState("")

//   // Filtra os templates com base na categoria ativa e na busca
//   const filteredTemplates = templates.filter((template) => {
//     // Primeiro filtra por categoria
//     const matchesCategory = activeCategory === "Todos" || template.categories.includes(activeCategory)

//     // Depois filtra por busca (se houver)
//     const matchesSearch =
//       searchQuery === "" ||
//       template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       template.description.toLowerCase().includes(searchQuery.toLowerCase())

//     return matchesCategory && matchesSearch
//   })

//   return (
//     <div className="space-y-6">
//       {/* Barra de pesquisa */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//         <Input
//           placeholder="Pesquisar templates..."
//           className="pl-10"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Tabs de categorias */}
//       <Tabs
//         defaultValue="Todos"
//         value={activeCategory}
//         onValueChange={(value) => setActiveCategory(value as TemplateCategory)}
//       >
//         <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-2">
//           {allCategories.map((category) => (
//             <TabsTrigger key={category} value={category} className="rounded-full px-4 py-2">
//               {category}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {/* Conteúdo dos templates */}
//         <TabsContent value={activeCategory} className="mt-0">
//           {filteredTemplates.length > 0 ? (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {filteredTemplates.map((template) => (
//                 <div
//                   key={template.id}
//                   className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
//                 >
//                   <div className="relative aspect-[4/3] overflow-hidden">
//                     <CachedImage
//                       src={template.image}
//                       alt={template.title}
//                       fill
//                       className="object-cover transition-transform duration-300 group-hover:scale-105"
//                       unoptimized
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="mb-1 font-medium">{template.title}</h3>
//                     <p className="mb-3 text-sm text-muted-foreground">{template.description}</p>
//                     <div className="mb-3 flex flex-wrap gap-1">
//                       {template.categories.map((category) => (
//                         <span
//                           key={`${template.id}-${category}`}
//                           className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
//                         >
//                           {category}
//                         </span>
//                       ))}
//                     </div>
//                     <Link href={`/editor?template=${template.id}`}>
//                       <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Usar este template</Button>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <p className="text-lg font-medium">Nenhum template encontrado</p>
//               <p className="text-muted-foreground">Tente outra categoria ou termo de busca</p>
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"

// Definição das categorias
type TemplateCategory =
  | "Todos"
  | "Religioso"
  | "Natureza"
  | "Café"
  | "Família"
  | "Motivacional"
  | "Animais"
  | "Dias da Semana"

interface Template {
  id: number
  title: string
  description: string
  image: string
  categories: TemplateCategory[]
}

const templates: Template[] = [
  {
    id: 1,
    title: "Bom dia sexta-feira",
    description: "Celebre o fim da semana com esta mensagem animada",
    image: "/friday-coffee-joy.png",
    categories: ["Café", "Dias da Semana"],
  },
  {
    id: 2,
    title: "Bom dia com amor",
    description: "Mensagem carinhosa para enviar a quem você ama",
    image: "/heart-filled-morning.png",
    categories: ["Motivacional"],
  },
  {
    id: 3,
    title: "Bom dia para família",
    description: "Mensagem especial para compartilhar com a família",
    image: "/templates/family-morning.png",
    categories: ["Família", "Religioso"],
  },
  {
    id: 4,
    title: "Bom dia motivacional",
    description: "Comece o dia com motivação e energia positiva",
    image: "/new-day-wisdom.png",
    categories: ["Motivacional"],
  },
  {
    id: 5,
    title: "Bom dia com café",
    description: "Para os amantes de café começarem bem o dia",
    image: "/templates/coffee-morning-joy.png",
    categories: ["Café"],
  },
  {
    id: 6,
    title: "Bom dia natureza",
    description: "Mensagem com belas paisagens naturais",
    image: "/templates/mountain-dawn.png",
    categories: ["Natureza"],
  },
  {
    id: 7,
    title: "Bom dia religioso",
    description: "Mensagem com bênçãos para o novo dia",
    image: "/templates/prayer-morning.png",
    categories: ["Religioso"],
  },
  {
    id: 8,
    title: "Bom dia segunda-feira",
    description: "Comece a semana com o pé direito",
    image: "/templates/monday-motivation.png",
    categories: ["Motivacional", "Dias da Semana"],
  },
  {
    id: 9,
    title: "Nascer do sol abençoado",
    description: "Comece o dia com a beleza do nascer do sol",
    image: "/templates/sunrise-blessing.png",
    categories: ["Natureza", "Religioso"],
  },
  {
    id: 10,
    title: "Bom dia com flores",
    description: "Mensagem florida para alegrar o dia de alguém especial",
    image: "/templates/flower-blessing.png",
    categories: ["Natureza"],
  },
  {
    id: 11,
    title: "Bom dia com pássaros",
    description: "Desperte com o canto dos pássaros e muita alegria",
    image: "/templates/bird-morning-song.png",
    categories: ["Natureza", "Animais"],
  },
  {
    id: 12,
    title: "Bom dia praia",
    description: "Mensagem com a tranquilidade do mar pela manhã",
    image: "/templates/beach-morning.png",
    categories: ["Natureza"],
  },
  {
    id: 13,
    title: "Bom dia jardim",
    description: "Comece o dia com a beleza das flores do jardim",
    image: "/templates/garden-morning.png",
    categories: ["Natureza"],
  },
  {
    id: 14,
    title: "Bom dia girassol",
    description: "Mensagem radiante como um girassol pela manhã",
    image: "/templates/sunflower-morning.png",
    categories: ["Natureza"],
  },
  {
    id: 15,
    title: "Bom dia bíblico",
    description: "Comece o dia com uma mensagem de fé e esperança",
    image: "/templates/bible-morning.png",
    categories: ["Religioso"],
  },
  {
    id: 16,
    title: "Bom dia borboleta",
    description: "Mensagem de transformação e novos começos",
    image: "/templates/butterfly-morning.png",
    categories: ["Natureza", "Animais", "Motivacional"],
  },
  {
    id: 17,
    title: "Bom dia arco-íris",
    description: "Mensagem de esperança após a tempestade",
    image: "/templates/rainbow-blessing.png",
    categories: ["Natureza", "Motivacional"],
  },
  {
    id: 18,
    title: "Bom dia chá",
    description: "Momento tranquilo de reflexão com uma xícara de chá",
    image: "/templates/tea-meditation.png",
    categories: ["Café"],
  },
  {
    id: 19,
    title: "Bom dia gratidão",
    description: "Comece o dia agradecendo pelas bênçãos",
    image: "/templates/gratitude-morning.png",
    categories: ["Religioso", "Motivacional"],
  },
  {
    id: 20,
    title: "Bom dia janela",
    description: "Desperte com a luz do sol entrando pela janela",
    image: "/templates/window-morning.png",
    categories: ["Natureza"],
  },
  {
    id: 21,
    title: "Bom dia café da manhã",
    description: "Mensagem com um delicioso café da manhã",
    image: "/templates/bread-breakfast.png",
    categories: ["Café"],
  },
  {
    id: 22,
    title: "Bom dia gatinho",
    description: "Mensagem fofa com um gatinho para alegrar o dia",
    image: "/templates/cat-morning.png",
    categories: ["Animais"],
  },
  {
    id: 23,
    title: "Bom dia sexta-feira",
    description: "Celebre a chegada do fim de semana",
    image: "/templates/friday-celebration.png",
    categories: ["Dias da Semana", "Motivacional"],
  },
  {
    id: 24,
    title: "Bom dia abençoado",
    description: "Mensagem de bênçãos para um novo dia",
    image: "/blessed-morning-garden.png",
    categories: ["Religioso"],
  },
]

// Lista de todas as categorias disponíveis
const allCategories: TemplateCategory[] = [
  "Todos",
  "Religioso",
  "Natureza",
  "Café",
  "Família",
  "Motivacional",
  "Animais",
  "Dias da Semana",
]

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("Todos")
  const [searchQuery, setSearchQuery] = useState("")

  // Filtra os templates com base na categoria ativa e na busca
  const filteredTemplates = templates.filter((template) => {
    // Primeiro filtra por categoria
    const matchesCategory = activeCategory === "Todos" || template.categories.includes(activeCategory)

    // Depois filtra por busca (se houver)
    const matchesSearch =
      searchQuery === "" ||
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Barra de pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar templates..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs de categorias */}
      <Tabs
        defaultValue="Todos"
        value={activeCategory}
        onValueChange={(value) => setActiveCategory(value as TemplateCategory)}
      >
        <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-2">
          {allCategories.map((category) => (
            <TabsTrigger key={category} value={category} className="rounded-full px-4 py-2">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Conteúdo dos templates */}
        <TabsContent value={activeCategory} className="mt-0">
          {filteredTemplates.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 font-medium">{template.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{template.description}</p>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {template.categories.map((category) => (
                        <span
                          key={`${template.id}-${category}`}
                          className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <Link href={`/editor?template=${template.id}`}>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Usar este template</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg font-medium">Nenhum template encontrado</p>
              <p className="text-muted-foreground">Tente outra categoria ou termo de busca</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
