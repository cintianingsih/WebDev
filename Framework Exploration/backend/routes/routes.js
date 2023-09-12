//import functions from controller
import express from "express";
import {
    showProducts,
    showProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.js";

//
const router = express.Router();

//
router.get("/products", showProducts);

//
router.get("/products/:id", showProductById);

//
router.post('/products', createProduct);

//
router.put('/products/:id', updateProduct);

//
router.delete('/products/:id', deleteProduct);

//
export default router;