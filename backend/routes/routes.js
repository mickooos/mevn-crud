import express from "express";
import multer from "multer";
import path from "path";
import {
    showProducts,
    showProductsById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/products.js";

const router = express.Router();

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("../frontend/src/assets/images/uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: diskStorage }).single("image");

router.get('/products', showProducts);
router.get('/products/:id', showProductsById);
router.post('/products', upload, createProduct);
router.put('/products/:id', upload, updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
