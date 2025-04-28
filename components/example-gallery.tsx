// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { CachedImage } from "@/components/cached-image"

// const examples = [
//   {
//     id: 1,
//     title: "Bom dia com flores",
//     image: "/templates/flower-blessing.png",
//   },
//   {
//     id: 2,
//     title: "Bom dia motivacional",
//     image: "/templates/sunrise-blessing.png",
//   },
//   {
//     id: 3,
//     title: "Bom dia com café",
//     image: "/templates/coffee-morning-joy.png",
//   },
//   {
//     id: 4,
//     title: "Bom dia natureza",
//     image: "/templates/mountain-dawn.png",
//   },
// ]

// export function ExampleGallery() {
//   return (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//       {examples.map((example) => (
//         <div
//           key={example.id}
//           className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
//         >
//           <div className="relative aspect-[4/3] overflow-hidden">
//             <CachedImage
//               src={example.image}
//               alt={example.title}
//               fill
//               className="object-cover transition-transform duration-300 group-hover:scale-105"
//               unoptimized
//             />
//           </div>
//           <div className="p-4">
//             <h3 className="mb-2 font-medium">{example.title}</h3>
//             <Link href="/editor">
//               <Button variant="outline" size="sm" className="w-full">
//                 Criar similar
//               </Button>
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const examples = [
  {
    id: 1,
    title: "Bom dia com flores",
    image: "/templates/flower-blessing.png",
  },
  {
    id: 2,
    title: "Bom dia motivacional",
    image: "/templates/sunrise-blessing.png",
  },
  {
    id: 3,
    title: "Bom dia com café",
    image: "/templates/coffee-morning-joy.png",
  },
  {
    id: 4,
    title: "Bom dia natureza",
    image: "/templates/mountain-dawn.png",
  },
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
              src={example.image || "/placeholder.svg"}
              alt={example.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          </div>
          <div className="p-4">
            <h3 className="mb-2 font-medium">{example.title}</h3>
            <Link href="/editor">
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
