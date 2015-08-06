'use strict';

angular.module('meetadevApp')
  .controller('ClientProjectsListCtrl', function ($scope, $state, Flash, Project) {

    var initialize = function () {
      $scope.projects = [] ;
      $scope.errors = {};

      $scope.getProjects();
    };

    $scope.getProjects = function () {
      Project.findAll().then(function (response) {
        $scope.projects = response.data;
      }).catch(function (err) {
        Flash.create('danger', err);
      });
    };

    initialize();
  });
