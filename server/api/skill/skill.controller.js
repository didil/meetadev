'use strict';

var _ = require('lodash');
var Skill = require('./skill.model');

// Get list of skills
exports.index = function (req, res) {
  var q = req.query.q;
  Skill.find({$text: {$search: q}}, {score: {$meta: "textScore"}})
    .sort({score: {$meta: 'textScore'}})
    .limit(10).exec(function (err, skills) {
      if (err) return handleError(res, err);

      return res.status(200).json(skills.map(function(skill) { return skill.name}));
    });
};


function handleError(res, err) {
  return res.status(500).send(err);
}