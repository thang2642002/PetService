const TableAppointment = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listAppointment } =
    props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Appointment Date</th>
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
                <td>{item.appointment_date}</td>
                <td>{item.status}</td>
                <td>{item.service_id}</td>
                <td>{item.user_pet_id}</td>
                <td>
                  <button className="btn btn-secondary">View</button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleShowUpdateModal(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDeleteModal(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAppointment;
