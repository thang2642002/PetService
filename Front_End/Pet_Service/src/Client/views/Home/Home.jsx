import Group_Menu from "../../components/Group_Menu";
import Slice from "../../components/Slice";
import Promotion from "../../components/Promotion";
import Banner from "../../components/Banner";
import ListPetsProduct from "../ListPetProduct/ListPetsProduct";
import Blog from "../../components/Blog";

const Home = () => {
  return (
    <>
      <div className="container">
        <Group_Menu />
        <Slice />
        <Promotion />
        <ListPetsProduct type="discount" />
        <Banner />
        <ListPetsProduct type="pets" />
        <Banner />
        <ListPetsProduct type="products" />
        <Banner />
        <ListPetsProduct type="pettags" />
        <Banner />
        <Blog />
      </div>
    </>
  );
};

export default Home;
