var Factory = require('rosie').Factory;

// User model
Factory.define('user')
  .attr('provider', 'local')
  .attr('firstName', 'John')
  .attr('lastName', 'Doe')
  .attr('email', 'test@test.com')
  .attr('password', 'password');

Factory.define('freelancer-user').extend('user').attr('role', 'freelancer');
Factory.define('client-user').extend('user').attr('role', 'client');

module.exports = Factory;