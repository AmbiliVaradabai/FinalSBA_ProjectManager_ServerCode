
const express = require('express');
const router = express.Router();
const  User = require ('../models/user')

// Add new User 
router.post('/add', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, UserData) => {
    if (err) {
      res.status(400).send({"Success": false, "Message":"Error Occured While Creating new user"})    
    } else {
      res.status(200).json({"Success": true})
    }
  });
});

//Get all users
router.get('/', (req, res) => {
    var Query = User.find();
    var queryparams = req.query;

    // For Search
    if (queryparams.searchKey) {
      Query.or([
        { 'FirstName': { $regex: queryparams.searchKey, $options: 'i' } },
        { 'LastName': { $regex: queryparams.searchKey, $options: 'i' } }]);
    }
    //For Sort
    if (queryparams.sortKey) {
      Query.sort([[queryparams.sortKey, 1]]);
    }
    Query.exec(function (err, Users) {
      if (err) {
          res.json({ 'Success': false })
      }
      else {
          res.json({ 'Success': true, 'Data': Users });
      }
    });
});

//Get a single user
router.get('/:id', (req, res) => {  
  let userId = req.params.id;
  User.findOne({ UserID: userId }, (err, user) => {
      if (err) {
          res.json({ 'Success': false, 'Message': 'User not found' })
      }
      else {
          res.json({ 'Success': true, 'Data': user });
      }
   });
});
  
// update user
router.post('/edit/:id', (req, res) => {
let userId = req.params.id;
  User.findOne({ UserID: userId }, (err, user) => {
    if (!user)
        return next(new Error('user not found'));
    else {
      user.FirstName = req.body.FirstName;
      user.LastName = req.body.LastName;
      user.EmployeeID = req.body.EmployeeID;

      user.save((err, UserData) => {
        if (err) {
          res.status(400).send({"Success": false, "Message":"Error Occured While updating the user"})    
        } else {
          res.status(200).json({"Success": true})
        }
      });
    }
  });  
});


//delete user
router.get('/delete/:id', (req, res) => {
  let userId = req.params.id;
  User.remove({ UserID: userId }, (err) => {
    if (err)
      res.json({ 'Success': false, 'Message': 'User not found' });
    else
      res.json({ 'Success': true });
  });
});
  
module.exports = router;