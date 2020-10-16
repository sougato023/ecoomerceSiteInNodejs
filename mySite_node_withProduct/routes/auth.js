// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Hello from routes")
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// //import user controllers
// const {sayHi} = require("../controllers/user");
// router.get("/", sayHi);

// module.exports = router;

// //************************************************************** */

// const express = require("express");
// const router = express.Router();

// //import user controllers
// const {signup} = require("../controllers/user");
// router.post("/signup", signup);

// module.exports = router;

// //************************************************************** */

//************************************************************** */
// import the middleware of validator
const express = require("express");
const router = express.Router();


//import user controllers
const {signup, signin, signout, requiresignin} = require("../controllers/auth");
const {userSignupValidator} = require("../validator/index");
router.post("/signup", userSignupValidator, signup);

router.post("/signin", signin);
router.get("/signout", signout);

//dummy route - if we want to restrict any route we can use the requiresignin middleware
// router.get("/hello", requiresignin, (req,res) => {
//     res.send("Hello users!")
// })
module.exports = router;

//************************************************************** */