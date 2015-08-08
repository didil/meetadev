'use strict';

var should = require('should');
var _ = require('lodash');
var app = require('app');
var User = require('api/user/user.model');
var Project = require('api/project/project.model');
var Factory = require('config/factories');
var ProjectsEngine = require('./projects-engine');

var freelancer;

describe('ProjectsEngine : Search', function () {

  var projects = [
    {title: 'Project 1', skills: ['java', 'c#', 'c++']},
    {title: 'Project 2', skills: ['javascript', 'ruby', 'c++']},
    {title: 'Project 3', skills: ['java', 'c#', 'c++', 'html']}
  ];

  before(function (done) {
    Project.remove().exec().then(function () {
      done();
    });
  });

  before(function (done) {
    Project.create(projects, function (err) {
      if (err) throw err;
      done();
    });
  });

  beforeEach(function () {
    freelancer = new User(Factory.attributes('freelancer-user'));
  });

  describe('freelancer with no skills',function(){
    it('fails', function (done) {
      freelancer.skills = [];
      var projectsEngine = new ProjectsEngine(freelancer);
      projectsEngine.search(function (err, projects) {
        should.exist(err);
        err.message.should.equal("No Skills defined for freelancer");
        done();
      });
    });
  });

  describe('freelancer with skills',function(){
    it('no matching projects', function (done) {
      freelancer.skills = ['painting'];
      var projectsEngine = new ProjectsEngine(freelancer);
      projectsEngine.search(function (err, matchedProjects) {
        should.not.exist(err);

        matchedProjects.should.have.length(0);
        done();
      });
    });
  });

  describe('freelancer with skills',function(){
    it('1 skill : 2 matching projects', function (done) {
      freelancer.skills = ['java'];
      var projectsEngine = new ProjectsEngine(freelancer);
      projectsEngine.search(function (err, matchedProjects) {
        should.not.exist(err);

        var matchedProjects = _.sortBy(matchedProjects,'title');
        matchedProjects.should.have.length(2);
        matchedProjects[0].title.should.equal('Project 1');
        matchedProjects[1].title.should.equal('Project 3');
        done();
      });
    });
  });

  describe('freelancer with skills',function(){
    it('1 skill : 3 matching projects', function (done) {
      freelancer.skills = ['c++'];
      var projectsEngine = new ProjectsEngine(freelancer);
      projectsEngine.search(function (err, matchedProjects) {
        should.not.exist(err);

        matchedProjects.should.have.length(3);
        done();
      });
    });
  });

  describe('freelancer with skills',function(){
    it('2 skills : 3 matching projects', function (done) {
      freelancer.skills = ['java','ruby'];
      var projectsEngine = new ProjectsEngine(freelancer);
      projectsEngine.search(function (err, matchedProjects) {
        should.not.exist(err);

        matchedProjects.should.have.length(3);
        done();
      });
    });
  });

  after(function (done) {
    Project.remove().exec().then(function () {
      done();
    });
  });

});
