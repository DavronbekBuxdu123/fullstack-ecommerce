import React from "react";
import { ProductType } from "@/types";
import ProductCard from "./ProductCard";

import Link from "next/link";

const fetchdata = async ({
  category,
  sort,
  search,
  params,
}: {
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`
  );
  const data: ProductType[] = await res.json();
  return data;
};

const ProductList = async ({
  category,
  params,
  search,
  sort,
}: {
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const products = await fetchdata({ category, params, search, sort });
  return (
    <div className="w-full mt-8">
      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="w-full flex items-center justify-end mt-4">
        <Link
          href="/products"
          className="text-gray-500 text-underline cursor-pointer underline"
        >
          View all products
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
