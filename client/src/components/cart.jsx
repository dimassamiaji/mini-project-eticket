/** @format */
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

function CartComponent({ qty, product }) {
  return (
    <tr className="text-center ">
      <td>
        <img
          src={process.env.API_URL + product.image_url}
          alt=""
          className="   w-48 h-[136px] object-cover"
        />
      </td>

      <td className=" font-semibold  ">
        <div className="flex items-start">
          <div className="w-full text-left ">{product?.product_name}</div>
          <div className="w-full text-lg font-bold text-right">
            IDR {Number(product?.price * qty).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="border-2 p-2 w-32 rounded-xl ">{qty}</div>
        </div>
      </td>
    </tr>
  );
}
export default CartComponent;
