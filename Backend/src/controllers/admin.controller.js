import Admin from "../models/admin.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const refreshTokenGenerator = async (userId) => {
    try {
        const admin = await Admin.findById(userId);
        const newRefreshToken = await admin.generateRefreshToken()

        admin.refreshToken = newRefreshToken;
        await admin.save({ validateBeforeSave: false })

        return newRefreshToken
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh token")
    }
};

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (
        [name, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(401, "all fields are required")
    }

    const existedAdmin = await Admin.findOne({ email })

    if (existedAdmin) {
        throw new ApiError(401, "Admin already exist with this email, use another email")
    }

    const admin = await Admin.create(
        {
            name,
            email,
            password
        }
    )

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken")


    if (!createdAdmin) {
        throw new ApiError(500, "Something went wrong while registering the admin")
    }

    return res.status(200)
        .json(new ApiResponse(200, createdAdmin, "Admin created successfully"))

});


const loginAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email && !password) {
        throw new ApiError(400, "email and password are required")
    };

    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new ApiError(404, "admin does not exist")
    };

    const isPasswordValid = await admin.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password")
    }


    const newRefreshToken = await refreshTokenGenerator(admin._id);

    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(200, loggedInAdmin, "Admin logged in successfully"))

});


const logOutAdmin = asyncHandler(async (req, res) => {

    await Admin.findByIdAndUpdate(
        req.admin._id, {
        $unset: {
            refreshToken: 1
        }
    }, {
        new: true
    }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "admin Logged out successfully"))
});

const changePasswordAdmin = asyncHandler(async (req, res) => {

    const { newPassword, oldPassword } = req.body;

    if (!newPassword && !oldPassword) {
        throw new ApiError(400, "new Password and old Password are required")
    }
    const admin = await Admin.findById(req.user?._id);

    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "current password is wrong")
    }

    admin.password = newPassword
    await admin.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))

});

export { registerAdmin, loginAdmin, logOutAdmin, changePasswordAdmin }