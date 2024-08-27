import { Router } from "express";
import { addProduct, allProductDetails, removeProduct } from "../controllers/product.controller.js";
import verifyJWT from "../middlewares/adminAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

//Product routes
const router = Router();

router.route("/addproduct").post(verifyJWT, upload.single("itemImage"), addProduct);
router.route("/deleteproduct").post(verifyJWT, removeProduct);
router.route("/allproductdetails").get(verifyJWT, allProductDetails);
router.route("/userallproductdetails").get(allProductDetails);


export default router;