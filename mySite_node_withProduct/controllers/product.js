//handling the formdata
const formidable = require("formidable");
const _= require("lodash");
const Product = require("../models/product");
const dbError = require("../helpers/dbErrorHandler"); 
const fs = require("fs");

exports.create = (req, res) => {

    //need to handle the formdata
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse( req, (err, fields, files) =>{
        if(err){
            return res.status(400).json({
                error: "Image cannot be uploaded"
            });

        }
        let product = new Product(fields);
        //console.log(fields);
        //console.log(product)
        if(files.photo){
           // console.log(files.photo.type);
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;

            console.log("Phototype: ",product.photo.contentType);
        }
        product.save((err, data)=> {
            if(err){
                return res.status(400).json({
                    errMsg:dbError.errorHandler(err)
                });
            }else{
                res.json({data})
            }
        })
    })
    
   
};