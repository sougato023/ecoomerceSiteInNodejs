const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
//import routes
const appRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}). then(() => console.log("DB connected"));


//routes
// app.get("/", (req, res) => {
//     res.send("hello from node changed");
// });
//middlewares
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
//userroutes middleware
app.use("/api", appRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Server is runinh on port ${port}`);
});
