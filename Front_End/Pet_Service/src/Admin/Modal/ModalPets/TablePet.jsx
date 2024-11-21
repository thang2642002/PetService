const TablePet = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listPets } = props;

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
          {listPets &&
            Array.isArray(listPets) &&
            listPets.map((item, index) => (
              <tr key={index}>
                <td>{item.pet_id}</td>
                <td>{item.name}</td>
                <td>{item.pet_type_id}</td>
                <td>{item.age}</td>
                <td>{item.height}</td>
                <td>{item.weight}</td>
                <td>{item.coat_color}</td>
                <td>{item.breed}</td>
                <td>{item.price}</td>
                <td>{item.available ? "Available" : "Not Available"}</td>
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

export default TablePet;
