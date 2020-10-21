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
        //check for all fields
        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !quantity || !shipping){
            return res.status(400),json({
                error: "All fiels are required"
            });
        }



        let product = new Product(fields);

        //ikb = 1000
        //1mb = 1000000

        //console.log(fields);
        //console.log(product)
        if(files.photo){
           console.log("Files photos: ",files.photo);
           if(files.photo.size > 1000000){
               return res.status(400).json({
                   error: "Image should be less than 1 mb size"
               });
           }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;

            //console.log("Phototype: ",product.photo.contentType);
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

//middleware
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) =>{
        if(err || !product){
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

// read the product form the database
exports.read = (req, res) => {
   req.product.photo = undefined;
   return res.json(req.product);

}

//delete the product
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                errMsg:dbError.errorHandler(err)
            });
        }else{
            res.json({
                
                message: "Product deleted successfully" 
            });
        }
    });
};

//update the product
exports.update = (req, res) => {
      //need to handle the formdata
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.parse( req, (err, fields, files) =>{
          if(err){
              return res.status(400).json({
                  error: "Image cannot be uploaded"
              });
  
          }
          //check for all fields
          const {name, description, price, category, quantity, shipping} = fields;
          if(!name || !description || !price || !quantity || !shipping){
              return res.status(400).json({
                  error: "All fiels are required"
              });
          }
  
  
  
          let product = req.product;

          product = _.extend(product, fields);

  
          //ikb = 1000
          //1mb = 1000000
  
          //console.log(fields);
          //console.log(product)
          if(files.photo){
             console.log("Files photos: ",files.photo);
             if(files.photo.size > 1000000){
                 return res.status(400).json({
                     error: "Image should be less than 1 mb size"
                 });
             }
              product.photo.data = fs.readFileSync(files.photo.path);
              product.photo.contentType = files.photo.type;
  
              //console.log("Phototype: ",product.photo.contentType);
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