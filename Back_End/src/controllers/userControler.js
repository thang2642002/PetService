import UserService from "../services/userService";
const getAllUser = async (req, res) => {
  try {
    const getAllUser = await UserService.getAllUser();
    if (getAllUser) {
      return res.status(200).json({
        message: "Show All user Success !",
        errCode: 0,
        data: getAllUser,
      });
    } else {
      return res.status(400).json({
        message: "Show All User fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error Server, Show All User Error",
      errCode: -1,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, user_name, phone, address, role } = req.body;
    const avatar = req.file ? req.file.path : null;
    const createUser = await UserService.createUser(
      email,
      password,
      user_name,
      phone,
      address,
      role,
      avatar
    );
    if (createUser) {
      return res.status(200).json({
        message: "Create user is the success",
        errCode: 0,
      });
    } else {
      res.status(400).json({
        message: "Create user is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error, create user is the fails",
      errCode: -1,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { email, password, user_name, phone, address, role } = req.body;
    const avatarFile = req.file;
    const updateUser = await UserService.updateUser(
      user_id,
      email,
      password,
      user_name,
      phone,
      address,
      role,
      avatarFile
    );
    if (updateUser) {
      return res.status(200).json({
        message: "Update user is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update user is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error, Update user is the fails",
      errCode: -1,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserService.deleteUser(id);
    if (user) {
      return res.status(200).json({
        message: "Delete user is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete user is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error, Delete user is the fails",
      errCode: -1,
    });
  }
};

const findByName = async (req, res) => {
  try {
    const { user_name } = req.query;
    console.log(req.body);
    const findName = await UserService.findName(user_name);
    if (findName) {
      return res.status(200).json({
        message: "Find user is the success",
        errCode: 0,
        data: findName,
      });
    } else {
      return res.status(400).json({
        message: "Find user is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find user is the fails",
      errCode: -1,
    });
  }
};

const findById = async (req, res) => {
  try {
    const user_id = req.params.id;
    const user = await UserService.findById(user_id);
    if (user) {
      return res.status(200).json({
        message: "Find user is the success",
        errCode: 0,
        data: user,
      });
    } else {
      return res.status(400).json({
        message: "Find user is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error, Find user is the fails",
      errCode: -1,
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  findByName,
  findById,
};
