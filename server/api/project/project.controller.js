'use strict';

var _ = require('lodash');
var Project = require('./project.model');
var User = require('api/user/user.model');
var projectsEngine = require('components/mad-engine').projectsEngine;

// Get list of the user's projects
exports.index = function(req, res) {
  Project.find( {owner: req.user._id}).sort({createdAt:'-1'}).exec(function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(projects);
  });
};

// Get a single project
exports.show = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  var attrs = _.merge(req.body, {owner: req.user._id } );
  Project.create(attrs, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(project);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    if (!project.owner === req.user._id) return res.status(401).send('Unauthorized');

    var updatedProject = _.merge(project, req.body);
    updatedProject.markModified('skills');
    updatedProject.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    if (!project.owner === req.user._id) return res.status(401).send('Unauthorized');

    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Get matching projects for a freelancer
exports.match = function(req, res) {
  projectsEngine.search(req.user, function(err, matchedProjects){
    if (err) { return handleError(res, err); }
    return res.status(200).json(matchedProjects);
  });
};

// Like a project.
exports.ok = function(req, res) {
  User.update({_id: req.user._id},{$addToSet: {okProjects: req.params.id}},function(err){
    if (err) { return handleError(res, err); }

    res.status(200).send('OK');
  });
};

// DisLike a project.
exports.nok = function(req, res) {
  User.update({_id: req.user._id},{$addToSet: {nokProjects: req.params.id}},function(err){
    if (err) { return handleError(res, err); }

    res.status(200).send('OK');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}