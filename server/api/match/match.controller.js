'use strict';

var _ = require('lodash');
var Match = require('./match.model');

// Get list of matches
exports.index = function(req, res) {
  Match.find()
    .populate('freelancer')
    .populate('project')
    .populate('client')
    .exec(function (err, matches) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(matches);
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}