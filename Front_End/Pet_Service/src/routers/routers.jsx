import Admin from "../Admin/Admin";
import ManagerUser from "../Admin/Manager/ManagerUser";
import ManagerUserPet from "../Admin/Manager/ManagerUserPet";
import ManagerServiceReview from "../Admin/Manager/ManagerServiceReview";
import ManagerService from "../Admin/Manager/ManagerService";
import ManagerProductReview from "../Admin/Manager/ManagerProductReview";
import ManagerProduct from "../Admin/Manager/ManagerProduct";
import ManagerPost from "../Admin/Manager/ManagerPost";
import ManagerPets from "../Admin/Manager/ManagerPets";
import ManagerPetType from "../Admin/Manager/ManagerPetType";
import ManagerPetScores from "../Admin/Manager/ManagerPetScores";
import ManagerOrderItem from "../Admin/Manager/ManagerOrderItem";
import ManagerOrder from "../Admin/Manager/ManagerOrder";
import ManagerCategory from "../Admin/Manager/ManagerCatagory";
import ManagerAppointment from "../Admin/Manager/ManagerAppointment";

import LayoutDefault from "../Client/views/LayouDefault/LayoutDefault";
import Home from "../Client/views/Home/Home";
import ProductDetails from "../Client/views/Product_Details/Product_Details";
import PetDetails from "../Client/views/Pet_Details/Pet_Details";
import ShoppingCart from "../Client/views/Shopping_Cart/Shopping_Cart";
import Payment from "../Client/views/Payment/Payment";
import OrderDetails from "../Client/views/Order_Details/OrderDetails";

import Register from "../Client/views/Register/Register";
import Login from "../Client/views/Login/Login";

export const routers = [
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "managerUsers", element: <ManagerUser /> },
      { path: "managerUserPet", element: <ManagerUserPet /> },
      { path: "managerServiceReview", element: <ManagerServiceReview /> },
      { path: "managerService", element: <ManagerService /> },
      { path: "managerProductReview", element: <ManagerProductReview /> },
      { path: "managerProduct", element: <ManagerProduct /> },
      { path: "managerPost", element: <ManagerPost /> },
      { path: "managerPets", element: <ManagerPets /> },
      { path: "managerPetType", element: <ManagerPetType /> },
      { path: "managerPetScores", element: <ManagerPetScores /> },
      { path: "managerOrderItem", element: <ManagerOrderItem /> },
      { path: "managerOrder", element: <ManagerOrder /> },
      { path: "managerCategory", element: <ManagerCategory /> },
      { path: "managerAppointment", element: <ManagerAppointment /> },
    ],
  },

  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "product-detail/:id",
        element: <ProductDetails />,
      },
      {
        path: "pet-detail/:id",
        element: <PetDetails />,
      },
      {
        path: "shop-carts",
        element: <ShoppingCart />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "order-details",
        element: <OrderDetails />,
      },
    ],
  },
  // { path: "*", element: <NotFoundPage /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
];
