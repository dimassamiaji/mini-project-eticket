/** @format */

import ModalEventEditComponent from "./modal_eventEdit";
import ModalPromotion from "./modal_promotion";

function AdminPromoCard(props) {
  return (
    <>
      <tr className="text-center">
        <td>
          <img
            src={process.env.API_URL + props.image_url}
            alt=""
            className=" w-24 object-cover max-h-[70px]"
          />
        </td>
        <td className="text-center">{props.event_name}</td>
        <td className="md:flex hidden gap-5 justify-center items-center h-[70px] my-auto">
          <ModalPromotion {...props} button="Promo" />
          <button
            className="h-[30px] border w-[72px] rounded-md text-white bg-black hover:bg-white border-black hover:text-black"
            onClick={props.hapus}
          >
            Delete
          </button>
        </td>
      </tr>
      <tr className="md:hidden text-center border-b-2 border-black">
        <td></td>
        <td className="flex gap-5 justify-center items-center h-[70px] my-auto">
          <ModalPromotion {...props} button="Promo" />
          <button
            className="h-[30px] border w-[72px] rounded-md text-white bg-black hover:bg-white border-black hover:text-black"
            onClick={props.hapus}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
export default AdminPromoCard;
