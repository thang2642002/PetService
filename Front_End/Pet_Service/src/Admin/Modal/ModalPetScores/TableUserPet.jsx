const TablePetScores = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listPetScores } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Date Scores</th>
            <th scope="col">Health Scores</th>
            <th scope="col">Height</th>
            <th scope="col">Weight</th>
            <th scope="col">Diet</th>
            <th scope="col">User Pet ID</th>
            <th scope="col">Note</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listPetScores &&
            Array.isArray(listPetScores) &&
            listPetScores.map((item, index) => (
              <tr key={index}>
                <td>{item.score_id}</td>
                <td>{item.score_date}</td>
                <td>{item.health_score}</td>
                <td>{item.height}</td>
                <td>{item.weight}</td>
                <td>{item.diet}</td>
                <td>{item.user_pet_id}</td>
                <td>{item.note}</td>
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

export default TablePetScores;
