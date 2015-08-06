'use strict';

angular.module('meetadevApp')
  .controller('FreelancerEditProfileCtrl', function ($scope, Auth, Profile, $state, Flash, Skill) {

    var initialize = function () {
      $scope.user = Auth.getCurrentUser();
      $scope.errors = {};
      $scope.submitting = false;
      $scope.availableSkills = [];
    };

    initialize();

    $scope.searchSkills = function (q) {
      if(!q || !q.trim()) return ;

      Skill.find(q).then(function (response) {
        $scope.availableSkills = response.data;
        console.log(response.data);
      }).catch(function (err) {
        Flash.create('danger', err);
      });
    };

    $scope.updateProfile = function (user) {
      $scope.submitted = true;

      if ($scope.editProfileForm.$valid) {
        $scope.submitting = true;

        Profile.update($scope.user).then(function () {
          // Account created, redirect to home
          $scope.submitting = false;
          Flash.create('success', "Profile saved successfully");
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
  }
)
;
