import { Button, Dropdown, Space, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Category_Product.scss";
import Product_Carts from "../../components/Product_Carts";
import ButtonSeeMore from "../../components/ButtonSeeMore";
import { getAllPets } from "../../../services/petServices";
import {
  getAllProduct,
  findByCategory,
  getProductByName,
} from "../../../services/productServices";

const Category_Product = () => {
  const location = useLocation();
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const inputSearch = location.state;
  const { type } = useParams();

  const priceOptions = [
    { label: "Dưới 20.000đ", value: "under_20000" },
    { label: "20.000đ-50.000đ", value: "20000_50000" },
    { label: "50.000đ-100.000đ", value: "50000_100000" },
    { label: "100.000đ-200.000đ", value: "100000_200000" },
    { label: "Trên 200.000đ", value: "above_200000" },
  ];

  const brandOptions = [
    { label: "Thương hiệu A", value: "brand_a" },
    { label: "Thương hiệu B", value: "brand_b" },
    { label: "Thương hiệu C", value: "brand_c" },
    { label: "Thương hiệu D", value: "brand_d" },
  ];

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

  const fetchListProduct = async () => {
    if (type === "pets") {
      const data = await getAllPets();
      setListProduct(data.data);
    } else if (type === "products") {
      const data = await getAllProduct();
      setListProduct(data.data);
    } else if (type === "pettags") {
      const data = await findByCategory(2);
      setListProduct(data.data);
    } else if (type === "search") {
      const data = await getProductByName(inputSearch.inputSearch);
      setListProduct(data.data);
    }
  };

  useEffect(() => {
    fetchListProduct();
  }, [[type, inputSearch]]);

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
              width="20"
              height="20"
              className="ml-2 mr-2"
            >
              <path
                fill="none"
                stroke="#522f1f"
                strokeWidth="2"
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
                <Dropdown
                  menu={{ items: brandItems }}
                  placement="bottomLeft"
                  trigger={["hover"]}
                >
                  <Button className="mr-12 pr-[100px] py-[20px] rounded-none font-medium text-sm">
                    Lọc thương hiệu
                  </Button>
                </Dropdown>
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
          <Product_Carts listProduct={listProduct} />
        </div>
        <ButtonSeeMore />
      </div>
    </>
  );
};

export default Category_Product;
