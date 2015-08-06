'use strict';

angular.module('meetadevApp')
  .controller('ClientEditProfileCtrl', function ($scope, Auth, Profile, $state, Flash) {

    var initialize = function () {
      $scope.user = Auth.getCurrentUser();
      $scope.errors = {};
      $scope.submitting = false;
      $scope.availableSkills = [];
    };

    initialize();

    $scope.updateProfile = function (user) {
      $scope.submitted = true;

      if ($scope.editProfileForm.$valid) {
        $scope.submitting = true;

        Profile.update($scope.user).then(function () {
          $scope.submitting = false;
          Flash.create('success', "Profile saved successfully");
          $state.go('client.dashboard');
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
  }
)
;
