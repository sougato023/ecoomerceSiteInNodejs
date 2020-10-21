const Category = require("../models/category");
const dbError = require("../helpers/dbErrorHandler"); 
const _= require("lodash");

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) =>{
        if(err || !category){
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;
        next();
    });
}

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

//read category by id
exports.read = (req, res) => {
    //req.cat.photo = undefined;
    return res.json(req.category);
 
 };

 //get all categories
exports.readall = (req, res) => {
    Category.find().exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        res.json({
            data
        }); 
    });
}

 //delete the product
exports.remove = (req, res) => {
    let category = req.category;
    category.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                errMsg:dbError.errorHandler(err)
            });
        }else{
            res.json({
                
                message: "Category deleted successfully" 
            });
        }
    });
};

//update the product
exports.update = (req, res) => {
      //need to handle the formdata
      let category = req.category;
      category = _.extend(category, req.body);
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
 