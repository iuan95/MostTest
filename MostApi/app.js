const express = require("express")
const axios = require('axios')
const app = express()
const cors = require('cors')
// const bodyParser = require("body-parser");
const route = require('./router/router')
const {db} = require('./database/data')
app.use(cors({origin: true, credentials: true}));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.get('/', (req, res)=>{
    res.json({message: "/"})
})
app.use('/api', route)
try{
    db()
    app.listen(3006, ()=>console.log("Запустились"))
}
catch(err){
    console.log(err)
}