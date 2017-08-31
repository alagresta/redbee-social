
(function () {
  'use strict';

  angular.module('Twitter').controller('TweetList', TweetList);
  TweetList.$inject = ['$scope','$resource','$timeout','TweetService','UserTagsService'];
  function TweetList($scope, $resource, $timeout,TweetService,UserTagsService ) {
    var vm = this;
    vm.tweetsResult = [];
    vm.page = 1;
    vm.aResult=null;
    vm.user={};
    vm.username = "1";
    vm.taglist=[];
    vm.listID=[];

    /* init controller and set defaults
    */

    function init () {
      // set a default username value
      UserTagsService.GetUserByUserName('alagresta').then(
        function(response) {
          vm.user=response.data;
          getTags(vm.user.id);
          getTweets(vm.page);



        },
        function(response) {
          console.log('error');
        });


      }

  vm.startLayout = function(){

setTimeout(startLayoutConfig, 3000)
}
  function    startLayoutConfig(){


        // initiate masonry.js
        vm.msnry = new Masonry('#tweet-list', {
          columnWidth: 260,
          itemSelector: '.tweet-item',
          transitionDuration: 0,
          isFitWidth: true
        });


        vm.msnry.reloadItems();
        vm.msnry.layout();


      }

      /**
      * requests and processes tweet data
      */
      function getTweets (page) {

        TweetService.TweetsByUser(vm.username,vm.page).then(
          function(response) {
            vm.tweetsResult=(vm.tweetsResult).concat(response.data);
            var  tw = response.data;
            vm.page = vm.page+1;
          },
          function(response) {

            return "error"

          });


        }


        function getTags(id){

          UserTagsService.GetTagsByUserId(id).then(
            function(response) {
              vm.taglist=response.data;
            },
            function(response) {
              console.log('error');
            });
          }

          /**
          * binded to 'Get More Tweets' button
          */
          vm.getMoreTweets = function () {
            getTweets(vm.page);
          }


          init();
        }

      })();
