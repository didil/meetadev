'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Factory = require('../../config/factories');

describe('POST /api/users', function() {

  it('doesnt allow creating admin', function(done) {
    request(app)
      .post('/api/users')
      .send(Factory.attributes('user',{role:'admin'}))
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.should.equal('Invalid User Role');
        done();
      });
  });
});
