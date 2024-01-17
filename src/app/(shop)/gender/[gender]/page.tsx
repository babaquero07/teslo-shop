export const revalidate = 60;

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/index";

import Title from "@/components/ui/title/Title";
import ProductGrid from "@/components/products/product-grid/product-grid";
import Pagination from "@/components/ui/pagination/Pagination";

import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title
        title={gender}
        subtitle="All products"
        className="mb-2 first-letter:capitalize"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
