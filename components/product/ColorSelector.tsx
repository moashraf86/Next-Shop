import { cn } from "@/lib/utils";
import { Color } from "@/lib/definitions";
import Image from "next/image";
import { Button } from "../ui/button";

type ColorSelectorProps = {
  colors: Color[];
  selectedColors: string[];
  onColorChange: (color: string | string[]) => void;
  mode?: "single" | "multiple";
  availableColors?: { id: string; name: string | undefined }[];
};

export default function ColorSelector({
  colors,
  selectedColors,
  onColorChange,
  mode = "multiple",
  availableColors = [],
}: ColorSelectorProps) {
  // Handle color selection
  const handleClick = (colorName: string) => {
    if (mode === "single") {
      onColorChange(colorName);
    } else {
      onColorChange(
        selectedColors.includes(colorName)
          ? selectedColors.filter((c) => c !== colorName)
          : [...selectedColors, colorName]
      );
    }
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,40px)] gap-3 p-1">
      {colors.map((color) => {
        const isAvailable = availableColors.some((c) => c.name === color.name);
        const isSelected = selectedColors.includes(color.name) && isAvailable;

        return (
          <Button
            key={color.name}
            variant="outline"
            title={color.name}
            className={cn(
              "relative w-9 h-9 p-[1px] border-0 shadow-none",
              "after:absolute after:inset-[-3px] after:z-[-1]",
              "after:border-2 after:border-primary after:bg-transparent",
              "after:transition-all after:duration-200",
              {
                "after:scale-100 after:opacity-100": isSelected && isAvailable,
                "after:scale-90 after:opacity-0": !isSelected,
                "cursor-not-allowed": !isAvailable,
              }
            )}
            onClick={() => isAvailable && handleClick(color.name)}
            disabled={!isAvailable}
          >
            <Image
              src={color.pattern.url}
              alt={color.pattern.alternativeText}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />

            {/* Availability indicator */}
            {!isAvailable && (
              <span
                className="absolute top-0 right-0 w-[calc((100%*1.4142)-2px)] h-0.5 bg-white transform origin-right -rotate-45"
                hidden={isAvailable}
              ></span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
