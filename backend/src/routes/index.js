import express from "express";
import * as user from "../controllers/UserController.js";
import * as post from "../controllers/PostsController.js";
import { isAuthenticated } from "../middlewares/Auth.js";
import { upload } from "../storage/FileStorage.js";

const router = express.Router();
// User Routes
router.get("/v1/user", isAuthenticated, user.Profile);
router.post("/v1/user/register", user.Register);
router.post("/v1/user/login", user.Login);
router.delete("/v1/user/logout", isAuthenticated, user.Logout);
// Post Routes
router.get("/v2/products", isAuthenticated, post.getProducts);
router.get("/v2/product/:id", isAuthenticated, post.getProductById);
router.post("/v2/products", isAuthenticated, upload, post.createProduct);
router.put("/v2/product/:id", isAuthenticated, upload, post.updateProduct);
router.delete("/v2/product/:id", isAuthenticated, post.deleteProduct);

export default router;
