'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('meetadevApp'));
  beforeEach(module('socketMock'));

  var AdminCtrl,
      scope,
      $httpBackend;

  var users = [{_id:1},{_id:2}];

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/users')
      .respond(users);

    scope = $rootScope.$new();
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of users to the scope', function () {
    $httpBackend.flush();
    expect(scope.users.length).toBe(2);
  });
});
