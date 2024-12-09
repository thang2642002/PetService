import vnPayServices from "../services/vnPayServices";

const createPayment = async (req, res) => {
  try {
    const { amount, orderInfo, order_id } = req.body;
    const paymentUrl = await vnPayServices.createVNPayPayment(req);

    res.status(200).json({ url: paymentUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleReturn = async (req, res) => {
  try {
    const result = await vnPayServices.handleVNPayReturn(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  handleReturn,
};
