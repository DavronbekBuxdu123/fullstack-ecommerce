"use client";
import {
  Bell,
  Home,
  ListOrdered,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCart";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import ProfileButton from "./ProfileButton";
import { useOrderStore } from "@/store/OrderStore";

function Navbar() {
  const orderCount = useOrderStore((s) => s.orderCount);
  return (
    <div className="flex items-center justify-between w-full border-b border-gray-200 pb-4">
      <div>
        <Link className="flex items-center" href="/">
          <Image
            alt=""
            src="/logo.png"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className="hidden sm:flex text-md font-medium">DavaShop</p>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link className="w-6 h-6 text-gray-600" href="/">
          <Home />
        </Link>
        <div className="relative">
          <Link href="/user-orders">
            <ShoppingBag className="w-6 h-6 text-gray-600 cursor-pointer" />
          </Link>
          <span className="absolute -top-3 -right-3 bg-amber-400  rounded-full w-5 h-5 flex items-center justify-center text-md font-medium text-white ">
            {orderCount}
          </span>
        </div>
        <ShoppingCartIcon />
        <div className="cursor-pointer">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <ProfileButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
