import Title from "@/components/ui/title/Title";

import { getProductBySlug } from "@/actions";
import { redirect } from "next/navigation";

import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "New product" : "Edit product";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} />
    </>
  );
};

export default ProductPage;
