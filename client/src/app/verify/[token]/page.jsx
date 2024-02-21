/** @format */
import verify from "../../../assets/verify.gif";
import error from "../../../assets/error.gif";
import Image from "next/image";
import { axiosInstanceSSR } from "@/axios/axios";

async function Page({ params }) {
  let isError = true;
  let message = "";
  await axiosInstanceSSR()
    .patch(
      "/users/v3",
      {},
      {
        headers: {
          Authorization: params.token,
        },
      }
    )
    .then((res) => {
      message = res.data.message;
      isError = false;
    })
    .catch((error) => {
      message = error?.response?.data?.message;
    });

  return (
    <center className="min-h-screen items-center flex-col justify-center  ">
      <Image width={150} src={isError ? error : verify} alt=""></Image>
      <h1 className=" font-bold text-2xl">{isError ? "Error" : "Success"}</h1>
      <h1 className="">{message}</h1>
    </center>
  );
}
export default Page;
