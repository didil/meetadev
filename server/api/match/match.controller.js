'use strict';

var _ = require('lodash');
var Match = require('./match.model');

// Get list of matches
exports.index = function(req, res) {
  Match.find(function (err, matchs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(matchs);
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}