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
            "relative w-full aspect-square sm:w-28 sm:h-32 lg:w-16 lg:h-20 xl:w-20 xl:h-24 p-3",
            {
              "border-2 border-emphasis": current === index,
              "border-transparent": current !== index,
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
