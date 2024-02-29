/** @format */
"use client";

import NavbarComponent from "@/components/navbar";
import { axiosInstance } from "@/axios/axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Select } from "@chakra-ui/react";
import CouponsComponent from "@/components/coupons";
import moment from "moment";
function Page({ params }) {
  const router = useRouter();
  const { event_id } = params;
  const userSelector = useSelector((state) => state.auth);
  const [event, setEvent] = useState({});
  const [promotion, setPromo] = useState({});
  const [coupons, setCoupons] = useState([]);
  const fetchEvents = () => {
    axiosInstance()
      .get("/events/" + event_id)
      .then((res) => {
        setEvent(res.data.result);
        if (res.data.result.promotion) setPromo(res.data.result.promotion);
      })
      .catch((err) => console.log(err));
  };
  const fetchCoupons = () => {
    axiosInstance()
      .get("/userDetails/coupons")
      .then((res) => {
        setCoupons(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  const initialValues = {
    point: 0,
    coupon: 0,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      save(values);
    },
  });
  const save = (values) => {
    const { id, price, event_name, availability } = event;
    const { point, coupon_id } = values;
    Swal.fire({
      title: "are you sure you want to buy a ticket for  " + event_name + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance()
          .post("/transactions", {
            event_id: id,
            price,
            point,
            coupon_id,
            availability,
          })
          .then((res) => {
            Swal.fire({
              title: "Success!",
              text: res.data.message,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            }).then(function () {
              router.push("/");
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.response.data.message,
              icon: "error",
            });
          });
      }
    });
  };
  useEffect(() => {
    fetchEvents();
    fetchCoupons();
  }, []);
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
        <h1 className=" font-bold text-3xl mb-3">Transaction Detail</h1>
        <div className=" flex justify-center w-full">
          <img
            className=" lg:max-w-[734px]  lg:max-h-[523px]"
            src={process.env.API_URL + event.image_url}
            alt=""
          />
        </div>
        <form id="form" action="" onSubmit={formik.handleSubmit}>
          <div className=" flex flex-col items-center justify-center mt-5">
            <table className=" w-full font-semibold">
              <tbody>
                <tr>
                  <td>Event Name</td>
                  <td>: {event.event_name}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>: IDR {Number(event.price).toLocaleString("id-ID")}</td>
                </tr>
                {promotion.discount ? (
                  <>
                    <tr>
                      <td>Discount</td>
                      <td>: {promotion.discount}%</td>
                    </tr>
                    <tr>
                      <td>After Discount</td>
                      <td>
                        : IDR{" "}
                        {(
                          event.price -
                          (event.price * promotion.discount) / 100
                        ).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  </>
                ) : null}
                <tr>
                  <td>Wallet</td>
                  <td>
                    : {Number(userSelector.wallet).toLocaleString("id-ID")}
                  </td>
                </tr>
                <tr>
                  <td>Use Coupon</td>
                  <td>
                    <Select
                      id="coupon_id"
                      placeholder="Coupons"
                      variant="outline"
                      onChange={formik.handleChange}
                    >
                      {coupons.map((coupons, key) => (
                        <CouponsComponent {...coupons} key={key} />
                      ))}
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>Points</td>
                  <td>
                    {userSelector.points.toLocaleString("id-ID")}, exp:
                    {userSelector.points
                      ? moment(userSelector.expired_at).format("YYYY-MM-DD")
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Use Points</td>
                  <td>
                    <input
                      type="number"
                      className=" border border-slate-950 p-1 w-full"
                      value={formik.values.point}
                      id="point"
                      onChange={formik.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              className=" bg-black text-white px-4 py-2 my-3 rounded"
            >
              Buy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Page;
