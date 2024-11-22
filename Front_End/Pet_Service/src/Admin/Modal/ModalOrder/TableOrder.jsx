const TableOrder = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listOrder } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Total Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Order Date</th>
            <th scope="col">User ID</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listOrder &&
            Array.isArray(listOrder) &&
            listOrder.map((item, index) => (
              <tr key={index}>
                <td>{item.order_id}</td>
                <td>{item.total_amount}</td>
                <td>{item.status}</td>
                <td></td>
                <td>{item.user_id}</td>
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

export default TableOrder;
