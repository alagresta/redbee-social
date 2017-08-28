
(function () {
  'use strict';

	  angular.module('Twitter').controller('TweetList', TweetList);
	  TweetList.$inject = ['$scope','$resource','$timeout','TweetService','$sce'];
	  function TweetList($scope, $resource, $timeout,TweetService,$sce ) {
			var vm = this;
			vm.tweetsResult = [];
			vm.page = 1;
			vm.aResult="<blockquote class=\"twitter-tweet\" data-width=\"305\"><p lang=\"en\" dir=\"ltr\">Studio is set back up! <a href=\"https://twitter.com/hashtag/guitars?src=hash\">#guitars</a> <a href=\"https://twitter.com/hashtag/orangeamps?src=hash\">#orangeamps</a> <a href=\"https://twitter.com/hashtag/fender?src=hash\">#fender</a> <a href=\"https://twitter.com/hashtag/ibanez?src=hash\">#ibanez</a> <a href=\"https://t.co/ZdypQAIPap\">pic.twitter.com/ZdypQAIPap</a></p>&mdash; By Torchlight (@bytorchlight) <a href=\"https://twitter.com/bytorchlight/status/901944789851144192\">August 27, 2017</a></blockquote>\n";
			
			/**
     * init controller and set defaults
     */
    function init () {
      // set a default username value
      vm.username = "1";     
      getTweets(vm.page);
    }

    /**
     * requests and processes tweet data
     */
    function getTweets (page) {

    	TweetService.TweetsByUser(vm.username,vm.page).then(
						function(response) {	
							vm.tweetsResult=(vm.tweetsResult).concat(response.data);					
							//vm.tweetsResult= response.data;		
							vm.page = vm.page+1;
							return true;
						},
						function(response) {	

							return "error"

						});
				return "error"
			
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

