import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import User from "../models/user.model.js"

const refreshTokenGenerator = async (userId) => {
    try {
        const user = await User.findById(userId);
        const newRefreshToken = user.generateRefreshToken()

        user.refreshToken = newRefreshToken
        await user.save({ validateBeforeSave: false })

        return newRefreshToken
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh token")
    }
}


const regsiterUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (
        [name, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "Existed user use new email")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(409, "Email id is required")
    }

    const user = await User.findOne({ email: email })

    if (!user) {
        throw new ApiError(404, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password")
    }


    const newRefreshToken = await refreshTokenGenerator(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    const options = {
        httpOnly: true,
        secure: true
    }

    return res.
        status(200)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(
            200,
            {
                user: loggedInUser
            }, "User logged in successfully"
        ))
})

const logOut = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1//this removes the field from db
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
        .json(new ApiResponse(200, {}, "User logged out"))
})

const changePassword = asyncHandler(async (req, res) => {

    const { newPassword, oldPassword } = req.body;

    if (!newPassword && !oldPassword) {
        throw new ApiError(400, "new Password and old Password is required")
    }
    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "current password is wrong")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))

})

export {
    regsiterUser,
    loginUser,
    logOut,
    changePassword
}