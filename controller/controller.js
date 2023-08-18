const movieRecord = require('../models/schema');
const path = require('path');
const fs = require('fs');
const index = (req, res) => {
    return res.render('index');
}
const insertData = async (req, res) => {
    try {
        let id = req.body;
        const { name, language, year, category } = req.body;
        let image = '';
        if (req.file) {
            image = req.file.path;
        }
        console.log(image);
        let Record = await movieRecord.create({
            name: name,
            language: language,
            year: year,
            category: category,
            image: image
        })
        if (Record) {
            console.log("Record created");
            return res.redirect('back');
        }
        else {
            console.log("Record not created");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
const viewData = async (req, res) => {
    try {
        let Record = await movieRecord.find({});
        if (Record) {
            return res.render('view', {
                Record
            });
        }
        else {
            console.log("Recoerd No View");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
const deleteData = async (req, res) => {
    try {
        let oldRecord = await movieRecord.findById(req.query.id);
        if (oldRecord) {
            let id = req.query.id;
            fs.unlinkSync(oldRecord.image)
            let Record = await movieRecord.findByIdAndDelete(id);
            if (Record) {
                console.log("Record Deleted");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deleted");
                return res.redirect('back');
            }
        }
        else {
            console.log("file not Delete");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
const editData = async (req, res) => {
    try {
        let id = req.query.id;
        let Record = await movieRecord.findById(id);
        if (Record) {
            return res.render('update', {
                Record
            });
        }
        else {
            console.log("page not update");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
const updateData = async (req, res) => {
    try {
        let editid = req.body.editid;
        const { name, language, year, category } = req.body;
        let ans = await movieRecord.findByIdAndUpdate(editid, {
            name: name,
            language: language,
            year: year,
            category: category
        })
        if (ans) {
            console.log("Updated");
            return res.redirect('/viewData');
        } else {
            console.log(err);
            return res.redirect('/');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = {
    index,
    insertData,
    viewData,
    deleteData,
    editData,
    updateData
}