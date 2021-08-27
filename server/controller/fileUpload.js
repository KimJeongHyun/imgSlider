const router = require('express').Router();
const multer = require('multer');

const fs = require('fs');
const path = require('path');

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
    console.log('upload router')
    res.json({uploadSuccess:true})
})


module.exports = router;