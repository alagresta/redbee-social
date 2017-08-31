
/**
 * @author A.Lagresta
 * created on 17.9.2016
*/


(function() {
	'use strict';
	angular.module('Twitter').directive("repeatEnd", function(){
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    if (scope.$last) {
                        scope.$eval(attrs.repeatEnd);
                    }
                }
            };
        });

})();
