import { StrapiImage } from "@/lib/definitions";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useRef, useState } from "react";
import CarouselIndicators from "./CarouselIndicators";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@uidotdev/usehooks";
export default function ProductCarousel({
  images,
  className,
  resetCarousel,
}: {
  images: StrapiImage[];
  className?: string;
  resetCarousel?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const imageHeight = useRef<HTMLImageElement>(null);
  const [indicatorsMaxHeight, setIndicatorsMaxHeight] = useState<number>(
    imageHeight.current?.clientHeight || 0
  );
  const size = useWindowSize();

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

  // Handle window resize
  useEffect(() => {
    if (imageHeight.current) {
      const height = imageHeight.current.clientHeight;
      setIndicatorsMaxHeight(height);
    }
  }, [size]);

  useEffect(() => {
    // reset the carousel to the first image when the selected color/size changes
    setCurrent(0);
    api?.scrollTo(0);
  }, [resetCarousel]);

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
        indicatorsMaxHeight={indicatorsMaxHeight}
        className="hidden md:block"
      />
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              ref={imageHeight}
              src={image.url}
              alt={image.alternativeText || "Product image"}
              height={500}
              width={500}
              className="object-cover object-center aspect-auto w-full cursor-grab"
              quality={100}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw"
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center justify-end gap-2 md:hidden h-8 bg-primary/40 rounded-full backdrop-blur-lg text-primary-foreground">
        <CarouselPrevious className="static translate-0 bg-transparent border-0 shadow-none hover:bg-transparent hover:text-primary-foreground" />
        <span>
          {current + 1} / {images.length}
        </span>
        <CarouselNext className="static translate-0 bg-transparent border-0 shadow-none hover:bg-transparent hover:text-primary-foreground" />
      </div>
    </Carousel>
  );
}
