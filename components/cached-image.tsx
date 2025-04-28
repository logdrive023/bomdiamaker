// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import Image, { type ImageProps } from "next/image"
// import { useImageCache } from "./image-cache-provider"
// import { Skeleton } from "@/components/ui/skeleton"

// interface CachedImageProps extends Omit<ImageProps, "src"> {
//   src: string
//   fallbackSrc?: string
//   loadingComponent?: React.ReactNode
// }

// export function CachedImage({
//   src,
//   fallbackSrc = "/placeholder.svg",
//   loadingComponent,
//   alt,
//   ...props
// }: CachedImageProps) {
//   const { getCachedImage, preloadImage } = useImageCache()
//   const [imageSrc, setImageSrc] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     let isMounted = true
//     setIsLoading(true)
//     setError(false)

//     // First check if image is in cache
//     const cachedSrc = getCachedImage(src)
//     if (cachedSrc) {
//       setImageSrc(cachedSrc)
//       setIsLoading(false)
//       return
//     }

//     // If not in cache, load and cache it
//     preloadImage(src)
//       .then((dataUrl) => {
//         if (isMounted) {
//           setImageSrc(dataUrl)
//           setIsLoading(false)
//         }
//       })
//       .catch((err) => {
//         console.error("Error loading image:", err)
//         if (isMounted) {
//           setError(true)
//           setIsLoading(false)

//           // If we failed to load the image, try to use the original src directly
//           // This bypasses the cache but ensures the user sees something
//           if (src) {
//             const directImg = new Image()
//             directImg.onload = () => {
//               if (isMounted) {
//                 setImageSrc(src)
//                 setError(false)
//               }
//             }
//             directImg.src = src
//           }

//           // Also try to load fallback
//           if (fallbackSrc && fallbackSrc !== src) {
//             preloadImage(fallbackSrc)
//               .then((dataUrl) => {
//                 if (isMounted && !imageSrc) {
//                   setImageSrc(dataUrl)
//                 }
//               })
//               .catch(() => {
//                 // If fallback also fails, we'll just show the error state
//               })
//           }
//         }
//       })

//     return () => {
//       isMounted = false
//     }
//   }, [src, fallbackSrc, getCachedImage, preloadImage])

//   if (isLoading) {
//     return loadingComponent || <Skeleton className="h-full w-full" />
//   }

//   if (error && !imageSrc) {
//     return (
//       <div className="flex h-full w-full items-center justify-center bg-muted">
//         <p className="text-sm text-muted-foreground">Falha ao carregar imagem</p>
//       </div>
//     )
//   }

//   // If we have a data URL from cache, use it with the Image component
//   // Otherwise, fall back to the original src or fallback
//   return (
//     <Image
//       src={imageSrc || src || fallbackSrc}
//       alt={alt}
//       {...props}
//       unoptimized={imageSrc?.startsWith("data:")} // Don't optimize data URLs
//     />
//   )
// }

"use client"

import type React from "react"
import Image, { type ImageProps } from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

interface CachedImageProps extends Omit<ImageProps, "src"> {
  src: string
  fallbackSrc?: string
  loadingComponent?: React.ReactNode
}

export function CachedImage({
  src,
  fallbackSrc = "/placeholder.svg",
  loadingComponent,
  alt,
  ...props
}: CachedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  const handleError = () => {
    console.error("Error loading image:", src)
    setError(true)
    setImageSrc(fallbackSrc)
  }

  if (isLoading && loadingComponent) {
    return <>{loadingComponent}</>
  }

  return (
    <>
      {isLoading && <Skeleton className="h-full w-full" />}
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        {...props}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
        style={{
          ...props.style,
          display: isLoading ? "none" : "block",
        }}
      />
    </>
  )
}
