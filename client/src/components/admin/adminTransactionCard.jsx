/** @format */

import ModalEventEditComponent from "./modal_eventEdit";
import ModalTransaction from "./modal_transaction";

function AdminTransactionCard(props) {
  return (
    <>
      <tr className="text-center  border-b-2 border-black w-full">
        <td className="text-center">{props.invoice_no}</td>
        <td className="flex gap-5 justify-center items-center h-[70px] my-auto">
          <ModalTransaction {...props} button="View" />
        </td>
      </tr>
    </>
  );
}
export default AdminTransactionCard;
