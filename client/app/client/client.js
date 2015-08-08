'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client', {
        templateUrl: 'app/client/client.html',
        data: {
          authenticate: true
        }
      });
  });