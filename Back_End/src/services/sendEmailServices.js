import transporter from "../config/configNodemailer";
const sendEmail = (email, order) => {
  if (!email || typeof email !== "string") {
    throw new Error("Email recipient is not defined or invalid.");
  }

  if (!order || !Array.isArray(order)) {
    throw new Error("Order is not defined or invalid.");
  }

  // Lặp qua danh sách order để tạo nội dung bảng HTML
  const orderDetails = order
    .map((item) => {
      // Kiểm tra loại sản phẩm (pet_item hoặc product_item)
      if (item.pet_item) {
        const pet = item.pet_item;

        return `
          <tr>
            <td>${pet.name || "Không có tên thú cưng"}</td>
            <td>${item.quantity || 0}</td>
            <td>${pet.price.toLocaleString()} đ</td>
            <td>0%</td>
            <td>${pet.price.toLocaleString()} đ</td>
            <td>${item.total_price.toLocaleString()} đ</td>
          </tr>
        `;
      } else if (item.product_item) {
        const product = item.product_item;
        const discountedPrice =
          product.price * (1 - (product.discount || 0) / 100);
        return `
          <tr>
            <td>${product.name || "Không có tên sản phẩm"}</td>
            <td>${item.quantity || 0}</td>
            <td>${product.price.toLocaleString()} đ</td>
            <td>${product.discount || 0}%</td>
            <td>${discountedPrice.toLocaleString()} đ</td>
            <td>${item.total_price.toLocaleString()} đ</td>
          </tr>
        `;
      } else {
        return `
          <tr>
            <td>Không xác định</td>
            <td>${item.quantity || 0}</td>
            <td>0 đ</td>
            <td>0%</td>
            <td>0 đ</td>
            <td>${item.total_price.toLocaleString()} đ</td>
          </tr>
        `;
      }
    })
    .join(""); 

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
