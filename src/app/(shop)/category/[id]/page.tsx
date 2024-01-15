import { Category, initialData } from "@/seed/seed";
import Title from "@/components/ui/title/Title";
import ProductGrid from "@/components/products/product-grid/product-grid";

const seedProducts = initialData.products;

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface Props {
  params: {
    id: Category;
  };
}

export default function ({ params }: Props) {
  const { id } = params;

  const products = seedProducts.filter((product) => product.gender === id);

  return (
    <>
      <Title
        title={`${capitalizeFirstLetter(id)} category`}
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
