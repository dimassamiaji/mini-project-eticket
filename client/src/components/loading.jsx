/** @format */

import Image from "next/image";
import Logo from "../assets/logo.png";

function LoadingPage() {
  return (
    <div className=" flex w-screen h-screen font-bold justify-center items-center text-3xl">
      <Image className=" w-60 " src={Logo} alt="" />
    </div>
  );
}
export default LoadingPage;
