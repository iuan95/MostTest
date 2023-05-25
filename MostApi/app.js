const express = require("express")
const axios = require('axios')
const app = express()
// const cors = require('cors')
// const bodyParser = require("body-parser");
const route = require('./router/router')
const {db} = require('./database/data')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/api', route)
app.get('/', (req, res)=>{
    res.json({message: "/"})
})

try{
    db()
    app.listen(7001, ()=>console.log("Запустились"))
}
catch(err){
    console.log(err)
}