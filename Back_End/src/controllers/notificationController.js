import notificationServices from "../services/notificationServices.js";

const getAllNotification = async (req, res) => {
  try {
    const getAllNotification = await notificationServices.getAllNotification();
    if (getAllNotification) {
      return res.status(200).json({
        errCode: 0,
        message: "Get all notification is the success",
        data: getAllNotification,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Get all notification is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Get all notification is the fails",
    });
  }
};

const createNotification = async (req, res) => {
  try {
    const { message, user_id } = req.body;
    const createNotification = await notificationServices.createNotification(
      message,
      user_id
    );
    if (createNotification) {
      return res.status(200).json({
        errCode: 0,
        message: "Create notification is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Create notification is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Create notification is the fails",
    });
  }
};

const getUserNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserNotification = await notificationServices.getUserNotification(
      id
    );
    if (getUserNotification) {
      return res.status(200).json({
        errCode: 0,
        message: "Find notification is the success",
        data: getUserNotification,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Find notification is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Find notification is the fails",
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNotification = await notificationServices.deleteNotification(
      id
    );
    if (deleteNotification) {
      return res.status(200).json({
        errCode: 0,
        message: "Delete is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Delete is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Delete is the fails",
    });
  }
};
export default {
  getAllNotification,
  createNotification,
  getUserNotification,
  deleteNotification,
};
