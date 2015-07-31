var Factory = require('rosie').Factory;

// User model
Factory.define('user')
  .attr('provider', 'local')
  .attr('firstName', 'John')
  .attr('lastName', 'Doe')
  .attr('email', 'test@test.com')
  .attr('password', 'password');



module.exports = Factory;