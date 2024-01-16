import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import ProductGrid from "@/components/products/product-grid/product-grid";
import { getPaginatedProductsWithImages } from "@/actions/products/product-paginations";

const products = initialData.products;

const Home = async () => {
  const productsTemp = await getPaginatedProductsWithImages(1, 3);

  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />
    </>
  );
};

export default Home;
