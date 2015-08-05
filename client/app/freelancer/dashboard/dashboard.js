'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('freelancer.dashboard', {
        url: '/freelancer/dashboard',
        templateUrl: 'app/freelancer/dashboard/dashboard.html',
        controller: 'FreelancerDashboardCtrl'
      });
  });