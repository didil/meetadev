'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('freelancer', {
        templateUrl: 'app/freelancer/freelancer.html',
        data: {
          authenticate: true
        }
      });
  });