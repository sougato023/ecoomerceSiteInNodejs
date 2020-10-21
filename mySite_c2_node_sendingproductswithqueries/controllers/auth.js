// exports.sayHi = (req, res) => {
//     res.json({message: "Hello users"})
// };
// //************************************************************** */
// const User = require("../models/user");
// exports.signup = (req, res) => {
//     console.log("req.body: " , req.body);
//     const user = new User(req.body);
//     user.save((err, data)=> {
//         if(err){
//             return res.status(400).json({
//                 err
//             });
//         }else{
//             res.json(data)
//         }
//     })
//     //res.json({message: "Hello users"})
// };

// //************************************************************** */

//************************************************************** */
const User = require("../models/user");
const dbError = require("../helpers/dbErrorHandler");
exports.signup = (req, res) => {
    console.log("req.body: " , req.body);
    const user = new User(req.body);
    user.save((err, data)=> {
        if(err){
            return res.status(400).json({
                errMsg:dbError.errorHandler(err)
            });
        }else{
            res.json(data)
        }
    })
    //res.json({message: "Hello users"})
};

//************************************************************** */
/**************************************************************** 


                            Signin route

*****************************************************************/
const jwt = require("jsonwebtoken");// to generate signed web token
const expressJwt = require("express-jwt"); // for authorisation check 
exports.signin = (req, res) => {
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                err:"User with email does not exist. Please signup"
            });
        }else{
            //if the user exist mke sure that the the email and password match
            //create authentication method in user model
            if(!user.authenticate(password)){
                return res.status(400).json({
                    err:"Email and pasword dont match"
                });
            }

            //generate a signed toekn with signed user id and secret
            const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
            //persist the toekn as t in cookie ith expiry dat
            res.cookie("t", token, {expire:new Date() +9999});

            //return the response with the user and the toekn to frontend client
            const {_id, name, email, role} = user;
            return res.json({token, user:{_id, email, name, role}});


        }
    })
};

//************************************************************** */
/**************************************************************** 


                            Signout route

*****************************************************************/
exports.signout = (req, res) => {

    res.clearCookie("t");
    res.json({message:" Signout success"});
};

//************************************************************** */
/**************************************************************** 


                            require signin route

*****************************************************************/
exports.requiresignin = expressJwt({
    secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

/**************************************************************** 


                            Admin or user roles

*****************************************************************/

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access Denied",
           
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
        
    }
    next();

};


