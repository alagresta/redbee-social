(function () {
  'use strict';
  angular
  .module('Twitter')
  .factory('UserTagsService', UserTagsService);

  UserTagsService.$inject = ['$http','$q'];
  function UserTagsService($http,$q) {
    var service = {};

    var self = this;

    service.GetUserById = GetUserById;
    service.GetUserByUserName = GetUserByUserName;
    service.GetTagsByUserId = GetTagsByUserId;
      service.DeleteTag = DeleteTag;
    return service;


    function GetUserById(id,page) {
      return $http.get('/api/user/'+id).then(handleSuccess, handleError('Error getting user by id'));
    }

    function GetUserByUserName(username) {
      return $http.get('/api/username/'+username).then(handleSuccess, handleError('Error getting user by username'));
    }
    function GetTagsByUserId(id) {
      return $http.get('/api/interest/'+id).then(handleSuccess, handleError('Error getting user by username'));
    }

    function DeleteTag(id) {
      return $http.delete('/api/interest/'+id).then(handleSuccess, handleError('Error getting user by username'));
    }

    function AddTagToUser(id,userID) {
    return $http.put('/api/interest/'+id+'/'+userID).then(handleSuccess, handleError('Error getting user by username'));
    }




    // private functions

    function handleSuccess(res) {
      return res;
    }

    function handleError(error) {
      return function () {
        return { success: false, message: error };
      };
    }
  }

})();
