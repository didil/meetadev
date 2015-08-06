'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

var ProjectSchema = new Schema({
  title: String,
  description: String,
  skills: [String],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

ProjectSchema.plugin(timestamps);

module.exports = mongoose.model('Project', ProjectSchema);