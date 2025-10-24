import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";
import React from "react";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const fetchdata = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Prodoct not");
  }

  const data: ProductType = await res.json();
  return data;
};

export default async function ProductPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await props.params;
  const { color, size } = await props.searchParams;
  const product = await fetchdata(id);

  const selectedSize =
    typeof size === "string" ? size : product.sizes?.[0] || "Default Size";
  const selectedColor =
    typeof color === "string" ? color : product.colors?.[0] || "Default Color";

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

        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/klarna.png"
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/cards.png"
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/stripe.png"
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>

        <p className="text-gray-500 text-xs mt-2">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>.
        </p>
      </div>
    </div>
  );
}
