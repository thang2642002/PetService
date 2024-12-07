import Group_Menu from "../../components/Group_Menu";
import Slice from "../../components/Slice";
import Promotion from "../../components/Promotion";
import Banner from "../../components/Banner";
import List_Product from "../../components/List_Product";
import List_Pets from "../../components/List_Pets";
import Blog from "../../components/Blog";

const Home = () => {
  return (
    <>
      <div className="container">
        <Group_Menu />
        <Slice />
        <Promotion />
        <List_Product type="products" />
        <List_Pets />
        <Banner />
        <Blog />
      </div>
    </>
  );
};

export default Home;
