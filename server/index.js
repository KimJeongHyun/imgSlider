const express = require('express');
const app = express();
const http = require('http');
const path = require('path');


const fileUpload = require('./controller/fileUpload');
const getFilePath = require('./controller/getFilePath')
const deleteFile = require('./controller/deleteFile')

const port = 5000;

app.use(fileUpload);
app.use(getFilePath);
app.use(deleteFile);

app.use(express.json({
    limit:'50mb'
})); 
app.use(express.urlencoded({
    limit:'50mb',extended : true
})) 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/api/hello',(req,res)=>res.send('hello'))

const server = http.createServer(app);
server.listen(port, ()=>console.log(`Server Start. Port : ${port}`))


