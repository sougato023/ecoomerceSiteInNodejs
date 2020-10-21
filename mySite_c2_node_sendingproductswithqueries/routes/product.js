const express = require("express");
const router = express.Router();


//import category controllers
const {create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo }= require("../controllers/product");
const {userSignupValidator} = require("../validator/index");
const { requiresignin, isAuth, isAdmin } = require("../controllers/auth");
const {userById} = require("../controllers/user");


router.param("userId",userById);
router.param("productid", productById);

router.get("/product/:productid", read);
router.post("/product/create/:userId", requiresignin, isAuth, isAdmin, create);
router.delete("/product/:productid/:userId", requiresignin, isAuth, isAdmin, remove);
router.put("/product/:productid/:userId", requiresignin, isAdmin, isAuth, update);

router.get("/product", list);

router.get("/product/related/:productid", listRelated);

router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);

//use get photo as middleware
router.get("/product/photo/:productid", photo);

module.exports = router;