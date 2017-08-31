(function () {
    'use strict';
    angular
    .module('Twitter')
    .factory('TweetService', TweetService);

    TweetService.$inject = ['$http','$q'];
    function TweetService($http,$q) {
        var service = {};

        var self = this;

        // service.GetTweetsByUser = GetTweetsByUser;
        service.TweetsByUser = TweetsByUser;
        return service;


      function TweetsByUser(id,page) {
      return $http.get('/api/usersTweets/'+id+'/'+page).then(handleSuccess, handleError('Error getting user by username'));
  }



        function GetIndex() {
            return $http.get(appPath+'usuarios').success(function (response) {
            	service.Index = response.data
            });
        }



        function MassiveActivation(data) {

            var deferred = $q.defer();

			//$http.post(appPath + 'guardarUsuario', user)
            $http({
            method: 'POST',
            url: appPath + 'activarDesactivarMasivo',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
            data: $.param(data),
            config:{timeout:100},

            })
                .success(function(response) {
                	if (response.status != 200) {
						deferred.reject(response.data);
					}

                    deferred.resolve(response );
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }




        function Update(user) {

            var deferred = $q.defer();

			//$http.post(appPath + 'guardarUsuario', user)
            $http({
            method: 'POST',
            url: appPath + 'guardarUsuario',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
            data: $.param(user),
            config:{timeout:100},

            })
                .success(function(response) {
                	if (response.status != 200) {
						deferred.reject(response.data);
					}

                    deferred.resolve(response );
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
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
