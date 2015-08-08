var Factory = require('rosie').Factory;
var faker = require('faker');

// User model
Factory.define('user')
  .attr('provider', 'local')
  .attr('firstName',faker.name.firstName())
  .attr('lastName', faker.name.lastName())
  .attr('email',  faker.internet.email())
  .attr('password', 'password');

Factory.define('freelancer-user').extend('user').attr('role', 'freelancer');
Factory.define('client-user').extend('user').attr('role', 'client');

// Project model
Factory.define('project')
  .attr('title', 'Super Project')
  .attr('description', "This is just the best project ever designed and were looking for a top notch partner")
  .attr('skills', ['javascript','html']);

module.exports = Factory;