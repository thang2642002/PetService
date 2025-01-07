import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { createUserPet } from "../../services/userPetServices";
import { useNavigate } from "react-router-dom";
import { findUserPetAppoint } from "../../services/appointmentServices";

const PetInfoForm = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [namePet, setNamePet] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [coatColor, setCoatColor] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [appointmentCode, setAppointmentCode] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [error, setError] = useState("");

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

  const fetchAppointmentData = async () => {
    try {
      const data = await findUserPetAppoint(appointmentCode);
      if (data && data.errCode === 0) {
        setAppointmentData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-section");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>In Thông Tin</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

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
          type="text"
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
      {/*  */}
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 mt-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tra cứu đặt lịch
          </h2>

          <div className="mb-4">
            <label
              htmlFor="appointmentCode"
              className="block text-gray-700 font-medium"
            >
              Nhập mã đặt lịch
            </label>
            <input
              type="text"
              id="appointmentCode"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              value={appointmentCode}
              onChange={(e) => setAppointmentCode(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
            onClick={fetchAppointmentData}
          >
            Xác nhận
          </button>

          {error && <p className="mt-4 text-red-500">{error}</p>}

          {appointmentData && (
            <div>
              <div id="print-section" className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Thông tin đặt lịch
                </h3>
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Dịch vụ:</span>{" "}
                  {appointmentData.service.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Giá:</span>{" "}
                  {appointmentData.service.price} VND
                </p>
                <p className="text-gray-700 mt-4 font-medium">
                  Thông tin thú cưng:
                </p>
                <ul className="mt-2 text-gray-700 list-disc list-inside">
                  <li>
                    <span className="font-medium">Tên:</span>{" "}
                    {appointmentData.user_pet.name_pet}
                  </li>
                  <li>
                    <span className="font-medium">Tuổi:</span>{" "}
                    {appointmentData.user_pet.age}
                  </li>
                  <li>
                    <span className="font-medium">Chiều cao:</span>{" "}
                    {appointmentData.user_pet.height} cm
                  </li>
                  <li>
                    <span className="font-medium">Cân nặng:</span>{" "}
                    {appointmentData.user_pet.weight} kg
                  </li>
                  <li>
                    <span className="font-medium">Màu lông:</span>{" "}
                    {appointmentData.user_pet.coat_color}
                  </li>
                  <li>
                    <span className="font-medium">Giống:</span>{" "}
                    {appointmentData.user_pet.breed}
                  </li>
                </ul>
              </div>

              <button
                className="w-full mt-4 bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600"
                onClick={handlePrint}
              >
                In Thông Tin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetInfoForm;
