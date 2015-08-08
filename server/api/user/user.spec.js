'use strict';

var should = require('should');
var app = require('../../app');
var User = require('../user/user.model');
var Project = require('../project/project.model');
var request = require('supertest');
var Factory = require('../../config/factories');
var createUserAndLogin = require('../../spec-helpers/login');

describe('POST /api/users', function () {

  it('doesnt allow creating admin', function (done) {
    request(app)
      .post('/api/users')
      .send(Factory.attributes('user', {role: 'admin'}))
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        res.text.should.equal('Invalid User Role');
        done();
      });
  });
});

describe('PUT /api/users/profile', function () {

  var authToken;

  before(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

  before(function (done) {
    createUserAndLogin(function (err, token) {
      if (err) done(err);
      authToken = token;
      done();
    })
  });

  it('updates own profile OK', function (done) {
    request(app)
      .put('/api/users/profile')
      .set('Authorization', 'Bearer ' + authToken)
      .send({title: 'Pro JS developer', website: 'http://www.mysite.com'})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.text.should.equal('OK');
        done();
      });
  });

  after(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

});


describe('GET /api/users/match-freelancers', function () {

  var authToken;
  var project;

  before(function (done) {
    Project.remove().exec().then(function () {
      Project.create({title: 'My Project', skills: ['javascript', 'html']}, function (err, createdProject) {
        if (err) done(err);
        project = createdProject;
        done();
      })
    });
  });

  before(function (done) {
    User.remove().exec().then(function () {
      createUserAndLogin({role: 'client'}, function (err, token) {
        if (err) done(err);
        authToken = token;
        done();
      })
    });
  });

  it('should respond with matched freelancers', function (done) {
    request(app)
      .get('/api/users/match-freelancers')
      .query({projectId: project._id.toString()})
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.length.should.equal(0);
        done();
      });
  });

  after(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

  after(function (done) {
    Project.remove().exec().then(function () {
      done();
    });
  });

});