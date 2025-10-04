import db from "../models/index.js";

const getAllNotification = async () => {
  try {
    const data = await db.Notification.findAll({
      include: [{ model: db.User, as: "user" }],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createNotification = async (message, user_id) => {
  try {
    const data = await db.Notification.create({
      message,
      user_id,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUserNotification = async (id) => {
  try {
    const data = await db.Notification.findAll({
      where: { user_id: id },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteNotification = async (id) => {
  try {
    const deleteNotification = await db.Notification.destroy({
      where: { notification_id: id },
    });
    return deleteNotification;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllNotification,
  createNotification,
  getUserNotification,
  deleteNotification,
};
