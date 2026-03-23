// components/ui/star-rating.tsx
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number        // e.g. 3.5
  maxRating?: number    // default 5
  className?: string
}

const StarRating = ({ rating, maxRating = 5, className }: StarRatingProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted-foreground"
          )}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">{rating}/5</span>
    </div>
  )
}

export default StarRating