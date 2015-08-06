'use strict';

angular.module('meetadevApp')
  .factory('Skill', function ($http) {

    function find(q) {
      return $http.get('/api/skills' , {params : {q:q}});
    }

    return {
      find: find
    }
  });
