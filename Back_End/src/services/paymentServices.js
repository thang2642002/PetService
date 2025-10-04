import db from "../models/index.js";

const getAllPayment = async () => {
  try {
    const data = await db.Payments.findAll();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createPayment = async (
  order_id,
  payment_method,
  payment_status,
  amount_paid
) => {
  try {
    const data = await db.Payments.create({
      order_id,
      payment_method,
      payment_status,
      amount_paid,
      paid_at: new Date(),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updatePayment = async (id) => {
  try {
    const paymentUpdate = await db.Payments.findByPk(id);
    await paymentUpdate.update({
      payment_status: "completed",
    });
    return paymentUpdate;
  } catch (error) {
    console.log(error);
  }
};

export default { getAllPayment, createPayment, updatePayment };
