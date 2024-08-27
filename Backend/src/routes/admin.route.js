import { Router } from "express";
import { changePasswordAdmin, logOutAdmin, loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import verifyJWT from "../middlewares/adminAuth.middleware.js";


const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/logout").post(verifyJWT, logOutAdmin);
router.route("/changepassword").post(verifyJWT, changePasswordAdmin);

export default router;