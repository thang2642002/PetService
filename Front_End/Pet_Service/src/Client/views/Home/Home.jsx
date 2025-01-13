import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import "./Home.scss";

import Group_Menu from "../../components/Group_Menu";
import Slice from "../../components/Slice";
import Promotion from "../../components/Promotion";
import Banner from "../../components/Banner";
import ListPetsProduct from "../ListPetProduct/ListPetsProduct";
import Blog from "../../components/Blog";
import Banner1 from "../../../assets/img/Banner/home_collection_3_image.webp";
import Banner2 from "../../../assets/img/Banner/home_collection_4_image.webp";
import Banner3 from "../../../assets/img/Banner/home_collection_5_image.webp";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Helmet>
        <title>Trang chủ - Mozzi</title>
      </Helmet>
      <div className="container">
        <Group_Menu />
        <div data-aos="fade-right" className="promotion">
          <Slice />
        </div>
        <div data-aos="fade-left" className="promotion">
          <Promotion />
        </div>
        <div data-aos="fade-up">
          <ListPetsProduct type="discount" />
        </div>
        <div data-aos="fade-right">
          <Banner img={Banner1} />
        </div>
        <div data-aos="fade-up">
          <ListPetsProduct type="pets" />
        </div>
        <div data-aos="fade-right">
          <Banner img={Banner2} />
        </div>
        <div data-aos="fade-up">
          <ListPetsProduct type="products" />
        </div>
        <div data-aos="fade-right">
          <Banner img={Banner3} />
        </div>
        <div data-aos="fade-up">
          <ListPetsProduct type="pettags" />
        </div>
        <div data-aos="fade-right">
          <Banner img={Banner1} />
        </div>
        <div data-aos="fade-up">
          <Blog />
        </div>
      </div>
    </>
  );
};

export default Home;
