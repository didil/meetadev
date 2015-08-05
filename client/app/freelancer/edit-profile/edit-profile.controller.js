'use strict';

angular.module('meetadevApp')
  .controller('FreelancerEditProfileCtrl', function ($scope, Auth,Profile,$state) {
    $scope.user = Auth.getCurrentUser();
    $scope.errors = {};
    $scope.submitting = false;

    $scope.updateProfile = function (user) {
      $scope.submitted = true;

      if ($scope.editProfileForm.$valid) {
        $scope.submitting = true;

        Profile.update({
          title: $scope.user.title,
          website: $scope.user.website
        }).then(function () {
          // Account created, redirect to home
          $scope.submitting = false;
          $state.go('freelancer.dashboard');
        }).catch(function (err) {
          err = err.data;
          $scope.errors = {};
          $scope.submitting = false;

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            $scope.editProfileForm[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });
