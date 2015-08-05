var User = require('../api/user/user.model');
var Factory = require('../config/factories');
var request = require('supertest');
var app = require('../app');


function createUserAndLogin(cb) {
  var user = new User(Factory.attributes('freelancer-user'));
  user.save(function (err, user) {
    if (err) cb(err);
    request(app)
      .post('/auth/local')
      .send({email: user.email, password: user.password})
      .expect(200)
      .end(function (err, res) {
        if (err) cb(err);
        cb(null, res.body.token);
      });
  });
}

module.exports = createUserAndLogin;