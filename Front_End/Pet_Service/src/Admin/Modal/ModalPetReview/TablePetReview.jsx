import ReactPaginate from "react-paginate";

const TablePetReview = (props) => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    handleShowViewModal,
    listPetReview,
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
            <th scope="col">Comment</th>
            <th scope="col">Rating</th>
            <th scope="col">User ID</th>
            <th scope="col">Pet ID</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listPetReview &&
            Array.isArray(listPetReview) &&
            listPetReview.map((item, index) => (
              <tr key={index}>
                <td>{item.pet_review_id}</td>
                <td>{item.comment}</td>
                <td>{item.rating}</td>
                <td>{item.user_id}</td>
                <td>{item.pet_id}</td>
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

export default TablePetReview;
