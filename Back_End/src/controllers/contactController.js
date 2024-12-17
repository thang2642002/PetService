import contactServices from "../services/contactServices";

const getAllContact = async (req, res) => {
  try {
    const dataContact = await contactServices.getAllContact();
    if (dataContact) {
      return res.status(200).json({
        message: "Get all contact is the success",
        errCode: 0,
        data: dataContact,
      });
    } else {
      return res.status(400).json({
        message: "Get all contact is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Server error, Get all contact is the fails",
      errCode: -1,
    });
  }
};

const createContact = async (req, res) => {
  try {
    const { user_name, email, phone, content } = req.body;
    const createContact = await contactServices.createContact(
      user_name,
      email,
      phone,
      content
    );
    if (createContact) {
      return res.status(200).json({
        message: "Create contact is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create contact is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Server error, Create contact is the fails",
      errCode: -1,
    });
  }
};

module.exports = {
  getAllContact,
  createContact,
};
