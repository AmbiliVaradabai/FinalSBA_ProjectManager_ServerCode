const express = require('express');
const router  = express.Router();
const Project = require ('../models/Project')

// Create new Project 
router.post('/add', (req, res) => {
    let projectData = req.body
    let project = new Project(projectData)

    project.save((err, projectData) => {
      if (err) {
          console.log(err)
        res.status(400).send({"Success": false, "Message":"Error Occured While Creating new Project"})    
      } else {
        res.status(200).json({"Success": true})
      }
    });
});

// Retrieve projects
router.get('/', (req, res) => {
  var Query = Project.find();
  var queryparams = req.query;
 
  if (queryparams.searchKey) {
    Query.or([
    { 'Project': { $regex: queryparams.searchKey, $options: 'i' } }]);
  }
  if (queryparams.sortKey) {
    Query.sort([[queryparams.sortKey, 1]]);
  }
 
  Query
  .populate('Tasks', ['TaskID', 'Status'])
  .exec(function (err, projects) {
    if (err) {
      res.json({ 'Success': false })
    }
    else {
      res.json({ 'Success': true, 'Data': projects });
    }
  });
 }); 

//get project details based on the project id 
router.get('/:id', (req, res) => {  
  let projectId = req.params.id;
  Project.findOne({ ProjectID: projectId }, (err, project) => {
    if (err) {
        res.json({ 'Success': false, 'Message': 'Project not found' })
    }
    else {
        res.json({ 'Success': true, 'Data': project });
    }
  });
}); 

// update project details
router.post('/edit/:id', (req, res) => {
  let projectId = req.params.id;
  Project.findOne({ ProjectID: projectId }, (err, project) => {
    if (!project)
      return next(new Error('project not found'));
    else {
      project.Project   = req.body.Project;
      project.Priority  = req.body.Priority;
      project.ManagerID = req.body.ManagerID;
      project.StartDate = req.body.StartDate;
      project.EndDate   = req.body.EndDate;

      Project.save((err, project) => {
        if (err) {
          res.status(400).send({"Success": false, "Message":"Error Occured While updating the Project Details"})    
        } else {
          res.status(200).json({"Success": true})
        }
      });        
    }
  });
});

//delete the selected project
router.get('/delete/:id', (req, res) => {
  let projectId = req.params.id;
  Project.remove({ ProjectID: projectId }, (err) => {
    if (err)
      res.json({ 'Success': false, 'Message': 'Project not found'  });
    else
      res.json({ 'Success': true });
  });
});

module.exports = router;