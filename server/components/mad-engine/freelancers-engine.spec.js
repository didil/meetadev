'use strict';

var should = require('should');
var _ = require('lodash');
var app = require('app');
var User = require('api/user/user.model');
var Project = require('api/project/project.model');
var Factory = require('config/factories');
var freelancersEngine = require('./freelancers-engine');

var project;

describe('FreelancersEngine : Search', function () {

  var usersAttrs = [
    _.merge(Factory.attributes('freelancer-user'), {skills: ['java', 'c#', 'c++']}),
    _.merge(Factory.attributes('freelancer-user'), {skills: ['javascript', 'ruby', 'c++']}),
    _.merge(Factory.attributes('freelancer-user'), {skills: ['java', 'c#', 'c++', 'html']})
  ];

  before(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

  before(function (done) {
    User.create(usersAttrs, function (err) {
      if (err) throw err;
      done();
    });
  });

  beforeEach(function () {
    project = new Project(Factory.attributes('project'));
  });

  describe('project with no skills', function () {
    it('fails', function (done) {
      project.skills = [];
      freelancersEngine.search(project, function (err, users) {
        should.exist(err);
        err.message.should.equal("No Skills defined for project");
        done();
      });
    });
  });

  describe('project with skills', function () {
    it('no matching freelancers', function (done) {
      project.skills = ['painting'];
      freelancersEngine.search(project, function (err, matchedUsers) {
        should.not.exist(err);

        matchedUsers.should.have.length(0);
        done();
      });
    });

    it('1 skill : 2 matching freelancers', function (done) {
      project.skills = ['java'];
      freelancersEngine.search(project, function (err, matchedUsers) {
        should.not.exist(err);

        var matchedUsers = _.sortBy(matchedUsers, 'title');
        matchedUsers.should.have.length(2);
        matchedUsers[0].firstName.should.equal(usersAttrs[0].firstName);
        matchedUsers[1].firstName.should.equal(usersAttrs[2].firstName);
        done();
      });
    });

    it('1 skill : 3 matching freelancers', function (done) {
      project.skills = ['c++'];
      freelancersEngine.search(project, function (err, matchedUsers) {
        should.not.exist(err);

        matchedUsers.should.have.length(3);
        done();
      });
    });

    it('2 skills : 3 matching freelancers', function (done) {
      project.skills = ['java', 'ruby'];
      freelancersEngine.search(project, function (err, matchedUsers) {
        should.not.exist(err);

        matchedUsers.should.have.length(3);
        done();
      });
    });
  });

  after(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

});
