'use strict';

var should = require('should');
var _ = require('lodash');
var app = require('app');
var User = require('api/user/user.model');
var Project = require('api/project/project.model');
var Factory = require('config/factories');
var projectsEngine = require('./projects-engine');

var freelancer, projects;

describe('ProjectsEngine : Search', function () {

  before(function (done) {
    Project.remove().exec().then(function () {
      done();
    });
  });

  before(function (done) {
    var projectsAttrs = [
      {title: 'Project 1', skills: ['java', 'c#', 'c++']},
      {title: 'Project 2', skills: ['javascript', 'ruby', 'c++']},
      {title: 'Project 3', skills: ['java', 'c#', 'c++', 'html']}
    ];

    Project.create(projectsAttrs, function (err, results) {
      if (err) throw err;
      projects = results;

      done();
    });
  });

  beforeEach(function () {
    freelancer = new User(Factory.attributes('freelancer-user'));
  });

  describe('freelancer with no skills', function () {
    it('fails', function (done) {
      freelancer.skills = [];
      projectsEngine.search(freelancer, function (err, projects) {
        should.exist(err);
        err.message.should.equal("No Skills defined for freelancer");
        done();
      });
    });
  });

  describe('freelancer with skills', function () {
    it('no matching projects', function (done) {
      freelancer.skills = ['painting'];
      projectsEngine.search(freelancer, function (err, matchedProjects) {
        should.not.exist(err);

        matchedProjects.should.have.length(0);
        done();
      });
    });

    it('1 skill : 2 matching projects', function (done) {
      freelancer.skills = ['java'];
      projectsEngine.search(freelancer, function (err, matchedProjects) {
        should.not.exist(err);

        var matchedProjects = _.sortBy(matchedProjects, 'title');
        matchedProjects.should.have.length(2);
        matchedProjects[0].title.should.equal('Project 1');
        matchedProjects[1].title.should.equal('Project 3');
        done();
      });
    });

    it('2 skills : 3 matching projects', function (done) {
      freelancer.skills = ['java', 'ruby'];
      projectsEngine.search(freelancer, function (err, matchedProjects) {
        should.not.exist(err);

        matchedProjects.should.have.length(3);
        done();
      });
    });

    it('1 skill : 3 matching projects with 2 liked previously', function (done) {
      freelancer.skills = ['c++'];
      freelancer.okProjects = [projects[0]._id];
      freelancer.nokProjects = [projects[2]._id];

      projectsEngine.search(freelancer, function (err, matchedProjects) {
        should.not.exist(err);

        matchedProjects.should.have.length(1);
        matchedProjects[0].title.should.equal('Project 2');
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
