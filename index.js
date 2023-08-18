const express = require('express');
let port = 8080;
const app = express();
const path = require('path');
app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
const Database = require('./config/mongoose');
app.use('/',require('./routes'));
app.listen(port,(error)=>{
    if(error){
        console.log(error);
        return false;
    }
    else{
        console.log("Done "+port);
    }
})