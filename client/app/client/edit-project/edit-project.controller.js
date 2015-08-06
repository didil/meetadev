'use strict';

angular.module('meetadevApp')
  .controller('ClientEditProjectCtrl', function ($scope, Auth, Project,Skill, $state, Flash ,editAction , project) {

    var initialize = function () {
      $scope.user = Auth.getCurrentUser();
      $scope.errors = {};
      $scope.submitting = false;
      $scope.availableSkills = [];
      $scope.editAction = editAction;
      $scope.project = project;
    };

    $scope.searchSkills = function (q) {
      if (!q || !q.trim()) return;

      Skill.find(q).then(function (response) {
        $scope.availableSkills = response.data;
      }).catch(function (err) {
        Flash.create('danger', err);
      });
    };

    initialize();

    $scope.updateProject = function (project) {
      $scope.submitted = true;

      if ($scope.editProjectForm.$valid) {
        $scope.submitting = true;

        var editFunction = ($scope.editAction == 'CREATE') ? Project.create : Project.update;
        editFunction(project).then(function () {
          $scope.submitting = false;
          Flash.create('success', "Project saved successfully");
          $state.go('client.projects-list');
        }).catch(function (err) {
          err = err.data;
          $scope.errors = {};
          $scope.submitting = false;

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            $scope.editProjectForm[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  }
)
;
