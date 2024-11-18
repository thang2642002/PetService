const TableProductReview = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Comment</th>
            <th scope="col">Rating</th>
            <th scope="col">User ID</th>
            <th scope="col">Product ID</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>bal bala</td>
            <td>5</td>
            <td>1</td>
            <td>1</td>
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

export default TableProductReview;
