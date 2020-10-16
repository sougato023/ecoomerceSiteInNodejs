const express = require("express");
const router = express.Router();


//import category controllers
const {create} = require("../controllers/product");
const {userSignupValidator} = require("../validator/index");
const { requiresignin, isAuth, isAdmin } = require("../controllers/auth");
const {userById} = require("../controllers/user");

router.param("userId",userById);
router.post("/product/create/:userId", requiresignin, isAuth, isAdmin, create);



module.exports = router;