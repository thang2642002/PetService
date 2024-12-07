const ButtonSeeMore = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-4 px-6 py-2 rounded ${
        disabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#6b4433] text-white"
      }`}
    >
      {disabled ? "Hết sản phẩm" : "Xem thêm"}
    </button>
  );
};

export default ButtonSeeMore;
