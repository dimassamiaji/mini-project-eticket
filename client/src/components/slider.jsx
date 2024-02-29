/** @format */

import Image from "next/image";
import Banner from "../assets/banner.webp";
function SliderComponent() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-2xl ">
        <Image className="w-full  " src={Banner} alt="" />
      </div>
    </div>
  );
}
export default SliderComponent;
