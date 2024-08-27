import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

//app.use() is used for configuring or adding middleWare

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}));

//data coming from form or in json limit is how much data we will recieve
app.use(express.json({ limit: "16kb" }))
// data coming from url
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
//keep files data in local storage if you want to, public is a folder name
// app.use(express.static("public"))
app.use(cookieParser())


// Importing routes

import adminRoutes from "./routes/admin.route.js"
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin/product", productRoutes);
app.use("/api/v1/users", userRoutes);















export { app };