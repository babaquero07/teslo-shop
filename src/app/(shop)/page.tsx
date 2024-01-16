import Title from "@/components/ui/title/Title";
import ProductGrid from "@/components/products/product-grid/product-grid";

import { getPaginatedProductsWithImages } from "@/actions/products/product-paginations";

interface Props {
  searchParams: {
    page?: string;
  };
}

const Home = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products } = await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />
    </>
  );
};

export default Home;
