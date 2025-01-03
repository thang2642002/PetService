import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { createUserPet } from "../../services/userPetServices";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PetInfoForm = () => {
  const { user } = useSelector((state) => state.user); // Lấy thông tin user từ Redux
  const navigate = useNavigate(); // Hook chuyển trang
  const [userId, setUserId] = useState("");
  const [namePet, setNamePet] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [coatColor, setCoatColor] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user && user.data) {
      setUserId(user.data.user_id);
    }
  }, [user]);

  const handleSubmit = async () => {
    const data = await createUserPet(
      namePet,
      age,
      height,
      weight,
      coatColor,
      breed,
      description,
      userId
    );
    if (data && data.errCode === 0) {
      toast.success("Bạn đã nhập thông tin thành công");
      const userPetId = data.data.user_pet_id;
      navigate("/appointment", { state: { userPetId, userId } });
    } else {
      toast.error("Bạn chưa nhập đầy đủ thông tin");
    }
  };

  if (!user || !user.data) {
    return (
      <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md text-center">
        <h2 className="text-lg font-bold mb-4">
          Bạn cần đăng nhập để tiếp tục
        </h2>
        <Button
          type="primary"
          onClick={() => (window.location.href = "/login")}
        >
          Đăng nhập
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <Helmet>
        <title>Dịch vụ</title>
      </Helmet>
      <h2 className="text-lg font-bold mb-4">Thông tin thú cưng</h2>
      <div className="space-y-3">
        <Input
          placeholder="Tên thú cưng"
          value={namePet}
          onChange={(e) => setNamePet(e.target.value)}
        />
        <Input
          placeholder="Tuổi"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Input
          placeholder="Chiều cao (cm)"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <Input
          placeholder="Cân nặng (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input
          placeholder="Màu lông"
          value={coatColor}
          onChange={(e) => setCoatColor(e.target.value)}
        />
        <Input
          placeholder="Giống loài"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <Input.TextArea
          rows={3}
          placeholder="Mô tả thêm về thú cưng"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="primary" block className="mt-4" onClick={handleSubmit}>
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default PetInfoForm;
