/** @format */
"use client";

import NavbarComponent from "@/components/navbar";
import { axiosInstance } from "@/axios/axios";
import PromoComponent from "@/components/promo";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Page({ params }) {
  const [event, setEvent] = useState({});
  const [promotion, setPromo] = useState({});
  const { event_id } = params;
  const fetchEvents = () => {
    axiosInstance()
      .get("/events/" + event_id)
      .then((res) => {
        setEvent(res.data.result);
        if (res.data.result.promotion) setPromo(res.data.result.promotion);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchEvents();
    console.log(event.promotion);
  }, []);
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
        <h1 className=" font-bold text-3xl">Transaction Detail</h1>
        <div className=" flex justify-center w-full">
          <img
            className=" lg:max-w-[734px]  lg:max-h-[523px]"
            src={process.env.API_URL + event.image_url}
            alt=""
          />
        </div>
        <table>
          <tbody>
            <tr>
              <td>Event Name</td>
              <td>: {event.event_name}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>: IDR {Number(event.price).toLocaleString("id-ID")}</td>
            </tr>
            <tr>
              <td>Wallet</td>
              <td>: {Number(userSelector.wallet).toLocaleString("id-ID")}</td>
            </tr>
          </tbody>
        </table>
        {/* <div className="grid lg:max-w-screen-2xl md:grid-cols-2 p-7 gap-5 w-full  grid-cols-1">
          <div className=" pt-10 flex flex-col gap-5  w-9/12">
            <div className=" font-bold text-3xl">{event.event_name}</div>
            <div className="my-2">
              <div className="font-bold text-3xl">
                IDR {Number(event?.price).toLocaleString("id-ID")}
              </div>
            </div>
            <Link href={"/transaction/" + event.id}>
              <button
                type="submit"
                className="h-[49px] border w-[168px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
              >
                Buy
              </button>
            </Link>
            <hr />
            <div className=" text-justify">
              {event.description ||
                "We thoroughly check every purchase you make and applies our company's guarantee to the product's legitimacy. The guarantee is valid for 2 days after receiving the product from the delivery service. Should you have any concern about the product you purchase, kindly reach out to our Customer Service and Specialist on Monday - Saturday 10.00 - 21.00 (GMT+7 / WIB).\n"}
            </div>
          </div>
          <PromoComponent
            promo={promotion}
            description={promotion.description}
            isReferral={promotion.isReferral}
          />
          {promotion.isReferral ? (
            <>
              <div></div>
              <div>
                <label for="referral_number">Referral Number : </label>
                <input
                  type="text"
                  placeholder="Referral Number"
                  id="referral_number"
                />
              </div>
            </>
          ) : null}
        </div> */}
      </div>
    </>
  );
}
export default Page;
