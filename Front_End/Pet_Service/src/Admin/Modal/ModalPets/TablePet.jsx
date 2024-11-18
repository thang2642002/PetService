const TablePet = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Pet Type</th>
            <th scope="col">Age</th>
            <th scope="col">Height</th>
            <th scope="col">Weight</th>
            <th scope="col">Coat Color</th>
            <th scope="col">Breed</th>
            <th scope="col">Price</th>
            <th scope="col">Available</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Coggi</td>
            <td>Chó</td>
            <td>2</td>
            <td>15</td>
            <td>20</td>
            <td>vàng</td>
            <td>có</td>
            <td>200000</td>
            <td>true</td>
            <td>bla bla</td>
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

export default TablePet;
