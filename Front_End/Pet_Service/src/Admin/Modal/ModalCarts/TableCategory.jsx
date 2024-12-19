import ReactPaginate from "react-paginate";
const TableCategory = (props) => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    handleShowViewModal,
    listCart,
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

export default TableCategory;
