const TableProductReview = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listProductReview } =
    props;

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
          {listProductReview &&
            Array.isArray(listProductReview) &&
            listProductReview.map((item, index) => (
              <tr key={index}>
                <td>{item.product_review_id}</td>
                <td>{item.comment}</td>
                <td>{item.rating}</td>
                <td>{item.user_id}</td>
                <td>{item.product_id}</td>
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

export default TableProductReview;
