import { useEffect, useState } from "react";
import ModalViewPetReview from "../Modal/ModalPetReview/ModalViewPetReview";
import TablePetReview from "../Modal/ModalPetReview/TablePetReview";
import { getPaginate } from "../../services/paginateServices";

const ManagerPetReview = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Pet_Review";
  const [showModalViewPetReview, setShowModalViewPetReview] = useState(false);
  const [listPetReview, setListPetReview] = useState([]);
  const [petReviewView, setPetReviewView] = useState({});

  const handleShowViewModal = (petReview) => {
    setPetReviewView(petReview);
    setShowModalViewPetReview(true);
  };

  const fetchAllPetReview = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      console.log("data", data);
      setListPetReview(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  console.log("listPetReview", listPetReview);

  useEffect(() => {
    fetchAllPetReview();
  }, [currentPage]);

  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Quản lý đánh giá thú cưng
      </div>
      <div className="user-contents">
        <ModalViewPetReview
          show={showModalViewPetReview}
          setShow={setShowModalViewPetReview}
          petReviewView={petReviewView}
        />

        <div className="btn-table-container"></div>
        <TablePetReview
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          listPetReview={listPetReview}
          handleShowViewModal={handleShowViewModal}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerPetReview;
