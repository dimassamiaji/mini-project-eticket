/** @format */
"use client";

import { axiosInstance } from "@/axios/axios";
import CartComponent from "@/components/cart";
import NavbarComponent from "@/components/navbar";
import { useEffect, useState } from "react";

function Page() {
  const [carts, setCart] = useState([]);
  const fetchCart = () => {
    axiosInstance()
      .get("/carts")
      .then((res) => {
        setCart(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <>
      <NavbarComponent />
      <center>
        <div className="max-w-screen-xl w-full mt-8 ">
          <div className=" font-bold text-xl p-3 pl-5 text-left">CART</div>
          <table className="w-full">
            {carts.map((cart) => (
              <CartComponent {...cart} />
            ))}
          </table>
        </div>
      </center>
    </>
  );
}
export default Page;
