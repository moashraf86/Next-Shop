"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Carousel() {
  // carousel data
  const carouselData = [
    {
      title: "Limited Edition Frederique Constant",
      slogan: "1988 Moonphase",
      image: "/hero-1.webp",
      links: [
        {
          text: "Shop The Watch",
          href: "/shop",
        },
      ],
      align: "start",
    },
    {
      title: "Clean & Classic Design",
      slogan: "1988 Slimline",
      image: "/hero-2.webp",
      links: [
        {
          text: "Shop The Watch",
          href: "/shop",
        },
        {
          text: "Learn More",
          href: "/about",
        },
      ],
      align: "center",
    },
    {
      title: "Women's Collection",
      slogan: "1988 Moonphase",
      image: "/hero-3.webp",
      links: [
        {
          text: "Shop The Watch",
          href: "/shop",
        },
      ],
      align: "start",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeSlide = carouselData[activeIndex];
  const nextSlide = () =>
    setActiveIndex((activeIndex + 1) % carouselData.length);

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="relative h-[90dvh]">
      <div className="absolute inset-0 bg-black/20 z-[1]"></div>
      {/* slide images */}
      {carouselData.map((_, index) => (
        <div key={index} className="absolute inset-0">
          <Image
            src={carouselData[index].image}
            alt={carouselData[index].title}
            className={cn(
              "absolute inset-0 object-cover transition-opacity duration-300",
              activeIndex === index ? "opacity-100" : "opacity-0"
            )}
            fill
          />
        </div>
      ))}
      {/* slide content */}
      <div className="container mx-auto h-full max-w-5xl p-5 relative z-[2]">
        <div
          className={cn(
            "flex items-center h-full",
            activeSlide.align === "center" ? "justify-center" : "justify-start"
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-8 text-start",
              activeSlide.align === "center" ? "items-center" : "items-start"
            )}
          >
            <span className="text-primary-foreground">
              {activeSlide.slogan}
            </span>
            <h1
              className={cn(
                "text-5xl font-light uppercase text-primary-foreground max-w-[15ch] ",

                activeSlide.align === "center" ? "text-center" : "text-start"
              )}
            >
              {activeSlide.title}
            </h1>
            <div className="flex gap-4">
              {activeSlide.links.map((link, index) => (
                <Button key={index} size="lg" asChild>
                  <Link href={link.href}>{link.text}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-[2]">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative w-10 h-1 rounded-full bg-primary-foreground/50",
              activeIndex === index && "bg-primary-foreground"
            )}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
