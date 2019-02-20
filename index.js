const express = require ('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const usercontroller = require ('./controllers/user_controller')
const DbConfig = require('./DbConfig/DbConfig')
const mongoose = require('mongoose')
const path = require('path')


const app = express()
app.use(cors())


mongoose.Promise = global.Promise;
mongoose.connect(DbConfig.ConnectionString).then(
    () => {console.log("successfully Connected to Project Manager database")},
    err => {console.log("Cannot connect to Project Manager Database" + err) }
);

//setting up middleware
app.use(bodyparser.json())
app.use('/users',usercontroller)

//starting the server
port = process.env.port || 3000
app.listen(port, () => {
   console.log (`Server is runing in port ${port}`) 
})
