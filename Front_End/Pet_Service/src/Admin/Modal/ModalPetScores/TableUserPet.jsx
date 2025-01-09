import ReactPaginate from "react-paginate";
import "../../../App.css";
const TablePetScores = (props) => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    handleShowUpdateModal,
    handleShowDeleteModal,
    listPetScores,
  } = props;

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Symptoms</th>
            <th scope="col">Disease Name</th>
            <th scope="col">Care Suggestions</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listPetScores &&
            Array.isArray(listPetScores) &&
            listPetScores.map((item, index) => (
              <tr key={index}>
                <td>{item.score_id}</td>
                <td className="customTdHealthPet">{item.symptoms}</td>
                <td className="customTdHealthPet">{item.disease_name}</td>
                <td className="customTdHealthPet">{item.care_suggestions}</td>
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

export default TablePetScores;
