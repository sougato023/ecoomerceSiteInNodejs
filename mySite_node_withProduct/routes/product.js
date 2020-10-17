const express = require("express");
const router = express.Router();


//import category controllers
const {create, productById, read }= require("../controllers/product");
const {userSignupValidator} = require("../validator/index");
const { requiresignin, isAuth, isAdmin } = require("../controllers/auth");
const {userById} = require("../controllers/user");


router.param("userId",userById);
router.param("productid", productById);

router.get("/product/:productid", read);
router.post("/product/create/:userId", requiresignin, isAuth, isAdmin, create);



module.exports = router;