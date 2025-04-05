import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Men",
    image: "/categories/men.webp",
    href: "/categories/men",
  },
  {
    name: "Women",
    image: "/categories/women.webp",
    href: "/categories/women",
  },
  {
    name: "Straps & Bands",
    image: "/categories/straps.webp",
    href: "/categories/straps",
  },
  {
    name: "Gift & Pouches",
    image: "/categories/gifts.jpg",
    href: "/products/gifts",
  },
];

export default function Categories() {
  return (
    <section className="py-12 px-5 lg:px-10">
      <div className="grid auto-cols-[80vw] sm:auto-cols-[60vw] md:auto-cols-[40vw] grid-cols-none grid-flow-col lg:grid-cols-4 gap-5 lg:gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative overflow-hidden snap-center snap-always h-[50vh]"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-light uppercase text-white">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
