const TableCategory = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listCart } = props;
  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">User ID</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listCart &&
            Array.isArray(listCart) &&
            listCart.map((item, index) => (
              <tr key={index}>
                <td>{item.cart_id}</td>
                <td>{item.user_id}</td>
                <td>{item.total_amount}</td>

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

export default TableCategory;
