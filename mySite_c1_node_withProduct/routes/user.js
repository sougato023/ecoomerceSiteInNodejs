const express = require("express");
const router = express.Router();


//import user controllers
const {userById} = require("../controllers/user");
const { requiresignin, isAuth, isAdmin } = require("../controllers/auth");

router.param("userid",userById);

router.get("/secret/:userid", requiresignin, isAuth, isAdmin, (req,res) => {
    res.json({
        user: req.profile
    });
});


module.exports = router;