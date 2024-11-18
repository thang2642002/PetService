import Header from "../components/Header";
import Small_Slice from "../components/Small_Slice";
import Group_Menu from "../components/Group_Menu";
import Slice from "../components/Slice";
import Promotion from "../components/Promotion";
import Banner from "../components/Banner";
import List_Product from "../components/List_Product";
import Blog from "../components/Blog";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <div className="container">
        <Small_Slice />
        <Header />
        <Group_Menu />
        <Slice />
        <Promotion />
        <List_Product />
        <Banner />
        <Blog />
        <Footer />
      </div>
    </>
  );
};

export default Home;
