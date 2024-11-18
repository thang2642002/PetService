const TableUser = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal } = props;

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
          <tr>
            <td>1</td>
            <td>tranthang0369@gmail.com</td>
            <td>Trần Thắng</td>
            <td>0342925377</td>
            <td>Bình Định</td>
            <td>Manager</td>
            <td>
              <button className="btn btn-secondary">View</button>
              <button
                className="btn btn-warning mx-3"
                onClick={() => handleShowUpdateModal()}
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleShowDeleteModal()}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
