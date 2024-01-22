import React from "react";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-200",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  variant?: keyof typeof ratingVariants;
}

const Ratings = ({
  rating,
  totalStars = 5,
  variant = "default",
  ...props
}: RatingsProps) => {
  const fullStars = Math.min(Math.floor(rating), totalStars);
  const emptyStars = totalStars - fullStars;

  return (
    <div className="flex items-center gap-2" {...props}>
      {[...Array(fullStars)].map((_, i) => (
        <StarFilledIcon
          key={i}
          className={`fill-current ${ratingVariants[variant].star}`}
        />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon
          key={i}
          className={`fill-current ${ratingVariants[variant].emptyStar}`}
        />
      ))}
    </div>
  );
};

export { Ratings };
