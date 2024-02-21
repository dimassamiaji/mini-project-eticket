function CategoriesComponent({ id, category_name }) {
  return (
    <>
      <option value={id}>{category_name}</option>
    </>
  );
}
export default CategoriesComponent;
