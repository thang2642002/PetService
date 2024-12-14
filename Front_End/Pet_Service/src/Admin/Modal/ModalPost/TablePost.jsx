import ReactPaginate from "react-paginate";

const TablePost = (props) => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    handleShowUpdateModal,
    handleShowDeleteModal,
    listPost,
  } = props;

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered w-full">
        <thead>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 text-left">ID</td>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Content</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {listPost &&
            Array.isArray(listPost) &&
            listPost.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{item.post_id}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2 max-w-xl whitespace-normal">
                  <div
                    className="h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                </td>
                <td className="px-4 py-2">
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

export default TablePost;
