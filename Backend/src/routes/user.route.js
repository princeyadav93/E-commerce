import { Router } from "express"
import { regsiterUser, loginUser, logOut, changePassword } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();
//User Routes
router.route("/register").post(regsiterUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logOut)
router.route("/changepassword").post(verifyJWT, changePassword)

//Cart Routes
import { addToCart, decreaseCartQty, getCartAllDetails, deleteCartItem, cartTotalPrice } from "../controllers/cart.controller.js";

router.route("/addtocart").post(verifyJWT, addToCart)
router.route("/decreaseqty").post(verifyJWT, decreaseCartQty)
router.route("/cartdetails").get(verifyJWT, getCartAllDetails)
router.route("/deletecartitem").post(verifyJWT, deleteCartItem)
router.route("/carttotalprice").get(verifyJWT, cartTotalPrice)


export default router;