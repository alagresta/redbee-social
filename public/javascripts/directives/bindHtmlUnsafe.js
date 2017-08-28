
/**
 * @author A.Lagresta
 * created on 17.9.2016
 */
(function() {
	'use strict';

	angular.module('Twitter').filter('unsafe', ['$sce', function ($sce) {
	    return function (val) {
	        return $sce.trustAsHtml(val);
	    };
	}]);
})();