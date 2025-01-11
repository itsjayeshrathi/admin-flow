import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
} from "../services/product.service";
import { authMiddleware, checkRole } from "../middlewares/auth.middleware";
import { Roles } from "../models/user.model";
const router = express.Router();
router.get("/", authMiddleware, getAllProducts);
router.get("/:id", authMiddleware, getProductById);
router.post("/", authMiddleware, checkRole(Roles.ADMIN), createProduct);
router.put("/:id", authMiddleware, checkRole(Roles.ADMIN), editProduct);
router.delete("/:id", authMiddleware, checkRole(Roles.ADMIN), deleteProduct);
export default router;
