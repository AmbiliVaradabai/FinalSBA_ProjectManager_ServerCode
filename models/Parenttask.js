const mongoose = require('mongoose');
const autoInc= require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;

var options = {
    toObjects :{ virtuals: true },
    toJSON :{ virtuals: true} 
}

let ParentTask = new Schema({
    ParentID        : {type: Number },
    ParentTask      : {type: String, required: true},
    ProjectID       : {type: Date, default: null}  
    }, options, {collection: 'parenttasks'}
);

ParentTask.plugin(autoInc, {inc_field: 'ParentID'});
module.exports = mongoose.model('ParentTask', ParentTask);