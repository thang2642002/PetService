import ReactPaginate from "react-paginate";
import moment from "moment"; // Import Moment.js

const TableVoucher = (props) => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    handleShowUpdateModal,
    handleShowDeleteModal,
    listVoucher,
  } = props;

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div className="table-voucher-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Voucher Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Voucher Code</th>
            <th scope="col">Voucher Type</th>
            <th scope="col">Discount</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listVoucher &&
            Array.isArray(listVoucher) &&
            listVoucher.map((item, index) => (
              <tr key={index}>
                <td>{item.voucher_id}</td>
                <td>{item.name_voucher}</td>
                <td>{moment(item.start_date).format("DD/MM/YYYY")}</td>{" "}
                <td>{moment(item.end_date).format("DD/MM/YYYY")}</td>{" "}
                <td>{item.voucher_code}</td>
                <td>{item.voucher_type}</td>
                <td>{item.discount}</td>
                <td>{item.quantity}</td>
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

export default TableVoucher;
