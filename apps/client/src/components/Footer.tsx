import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-gray-800  mt-16 ">
      <div className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl flex flex-col md:items-start md:flex-row  mx-auto p-8 md:gap-0 gap-8 md:justify-between">
        <div className="flex flex-col items-center md:items-start gap-6">
          <Link className="flex items-center" href="/">
            <Image
              alt=""
              src="/logo.png"
              width={36}
              height={36}
              className="w-6 h-6 md:w-9 md:h-9"
            />
            <p className=" text-md font-medium text-white">DavaShop</p>
          </Link>
          <p className="text-gray-400">2025 TrendDava</p>
          <p className="text-gray-400">All rights reserved</p>
        </div>
        <div className="flex flex-col items-center md:items-start text-gray-400 gap-4 ">
          <p className="text-white">Link</p>
          <Link href="/">Home</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Terms of Service</Link>
          <Link href="/">Privacy Police</Link>
        </div>
        <div className="flex flex-col items-center md:items-start text-gray-400 gap-4 ">
          <p className="text-white">Link</p>
          <Link href="/">Home</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Terms of Service</Link>
          <Link href="/">Privacy Police</Link>
        </div>{" "}
        <div className="flex flex-col items-center md:items-start text-gray-400 gap-4 ">
          <p className="text-white">Link</p>
          <Link href="/">Home</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Terms of Service</Link>
          <Link href="/">Privacy Police</Link>
        </div>
        <div className="flex flex-col items-center md:items-start text-gray-400 gap-4 ">
          <p className="text-white">Link</p>
          <Link href="/">Home</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Terms of Service</Link>
          <Link href="/">Privacy Police</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
