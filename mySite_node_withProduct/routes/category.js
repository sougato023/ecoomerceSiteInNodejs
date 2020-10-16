const express = require("express");
const router = express.Router();


//import category controllers
const {create} = require("../controllers/category");
const {userSignupValidator} = require("../validator/index");
const { requiresignin, isAuth, isAdmin } = require("../controllers/auth");
const {userById} = require("../controllers/user");

router.post("/category/create/:userId", requiresignin, isAuth, isAdmin, create);

router.param("userId",userById);

module.exports = router;