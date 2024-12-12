// config/nodemailerConfig.js
import nodemailer from "nodemailer";

// Cấu hình Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Hoặc dịch vụ bạn sử dụng (có thể là Gmail, SendGrid, Mailgun...)
  auth: {
    user: "tranthang0369@gmail.com", // Thay bằng email của bạn
    pass: "ilfhwycffjjg ybth", // Thay bằng mật khẩu email của bạn (hoặc mật khẩu ứng dụng nếu sử dụng Gmail)
  },
});

// Export transporter để sử dụng ở các nơi khác
module.exports = transporter;
