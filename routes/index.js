const express = require('express');
const Routes = express.Router();
console.log("Routing Connected");
const multer = require('multer');
const file = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads/');
    },
    filename : (req,file,cb) => {
        cb(null,file.originalname);
    }
})
const imageUploads = multer({storage : file}).single('image');
const controller = require('../controller/controller');
Routes.get('/',controller.index);
Routes.post('/insertData',imageUploads,controller.insertData);
Routes.get('/viewData',controller.viewData);
Routes.get('/deleteData',controller.deleteData);
Routes.get('/editData',controller.editData);
Routes.post('/updateData',controller.updateData);
module.exports = Routes;