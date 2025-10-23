import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";
import { Metadata } from "next";

async function fetchProduct(id: string): Promise<ProductType> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const product = await fetchProduct(params.id);

  const colorParam = Array.isArray(searchParams?.color)
    ? searchParams.color[0]
    : searchParams?.color;
  const sizeParam = Array.isArray(searchParams?.size)
    ? searchParams.size[0]
    : searchParams?.size;

  const selectedSize = sizeParam || product.sizes?.[0] || "Default Size";
  const selectedColor = colorParam || product.colors?.[0] || "Default Color";

  const imageSrc =
    product.images?.[selectedColor] || Object.values(product.images || {})[0];

  return (
    <div className="w-full flex flex-col lg:flex-row mt-12 gap-12">
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        {imageSrc ? (
          <Image
            alt={product.name}
            className="object-contain rounded-md"
            src={imageSrc}
            fill
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 rounded-md text-gray-400">
            No image
          </div>
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
}
