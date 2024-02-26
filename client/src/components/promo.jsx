function PromoComponent({ promo, description }) {
  if (promo) {
    return (
      <div className=" pt-10 flex flex-col gap-5  w-full justify-center ">
        <div className=" font-bold text-3xl">Active Promo</div>
        <div className="my-2">
          <div className="text-justify">{description}</div>
        </div>
      </div>
    );
  }
}
export default PromoComponent;
