"use client";
import useCartStore from "@/store/CartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedColor,
  selectedSize,
}: {
  product: ProductType;
  selectedColor: string;
  selectedSize: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (type: "plus" | "minus") => {
    if (type === "plus") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };
  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedColor, selectedSize });
    toast.success("Product added to cart");
  };
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        <p>Size</p>
        <div className="flex items-center gap-4  text-xs ">
          {product.sizes.map((size) => (
            <div
              key={size}
              onClick={() => handleTypeChange("size", size)}
              className={`border rounded-sm ${
                selectedSize === size ? "border-gray-900" : "border-gray-300"
              }   cursor-pointer w-[30px] h-[30px] flex items-center justify-center `}
            >
              <div
                className={`flex rounded-sm  font-medium items-center justify-center w-[25px] h-[25px]  ${
                  selectedSize === size ? "bg-black text-white" : "bg-white"
                }`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Color</p>
        <div className="flex items-center gap-4  text-xs">
          {product.colors.map((color) => (
            <div
              key={color}
              onClick={() => handleTypeChange("color", color)}
              className={`border rounded-sm ${
                selectedColor === color ? "border-gray-900" : "border-gray-300"
              }   cursor-pointer w-[30px] h-[30px] flex items-center justify-center `}
            >
              <div
                style={{ backgroundColor: color }}
                className={`w-[25px] h-[25px] rounded-sm`}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="">Quantity</p>
        <div className="flex items-center gap-2 ">
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("minus")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("plus")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleAddToCart}
          className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium w-full"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
        <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer gap-2 text-sm font-medium w-full">
          <ShoppingCart className="w-4 h-4" />
          Buy this Item
        </button>
      </div>
    </div>
  );
};

export default ProductInteraction;
