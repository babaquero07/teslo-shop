import Title from "@/components/ui/title/Title";

import { getProductBySlug, getCategories } from "@/actions";
import { redirect } from "next/navigation";

import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product) {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "New product" : "Edit product";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </>
  );
};

export default ProductPage;
