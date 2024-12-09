const crypto = require("crypto");
const moment = require("moment");

// Cấu hình VNPay
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnpHashSecret = "GY3CPFOFKEYPO8I8AK20O24SQPWP8UE5"; // Thay thế với khóa bí mật của bạn
const vnpReturnUrl = "http://localhost:5173/order-details";
const vnpTmnCode = "54VUB9H7"; // Thay với mã TMN của bạn

/**
 * Tạo URL thanh toán VNPay
 * @param {Object} params
 * @param {number} params.amount Số tiền giao dịch (đơn vị VNĐ)
 * @param {string} params.orderInfo Thông tin đơn hàng
 * @returns {string} URL thanh toán VNPay
 */
const createVNPayPayment = async (req) => {
  try {
    // Lấy địa chỉ IP
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const orderInfoSafe = encodeURIComponent(req.body.orderInfo);

    // Thêm thông tin cơ bản
    const queryParams = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: vnpTmnCode,
      vnp_Amount: req.body.amount * 100, // VND chuyển thành đơn vị nhỏ
      vnp_CurrCode: "VND",
      vnp_TxnRef: Date.now().toString(),
      vnp_OrderInfo: orderInfoSafe,
      vnp_ReturnUrl: vnpReturnUrl,
      vnp_Locale: "vn",
      vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
      vnp_IpAddr: ipAddr,
      vnp_OrderType: req.body.order_id,
      vnp_ExpireDate: moment().add(5, "minutes").format("YYYYMMDDHHmmss"),
    };

    console.log("Debug - Query Params: ", queryParams);

    // Tạo Query String đã được sắp xếp theo quy tắc VNPay yêu cầu
    const sortedQuery = Object.keys(queryParams)
      .sort()
      .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join("&");

    console.log("Debug - Sorted Query String: ", sortedQuery);

    // Tính toán Secure Hash với secret key
    const secureHash = crypto
      .createHmac("sha512", vnpHashSecret) // Sử dụng key bí mật và tính hash
      .update(sortedQuery)
      .digest("hex");

    console.log("Debug - Generated Secure Hash: ", secureHash);

    // Ghép URL đầy đủ
    const url = `${vnpUrl}?${sortedQuery}&vnp_SecureHash=${secureHash}`;

    console.log("Debug - Final Payment URL: ", url);

    return url;
  } catch (error) {
    console.error("Error in createVNPayPayment: ", error);
    throw new Error(`Error creating VNPay payment URL: ${error.message}`);
  }
};

/**
 * Xử lý khi VNPay redirect về sau thanh toán
 * @param {Object} req Request object của Express
 * @param {Object} res Response object của Express
 */
const handleVNPayReturn = async (req, res) => {
  try {
    const query = req.query;
    const secureHash = query.vnp_SecureHash;
    delete query.vnp_SecureHash;
    delete query.vnp_SecureHashType;

    // Sắp xếp query để kiểm tra chữ ký
    const sortedQuery = Object.keys(query)
      .sort()
      .map((key) => `${key}=${decodeURIComponent(query[key])}`)
      .join("&");

    const generatedHash = crypto
      .createHmac("sha512", vnpHashSecret)
      .update(sortedQuery)
      .digest("hex");

    if (secureHash !== generatedHash) {
      return res.redirect(
        `${vnpReturnUrl}?status=error&message=Invalid secure hash&order_id=${query.vnp_TxnRef}`
      );
    }

    // Kiểm tra trạng thái giao dịch
    if (query.vnp_ResponseCode === "00") {
      // Cập nhật trạng thái đơn hàng
      await updateOrderPayment(query.vnp_TxnRef);
      return res.redirect(
        `${vnpReturnUrl}?status=success&message=Payment successful&order_id=${query.vnp_TxnRef}`
      );
    } else {
      return res.redirect(
        `${vnpReturnUrl}?status=error&message=Payment failed&order_id=${query.vnp_TxnRef}`
      );
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error handling VNPay return: ${error.message}` });
  }
};

module.exports = {
  createVNPayPayment,
  handleVNPayReturn,
};
