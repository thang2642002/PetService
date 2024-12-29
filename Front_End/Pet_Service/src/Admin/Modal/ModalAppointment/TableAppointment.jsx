import ReactPaginate from "react-paginate";
import { useState } from "react";
import {
  getAppointmentById,
  updateAppointmentStatus,
} from "../../../services/appointmentServices";
import { createNotification } from "../../../services/notificationServices";
import moment from "moment";

const TableAppointment = (props) => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    handleShowUpdateModal,
    handleShowDeleteModal,
    listAppointment,
  } = props;

  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleAccept = async (id) => {
    try {
      const updateAppointment = await updateAppointmentStatus(id, "completed");
      if (updateAppointment && updateAppointment.errCode === 0) {
        const appointment = await getAppointmentById(id);
        if (appointment && appointment.errCode === 0) {
          const appointmentUser = appointment?.data?.user_pet?.user_id;
          const servicesName = appointment?.data?.service?.name;
          await createNotification(
            `Quý khách đã đăng ký thành công lịch ${servicesName} hãy nhớ đến đúng giờ`,
            appointmentUser
          );
        }
      }
    } catch (error) {
      console.error("Error in handleAccept:", error);
    }
  };

  const handleRefuse = async (id) => {
    try {
      const updateAppointment = await updateAppointmentStatus(id, "cancelled");
      if (updateAppointment && updateAppointment.errCode === 0) {
        const appointment = await getAppointmentById(id);
        if (appointment && appointment.errCode === 0) {
          const appointmentUser = appointment?.data?.user_pet?.user_id;
          await createNotification(
            `Thời gian quý khách đăng ký lịch hẹn đã không còn trống, xin hãy chọn khung giờ khác`,
            appointmentUser
          );
        }
      }
    } catch (error) {
      console.error("Error in handleAccept:", error);
    }
  };

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Appointment Date</th>
            <th scope="col">Appointment Time</th>
            <th scope="col">Status</th>
            <th scope="col">Service ID</th>
            <th scope="col">User Pet ID</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listAppointment &&
            Array.isArray(listAppointment) &&
            listAppointment.map((item, index) => (
              <tr key={index}>
                <td>{item.appointment_id}</td>
                <td>{formatDate(item.appointment_date)}</td>
                <td>{item.time_date}</td>
                <td>{item.status}</td>
                <td>{item.service_id}</td>
                <td>{item.user_pet_id}</td>
                <td>
                  {/* <button className="btn btn-secondary">View</button> */}
                  {item.status === "pending" ? (
                    <>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => handleAccept(item.appointment_id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-warning mx-2"
                        onClick={() => handleRefuse(item.appointment_id)}
                      >
                        Refuse
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleShowDeleteModal(item)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <div className="text-red-600 font-medium">
                      Đã được xử lý
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default TableAppointment;
