import "../../../App.css";
const TableProduct = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listProduct } = props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr className="customTd">
            <th scope="col" style={{ overflow: "hidden", maxWidth: "50px" }}>
              ID
            </th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category ID</th>
            <th scope="col">Stock</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listProduct &&
            Array.isArray(listProduct) &&
            listProduct.map((item, index) => (
              <tr key={index}>
                <td
                // className="customTd"
                >
                  {item.product_id}
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category_id}</td>
                <td>{item.stock}</td>
                <td>{item.description}</td>
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

export default TableProduct;
