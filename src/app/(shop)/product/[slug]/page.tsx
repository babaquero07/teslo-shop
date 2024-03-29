export const revalidate = 10080; // 7 days

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/actions";

import { titleFont } from "@/config/fonts";
import ProductSlideShow from "@/components/product/slide-show/ProductSlideShow";
import ProductMobileSlideShow from "@/components/product/slide-show/ProductMobileSlideShow";
import StockLabel from "@/components/product/stock-label/StockLabel";
import AddToCart from "./ui/AddToCart";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    slug: string;
  };
}

// Metadata - SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
      //TODO:  images: ['https://myweb.com/products/image.png'],
    },
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideShow
          className="block md:hidden"
          title={product.title}
          images={product.images}
        />

        {/* Desktop Slideshow */}
        <ProductSlideShow
          className="hidden md:block"
          title={product.title}
          images={product.images}
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <StockLabel slug={product.slug} />

        <p className="text-lg mb-5">{currencyFormat(product.price)}</p>

        {/* Add to cart */}
        <AddToCart product={product} />

        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
