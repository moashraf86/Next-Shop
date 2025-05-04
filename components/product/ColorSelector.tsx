import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Color } from "@/lib/definitions";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function ColorSelector({ colors }: { colors: Color[] }) {
  const searchParams = useSearchParams();
  const url = useRouter();
  const selectedColor = searchParams.get("color") || colors[0].name;

  // Handle size change
  const handleColorChange = (value: string) => {
    // setSelectedColor(value);
    url.push(`?size=${searchParams.get("size")}&color=${value}`, {
      scroll: false,
    });
  };

  return (
    <div className="space-y-2">
      <span>Strap: {selectedColor}</span>
      <div className="grid grid-cols-[repeat(auto-fit,40px)] gap-3">
        {colors.map((color) => (
          <Button
            key={color.id}
            variant="outline"
            className={cn(
              "relative text-sm font-barlow font-normal lowercase w-9 h-9 shadow-none border-0 p-[1px] after:absolute after:content-[''] after:inset-[-3px] after:bg-transparent after:border-2 after:border-primary after:z-[-1] after:transition-transform after:duration-200 after:ease",
              {
                "after:scale-100 after:opacity-100":
                  selectedColor === color.name,
                "after:scale-90 after:opacity-0": selectedColor !== color.name,
              }
            )}
            onClick={() => handleColorChange(color.name)}
          >
            <Image
              src={color.pattern.url}
              alt={color.pattern.alternativeText}
              width={20}
              height={20}
              className="object-cover object-center w-full h-full"
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
