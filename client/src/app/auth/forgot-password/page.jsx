/** @format */
"use client";
import { axiosInstance } from "@/axios/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
function Page() {
  const router = useRouter();
  function forgotPassword() {
    const email = document.getElementById("email").value;

    axiosInstance()
      .get("/users/v2", {
        params: { email },
      })
      .then((res) =>
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        }).then(function () {
          router.push("/auth/login");
        })
      )
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err?.response?.data?.message,
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });

        return err.message;
      });
  }
  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col  w-96 ">
          <h1 className=" text-3xl font-semibold">Forgot Password</h1>
          <div className=" font-bold mt-5">Email</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="chairin@mail.com"
            id="email"
            type="email"
          ></input>
          <div className=" mt-4 text-xs ">
            Have an account?{" "}
            <Link href="/auth/login" className="text-[#4F46E5] font-bold">
              Login
            </Link>
          </div>
          <div className=" mt-4 text-xs ">
            Create an account?{" "}
            <Link href="/auth/register" className="text-[#4F46E5] font-bold">
              Register
            </Link>
          </div>
          <button
            className="  rounded-lg mt-2 text-white bg-[#4F46E5] h-16"
            onClick={forgotPassword}
          >
            Forgot Password
          </button>
        </div>
      </div>
    </>
  );
}
export default Page;
