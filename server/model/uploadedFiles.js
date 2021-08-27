const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    filePath:String
})

const File = mongoose.model('File',fileSchema);

module.exports = {File}