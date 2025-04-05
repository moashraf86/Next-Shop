import Carousel from "@/components/layout/Carousel";
import Categories from "@/components/layout/Categories";
import BestProducts from "./products/BestsellingProducts";

export default function Home() {
  return (
    <main>
      <Carousel />
      <Categories />
      <BestProducts />
    </main>
  );
}
