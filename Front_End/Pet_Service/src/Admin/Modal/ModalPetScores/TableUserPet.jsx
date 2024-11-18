const TablePetScores = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal } = props;

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
          <tr>
            <td>1</td>
            <td>20/10/2024</td>
            <td>tốt</td>
            <td>15</td>
            <td>20</td>
            <td>1</td>
            <td>1</td>
            <td>Bla bla</td>
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

export default TablePetScores;
