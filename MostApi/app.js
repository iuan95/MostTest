const express = require("express")
const axios = require('axios')
const app = express()
app.use('/', (req, res)=>{
    console.log("asd")
})

axios.get('https://dummyjson.com/products')
    .then((res)=>{
        console.log("Get: Запрос->")
        console.log(res.data.products)
    })
    .catch((err)=>console.log(err))

app.listen(3000, ()=>console.log("Запустились"))