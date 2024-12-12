import sendEmailServices from "../services/sendEmailServices";
const sendEmail = async (req, res) => {
  const { email, order } = req.body;

  try {
    await sendEmailServices.sendEmail(email, order);
    res.status(200).send("Đơn hàng đã được gửi email.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra khi gửi email.");
  }
};

module.exports = { sendEmail };
