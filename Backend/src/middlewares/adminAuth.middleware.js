import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedtoken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,)

        const admin = await Admin.findById(decodedtoken?._id).select("-password")

        if (!admin) {
            throw new ApiError(401, "Invalid refresh token")
        }

        req.admin = admin
        next();
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid access")

    }
})




export default verifyJWT;