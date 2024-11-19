const TableUserPet = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listUserPet } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name Pet</th>
            <th scope="col">Age</th>
            <th scope="col">Height</th>
            <th scope="col">Weight</th>
            <th scope="col">CoatColor</th>
            <th scope="col">Breed</th>
            <th scope="col">User ID</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUserPet &&
            Array.isArray(listUserPet) &&
            listUserPet.map((item, index) => (
              <tr key={index}>
                <td>{item.user_pet_id}</td>
                <td>{item.name_pet}</td>
                <td>{item.age}</td>
                <td>{item.height}</td>
                <td>{item.weight}</td>
                <td>{item.coat_color}</td>
                <td>{item.breed}</td>
                <td>{item.user_id}</td>
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

export default TableUserPet;
