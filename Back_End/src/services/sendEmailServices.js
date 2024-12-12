const sendEmail = (email, order) => {
  if (!email || typeof email !== "string") {
    console.error("Email recipient is invalid:", email);
    throw new Error("Email recipient is not defined or invalid.");
  }

  if (!order || !Array.isArray(order)) {
    console.error("Order is invalid:", order);
    throw new Error("Order is not defined or invalid.");
  }

  // Lặp qua danh sách order để tạo nội dung bảng HTML
  const orderDetails = order
    .map((item) => {
      const product = item.product_item || {}; // Kiểm tra nếu product_item không null
      const discountedPrice = product.price * (1 - product.discount / 100);

      return `
        <tr>
          <td>${product.name || "Không có tên sản phẩm"}</td>
          <td>${item.quantity || 0}</td>
          <td>${product.price.toLocaleString()} VND</td>
          <td>${product.discount}%</td>
          <td>${discountedPrice.toLocaleString()} VND</td>
          <td>${item.total_price.toLocaleString()} VND</td>
        </tr>
      `;
    })
    .join(""); // Nối các dòng HTML thành một chuỗi

  // Nội dung email
  const mailOptions = {
    from: "tranthang0369@gmail.com",
    to: email,
    subject: "Đơn hàng của bạn đã được thanh toán thành công!",
    html: `
      <h4>Cảm ơn quý khách đã mua sản phẩm bên chúng tôi</h4>
      <p>Chi tiết đơn hàng của bạn:</p>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá gốc</th>
            <th>Giảm giá</th>
            <th>Giá sau giảm</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          ${orderDetails}
        </tbody>
      </table>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
