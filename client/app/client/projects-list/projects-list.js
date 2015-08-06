'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.projects-list', {
        url: '/client/projects-list',
        templateUrl: 'app/client/projects-list/projects-list.html',
        controller: 'ClientProjectsListCtrl'
      });
  });