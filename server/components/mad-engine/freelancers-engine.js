'use strict';

var _ = require('lodash');
var User = require('api/user/user.model');

function FreelancersEngine(project) {
  this.project = project;
}

FreelancersEngine.prototype.search = function (cb) {
  if (_.isEmpty(this.project.skills)) {
    return cb(new Error("No Skills defined for project"));
  }

  User.find({"role": "freelancer" , skills: {$in: this.project.skills}}, function (err, users) {
    if (err) {
      return cb(err);
    }

    cb(null,users);
  })
};

module.exports = FreelancersEngine;
