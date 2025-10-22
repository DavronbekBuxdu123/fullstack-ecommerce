"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function SearchBar() {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", value);
    router.push(`/products?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="hidden sm:flex ring-1 ring-gray-200  items-center justify-between rounded-md gap-2 px-2 py-1 shadow-md">
      <Search className="text-gray-500" />
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(value);
          }
        }}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="border-none"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
