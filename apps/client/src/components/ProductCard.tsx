"use client";
import useCartStore from "@/store/CartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState<string>(product.colors[0] || "");
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedColor: color || "",
      selectedSize: size || "",
    });
    toast.success("Product add to cart");
  };
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images?.[color] || ""}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              onChange={(e) => setSize(e.target.value)}
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md px-2 py-1"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-[18px] h-[18px] flex items-center justify-center ring-1 ring-gray-300 rounded-full cursor-pointer transition-all duration-200 ${
                    c === color ? "ring-2 ring-black scale-110" : ""
                  }`}
                >
                  <div
                    style={{ backgroundColor: c }}
                    className="w-[14px] h-[14px] rounded-full"
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
