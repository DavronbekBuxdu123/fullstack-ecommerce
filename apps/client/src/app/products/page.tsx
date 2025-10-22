import Categories from "@/components/Categories";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import React from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    category?: string;
    sort?: string;
    search?: string;
  };
}) => {
  const category = searchParams.category || "all";
  const sort = searchParams.sort;
  const search = searchParams.search;
  return (
    <div className="w-full mt-8">
      <div>
        <Categories />
        <Filter />
      </div>
      <div>
        <ProductList
          category={category}
          sort={sort}
          search={search}
          params="products"
        />
      </div>
    </div>
  );
};

export default ProductsPage;
