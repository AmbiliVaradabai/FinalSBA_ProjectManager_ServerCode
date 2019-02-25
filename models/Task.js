const mongoose = require('mongoose');
const autoInc= require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;

var options = {
    toObjects :{ virtuals: true },
    toJSON :{ virtuals: true} 
}

let Task = new Schema({
    TaskID          : {type: Number },
    Task            : {type: String, required: true},
    StartDate       : {type: Date, default: null},
    EndDate         : {type: Date, default: null},        
    Priority        : {type: Number},   
    Status          : {type: Number, default: 0},   
    Parent          : {type: Schema.Types.ObjectId, ref: 'ParentTask' },
    Project         : {type: Schema.Types.ObjectId, ref: 'Project' },
    User            : {type: Schema.Types.ObjectId, ref: 'User' }    
    }, options, {collection: 'tasks'}
);

Task.plugin(autoInc, {inc_field: 'TaskID'});
module.exports = mongoose.model('Task', Task);
