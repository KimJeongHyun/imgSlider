const {files} = require('../model/uploadedFiles')
const router = require('express').Router();
const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    model:String,
    field:String,
    count:{
        type:Number
    }
})

const counter = mongoose.model('identitycounters',counterSchema);

router.get('/api/delete/:idx',(req,res)=>{

    const worker1 = async() =>{
        files.findOneAndDelete({seq:req.params.idx},function(err,files){
        })
    }
    const worker2 = async() =>{
        files.find({seq:{$gte:req.params.idx}},function(err,files){
            files.forEach(async function(file){
                const updateSeq = file.seq-1;
                await file.updateOne({seq:updateSeq}).exec();
            })
        })
    }
    const worker3 = async() =>{
        counter.find({},function(err,counter){
            counter.forEach(function(countVar){
                const countSeq = countVar.count-1
                if (countVar.count==-1){

                }else{
                    countVar.updateOne({count:countSeq}).exec();
                }
                
            })
        })
    }

    const totalWorker = async() =>{
        await worker1();
        await worker2();
        await worker3();
    }

    const resSend = async() =>{
        res.json({uploadSuccess:true})
    }

    const finalWork = async() =>{
        await totalWorker();
        await resSend();

    }
    finalWork();
    
    

    
})


module.exports = router;