'use strict';

describe('Service: Auth', function () {

  beforeEach(module('meetadevApp'));

  var Auth,
    $cookieStore;

  var user = {role : null};
  var User = {
    get: function () {
      return user;
    }
  };

  beforeEach(module(function ($provide) {
    $provide.decorator('$cookieStore', function ($delegate) {
      // at this point the "$cookieStore" service  has only just been constructed, and is accessible here as "$delegate".
      // Services that have "$cookieStore" as an injected
      // dependency have not been instantiated yet, so we can slip our cookie in now.
      $delegate.put('token', 'TEST_TOKEN');
      return $delegate;
    });

    $provide.value('User', User);
  }));

  beforeEach(inject(function (_Auth_, _$cookieStore_) {
    Auth = _Auth_;
    $cookieStore = _$cookieStore_;
  }));

  describe('user is client', function () {
    beforeEach(function () {
      user.role = 'client';
    });

    it('isClient', function () {
      expect(Auth.isClient()).toBe(true);
    });

    it('isFreelancer', function () {
      expect(Auth.isFreelancer()).toBe(false);
    });
  });

  describe('user is freelancer', function () {
    beforeEach(function () {
      user.role = 'freelancer';
    });

    it('isClient', function () {
      expect(Auth.isFreelancer()).toBe(true);
    });

    it('isFreelancer', function () {
      expect(Auth.isClient()).toBe(false);
    });
  });

  afterEach(function () {
    $cookieStore.remove('token');
  });

});