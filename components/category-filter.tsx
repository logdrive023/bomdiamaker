"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TemplateCategory =
  | "Todos"
  | "Religioso"
  | "Natureza"
  | "Café"
  | "Família"
  | "Motivacional"
  | "Animais"
  | "Dias da Semana"

interface CategoryFilterProps {
  categories: TemplateCategory[]
  activeCategory: TemplateCategory
  onChange: (category: TemplateCategory) => void
  className?: string
}

export function CategoryFilter({ categories, activeCategory, onChange, className }: CategoryFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          className={cn("rounded-full", activeCategory === category && "bg-yellow-500 hover:bg-yellow-600 text-white")}
          onClick={() => onChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
