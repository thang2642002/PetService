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

const handleRegister = async (req, res) => {
  const { email, user_name, phone, address, password } = req.body;
  var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  let checkEmail = emailRegex.test(email);
  try {
    if (!email || !user_name || !phone || !address || !password) {
      return res.status(200).json({
        message: "All input fields are required",
        errCode: 1,
      });
    } else if (!checkEmail) {
      return res
        .status(200)
        .json({ message: "The input is email required", errCode: 1 });
    }
    const register = await UserService.handleRegister(
      email,
      user_name,
      phone,
      address,
      password
    );
    if (register.message === "User already exists") {
      return res.status(400).json({
        message: "Email already exists",
        errCode: 1,
      });
    }

    if (register.user) {
      return res.status(200).json({
        message: "Registration successful",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Registration failed",
        errCode: 1,
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Registration error",
      errCode: -1,
    });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "The input is required",
        errCode: 1,
      });
    }

    const result = await UserService.handleLogin(email, password);

    if (result.errCode === 1) {
      return res.status(404).json({
        message: result.message,
        errCode: result.errCode,
      });
    }

    if (result.errCode === 2) {
      return res.status(401).json({
        message: result.message,
        errCode: result.errCode,
      });
    }

    if (result.errCode === 0) {
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 604800000,
      });

      return res.status(200).json({
        message: "Login The Success",
        errCode: 0,
        data: result.login,
        access_tokens: result.accessToken,
        refresh_tokens: result.refreshToken,
      });
    }

    return res.status(400).json({
      message: "Login The fails",
      errCode: 3,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "An error occurred during login",
      errCode: -1,
    });
  }
};

const handleLogout = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Logout failed" });
  }
};

const countUser = async (req, res) => {
  try {
    const userCount = await UserService.countUser();
    if (userCount) {
      return res.status(200).json({
        message: "Count user is the success",
        errCode: 0,
        data: userCount,
      });
    } else {
      return res.status(400).json({
        message: "Count user is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Count user is the fails",
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
  countUser,
  findById,
  handleRegister,
  handleLogin,
  handleLogout,
};
