import { sendEmail as sendOrderEmail } from "../services/sendEmailServices.js";

const sendEmail = async (req, res) => {
  const { email, order } = req.body;

  try {
    await sendOrderEmail(email, order); // gọi trực tiếp
    res.status(200).send("Đơn hàng đã được gửi email.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra khi gửi email.");
  }
};

export default sendEmail;
