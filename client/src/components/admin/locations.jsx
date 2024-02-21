function LocationsComponent({ id, location_name }) {
  return (
    <>
      <option value={id}>{location_name}</option>
    </>
  );
}
export default LocationsComponent;
