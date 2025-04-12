import Image from "next/image";
import ProductPrice from "../product/ProductPrice";
import { CartItem as CartItemType } from "@/lib/definitions";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function CartItem({
  item,
  removeCartItem,
}: {
  item: CartItemType;
  removeCartItem: (id: string) => void;
}) {
  return (
    <tr>
      <td className="px-6 py-4  text-sm font-medium text-gray-800">
        <div className="flex items-center gap-4">
          <Image
            src={item.product?.image?.url}
            alt={item.product?.image?.alternativeText || "Product Image"}
            width={100}
            height={100}
            className="object-cover object-center aspect-square"
          />
          <div className="space-y-2">
            <h2 className="text-base font-light font-barlow">
              {item.product?.title}
            </h2>
            <ProductPrice price={item.product?.price} />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-center">{item.quantity}</td>
      <td className="px-6 py-4 text-sm text-center">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.product?.price * item.quantity)}
      </td>
      <td className="px-6 py-4 text-end text-sm font-medium">
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
