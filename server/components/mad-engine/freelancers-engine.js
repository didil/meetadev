'use strict';

var _ = require('lodash');
var User = require('api/user/user.model');


module.exports.search = function (project, cb) {
  if (_.isEmpty(project.skills)) {
    return cb(new Error("No Skills defined for project"));
  }

  User.find({
    "role": "freelancer",
    skills: {$in: project.skills},
    _id: {$nin: project.okFreelancers}
  }, function (err, users) {
    if (err) {
      return cb(err);
    }

    cb(null, users);
  })
};
