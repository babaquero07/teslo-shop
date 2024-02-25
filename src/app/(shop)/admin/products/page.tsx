export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithImages } from "@/actions";

import Link from "next/link";
import { redirect } from "next/navigation";

import Title from "@/components/ui/title/Title";
import Pagination from "@/components/ui/pagination/Pagination";
import ProductImage from "@/components/product/product-image/ProductImage";

import { currencyFormat } from "@/utils";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Products maintenance" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          New product
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Gender
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      alt={product.title}
                      className={"w-20 h-20 object-cover rounded"}
                      width={80}
                      height={80}
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    className="hover:underline"
                    href={`/admin/product/${product.slug}`}
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {product.gender}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {product.inStock}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
