'use strict';

angular.module('meetadevApp')
  .factory('Profile', function ($http) {

    function update(attrs) {
      var safeAttrs = _.pick(attrs, ['title', 'website','aboutMe']);

      return $http.put('/api/users/profile', safeAttrs);
    }

    return {
      update: update
    }
  });
