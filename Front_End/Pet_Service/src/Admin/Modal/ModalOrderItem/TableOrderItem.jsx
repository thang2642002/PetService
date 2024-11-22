const TableOrderItem = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listOrderItem } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Total Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Order ID</th>
            <th scope="col">Product ID</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listOrderItem &&
            Array.isArray(listOrderItem) &&
            listOrderItem.map((item, index) => (
              <tr key={index}>
                <td>{item.order_item_id}</td>
                <td>{item.total_price}</td>
                <td>{item.quantity}</td>
                <td>{item.order_id}</td>
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

export default TableOrderItem;
