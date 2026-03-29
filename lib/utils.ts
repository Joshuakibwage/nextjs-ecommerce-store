import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getProductImage = (imageUrlArray: string[] | null | undefined, productName: string) => {
  if (Array.isArray(imageUrlArray) && imageUrlArray[0]?.trim()) {
    return imageUrlArray[0]
  }
  return `https://placehold.co/400x300?text=${encodeURIComponent(productName)}`
}