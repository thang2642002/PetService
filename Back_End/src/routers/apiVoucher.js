import express from "express";
import voucherController from "../controllers/voucherController";

const routes = express.Router();
routes.get("/get-all-voucher", voucherController.getAllVoucher);
routes.get("/get-voucher/:id", voucherController.getVoucher);
routes.post("/create-voucher", voucherController.createVoucher);
routes.put("/update-voucher/:id", voucherController.updateVoucher);
routes.delete("/delete-voucher/:id", voucherController.deleteVoucher);

export default routes;
