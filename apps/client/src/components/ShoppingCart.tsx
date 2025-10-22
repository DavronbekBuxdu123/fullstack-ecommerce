"use client";

import useCartStore from "@/store/CartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();
  if (!hasHydrated) {
    return null;
  }
  return (
    <Link href="/cart?step=1" className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-600" />
      <span className="absolute -top-3 -right-3 bg-amber-400  rounded-full w-5 h-5 flex items-center justify-center text-md font-medium text-white ">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
