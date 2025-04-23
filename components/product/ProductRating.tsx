import Link from "next/link";

export default function ProductRating({
  rating,
  reviews,
}: {
  rating: number;
  reviews?: number;
}) {
  return (
    <Link href="#" className="flex items-center gap-2 group">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15.27L16.18 19l-1.64-7.03L19 7.24l-7.19-.61L10 .25 8.19 6.63 1 7.24l5.46 4.73L5.82 19z" />
          </svg>
        ))}
      </div>
      <span className="text-sm group-hover:underline underline-offset-2">
        {reviews ? `${reviews} reviews` : ""}
      </span>
    </Link>
  );
}
