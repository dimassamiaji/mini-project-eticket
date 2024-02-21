/** @format */

import ModalEventEditComponent from "./modal_eventEdit";

function AdminEventCard(props) {
  return (
    <tr className="text-center">
      <td>
        <img
          src={process.env.API_URL + props.image_url}
          alt=""
          className=" w-24 object-cover"
        />
      </td>

      <td className="text-left">{props.event_name}</td>
      <td className=" font-semibold">
        IDR {Number(props.price).toLocaleString("id-ID")}
      </td>
      <td className="flex gap-5 justify-center items-center h-[70px]">
        <ModalEventEditComponent {...props} />
        <button
          className="h-[30px] border w-[72px] rounded-md text-white bg-black hover:bg-white border-black hover:text-black"
          onClick={props.hapus}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
export default AdminEventCard;
