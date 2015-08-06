'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.edit-profile', {
        url: '/client/edit-profile',
        templateUrl: 'app/client/edit-profile/edit-profile.html',
        controller: 'ClientEditProfileCtrl'
      });
  });