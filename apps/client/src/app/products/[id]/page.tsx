import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";
import React from "react";

type PagePropsFixed = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

const fetchdata = async (id: string): Promise<ProductType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const product = await fetchdata(params.id);
  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params, searchParams }: any) => {
  const { id } = params;
  const { color, size } = searchParams ?? {};

  const product = await fetchdata(id);
  const selectedSize = size || product.sizes?.[0] || "Default Size";
  const selectedColor = color || product.colors?.[0] || "Default Color";

  return (
    <div className="w-full flex flex-col lg:flex-row mt-12 gap-12">
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        {product.images?.[selectedColor] && (
          <Image
            alt={product.name}
            className="object-contain rounded-md"
            src={product.images[selectedColor]}
            fill
          />
        )}
      </div>

      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>

        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  );
};

export default ProductPage;
