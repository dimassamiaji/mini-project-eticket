/** @format */
"use client";

import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axios/axios";

import Search from "../assets/search.png";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";
function ProductListComponent() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [value] = useDebounce(search, 500);

  const fetchProducts = () => {
    axiosInstance()
      .get("/products/", {
        params: {
          product_name: search,
        },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProducts();
  }, [value]);

  const ps = useMemo(
    () => [...products].sort((a, b) => a.price - b.price),
    [products]
  );
  // const ps = [...products].sort((a, b) => a.price - b.price);

  // console.log(ps);
  return (
    <div className="w-full">
      <div className=" mt-5 px-7 max-w-screen-2xl  w-full">
        <div className="flex px-3 items-center gap-3  border-gray-300 border-b w-72  p-2">
          <Image src={Search} alt="" className=" w-3 h-3" />
          <input
            type="text"
            placeholder="Type any products here"
            className=" outline-none             "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid max-w-screen-2xl w-full grid-cols-4 p-7 gap-3 ">
        {ps?.map((product, key) => (
          <ProductCard {...product} key={key} />
        ))}
      </div>
    </div>
  );
}

export default ProductListComponent;

export function ProductCard({ image_url, product_name, id, price }) {
  return (
    <Link className="flex flex-col" href={"/products/" + id}>
      <img
        src={process.env.API_URL + image_url}
        className=" max-h-[154px] h-full max-w-[212px] w-full"
        alt=""
      />
      <div className="p-5 w-full h-full flex flex-col justify-between gap-2 ">
        <div className=" font-bold w-full "> {product_name}</div>

        <div className="text-[#249C58] font-semibold  ">
          IDR {Number(price).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
