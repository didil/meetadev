'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SkillSchema = new Schema({
  name: String
});

SkillSchema.index({ name: 'text' });

module.exports = mongoose.model('Skill', SkillSchema);