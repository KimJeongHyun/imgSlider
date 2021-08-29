const {files} = require('../model/uploadedFiles')

const router = require('express').Router();
const multer = require('multer');

const fs = require('fs');
const path = require('path');

const database = require('../database')();
database.db_open();

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "client/public/imgs/");
    },
    filename(req,file,cb) {
        cb(null, `${Date.now()};${file.originalname}`);       
    }
})

const upload = multer({storage: storage});

router.post('/api/upload/',upload.single('img'),(req,res)=>{
    const filePath = new files({filePath:req.file.path})
    filePath.save().then(function(product){
        console.log('Resolved');
    }, function rejected(err){
        console.log('Rejected...'+err);
    })
    res.json({uploadSuccess:true})
})


module.exports = router;