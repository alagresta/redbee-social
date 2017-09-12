(function() {
  'use strict';

  angular.module('Twitter').controller('TweetList', TweetList);
  TweetList.$inject = ['$scope', '$resource', '$timeout', 'TweetService', 'UserTagsService', 'toaster', '$routeParams'];

  function TweetList($scope, $resource, $timeout, TweetService, UserTagsService, toaster, $routeParams) {
    var vm = this;
    vm.tweetsResult = [];
    vm.page = 1;
    vm.aResult = null;
    vm.user = {};
    vm.taglist = [];
    vm.listID = [];
    vm.loading = true;
    vm.newTag = '';
    vm.loading = false;

    function init() {
      UserTagsService.GetUserByUserName($routeParams.username).then(
        function(response) {
          vm.user = response.data;
          getTags(vm.user.id);
          getTweets(vm.page);
        },
        function(response) {
          console.log('error');
        });
    }

    vm.deleteTag = function(tag) {
      UserTagsService.DeleteTag(tag.tag, vm.user.id).then(
        function(response) {
          vm.taglist.splice(vm.taglist.indexOf(tag), 1);
          toaster.pop({
            type: 'success',
            title: 'Operación exitosa',
            body: 'Se ha eliminado : ' + tag.tag,
            showCloseButton: true
          });
          setTimeout(reloadAllTweets, 1500);

        },
        function(response) {
          toaster.pop({
            type: 'error',
            title: 'Errora',
            body: 'La operacíon no ha podido realizarse',
            showCloseButton: true
          });
        });
    }


    vm.getMoreTweets = function() {
      getTweets(vm.page);
    }


    vm.followTag = function() {

      if (searchTag(vm.newTag)) {
        vm.newTag = '';
      } else {


        UserTagsService.AddTagToUser(vm.user.id, vm.newTag).then(
          function(response) {
            var tag = response.data[0];
            vm.taglist.push(tag);
            setTimeout(reloadAllTweets, 1500);
            vm.newTag = '';

          },
          function(response) {
            return "error"
          });
      }
    }

    vm.renderedTrue = function(index) {
      vm.tweetsResult[index].rendered = true;
    }

    function getTweets(page) {
      TweetService.TweetsByUser(vm.user.id, vm.page).then(
        function(response) {
          var array = response.data;
          for (var i = 0; i < array.length; i++) {
            array[i].rendered = false;
            vm.tweetsResult.push(array[i])
          }
          vm.page = vm.page + 1;
        },
        function(response) {
          return "error"
        });
    }



    /*    PRIVATE FUNCTIONS       */

    function reloadAllTweets() {
      vm.page = 1;
      vm.tweetsResult = [];
      getTweets(vm.page);
    }


    function getTags(id) {
      UserTagsService.GetTagsByUserId(id).then(
        function(response) {
          vm.taglist = response.data;
        },
        function(response) {
          console.log('error');
        });
    }

    function searchTag(tag) {
      for (var i = 1; i < vm.taglist.length; i++) {
        if (vm.taglist[i].tag.toUpperCase() == tag.toUpperCase()) {
          return true;
        }

      }
      return false;
    }

    function errorAlert() {
      var toastMsr = '<strong>Se ha producido un error al realizar la operación</strong>';
      AlertService.Alert('error', 'Atención', toastMsr);

    }
    init();
  }

})();
