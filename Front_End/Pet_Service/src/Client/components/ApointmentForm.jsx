import React, { useState } from "react";
import {
  DatePicker,
  TimePicker,
  Button,
  Input,
  Select,
  notification,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createAppointment } from "../../services/appointmentServices";

const { Option } = Select;

const AppointmentForm = () => {
  const location = useLocation();
  const { userPetId } = location.state || {};

  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const [description, setDescription] = useState("");

  const handleDateChange = (date) => {
    setAppointmentDate(date);
  };

  const handleTimeChange = (time) => {
    setAppointmentTime(time);
  };

  const handleServiceChange = (value) => {
    setServiceId(value);
  };

  const handleSubmit = async () => {
    // if (!appointmentDate || !appointmentTime || !serviceId) {
    //   notification.error({
    //     message: "Vui lòng chọn đầy đủ thông tin!",
    //   });
    //   return;
    // }

    // const appointmentDateTime = moment(appointmentDate).set({
    //   hour: appointmentTime.hour(),
    //   minute: appointmentTime.minute(),
    // });

    const data = await createAppointment("pending", serviceId, userPetId);
    if (data && data.errCode === 0) {
      console.log("Đặt lịch thành công");
    } else {
      console.log("Đặt lịch thất bại");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Đặt lịch cho thú cưng</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm">Chọn ngày</p>
          <DatePicker
            className="w-full"
            onChange={handleDateChange}
            placeholder="Chọn ngày"
          />
        </div>

        <div>
          <p className="text-sm">Chọn giờ</p>
          <TimePicker
            className="w-full"
            format="HH:mm"
            onChange={handleTimeChange}
            placeholder="Chọn giờ"
          />
        </div>

        <div>
          <p className="text-sm">Chọn dịch vụ</p>
          <Select
            className="w-full"
            value={serviceId}
            onChange={handleServiceChange}
            placeholder="Chọn dịch vụ"
          >
            <Option value="1">Dịch vụ 1</Option>
            <Option value="4">Dịch vụ 2</Option>
          </Select>
        </div>

        <div>
          <p className="text-sm">Mô tả thêm</p>
          <Input.TextArea
            rows={4}
            placeholder="Mô tả thêm về yêu cầu đặt lịch"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button type="primary" block className="mt-4" onClick={handleSubmit}>
          Đặt lịch
        </Button>
      </div>
    </div>
  );
};

export default AppointmentForm;
