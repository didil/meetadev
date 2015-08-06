'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.create-project', {
        url: '/client/create-project',
        templateUrl: 'app/client/edit-project/edit-project.html',
        controller: 'ClientEditProjectCtrl',
        resolve: {
          editAction: function () {
            return 'CREATE';
          },
          project: function () {
            return {};
          }
        }
      });
  });