/** @format */

import NavbarComponent from "@/components/navbar";
import { axiosInstanceSSR } from "@/axios/axios";
import PromoComponent from "@/components/promo";
import Link from "next/link";

export const metadata = {
  title: "Atick - Event Detail",
  description: "The best place to buy e-ticket",
};

async function Page({ params }) {
  const { event_id } = params;

  const event = (await axiosInstanceSSR().get("/events/" + event_id)).data
    .result;
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
        <div className="grid lg:max-w-screen-2xl   md:grid-cols-2 p-7 gap-3 w-full  grid-cols-1">
          <div className="m-auto w-full">
            <img
              className=" lg:max-w-[734px]  lg:max-h-[523px]"
              src={process.env.API_URL + event.image_url}
              alt=""
            />
          </div>
          <div className=" pt-10 flex flex-col gap-5  w-9/12">
            <div className=" font-bold text-3xl">{event.event_name}</div>
            <div className="my-2">
              <div className="font-bold text-3xl">
                IDR {Number(event?.price).toLocaleString("id-ID")}
              </div>
            </div>
            <Link href={"/transactions/" + event.id}>
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
          {event.promotion ? (
            <PromoComponent
              promo={event.promotion}
              description={event.promotion.description}
              // isReferral={event.promotion.isReferral}
            />
          ) : null}

          {/* {event.promotion.isReferral ? (
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
          ) : null} */}
        </div>
      </div>
    </>
  );
}
export default Page;
