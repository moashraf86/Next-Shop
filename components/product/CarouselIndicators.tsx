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
    <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory p-2 xl:flex xl:flex-col xl:overflow-x-visible">
      {images.map((image, index) => (
        <button
          key={image.id}
          className={cn("relative w-16 h-20 sm:w-20 sm:h-24 p-3", {
            "border-2 border-emphasis": current === index,
            "border-transparent": current !== index,
          })}
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
