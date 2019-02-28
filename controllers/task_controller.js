const express   = require('express');
const router    = express.Router();
const Project   = require('../models/Project');
const Task      = require('../models/Task')

// Create new Task 
router.post('/add', (req, res) => {
    let taskData = req.body
    let task = new Task(taskData)
    task.save((err, taskData) => {
      if (err) {
        res.status(400).send({"Success": false, "Message":"Error Occured While Creating new Task"})    
      } else {
        res.status(200).json({"Success": true})
      }
    });
});

// Retrieve tasks of allocated to the projects
router.get('/', (req, res) => {
    var Query = Task.find();
    var queryparams = req.query;

    if (queryparams.ProjectId) {
        Project.findOne({ ProjectID: queryparams.ProjectId }, (err, project) => {         
            Query.or([
                { Project: project._id }
            ]);
            if (queryparams.sortKey) {
                var sortdirection = 1;
                if(queryparams.sortKey=="Status"){
                    sortdirection = -1;
                }
                Query.sort([[queryparams.sortKey, sortdirection]]);
            }
            Query
                .populate('Project')
                .populate('User')
                .populate('Parent');
                Query.exec( (err, tasks) => {
                if (err) {
                    res.json({ 'Success': false })
                }
                else {
                    res.json({ 'Success': true, 'Data': tasks });
                }
            });
        });
    }
});
  
//get task details based on the task id 
router.get('/:id', (req, res) => {  
  let taskId = req.params.id;
  Task.findOne({ TaskID: taskId }, (err, task) => {
    if (err) {
        res.json({ 'Success': false, 'Message': 'Task not found' })
    }
    else {
        res.json({ 'Success': true, 'Data': task });
    }
  });
});
  

// update task details
router.post('/edit', (req, res) => {
let newTask = new Task(req.body);
Task.findOne({TaskID: newTask.TaskID }, (err, task) => {
    if (!task)
      return next(new Error('task not found'));
    else {
        task.Task       = req.body.Task;
        task.Priority   = req.body.Priority;
        task.Parent     = req.body.Parent;
        task.StartDate  = req.body.StartDate;
        task.EndDate    = req.body.EndDate;

        task.save((err, task) => {
        if (err) {
          res.status(400).send({"Success": false, "Message":"Error Occured While updating the task Details"})    
        } else {
          res.status(200).json({"Success": true})
        }
      });        
    }
  });
});


//End the selected project
router.get('/delete/:id', (req, res) => {
    let taskId = req.params.id;

    Task.findOne({ TaskID: taskId },  (err, task) => {    
        task.Status = 1;   
        task.save((err, task) => {
            if (err) {
                res.status(400).send({"Success": false, "Message":"Error Occured While ending the task Details"})    
            } else {
                res.status(200).json({"Success": true})
            }
        });
    });
});

module.exports = router;