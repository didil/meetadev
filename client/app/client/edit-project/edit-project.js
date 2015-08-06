'use strict';

angular.module('meetadevApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.edit-project', {
        url: '/client/project/:_id/edit',
        templateUrl: 'app/client/edit-project/edit-project.html',
        controller: 'ClientEditProjectCtrl',
        resolve: {
          editAction: function () {
            return 'EDIT';
          },
          project: function (Project,$stateParams) {
            return Project.find($stateParams._id).then(function (response) {
              return response.data;
            });
          }
        }
      });
  });