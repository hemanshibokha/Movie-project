const mongoose = require('mongoose');
const TableSchema = mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    language : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
})
const Record = mongoose.model('Record',TableSchema);
module.exports = Record;