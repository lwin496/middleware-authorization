const users = require('../models/userSchema')
const asnycWrapper = require('../middleware/async') 
const crypto = require('crypto')

const getAllUsers = asnycWrapper(async(req, res) => { 
      const user = await users.find({})
      res.status(201).send(user)
})

const createUser = asnycWrapper(async(req, res) =>{
      
      const {firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput} = req.body
      // const user = await users.find()
      
      if(passwordInput === confirmPasswordInput) { 
            if(users.find(user => user.emailInput === emailInput)){
                  res.render('register', { 
                        message: 'user already registered', 
                        messageClass: 'alert-danger'
                  })
                  return
            }
            const user = await users.create(req.body)
            console.log(user)
            res.status(201).json({user})
      }
      
      else { 
            res.render('register', { 
                  message: 'user registration failed.',
                  messageClass: 'alert-danger'
            })

      }


     
})

const generateAuthToken = () => { 
      let token = crypto.randomBytes(30).toString('hex')
      return token; 
      console.log(token)
}


const authTokens = {}

const loginUser = asnycWrapper(async(req, res) => { 
      const { emailInput, passwordInput } = req.body  
      const user = users.find(u => { 
            return u.emailInput === emailInput && u.passwordInput === passwordInput
      })
      if(user){ 
            const authToken = generateAuthToken()     
            authTokens[authToken] = user 
            res.cookie('AuthToken', authToken)
            res.redirect('/protected')
      }else{ 
            res.render('login',{ 
                  message: 'user login failed', 
                  messageClass: 'alert-danger'
            })
      }

})

module.exports = {getAllUsers, createUser, loginUser, authTokens}


