'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var createUserAndLogin = require('../../spec-helpers/login');


describe('GET /api/projects', function () {

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

  it('should respond with JSON array', function (done) {
    request(app)
      .get('/api/projects')
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  after(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

});

describe('GET /api/projects/match', function () {

  var authToken;
  var skills = ['javascript', 'html'];

  before(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

  before(function (done) {
    createUserAndLogin({role: 'freelancer', skills: skills}, function (err, token) {
      if (err) done(err);
      authToken = token;
      done();
    })
  });


  it('should respond with matched projects', function (done) {
    request(app)
      .get('/api/projects/match')
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


});