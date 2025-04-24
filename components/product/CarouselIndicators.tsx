import { StrapiImage } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CarouselIndicators({
  images,
  current,
  handleScrollToImage,
}: {
  images: StrapiImage[];
  current: number;
  handleScrollToImage: (index: number) => void;
}) {
  return (
    <div className="grid grid-flow-col auto-cols-fr sm:auto-cols-max gap-2 p-2 lg:flex lg:flex-col">
      {images.map((image, index) => (
        <button
          key={image.id}
          className={cn(
            "relative w-full aspect-square sm:w-28 sm:h-32 lg:w-16 lg:h-20 xl:w-20 xl:h-24 p-3 after:absolute after:content-[''] after:inset-[-3px] after:bg-transparent after:border-2 after:border-primary after:z-[-1] after:transition-transform after:duration-200 after:ease",
            {
              " after:scale-100 after:opacity-100": current === index,
              "after:scale-90 after:opacity-0": current !== index,
            }
          )}
          onClick={() => handleScrollToImage(index)}
        >
          <Image
            src={images[index].formats?.thumbnail?.url || images[index].url}
            alt={images[index].alternativeText || "Product Image"}
            fill
            quality={100}
            className="object-cover object-center"
          />
        </button>
      ))}
    </div>
  );
}
