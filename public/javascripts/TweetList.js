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

    vm.startLayout = function() {
      setTimeout(startLayoutConfig, 2000)

    }

    function startLayoutConfig() {
      vm.loading = false;
    }

    /**
     * requests and processes tweet data
     */
    function getTweets(page) {
      TweetService.TweetsByUser(vm.user.id, vm.page).then(
        function(response) {
          vm.tweetsResult = (vm.tweetsResult).concat(response.data);
          var tw = response.data;
          vm.page = vm.page + 1;
        },
        function(response) {
          return "error"
        });
    }




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
            setTimeout(reloadAllTweets, 2000);

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

    /**
     * binded to 'Get More Tweets' button
     */
    vm.getMoreTweets = function() {
      getTweets(vm.page);
    }

    /**
     * requests and processes tweet data
     */
     vm.followTag = function() {

     if (searchTag(vm.newTag)) {
       vm.newTag='';
     } else {


       UserTagsService.AddTagToUser(vm.user.id, vm.newTag).then(
         function(response) {
           var tag = response.data[0];
           vm.taglist.push(tag);
           setTimeout(reloadAllTweets, 2000);
           vm.newTag='';

         },
         function(response) {
           return "error"
         });
     }
   }


    function searchTag(tag){
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
