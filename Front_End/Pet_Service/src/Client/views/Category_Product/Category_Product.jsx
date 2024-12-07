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

const Category_Product = () => {
  const location = useLocation();
  const inputSearch = location.state;
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { type } = useParams();

  const fetchListCategory = async () => {
    try {
      const data = await fetchAllCategory();
      setListCategory(data.data);
      console.log("Fetched categories: ", data.data);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    fetchListCategory();
  }, []);

  const priceOptions = [
    { label: "Dưới 20.000đ", value: "under_20000" },
    { label: "20.000đ-50.000đ", value: "20000_50000" },
    { label: "50.000đ-100.000đ", value: "50000_100000" },
    { label: "100.000đ-200.000đ", value: "100000_200000" },
    { label: "Trên 200.000đ", value: "above_200000" },
  ];

  const brandOptions = listCategory.map((category) => ({
    label: category.name,
    value: String(category.category_id), // Ensure type consistency
  }));

  const handleCheckboxChange = (value, type) => {
    console.log("Checkbox clicked. Value: ", value, "Type: ", type);
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

      // Filter by selected prices
      if (selectedPrices.length > 0) {
        productList = productList.filter((product) => {
          return selectedPrices.some((priceRange) => {
            switch (priceRange) {
              case "under_20000":
                return product.price < 20000;
              case "20000_50000":
                return product.price >= 20000 && product.price <= 50000;
              case "50000_100000":
                return product.price > 50000 && product.price <= 100000;
              case "100000_200000":
                return product.price > 100000 && product.price <= 200000;
              case "above_200000":
                return product.price > 200000;
              default:
                return false;
            }
          });
        });
      }

      if (selectedBrands.length > 0) {
        console.log("Filtering by brands: ", selectedBrands);
        productList = productList.filter(
          (product) => selectedBrands.includes(String(product.category_id)) // Ensure type conversion
        );
      }

      setListProduct(productList);

      const response = await getPaginateProduct({
        listProduct: productList,
        page: 1,
        limit: 8,
      });

      console.log("Paginated response: ", response);

      setPaginatedProducts(response.data || []);
      setCurrentPage(1);
      setHasMore((response.totalPages || 0) > 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchListProduct();
  }, [type, inputSearch, selectedPrices, selectedBrands]);

  return (
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
        <Product_Carts paginatedProducts={paginatedProducts} />
      </div>
      <ButtonSeeMore onClick={loadMoreProducts} disabled={!hasMore} />
    </div>
  );
};

export default Category_Product;
