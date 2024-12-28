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
import ManagerCarts from "../Admin/Manager/ManagerCarts";
import ManagerPetReview from "../Admin/Manager/ManagerPetReview";

import LayoutDefault from "../Client/views/LayouDefault/LayoutDefault";
import Home from "../Client/views/Home/Home";
import ProductDetails from "../Client/views/Product_Details/Product_Details";
import PetDetails from "../Client/views/Pet_Details/Pet_Details";
import ShoppingCart from "../Client/views/Shopping_Cart/Shopping_Cart";
import Payment from "../Client/views/Payment/Payment";
import OrderDetails from "../Client/views/Order_Details/OrderDetails";
import PetInfoForm from "../Client/components/PetInfoForm";
import AppointmentForm from "../Client/components/ApointmentForm";
import ProfileUser from "../Client/views/ProfileUser/ProfileUser";
import CategoryProduct from "../Client/views/Category_Product/Category_Product";
import ListPost from "../Client/views/ListPost/ListPost";
import Statistical from "../Client/views/Statistical/Statistical";
import Post_Details from "../Client/views/Post_Details/Post_Details";

import Register from "../Client/views/Register/Register";
import Login from "../Client/views/Login/Login";
import Contact from "../Client/views/Contact/Contact";

export const routers = [
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "", element: <Statistical /> },
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
      { path: "managerCarts", element: <ManagerCarts /> },
      { path: "statistical", element: <Statistical /> },
      { path: "managerPetReview", element: <ManagerPetReview /> },
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
        path: "shop-carts/:id",
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
      {
        path: "appointment",
        element: <AppointmentForm />,
      },
      {
        path: "info-pet",
        element: <PetInfoForm />,
      },
      { path: "profile-user", element: <ProfileUser /> },
      { path: "category-product/:type", element: <CategoryProduct /> },
      { path: "contact", element: <Contact /> },
      { path: "post", element: <ListPost /> },
      {
        path: "post-detail/:id",
        element: <Post_Details />,
      },
    ],
  },
  // { path: "*", element: <NotFoundPage /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
];
