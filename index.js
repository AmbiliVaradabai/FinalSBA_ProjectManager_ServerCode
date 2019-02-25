const express = require ('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const usercontroller = require ('./controllers/user_controller')
const project_controller = require ('./controllers/project_controller')
const DbConfig = require('./DbConfig/DbConfig')
const mongoose = require('mongoose')
const path = require('path')


const app = express()
app.use(cors())

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connect(DbConfig.ConnectionString,{ useNewUrlParser: true }).then(
    () => {console.log("successfully Connected to Project Manager database")},
    err => {console.log("Cannot connect to Project Manager Database" + err) }
);

//setting up middleware
app.use(bodyparser.json())
app.use('/users',usercontroller)
app.use('/projects',project_controller)


//starting the server
port = process.env.port || 3000
app.listen(port, () => {
   console.log (`Server is runing in port ${port}`) 
})
