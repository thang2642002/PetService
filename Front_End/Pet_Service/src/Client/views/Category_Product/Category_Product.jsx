import { Button, Dropdown, Space, Checkbox } from "antd";
import { useState } from "react";
import "./Category_Product.scss";
import Product_Carts from "../../components/Product_Carts";
import ButtonSeeMore from "../../components/ButtonSeeMore";

const Category_Product = () => {
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Danh sách các giá
  const priceOptions = [
    { label: "Dưới 20.000đ", value: "under_20000" },
    { label: "20.000đ-50.000đ", value: "20000_50000" },
    { label: "50.000đ-100.000đ", value: "50000_100000" },
    { label: "100.000đ-200.000đ", value: "100000_200000" },
    { label: "Trên 200.000đ", value: "above_200000" },
  ];

  // Danh sách các thương hiệu
  const brandOptions = [
    { label: "Thương hiệu A", value: "brand_a" },
    { label: "Thương hiệu B", value: "brand_b" },
    { label: "Thương hiệu C", value: "brand_c" },
    { label: "Thương hiệu D", value: "brand_d" },
  ];

  // Xử lý chọn giá
  const handleCheckboxChange = (value, type) => {
    if (type === "price") {
      setSelectedPrices((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (type === "brand") {
      setSelectedBrands((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  // Tạo danh sách menu cho lọc giá
  const priceItems = priceOptions.map((option) => ({
    key: option.value,
    label: (
      <Checkbox
        value={option.value}
        checked={selectedPrices.includes(option.value)}
        onChange={() => handleCheckboxChange(option.value, "price")}
      >
        {option.label}
      </Checkbox>
    ),
  }));

  // Tạo danh sách menu cho lọc thương hiệu
  const brandItems = brandOptions.map((option) => ({
    key: option.value,
    label: (
      <Checkbox
        value={option.value}
        checked={selectedBrands.includes(option.value)}
        onChange={() => handleCheckboxChange(option.value, "brand")}
      >
        {option.label}
      </Checkbox>
    ),
  }));

  return (
    <>
      <div className="container my-10">
        <div>
          <h3 className="text-[#522f1f] ml-3">Mua đồ cho chó</h3>
        </div>
        <div className="flex gap-[50px] mt-4">
          <div className="mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              width="20" // Chỉnh kích thước SVG
              height="20" // Chỉnh kích thước SVG
              className="ml-2 mr-2" // Thêm khoảng cách
            >
              <path
                fill="none"
                stroke="#522f1f" // Màu sắc của đường viền
                strokeWidth="2" // Độ dày của đường viền
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M12 9v8l-4-4V9L2 3h16z"
              ></path>
            </svg>
            <span>Bộ lọc</span>
          </div>
          <div>
            <Space direction="vertical">
              <Space wrap>
                {/* Dropdown lọc theo thương hiệu */}
                <Dropdown
                  menu={{ items: brandItems }}
                  placement="bottomLeft"
                  trigger={["hover"]}
                >
                  <Button className="mr-12 pr-[100px] py-[20px] rounded-none font-medium text-sm">
                    Lọc thương hiệu
                  </Button>
                </Dropdown>

                {/* Dropdown lọc theo giá */}
                <Dropdown
                  menu={{ items: priceItems }}
                  placement="bottomLeft"
                  trigger={["hover"]}
                >
                  <Button className="mr-4 pr-[150px] py-[20px] rounded-none font-medium text-sm">
                    Lọc giá
                  </Button>
                </Dropdown>
              </Space>
            </Space>
          </div>
        </div>
        <div>
          <Product_Carts />
          <Product_Carts />
        </div>
        <ButtonSeeMore />
      </div>
    </>
  );
};

export default Category_Product;
