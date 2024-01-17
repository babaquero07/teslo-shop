"use client";

import { useEffect, useState } from "react";
import { titleFont } from "@/config/fonts";

import { getStockBySlug } from "@/actions";

interface Props {
  slug: string;
}

const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getStock();
  });

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);

    setStock(inStock);
  };

  return (
    <p className={`${titleFont.className} antialiased text-lg`}>
      {`Stock: ${stock}`}
    </p>
  );
};

export default StockLabel;
