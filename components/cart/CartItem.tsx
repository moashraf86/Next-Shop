import Image from "next/image";
import ProductPrice from "../product/ProductPrice";
import { CartItem as CartItemType } from "@/lib/definitions";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import QuantitySelector from "../shared/QuantitySelector";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function CartItem({
  item,
  removeCartItem,
  className,
  style,
}: {
  item: CartItemType;
  removeCartItem: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { updateItemQuantity, isUpdating, currentUpdatingProduct } = useCart();

  // check if the updating product is the same as the current item
  const itemUpdating = isUpdating && currentUpdatingProduct === item.documentId;

  // handle add to cart
  const handleUpdateProduct = (newQuantity: number) => {
    updateItemQuantity(item.documentId, newQuantity);
    setQuantity(newQuantity);
  };

  return (
    <tr className={cn("font-light", className)} style={style}>
      <td className="px-6 py-4 text-sm font-medium text-gray-800">
        <div className="flex items-center gap-4">
          <Image
            src={item.product.images[0].formats.small.url}
            alt={item.product.images[0].alternativeText}
            width={100}
            height={100}
            className="object-cover object-center sm:aspect-square"
          />
          <div className="space-y-2 sm:space-y-2 font-light">
            <h2 className="text-base font-barlow leading-tight">
              {item.product?.title}
            </h2>
            <ProductPrice
              price={item.product?.price}
              className="hidden sm:block"
            />
            <ProductPrice
              price={item.product?.price * item.quantity}
              className="sm:hidden"
            />
            <QuantitySelector
              quantity={quantity}
              mode="cart"
              setQuantity={setQuantity}
              onUpdateCart={handleUpdateProduct}
              isUpdating={itemUpdating}
              className="sm:hidden"
            />
            <Button
              variant="ghost"
              className="p-0 pt-2 h-auto text-xs text-destructive hover:text-destructive hover:bg-transparent sm:hidden"
              onClick={() => removeCartItem(item.documentId)}
            >
              Remove
            </Button>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-center hidden sm:table-cell">
        <QuantitySelector
          quantity={quantity}
          mode="cart"
          setQuantity={setQuantity}
          onUpdateCart={handleUpdateProduct}
          isUpdating={isUpdating}
          className="mx-auto"
        />
      </td>
      <td className="px-6 py-4 text-sm text-center hidden sm:table-cell">
        <ProductPrice price={item.product?.price * item.quantity} />
      </td>
      <td className="px-6 py-4 text-end text-sm font-medium hidden sm:table-cell">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground/60 hover:text-red-500 hover:bg-transparent"
          onClick={() => removeCartItem(item.documentId)}
        >
          <Trash2 />
        </Button>
      </td>
    </tr>
  );
}
