'use strict';

angular.module('meetadevApp')
  .controller('FreelancerEditProfileCtrl', function ($scope, Auth,Profile,$state) {
    $scope.user = Auth.getCurrentUser();
    $scope.errors = {};

    $scope.updateProfile = function (user) {
      $scope.submitted = true;

      if ($scope.editProfileForm.$valid) {
        Profile.update({
          title: $scope.user.title
        }).then(function () {
          // Account created, redirect to home
          $state.go('freelancer.dashboard');
        }).catch(function (err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            $scope.editProfileForm[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });
