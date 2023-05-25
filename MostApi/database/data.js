const mongoose = require('mongoose')

const ConnectData = async() =>{

    try{
        const data = mongoose.connect('mongodb://127.0.0.1:27017/Most')
        console.log("Зпущен")
        
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}
module.exports = {
    db: ConnectData
}