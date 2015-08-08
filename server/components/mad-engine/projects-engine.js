'use strict';

var _ = require('lodash');
var Project = require('api/project/project.model');

function ProjectsEngine(freelancer) {
  this.freelancer = freelancer;
}

ProjectsEngine.prototype.search = function (cb) {
  if (_.isEmpty(this.freelancer.skills)) {
    return cb(new Error("No Skills defined for freelancer"));
  }

  Project.find({skills: {$in: this.freelancer.skills}}, function (err, projects) {
    if (err) {
      return cb(err);
    }

    cb(null,projects);
  })
};

module.exports = ProjectsEngine;
