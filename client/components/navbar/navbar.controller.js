'use strict';

angular.module('meetadevApp')
  .controller('NavbarCtrl', function ($scope, $state, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isClient = Auth.isClient;
    $scope.isFreelancer = Auth.isFreelancer;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $state.go('login');
    };

    $scope.isActive = function (state) {
      return $state.includes(state) ;
    };

  });