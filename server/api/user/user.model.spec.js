'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');
var Factory = require('../../config/factories');

var user ;

describe('User Model', function () {
  before(function (done) {
    // Clear users before testing
    User.remove().exec().then(function () {
      done();
    });
  });

  beforeEach(function () {
    user = new User(Factory.attributes('user'));
  });

  afterEach(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

  it('should begin with no users', function (done) {
    User.find({}, function (err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function (done) {
    user.save(function () {
      var userDup = new User(user);
      userDup.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function (done) {
    user.email = '';
    user.save(function (err) {
      should.exist(err.errors.email);
      done();
    });
  });

  it('should fail when saving with invalid website', function (done) {
    user.website = 'XYZ';
    user.save(function (err) {
      should.exist(err.errors.website);
      done();
    });
  });

  it('should succeed when saving with valid website', function (done) {
    user.website = 'http://www.yahoo.com';
    user.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it("should authenticate user if password is valid", function () {
    return user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function () {
    return user.authenticate('blah').should.not.be.true;
  });
});
