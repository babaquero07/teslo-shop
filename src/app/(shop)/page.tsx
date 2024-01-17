export const revalidate = 60;

import { redirect } from "next/navigation";

import Title from "@/components/ui/title/Title";
import ProductGrid from "@/components/products/product-grid/product-grid";
import Pagination from "@/components/ui/pagination/Pagination";

import { getPaginatedProductsWithImages } from "@/actions/products/product-paginations";

interface Props {
  searchParams: {
    page?: string;
  };
}

const Home = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
};

export default Home;
