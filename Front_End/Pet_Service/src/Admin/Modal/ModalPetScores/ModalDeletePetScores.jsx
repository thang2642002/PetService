import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deletePetScores } from "../../../services/petScoresServices";

const ModalDeletePetScores = (props) => {
  const { show, setShow, petScoresDelete, fetchAllPetScores } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeletePetScores = async () => {
    const data = await deletePetScores(petScoresDelete.score_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllPetScores();
      handleClose();
    } else {
      toast.error(data.message);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete Pet Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this pet scores ={" "}
          <b>
            {petScoresDelete && petScoresDelete.score_id
              ? petScoresDelete.score_id
              : ""}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeletePetScores();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeletePetScores;
