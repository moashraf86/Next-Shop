import { StrapiImage } from "@/lib/definitions";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import CarouselIndicators from "./CarouselIndicators";
import { cn } from "@/lib/utils";

export default function ProductCarousel({
  images,
  className,
}: {
  images: StrapiImage[];
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  // handle carousel scroll to specific image
  const handleScrollToImage = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };
  // Initialize the carousel
  useEffect(() => {
    if (!api) {
      return;
    }
    // Set the current index to the first image
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      className={cn(
        "w-full flex flex-col-reverse lg:flex-row gap-4",
        className
      )}
      setApi={setApi}
    >
      <CarouselIndicators
        current={current}
        images={images}
        handleScrollToImage={handleScrollToImage}
      />
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              src={images[index % images.length].url}
              alt={
                images[index % images.length].alternativeText || "Product Image"
              }
              height={400}
              width={400}
              className="object-cover object-center aspect-auto w-full cursor-grab"
              quality={100}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw"
              loading="lazy"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
