import moment from "moment";

function CouponsComponent({ id, amount, expired_at }) {
  return (
    <option value={id}>
      {amount}%, exp:{moment(expired_at).format("YYYY-MM-DD")}
    </option>
  );
}
export default CouponsComponent;
