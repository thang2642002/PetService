import ReactPaginate from "react-paginate";
const TableOrderItem = (props) => {
  const {
    handleShowViewModal,
    setCurrentPage,
    listOrderItem,
    currentPage,
    totalPages,
  } = props;

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

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
                <td>{item.item_id}</td>
                {console.log(item)}
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleShowViewModal(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default TableOrderItem;
