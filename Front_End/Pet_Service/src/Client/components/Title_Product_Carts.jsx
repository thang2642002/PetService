import React from "react";

const Title_Product_Carts = ({ title }) => {
  return (
    <>
      <div className="text-center mt-5">
        <h2 className="bg-[#6b4433] inline-block font-medium text-white uppercase min-w-[70%] text-xl  py-3 rounded-full">
          {title}
        </h2>
      </div>
    </>
  );
};

export default Title_Product_Carts;
