import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
} from "../services/product.service";
const router = express.Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);
export default router;
