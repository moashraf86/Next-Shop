"use client";
import { useEffect, useState } from "react";
import { Product } from "@/lib/definitions";
import { fetchBestSellingProducts } from "@/lib/data";
import ProductList from "./ProductList";
import GenderFilter from "./GenderFilter";

export default function BestsellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("men");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchBestSellingProducts(gender);
        const data = res.products;
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [gender]);

  return (
    <section className="container py-16 space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-jost font-light text-center uppercase tracking-tight">
          BestSelling Watches
        </h2>
      </div>
      <GenderFilter gender={gender} setGender={setGender} />
      {loading ? (
        <div className="min-h-[400px] grid place-items-center">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-500">Loading products...</p>
          </div>
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </section>
  );
}
