import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Strap } from "@/lib/definitions";

export default function StrapSelector({
  straps,
  selectedStrap,
  setSelectedStrap,
}: {
  straps: Strap[];
  selectedSize: string | null;
  selectedStrap: string | null;
  setSelectedStrap: (value: string) => void;
}) {
  // Handle size change
  const handleStrapChange = (value: string) => {
    setSelectedStrap(value);
  };

  return (
    <div className="space-y-2">
      <span>Strap color:</span>
      <div className="flex items-center gap-2">
        {straps.map((strap) => (
          <Button
            key={strap.id}
            variant="outline"
            className={cn(
              "text-sm font-barlow font-normal lowercase h-12 shadow-none",
              {
                "border-2 border-primary": selectedStrap === strap.name,
              }
            )}
            onClick={() => handleStrapChange(strap.name)}
          >
            {strap.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
