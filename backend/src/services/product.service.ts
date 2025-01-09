import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { product_schema } from "../validators/product.validator";

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Product.find({});
    return res.json({
      message: "list of all products",
      products_list: products,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getProductById = async (req: Request, res: Response): Promise<any> => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    return res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// here I need role based something
const createProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = await product_schema.parseAsync(req.body);
    const newProduct = await Product.create({ validatedData });
    return res.status(201).json({
      success: true,
      message: "product created successfully",
      data: newProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const editProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const validatedData = await product_schema.parseAsync(req.body);
    const updatedProduct = await Product.updateOne(
      { id: productId },
      { ...validatedData }
    );
    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const result = await Product.deleteOne({ id: productId });
    if (result.deletedCount === 1) {
      return res.status(200).json({ success: true, message: "Product deleted successfully" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
};
