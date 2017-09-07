(function () {
  'use strict';

  angular.module('Twitter').controller('TweetList', TweetList);
  TweetList.$inject = ['$scope','$resource','$timeout','TweetService','UserTagsService','toaster'];
  function TweetList($scope, $resource, $timeout,TweetService,UserTagsService,toaster ) {
    var vm = this;
    vm.tweetsResult = [];
    vm.page = 1;
    vm.aResult=null;
    vm.user={};
    vm.taglist=[];
    vm.listID=[];
    vm.loading=true;
    vm.newTag='';

    function init () {
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
        setTimeout(startLayoutConfig, 2000)
      }
      function    startLayoutConfig(){
          vm.loading=false;
        // initiate masonry.js
        vm.msnry = new Masonry('#tweet-list', {
          columnWidth: 200,
          itemSelector: '.tweet-item',
          transitionDuration: 0,
          isFitWidth: true,
          horizontalOrder: true,
          isAnimated:true,
          animationOptions:{"duration":250,"easing":"linear","queue":false}
        });
        vm.msnry.reloadItems();
        vm.msnry.layout();

      }

      /**
      * requests and processes tweet data
      */
      function getTweets (page) {
        TweetService.TweetsByUser(vm.user.id,vm.page).then(
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

          vm.deleteTag = function (tag){
            UserTagsService.DeleteTag(tag.tag,vm.user.id).then(
              function(response) {
                vm.taglist.splice(vm.taglist.indexOf(tag),1);
                toaster.pop({type: 'success', title: 'Operación exitosa', body: 'Se ha eliminado : '+ tag.tag,
                showCloseButton: true
              });
            },
            function(response) {
              toaster.pop({type: 'error', title: 'Errora', body: 'La operacíon no ha podido realizarse',
              showCloseButton: true
            });
          });
        }

        /**
        * binded to 'Get More Tweets' button
        */
        vm.getMoreTweets = function () {
          getTweets(vm.page);
        }

        /**
        * requests and processes tweet data
        */
        vm.followTag = function() {
          UserTagsService.AddTagToUser(vm.user.id,vm.newTag).then(
            function(response) {

              var  tag = response.data[0];
              vm.taglist.push(tag);

            },
            function(response) {
              return "error"
            });
          }


        function errorAlert() {
          var toastMsr ='<strong>Se ha producido un error al realizar la operación</strong>';
          AlertService.Alert('error', 'Atención', toastMsr );

        }
        init();
      }

    })();
