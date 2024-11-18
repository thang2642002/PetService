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
];
