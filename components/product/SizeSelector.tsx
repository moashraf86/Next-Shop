import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Size } from "@/lib/definitions";

export default function SizeSelector({
  sizes,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  selectedSize: string | null;
  setSelectedSize: (value: string) => void;
}) {
  // Handle size change
  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  return (
    <div className="space-y-2">
      <span>Watch size:</span>
      <div className="flex items-center gap-2">
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant="outline"
            className={cn(
              "text-sm font-barlow font-normal lowercase h-12 shadow-none",
              {
                "border-2 border-primary": selectedSize === size.value,
              }
            )}
            onClick={() => handleSizeChange(size.value)}
          >
            {size.value}
          </Button>
        ))}
      </div>
    </div>
  );
}
