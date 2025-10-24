"use client";
import useCartStore from "@/store/CartStore";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { ProductType } from "@/types";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState<ProductType>();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        toast.error("Product not found");
        return;
      }
      const data = await res.json();
      setProduct(data);
      setSelectedColor(data.colors[0]);
      console.log(selectedColor);
    };
    fetchData();
  }, [id]);

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "plus" | "minus") => {
    setQuantity((prev) => (type === "plus" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.warn("Iltimos kerakli maxsulot rangini tanlang!");
      return;
    }
    if (!selectedSize) {
      toast.warn("Iltimos kerakli maxsulot o'lchamini tanlang!");
      return;
    }
    addToCart({ ...product!, quantity, selectedColor, selectedSize });
    toast.success("Maxsulot savatga qo'shildi!");
  };

  if (!product) return <div>Loading...</div>;

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

        <div className="flex flex-col gap-2">
          <p>Size</p>
          <div className="flex items-center gap-4 text-xs">
            {product.sizes.map((size: string) => (
              <div
                key={size}
                onClick={() => {
                  handleTypeChange("size", size);
                  setSelectedSize(size);
                }}
                className={`border rounded-sm ${
                  selectedSize === size ? "border-gray-900" : "border-gray-300"
                } cursor-pointer w-[30px] h-[30px] flex items-center justify-center`}
              >
                <div
                  className={`flex rounded-sm font-medium items-center justify-center w-[25px] h-[25px] ${
                    selectedSize === size ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {size.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <p>Color</p>
          <div className="flex items-center gap-4 text-xs">
            {product.colors.map((color: string) => (
              <div
                key={color}
                onClick={() => {
                  handleTypeChange("color", color);
                  setSelectedColor(color);
                }}
                className={`border rounded-sm ${
                  selectedColor === color
                    ? "border-gray-900"
                    : "border-gray-300"
                } cursor-pointer w-[30px] h-[30px] flex items-center justify-center`}
              >
                <div
                  style={{ backgroundColor: color }}
                  className="w-[25px] h-[25px] rounded-sm"
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <p>Quantity</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange("minus")}
              className="border p-1"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange("plus")}
              className="border p-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-gray-800 text-white px-4 py-2 rounded-md w-full flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
