const Banner = ({ img }) => {
  return (
    <>
      <div className="cart_item cursor-pointer relative group overflow-hidden mt-8">
        <img
          src={img}
          alt="img-product"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 left-0 w-[50%] h-full bg-white opacity-0 transition-all duration-500 transform -translate-x-[100%] group-hover:translate-x-[100%] group-hover:opacity-25"></div>

          <div className="absolute inset-0 right-0 w-[50%] h-full bg-white opacity-0 transition-all duration-500 transform translate-x-[100%] group-hover:translate-x-0 group-hover:opacity-25"></div>
        </div>
      </div>
    </>
  );
};

export default Banner;
