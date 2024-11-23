const TableUser = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listUser } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">User Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            Array.isArray(listUser) &&
            listUser.map((item, index) => (
              <tr key={index}>
                <td>{item.user_id}</td>
                <td>{item.email}</td>
                <td>{item.user_name}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.role}</td>
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

export default TableUser;
