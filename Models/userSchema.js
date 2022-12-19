const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      firstNameInput: String,
      lastNameInput: String, 
      emailInput: String,
      passwordInput: String, 
      confirmPasswordInput: String, 
      firstNameInput:{ 
            type: String, 
            required: [true, 'Provide First name'],
      },
      lastNameInput:{ 
            type: String, 
            required: [true, 'Provide Last Name']
      },
      emailInput:{ 
            type: String, 
            required: [true, 'Provide Email']
      },
      passwordInput:{ 
            type: String, 
            required: [true, 'Provide Password']
      },
      confirmPasswordInput: { 
            type: String,
            required: [true, 'Provide Confirm Password']
      }

}) 

module.exports = mongoose.model('user', userSchema)
