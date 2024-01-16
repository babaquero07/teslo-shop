import Title from "@/components/ui/title/Title";
import ProductGrid from "@/components/products/product-grid/product-grid";

import { getPaginatedProductsWithImages } from "@/actions/products/product-paginations";

const Home = async () => {
  const { products } = await getPaginatedProductsWithImages(1, 3);

  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />
    </>
  );
};

export default Home;
