const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

require('./database/connection')
let user = require('./router/user')
let auth = require('./router/auth')
let product = require('./router/product')
let category = require('./router/category')

app.use('/user' , user) 
app.use('/auth' , auth) 
app.use('/product' , product) 
app.use('/category' , category) 


app.all('*',(req,res,next) => {
    res.status(404).json({
        msg : 'Page not found',
        status : 'false'
    })
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log('connected on port 3000'));