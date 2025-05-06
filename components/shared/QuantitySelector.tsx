import { cn } from "@/lib/utils";
import { Loader2, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  mode: "cart" | "product";
  onUpdateCart?: (quantity: number) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  isUpdating?: boolean;
  className?: string;
}

export default function QuantitySelector({
  mode,
  onUpdateCart,
  quantity,
  setQuantity,
  isUpdating = false,
  className,
}: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(quantity);

  // Handle the change event for the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // If the value is not a number or less than or equal to 0, set it to 1
    if (isNaN(value) || value <= 0) {
      setInputValue(1);
      setQuantity(1);
      return;
    }
    setInputValue(value);
    setQuantity(value);
  };

  // Handle the key down event for the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = parseInt(inputValue.toString());
      if (!isNaN(value) && value > 0) {
        setQuantity(value);
        if (mode === "cart" && onUpdateCart) {
          onUpdateCart(value);
        }
      }
    }
  };

  // Handle the click event for the decrement button
  const handleDecrement = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    if (mode === "cart" && onUpdateCart) {
      onUpdateCart(newQuantity);
    }
  };

  // Handle the click event for the increment button
  const handleIncrement = () => {
    const newQuantity = Math.max(quantity + 1, 1);
    setQuantity(newQuantity);
    if (mode === "cart" && onUpdateCart) {
      onUpdateCart(newQuantity);
    }
  };

  return (
    <div className={cn("flex border border-border w-fit", className)}>
      <button
        className={cn(
          "flex justify-center items-center size-11",
          isUpdating && "opacity-50",
          mode === "cart" && "size-7"
        )}
        onClick={handleDecrement}
        disabled={isUpdating || quantity <= 1}
      >
        <Minus
          className={cn({
            "size-4": mode === "product",
            "size-3": mode === "cart",
          })}
        />
      </button>
      {isUpdating && mode === "cart" ? (
        <span className="flex justify-center items-center size-7">
          <Loader2 className="animate-spin text-foreground/50 size-4" />
        </span>
      ) : (
        <input
          value={quantity}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="number"
          min="1"
          className={cn(
            "text-center appearance-none border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 font-light",
            {
              "size-11 text-sm": mode === "product",
              "size-7 text-xs": mode === "cart",
            }
          )}
        />
      )}
      <button
        className={cn("flex justify-center items-center", {
          "size-11": mode === "product",
          "size-7": mode === "cart",
          "opacity-50": isUpdating,
        })}
        onClick={handleIncrement}
        disabled={isUpdating}
      >
        <Plus
          className={cn({
            "size-4": mode === "product",
            "size-3": mode === "cart",
          })}
        />
      </button>
    </div>
  );
}
