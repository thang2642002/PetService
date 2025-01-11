import React from "react";
import moment from "moment";

const Voucher = ({ voucher }) => {
  return (
    <div className="max-w-sm mx-auto bg-gray-100 shadow-sm rounded-lg overflow-hidden p-3">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-md font-semibold text-gray-800">
              {voucher.name_voucher}
            </p>
            <div className="bg-red-500 text-white text-xs p-1 rounded-md">
              -{voucher.discount}%
            </div>
          </div>
          <p className="text-xs text-gray-600">{voucher.voucher_type}</p>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1">
        <span className="text-xs text-gray-500">
          Ngày bắt đầu: {moment(voucher.start_date).format("DD/MM/YYYY")}
        </span>
        <span className="text-xs text-gray-500">
          Ngày kết thúc: {moment(voucher.end_date).format("DD/MM/YYYY")}
        </span>
        <span className="text-xs text-gray-500">
          Số lượng: {voucher.quantity}
        </span>
      </div>
      <button className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none mt-3 w-full">
        Sử dụng
      </button>
    </div>
  );
};

export default Voucher;
