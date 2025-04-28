import { Product } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ColorVariant = {
  [key: string]: string;
};

const colorVariants: ColorVariant = {
  black: "bg-black text-black-foreground",
  white: "bg-white text-white-foreground",
  midnight: "bg-midnight text-midnight-foreground",
  green: "bg-green text-green-foreground",
  blue: "bg-blue text-blue-foreground",
};

export default function WomenBanner({ product }: { product: Product }) {
  const title = product.faces[0].name;
  const description = product.faces[0].description[0].children[0].text;
  const webBanner = product.bannerImage[0].url;
  const color = product.color;

  return (
    <section className="relative py-14 mb-20">
      <div
        className={cn(
          "absolute right-0 bottom-0 left-0 w-full h-[calc(35vh+6rem)] lg:w-[calc(50vw+6rem)] lg:h-full lg:top-0 lg:left-auto z-0",
          `${colorVariants[color]}`
        )}
      ></div>
      <div className="container px-10">
        <div className="relative z-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          <div className="basis-1/2">
            <Image
              src={webBanner}
              alt="Product Banner"
              width={1800}
              height={1800}
              quality={100}
              loading="lazy"
              className=""
            />
          </div>
          <div
            className={cn(
              "text-center space-y-6 basis-1/2 max-w-[470px]",
              `${colorVariants[color]}`
            )}
          >
            <span className="text-xs font-semibold uppercase">About</span>
            <h1 className="text-4xl font-light uppercase text-center tracking-tight text-inherit">
              {title} History
            </h1>
            <p className="text-inherit leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
