'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('freelancer.edit-profile', {
        url: '/freelancer/edit-profile',
        templateUrl: 'app/freelancer/edit-profile/edit-profile.html',
        controller: 'FreelancerEditProfileCtrl'
      });
  });