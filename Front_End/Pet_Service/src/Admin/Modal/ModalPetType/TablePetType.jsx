const TablePetType = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listPetType } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Type Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listPetType &&
            Array.isArray(listPetType) &&
            listPetType.map((item, index) => (
              <tr key={index}>
                <td>{item.pet_type_id}</td>
                <td>{item.type_name}</td>
                <td>{item.description}</td>

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

export default TablePetType;
