"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full h-10 touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-primary/10">
      <SliderPrimitive.Range className="absolute h-full bg-primary/60" />
    </SliderPrimitive.Track>

    {/* Render multiple thumbs based on value length */}
    {(props.value ?? [0]).map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="flex items-center justify-center h-4 w-4 rounded-full bg-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        <Dot className="text-primary-foreground" strokeWidth="4" />
        <span className="sr-only">Slide</span>
      </SliderPrimitive.Thumb>
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
