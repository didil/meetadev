'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.dashboard', {
        url: '/client/dashboard',
        templateUrl: 'app/client/dashboard/dashboard.html',
        controller: 'ClientDashboardCtrl'
      });
  });