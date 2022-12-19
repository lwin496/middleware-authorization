const express = require('express');
const exphbs = require('express-handlebars'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const {getAllUsers , createUser, loginUser, authTokens} = require('./controllers/userControllers');
const { application } = require('express');


const app = express();
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.engine('hbs', exphbs.engine({ 
      extname: '.hbs'
})); 

app.set('view engine',  'hbs'); 

app.get('/', (req, res) => { 
      res.render('home');
})
app.get('/register', (req, res) => { 
      res.render('register');
})
app.get('/data', getAllUsers)

app.post('/register', createUser)

app.get('/login', (req, res) => {   
      res.render('login')
})

app.use((req,res, next) => { 
      const authToken = req.cookies['AuthToken']
      req.user = authTokens[authToken]
      next()
})

app.get('/protected', (req, res) => { 
      if(req.user) { 
            res.render('protected')
      } else{ 
            res.render('login' , { 
                  message: 'provide login to continue', 
                  messageClass: 'alert-danger'
            })
      }
})



app.post('/login', loginUser)





const serverInitalization = async () => { 
      try { 
            await connectDB()
            app.listen(PORT, console.log(`Server is running on ${PORT}`))
      } catch (error) { 
            console.log(error)
      }
}





serverInitalization()