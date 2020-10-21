const express = require("express");
const router = express.Router();


//import user controllers
const {userById, read, update} = require("../controllers/user");
const { requiresignin, isAuth, isAdmin } = require("../controllers/auth");

router.param("userid",userById);

router.get("/secret/:userid", requiresignin, isAuth, isAdmin, (req,res) => {
    res.json({
        user: req.profile
    });
});
router.get("/user/:userid", requiresignin, isAuth, read)
router.put("/user/update/:userid", requiresignin, isAdmin, isAuth, update);

module.exports = router;