const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const fileSchema = mongoose.Schema({
    filePath:String,
    seq:{
        type:Number,
        default:0
    }
})

fileSchema.plugin(autoIncrement.plugin, {
    model: 'files',
    field: 'seq',
    startAt: 0, //시작
    increment: 1 // 증가
});

const files = mongoose.model('files',fileSchema);

module.exports = {files}