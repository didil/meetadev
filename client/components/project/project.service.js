'use strict';

angular.module('meetadevApp')
  .factory('Project', function ($http) {

    var editCreateAllowedFields = ['title','description','skills'];

    function findAll() {
      return $http.get('/api/projects');
    }

    function find(_id) {
      return $http.get('/api/projects/' + _id);
    }

    function create(attrs) {
      var safeAttrs = _.pick(attrs, editCreateAllowedFields);

      return $http.post('/api/projects', safeAttrs);
    }

    function update(attrs) {
      var _id = attrs._id;
      var safeAttrs = _.pick(attrs, editCreateAllowedFields);

      return $http.put('/api/projects/' + _id, safeAttrs);
    }

    return {
      findAll: findAll,
      find: find,
      create: create,
      update: update
    }
  });
