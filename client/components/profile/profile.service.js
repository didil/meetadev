'use strict';

angular.module('meetadevApp')
  .factory('Profile', function ($http) {
    return {
      update: function (attrs) {
        var result = $http.put('/api/users/profile', {
          title: attrs.title
        });

        return result;
      }
    }
  });
