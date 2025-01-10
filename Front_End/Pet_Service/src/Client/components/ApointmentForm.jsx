// import React, { useEffect, useState } from "react";
// import {
//   DatePicker,
//   TimePicker,
//   Button,
//   Select,
//   notification,
//   Input,
// } from "antd";
// import moment from "moment";
// import { useLocation } from "react-router-dom";
// import { createAppointment } from "../../services/appointmentServices";
// import { getAllServices } from "../../services/serviceServices";
// import Rating from "../../Client/views/ReviewServices/Rating/Rating";
// import Comment from "../../Client/views/ReviewServices/Comment/Comment";

// const { Option } = Select;

// const AppointmentForm = () => {
//   const location = useLocation();
//   const { userPetId } = location.state || {};

//   const [appointmentDate, setAppointmentDate] = useState(null);
//   const [appointmentTime, setAppointmentTime] = useState(null);
//   const [serviceId, setServiceId] = useState("");
//   const [description, setDescription] = useState("");
//   const [listServices, setListServices] = useState([]);

//   const handleDateChange = (date) => {
//     if (date) {
//       setAppointmentDate(date);
//     } else {
//       setAppointmentDate(null);
//     }
//   };

//   const handleTimeChange = (time, timeString) => {
//     if (time) {
//       const formattedTime = time.format("HH:mm:ss");
//       setAppointmentTime(formattedTime);
//     } else {
//       console.log("No valid time selected.");
//       setAppointmentTime(null);
//     }
//   };

//   const handleServiceChange = (value) => {
//     setServiceId(value);
//   };

//   const fetchListServices = async () => {
//     const dataListServices = await getAllServices();
//     if (dataListServices && dataListServices.errCode === 0) {
//       setListServices(dataListServices.data);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!appointmentDate || !appointmentTime || !serviceId) {
//       notification.error({
//         message: "Vui lòng chọn đầy đủ thông tin!",
//       });
//       return;
//     }
//     const formattedDate = moment(appointmentDate).format("YYYY-MM-DD");
//     try {
//       const data = await createAppointment(
//         formattedDate,
//         appointmentTime,
//         "pending",
//         serviceId,
//         userPetId
//       );
//       if (data && data.errCode === 0) {
//         notification.success({
//           message: "Đặt lịch thành công!",
//         });
//         setAppointmentDate(null);
//         setAppointmentTime(null);
//         setServiceId("");
//         setDescription("");
//       } else {
//         notification.error({
//           message: "Đặt lịch thất bại!",
//           description: data?.errMessage || "Có lỗi xảy ra, vui lòng thử lại!",
//         });
//       }
//     } catch (error) {
//       notification.error({
//         message: "Đặt lịch thất bại!",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchListServices();
//   }, []);

//   return (
//     <>
//       <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
//         <h2 className="text-lg font-bold mb-4">Đặt lịch khám thú cưng</h2>

//         <div className="space-y-4">
//           <div>
//             <p className="text-sm">Chọn ngày</p>
//             <DatePicker
//               className="w-full"
//               onChange={handleDateChange}
//               placeholder="Chọn ngày"
//             />
//           </div>

//           <div>
//             <p className="text-sm">Chọn giờ</p>
//             <TimePicker
//               className="w-full"
//               format="HH:mm"
//               onChange={handleTimeChange}
//               placeholder="Chọn giờ"
//             />
//           </div>

//           <div>
//             <p className="text-sm">Chọn dịch vụ</p>
//             <Select
//               className="w-full"
//               value={serviceId}
//               onChange={handleServiceChange}
//               placeholder="Chọn dịch vụ"
//             >
//               <option value="">Select a service</option>
//               {listServices &&
//                 listServices.map((item, index) => {
//                   return (
//                     <Option value={item.service_id} key={item.service_id}>
//                       {item.name} - {item.price.toLocaleString()}đ
//                     </Option>
//                   );
//                 })}
//             </Select>
//           </div>
//           <div>
//             <p className="text-sm">Mô tả thêm</p>
//             <Input.TextArea
//               rows={4}
//               placeholder="Mô tả thêm về yêu cầu đặt lịch"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           {/* Submit Button */}
//           <Button type="primary" block className="mt-4" onClick={handleSubmit}>
//             Đặt lịch
//           </Button>
//         </div>
//       </div>
//       <div>
//         <Rating />
//         <Comment />
//       </div>
//     </>
//   );
// };

// export default AppointmentForm;

import React, { useEffect, useState } from "react";
import {
  DatePicker,
  TimePicker,
  Button,
  Select,
  notification,
  Input,
} from "antd";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { createAppointment } from "../../services/appointmentServices";
import { getAllServices } from "../../services/serviceServices";
import Rating from "../../Client/views/ReviewServices/Rating/Rating";
import Comment from "../../Client/views/ReviewServices/Comment/Comment";

const { Option } = Select;

const AppointmentForm = () => {
  const location = useLocation();
  const { userPetId } = location.state || {};

  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const [endDateAppointment, setEndDateAppointment] = useState(null);
  const [description, setDescription] = useState("");
  const [listServices, setListServices] = useState([]);

  const handleDateChange = (date) => {
    if (date) {
      setAppointmentDate(date);
    } else {
      setAppointmentDate(null);
    }
  };

  const handleTimeChange = (time, timeString) => {
    if (time) {
      const formattedTime = time.format("HH:mm:ss");
      setAppointmentTime(formattedTime);
    } else {
      console.log("No valid time selected.");
      setAppointmentTime(null);
    }
  };

  const handleServiceChange = (value) => {
    setServiceId(value);
  };

  const handleEndDateChange = (date) => {
    if (date) {
      setEndDateAppointment(date);
    } else {
      setEndDateAppointment(null);
    }
  };

  const fetchListServices = async () => {
    const dataListServices = await getAllServices();
    if (dataListServices && dataListServices.errCode === 0) {
      setListServices(dataListServices.data);
    }
  };

  const handleSubmit = async () => {
    if (!appointmentDate || !appointmentTime || !serviceId) {
      notification.error({
        message: "Vui lòng chọn đầy đủ thông tin!",
      });
      return;
    }
    const formattedDate = moment(appointmentDate).format("YYYY-MM-DD");
    const formattedEndDate = endDateAppointment
      ? moment(endDateAppointment).format("YYYY-MM-DD")
      : null;

    try {
      const data = await createAppointment(
        formattedDate,
        formattedEndDate,
        appointmentTime,
        "pending",
        serviceId,
        userPetId
      );
      if (data && data.errCode === 0) {
        notification.success({
          message: "Đặt lịch thành công!",
        });
        setAppointmentDate(null);
        setAppointmentTime(null);
        setServiceId("");
        setEndDateAppointment(null);
        setDescription("");
      } else {
        notification.error({
          message: "Đặt lịch thất bại!",
          description: data?.errMessage || "Có lỗi xảy ra, vui lòng thử lại!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Đặt lịch thất bại!",
      });
    }
  };

  useEffect(() => {
    fetchListServices();
  }, []);

  return (
    <>
      <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-4">Đặt lịch khám thú cưng</h2>

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
              <option value="">Select a service</option>
              {listServices &&
                listServices.map((item, index) => {
                  return (
                    <Option value={item.service_id} key={item.service_id}>
                      {item.name} - {item.price.toLocaleString()}đ
                    </Option>
                  );
                })}
            </Select>
          </div>
          <div className="text-red-500 font-semibold text-sm italic bg-yellow-100 p-2 rounded-md shadow-sm">
            * Lưu ý dịch vụ trong hộ sẽ tính 100.000/ngày *
          </div>
          {/* End date input - only display if necessary */}
          {serviceId && (
            <div>
              <p className="text-sm">Chọn ngày kết thúc (nếu có)</p>
              <DatePicker
                className="w-full"
                onChange={handleEndDateChange}
                placeholder="Chọn ngày kết thúc"
              />
            </div>
          )}

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
      <div>
        <Rating />
        <Comment />
      </div>
    </>
  );
};

export default AppointmentForm;
