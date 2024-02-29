/** @format */
import ModalTransactionUser from "./modal_transaction_user";

function UserTransactionCard(props) {
  return (
    <>
      <tr className="text-center  border-b-2 border-black w-full">
        <td className="text-center">{props.invoice_no}</td>
        <td className="flex gap-5 justify-center items-center h-[70px] my-auto">
          <ModalTransactionUser {...props} button="View" />
        </td>
      </tr>
    </>
  );
}
export default UserTransactionCard;
