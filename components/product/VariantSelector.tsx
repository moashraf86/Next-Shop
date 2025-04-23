import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { VariantOption } from "@/lib/definitions";

export default function VariantSelector({
  variant,
  selectedVariant,
  setSelectedVariant,
}: {
  variant: VariantOption;
  selectedVariant: string | null;
  setSelectedVariant: (value: string) => void;
}) {
  // Handle variant change
  const handleVariantChange = (value: string) => {
    setSelectedVariant(value);
  };

  return (
    <div className="space-y-2">
      <span>{variant.name}</span>
      <div className="flex items-center gap-2">
        {variant.values.map((value: string, idx: number) => (
          <Button
            key={idx}
            variant="outline"
            className={cn(
              "text-sm font-barlow font-normal lowercase h-12 shadow-none",
              {
                "border-2 border-primary": selectedVariant === value,
              }
            )}
            onClick={() => handleVariantChange(value)}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
}
