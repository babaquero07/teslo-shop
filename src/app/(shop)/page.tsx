import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import ProductGrid from "@/components/products/product-grid/product-grid";

const products = initialData.products;

const Home = () => {
  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />
    </>
  );
};

export default Home;
