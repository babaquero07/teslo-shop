"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import ProductImage from "@/components/product/product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={600}
              height={500}
              src={image}
              alt="Product image"
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductMobileSlideShow;
