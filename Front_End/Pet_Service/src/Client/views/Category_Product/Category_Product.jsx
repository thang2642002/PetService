import { Button, Dropdown, Space, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Category_Product.scss";
import Product_Carts from "../../components/Product_Carts";
import ButtonSeeMore from "../../components/ButtonSeeMore";
import { getAllPets } from "../../../services/petServices";
import {
  getAllProduct,
  findByCategory,
  getProductByName,
} from "../../../services/productServices";
import { getPaginateProduct } from "../../../services/paginateServices";
import { fetchAllCategory } from "../../../services/categoryServices";
import { getAllPetType } from "../../../services/petTypeServices";

const Category_Product = () => {
  const location = useLocation();
  const inputSearch = location.state;
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]); // Chứa category hoặc pet_type
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { type } = useParams();

  // Lấy danh sách filter options
  const fetchFilterOptions = async () => {
    try {
      if (type === "pets") {
        const data = await getAllPetType();
        setFilterOptions(data.data);
      } else {
        const data = await fetchAllCategory();
        setFilterOptions(data.data);
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  // Lấy danh sách sản phẩm hoặc thú cưng
  const fetchListProduct = async () => {
    try {
      let data;
      switch (type) {
        case "pets":
          data = await getAllPets();
          break;
        case "products":
          data = await getAllProduct();
          break;
        case "pettags":
          data = await findByCategory(2);
          break;
        case "search":
          data = await getProductByName(inputSearch?.inputSearch);
          break;
        default:
          data = { data: [] };
      }

      let productList = data?.data || [];

      if (selectedPrices.length > 0) {
        productList = productList.filter((product) => {
          return selectedPrices.some((priceRange) => {
            switch (priceRange) {
              case "under_20000":
                return product.price < 20000;
              case "20000_50000":
                return product.price >= 20000 && product.price <= 50000;
              case "50000_100000":
                return product.price >= 50000 && product.price <= 100000;
              case "100000_200000":
                return product.price >= 100000 && product.price <= 200000;
              case "above_200000":
                return product.price > 200000;
              default:
                return false;
            }
          });
        });
      }

      if (selectedBrands.length > 0) {
        productList = productList.filter((product) =>
          selectedBrands.includes(
            String(type === "pets" ? product.pet_type_id : product.category_id)
          )
        );
      }

      setListProduct(productList);

      const response = await getPaginateProduct({
        listProduct: productList,
        page: 1,
        limit: 8,
      });

      setPaginatedProducts(response.data || []);
      setCurrentPage(1);
      setHasMore((response.totalPages || 0) > 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
    fetchListProduct();
  }, [type, inputSearch, selectedPrices, selectedBrands]);

  const priceOptions = [
    { label: "Dưới 20.000đ", value: "under_20000" },
    { label: "20.000đ-50.000đ", value: "20000_50000" },
    { label: "50.000đ-100.000đ", value: "50000_100000" },
    { label: "100.000đ-200.000đ", value: "100000_200000" },
    { label: "Trên 200.000đ", value: "above_200000" },
  ];

  const brandOptions = filterOptions.map((option) => ({
    label: type === "pets" ? option.type_name : option.name,
    value: String(type === "pets" ? option.pet_type_id : option.category_id),
  }));

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
        checked={selectedBrands.includes(option.value)}
        value={option.value}
        onChange={() => handleCheckboxChange(option.value, "brand")}
      >
        {option.label}
      </Checkbox>
    ),
  }));

  const loadMoreProducts = async () => {
    try {
      const response = await getPaginateProduct({
        listProduct,
        page: currentPage + 1,
        limit: 8,
      });

      const newProducts = response.data || [];
      setPaginatedProducts((prev) => [...prev, ...newProducts]);
      setCurrentPage((prev) => prev + 1);

      if (response.totalPages <= currentPage + 1) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    }
  };

  return (
    <div className="container my-10">
      <div>
        <h3 className="text-[#522f1f] ml-3">
          {type === "pets" ? "Mua thú cưng" : "Mua đồ dùng cho thú cưng"}
        </h3>
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
                  {type === "pets" ? "Lọc loại thú cưng" : "Lọc danh mục"}
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
        <Product_Carts paginatedProducts={paginatedProducts} />
      </div>
      <div className="flex align-items-center justify-center">
        <ButtonSeeMore onClick={loadMoreProducts} disabled={!hasMore} />
      </div>
    </div>
  );
};

export default Category_Product;
