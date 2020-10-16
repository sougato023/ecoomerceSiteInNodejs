const Category = require("../models/category");
const dbError = require("../helpers/dbErrorHandler"); 

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data)=> {
        if(err){
            return res.status(400).json({
                errMsg:dbError.errorHandler(err)
            });
        }else{
            res.json({data})
        }
    })
};