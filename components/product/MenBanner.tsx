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

export default function MenBanner({ product }: { product: Product }) {
  const title = product.faces[0].name;
  const description = product.faces[0]?.description[0]?.children[0]?.text;
  const webBanner = product.bannerImage[0].url;
  const mobileBanner = product.bannerImage[1]?.url;
  const color = product.bannerBgColor;

  return (
    <section className="relative flex items-center py-10 mb-20 bg-cover bg-center bg-no-repeat lg:min-h-[700px]">
      <div className="lg:container lg:flex items-center justify-start w-full">
        {/* Web banner */}
        <Image
          src={webBanner}
          alt="Product Banner"
          className="hidden lg:block absolute inset-0 object-cover object-center w-full h-full"
          quality={100}
          width={2800}
          height={1400}
        />
        {/* Mobile banner */}
        <Image
          src={mobileBanner}
          alt="Product Banner"
          className="lg:hidden"
          quality={100}
          width={1080}
          height={1080}
        />
        <div
          className={cn(
            "relative flex flex-col items-start justify-center space-y-6 p-10 lg:p-16 lg:max-w-md",
            `${colorVariants[color]}`
          )}
        >
          <h1 className="text-4xl font-light uppercase text-center tracking-tight text-inherit">
            {title} History
          </h1>
          <p className="text-inherit">{description}</p>
        </div>
      </div>
    </section>
  );
}
