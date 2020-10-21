const User = require("../models/user");
const _= require("lodash");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error:"User not found"
            });
        }else{
            req.profile = user;
        }
        next();
    });
};
//get users
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};
//update the user
exports.update = (req, res) => {
    //need to handle the formdata
//     let profile = req.profile;
//     profile = _.extend(profile, req.body);
//   profile.save((err, data)=> {
//       if(err){
//           return res.status(400).json({
//               errMsg:dbError.errorHandler(err)
//           });
//       }else{
//           res.json({data})
//       }
//   })
  User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new:true}, (err, data) => {
            if(err){
          return res.status(400).json({
              errMsg:dbError.errorHandler(err)
          });
      }else{
          data.hashed_password = undefined;
          data.salt = undefined;
          res.json({data})
      }
  })
};