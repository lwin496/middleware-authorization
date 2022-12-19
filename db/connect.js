require('dotenv').config()
const mongoose = require('mongoose') 

const connectDB = () => { 
      console.log(process.env.MONGOURI)
      return mongoose.connect(process.env.MONGOURI).then(()=>{console.log('connected to database')})
}

module.exports = connectDB