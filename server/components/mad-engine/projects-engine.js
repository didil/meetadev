'use strict';

var _ = require('lodash');
var Project = require('api/project/project.model');

module.exports.search = function (freelancer, cb) {
  if (_.isEmpty(freelancer.skills)) {
    return cb(new Error("No Skills defined for freelancer"));
  }

  Project.find({
    $and: [
      {skills: {$in: freelancer.skills}},
      {_id: {$nin: freelancer.okProjects}},
      {_id: {$nin: freelancer.nokProjects}}
    ]
  })
    .populate('owner', '-hashedPassword -salt')
    .exec(function (err, projects) {
      if (err) {
        return cb(err);
      }

      cb(null, projects);
    })
};

