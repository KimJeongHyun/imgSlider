const mongoose  = require('mongoose');
const {files} = require('../model/uploadedFiles')

const router = require('express').Router();


router.get('/api/getFile/',(req,res)=>{
    files.find({}, function(err,files){
        var fileMap={};
        files.forEach(function(file){
            fileMap[file.seq] = file;
        })
        console.log(fileMap[1]);
    })
    res.json({uploadSuccess:true})
})


module.exports = router;