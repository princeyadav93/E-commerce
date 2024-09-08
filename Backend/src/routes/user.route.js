import { Router } from "express"
import { regsiterUser, loginUser, logOut, changePassword } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();
//User Routes
router.route("/register").post(regsiterUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logOut)
router.route("/changepassword").put(verifyJWT, changePassword)

//Cart Routes
import { addToCart, decreaseCartQty, getCartAllDetails, deleteCartItem, cartTotalPrice } from "../controllers/cart.controller.js";

router.route("/addtocart").post(verifyJWT, addToCart)
router.route("/decreaseqty").post(verifyJWT, decreaseCartQty)
router.route("/cartdetails").get(verifyJWT, getCartAllDetails)
router.route("/deletecartitem").delete(verifyJWT, deleteCartItem)
router.route("/carttotalprice").get(verifyJWT, cartTotalPrice)


//Order Routes
import { createOrder, verifyPayment, razorPayKeyId, fetchOrders, orderCancelled } from '../controllers/order.controller.js'

router.route("/payment/createOrder").post(verifyJWT, createOrder)
router.route("/payment/verifypayment").post(verifyJWT, verifyPayment)
router.route("/payment/getrazorpaykeyid").get(razorPayKeyId)
router.route("/payment/cancelledorder").delete(orderCancelled)
router.route("/orders").get(verifyJWT, fetchOrders)

export default router;