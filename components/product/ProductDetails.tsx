"use client";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductPrice from "./ProductPrice";
import QuantitySelector from "../shared/QuantitySelector";
import ProductActions from "./ProductActions";
import { Product } from "@/lib/definitions";
import { useState } from "react";
import ProductCarousel from "./ProductCarousel";
import ProductRating from "./ProductRating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import VariantSelector from "./VariantSelector";

export default function ProductDetails({
  product,
  initialQuantity = 1,
}: {
  product: Product;
  initialQuantity?: number;
}) {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variantOptions[0].values[0]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-20">
      {/* Product Carousel */}
      <ProductCarousel images={product.images} className="lg:col-span-7" />
      {/* Product details */}
      <div className="space-y-6 lg:col-span-5">
        <div className="space-y-6 border-b border-border pb-4">
          <ProductTitle title={product.name} />
          <div className="flex items-center gap-1 text-lg lg:text-2xl  font-normal font-barlow">
            <ProductPrice
              price={product.price}
              className="text-lg lg:text-2xl font-barlow font-normal"
            />
            USD
          </div>
          <ProductRating rating={5} reviews={3} />
        </div>
        <VariantSelector
          variant={product.variantOptions[0]}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        <div className="space-y-1">
          <span>Quantity:</span>
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            mode="product"
          />
        </div>
        <ProductActions
          product={product}
          quantity={quantity}
          selectedVariant={selectedVariant}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="description">
            <AccordionTrigger className="text-sm font-barlow uppercase font-semibold tracking-[1px] hover:no-underline">
              Description
            </AccordionTrigger>
            <AccordionContent>
              <ProductDescription description={product.description} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger className="text-sm font-barlow uppercase font-semibold tracking-[1px] hover:no-underline">
              Shipping & Returns
            </AccordionTrigger>
            <AccordionContent className="font-barlow space-y-2">
              <div className="space-y-1">
                <strong>Worldwide free shipping</strong>
                <p>
                  We use DHL Express for worldwide shipping. Delivery time is
                  usually 2-4 working days. NB: For Countries outside EU buying
                  items ex. VAT, be aware you have to pay import taxes according
                  to the laws of that specific country. In case of returns we
                  are not able to return any duties or taxes, as this is paid to
                  and handled directly between you (the customer) and your
                  country.
                </p>
              </div>
              <div className="space-y-1">
                <strong>Return policy</strong>
                <p>
                  If you want to change a product into another size, color etc,
                  please contact us so we are able to reserve the new item in
                  our stock immediately. You are always entitled to an exchange
                  or refund within 30 days after you have received your package,
                  as long as the item has not been used. All original packaging,
                  price labels etc. shall be returned with the product without
                  having been tampered with.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
