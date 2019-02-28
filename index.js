const express = require ('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const user_controller = require ('./controllers/user_controller')
const project_controller = require ('./controllers/project_controller')
const task_controller =  require ('./controllers/task_controller')
const parenttask_controller =  require ('./controllers/parentTask_controller')
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
app.use('/users', user_controller)
app.use('/projects', project_controller)
app.use('/tasks', task_controller) 
app.use('/parenttasks', parenttask_controller) 

//starting the server
port = process.env.port || 3000
app.listen(port, () => {
   console.log (`Server is runing in port ${port}`) 
})

