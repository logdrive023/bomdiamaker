// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// interface ImageCacheContextType {
//   getCachedImage: (url: string) => string | null
//   cacheImage: (url: string, dataUrl: string) => void
//   preloadImage: (url: string) => Promise<string>
// }

// const ImageCacheContext = createContext<ImageCacheContextType | undefined>(undefined)

// // Cache expiration time (24 hours in milliseconds)
// const CACHE_EXPIRATION = 24 * 60 * 60 * 1000

// // Maximum size for a single cached image (in bytes) - approximately 1MB
// const MAX_SINGLE_CACHE_SIZE = 1 * 1024 * 1024

// // Target quality for image compression (0-1)
// const IMAGE_QUALITY = 0.7

// interface CachedImage {
//   dataUrl: string
//   timestamp: number
// }

// interface ImageCacheProviderProps {
//   children: ReactNode
// }

// export function ImageCacheProvider({ children }: ImageCacheProviderProps) {
//   const [isInitialized, setIsInitialized] = useState(false)

//   // Initialize and clean up expired cache entries
//   useEffect(() => {
//     if (typeof window === "undefined") return

//     try {
//       // Clean up expired cache entries
//       const now = Date.now()
//       const cacheKeys = Object.keys(localStorage).filter((key) => key.startsWith("img_cache_"))

//       cacheKeys.forEach((key) => {
//         try {
//           const item = JSON.parse(localStorage.getItem(key) || "")
//           if (now - item.timestamp > CACHE_EXPIRATION) {
//             localStorage.removeItem(key)
//           }
//         } catch (e) {
//           localStorage.removeItem(key)
//         }
//       })

//       setIsInitialized(true)
//     } catch (error) {
//       console.error("Error initializing image cache:", error)
//       setIsInitialized(true)
//     }
//   }, [])

//   // Get cached image data URL
//   const getCachedImage = (url: string): string | null => {
//     if (typeof window === "undefined") return null

//     try {
//       const cacheKey = `img_cache_${url}`
//       const cachedItem = localStorage.getItem(cacheKey)

//       if (!cachedItem) return null

//       const { dataUrl, timestamp } = JSON.parse(cachedItem) as CachedImage

//       // Check if cache is expired
//       if (Date.now() - timestamp > CACHE_EXPIRATION) {
//         localStorage.removeItem(cacheKey)
//         return null
//       }

//       return dataUrl
//     } catch (error) {
//       console.error("Error getting cached image:", error)
//       return null
//     }
//   }

//   // Calculate the size of a string in bytes
//   const getStringByteSize = (str: string): number => {
//     // Quick approximation of string size in bytes
//     return new Blob([str]).size
//   }

//   // Make space in localStorage by removing oldest items
//   const makeSpaceInCache = (requiredBytes: number): boolean => {
//     try {
//       // Get all cache items sorted by timestamp (oldest first)
//       const cacheItems: { key: string; timestamp: number; size: number }[] = []

//       for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i)
//         if (key && key.startsWith("img_cache_")) {
//           try {
//             const item = JSON.parse(localStorage.getItem(key) || "")
//             const size = getStringByteSize(localStorage.getItem(key) || "")
//             cacheItems.push({ key, timestamp: item.timestamp, size })
//           } catch (e) {
//             localStorage.removeItem(key)
//           }
//         }
//       }

//       // Sort by timestamp (oldest first)
//       cacheItems.sort((a, b) => a.timestamp - b.timestamp)

//       // Remove oldest items until we have enough space
//       let freedSpace = 0
//       for (const item of cacheItems) {
//         localStorage.removeItem(item.key)
//         freedSpace += item.size

//         if (freedSpace >= requiredBytes) {
//           return true
//         }
//       }

//       return freedSpace > 0
//     } catch (error) {
//       console.error("Error making space in cache:", error)
//       return false
//     }
//   }

//   // Compress image to reduce size
//   const compressImage = (img: HTMLImageElement, quality: number = IMAGE_QUALITY): string => {
//     const canvas = document.createElement("canvas")

//     // Calculate dimensions - limit max dimensions to reduce size
//     const MAX_DIMENSION = 1200
//     let width = img.width
//     let height = img.height

//     if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
//       if (width > height) {
//         height = Math.round((height * MAX_DIMENSION) / width)
//         width = MAX_DIMENSION
//       } else {
//         width = Math.round((width * MAX_DIMENSION) / height)
//         height = MAX_DIMENSION
//       }
//     }

//     canvas.width = width
//     canvas.height = height

//     const ctx = canvas.getContext("2d")
//     if (!ctx) {
//       throw new Error("Could not get canvas context")
//     }

//     ctx.drawImage(img, 0, 0, width, height)

//     // Use lower quality JPEG for photos, PNG for graphics with transparency
//     const format = img.src.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg"
//     return canvas.toDataURL(format, quality)
//   }

//   // Cache image data URL
//   const cacheImage = (url: string, dataUrl: string): void => {
//     if (typeof window === "undefined") return

//     try {
//       const cacheKey = `img_cache_${url}`
//       const cacheItem: CachedImage = {
//         dataUrl,
//         timestamp: Date.now(),
//       }

//       const itemString = JSON.stringify(cacheItem)
//       const itemSize = getStringByteSize(itemString)

//       // Skip if the item is too large to reasonably cache
//       if (itemSize > MAX_SINGLE_CACHE_SIZE) {
//         console.warn(`Image too large to cache: ${url} (${Math.round(itemSize / 1024)}KB)`)
//         return
//       }

//       try {
//         // Try to store the item
//         localStorage.setItem(cacheKey, itemString)
//       } catch (e) {
//         // If storage is full, try to make space
//         if (e instanceof DOMException && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED")) {
//           console.warn("Cache storage full, removing older items")

//           // Try to make space and store again
//           if (makeSpaceInCache(itemSize)) {
//             try {
//               localStorage.setItem(cacheKey, itemString)
//             } catch (finalError) {
//               console.error("Still couldn't cache image after clearing space")
//             }
//           }
//         } else {
//           console.error("Error caching image:", e)
//         }
//       }
//     } catch (error) {
//       console.error("Error in cache process:", error)
//     }
//   }

//   // Preload and cache an image
//   const preloadImage = async (url: string): Promise<string> => {
//     // Check if image is already cached
//     const cachedDataUrl = getCachedImage(url)
//     if (cachedDataUrl) return cachedDataUrl

//     // Load and cache the image
//     return new Promise((resolve, reject) => {
//       const img = new Image()

//       // Only set crossOrigin for external URLs
//       if (url.startsWith("http")) {
//         img.crossOrigin = "anonymous"
//       }

//       img.onload = () => {
//         try {
//           // Compress the image to save space
//           const dataUrl = compressImage(img)

//           // Try to cache the compressed image
//           try {
//             cacheImage(url, dataUrl)
//           } catch (cacheError) {
//             console.warn("Failed to cache image, but continuing:", cacheError)
//           }

//           resolve(dataUrl)
//         } catch (error) {
//           console.error("Error creating data URL:", error)
//           reject(error)
//         }
//       }

//       img.onerror = () => {
//         reject(new Error(`Failed to load image: ${url}`))
//       }

//       img.src = url
//     })
//   }

//   const value = {
//     getCachedImage,
//     cacheImage,
//     preloadImage,
//   }

//   // Only render children once cache is initialized
//   if (!isInitialized) {
//     return null
//   }

//   return <ImageCacheContext.Provider value={value}>{children}</ImageCacheContext.Provider>
// }

// export function useImageCache() {
//   const context = useContext(ImageCacheContext)
//   if (context === undefined) {
//     throw new Error("useImageCache must be used within an ImageCacheProvider")
//   }
//   return context
// }

"use client"

import { createContext, useContext, type ReactNode } from "react"

interface ImageCacheContextType {
  getCachedImage: (url: string) => string | null
  cacheImage: (url: string, dataUrl: string) => void
  preloadImage: (url: string) => Promise<string>
}

const ImageCacheContext = createContext<ImageCacheContextType | undefined>(undefined)

interface ImageCacheProviderProps {
  children: ReactNode
}

export function ImageCacheProvider({ children }: ImageCacheProviderProps) {
  // Simplified version that doesn't actually cache images
  const getCachedImage = () => null

  const cacheImage = () => {
    // No-op function - don't cache anything
    return
  }

  const preloadImage = async (url: string): Promise<string> => {
    // Just return the original URL without caching
    return url
  }

  const value = {
    getCachedImage,
    cacheImage,
    preloadImage,
  }

  return <ImageCacheContext.Provider value={value}>{children}</ImageCacheContext.Provider>
}

export function useImageCache() {
  const context = useContext(ImageCacheContext)
  if (context === undefined) {
    throw new Error("useImageCache must be used within an ImageCacheProvider")
  }
  return context
}
