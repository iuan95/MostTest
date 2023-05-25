const {Schema, model} = require('mongoose')

const person = new Schema({
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
      },
    refreshToken: {
        type: String,
    }
})
const user = model("users", person)
module.exports = user;

