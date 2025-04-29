import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Color } from "@/lib/definitions";

export default function ColorSelector({
  colors,
  selectedColor,
  setSelectedColor,
}: {
  colors: Color[];
  selectedSize: string | null;
  selectedColor: string | null;
  setSelectedColor: (value: string) => void;
}) {
  // Handle size change
  const handleColorChange = (value: string) => {
    setSelectedColor(value);
  };

  return (
    <div className="space-y-2">
      <span>Strap color:</span>
      <div className="flex items-center gap-2">
        {colors.map((strap) => (
          <Button
            key={strap.id}
            variant="outline"
            className={cn(
              "text-sm font-barlow font-normal lowercase h-12 shadow-none",
              {
                "border-2 border-primary": selectedColor === strap.name,
              }
            )}
            onClick={() => handleColorChange(strap.name)}
          >
            {strap.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
