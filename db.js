const mongoose = require("mongoose")
require("dotenv").config()
//mongodb+srv://kaushal:pathak@cluster0.awdognl.mongodb.net/masaimedia?retryWrites=true&w=majority
//
const connection = mongoose.connect(process.env.mongoURL)

module.exports = {
    connection
}