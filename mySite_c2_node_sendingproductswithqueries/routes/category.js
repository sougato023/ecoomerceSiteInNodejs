const express = require("express");
const router = express.Router();


//import category controllers
const {create, categoryById, read, remove, update, readall} = require("../controllers/category");
const {userSignupValidator} = require("../validator/index");
const { requiresignin, isAuth, isAdmin } = require("../controllers/auth");
const {userById} = require("../controllers/user");

router.param("userId",userById);
router.param("categoryId", categoryById);

router.post("/category/create/:userId", requiresignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);
router.delete("/category/:categoryId/:userId", requiresignin, isAuth, isAdmin, remove);
router.put("/category/:categoryId/:userId", requiresignin, isAdmin, isAuth, update);
router.get("/category", readall);

module.exports = router;