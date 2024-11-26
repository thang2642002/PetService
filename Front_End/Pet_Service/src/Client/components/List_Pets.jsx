import React, { useEffect, useState } from "react";
import Title_Product_Carts from "./Title_Product_Carts";
import Pet_Carts from "./Pet_Carts";
import { getAllPets } from "../../services/petServices";

const List_Pets = () => {
  const [listPet, setListPet] = useState([]);
  const fetchPet = async () => {
    const dataPet = await getAllPets();
    setListPet(dataPet.data);
  };

  useEffect(() => {
    fetchPet();
  }, []);
  return (
    <div>
      <>
        <div>
          <Title_Product_Carts />
          <Pet_Carts listPet={listPet} />
        </div>
      </>
    </div>
  );
};

export default List_Pets;
