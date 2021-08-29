const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    filePath:String
})

const files = mongoose.model('files',fileSchema);

module.exports = {files}