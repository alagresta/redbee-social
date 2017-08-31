

(function() {
	'use strict';


angular.module('Twitter')

.directive('ngHtmlCompile', ["$compile", function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngHtmlCompile, function (newValue, oldValue) {
                element.html(newValue);
                $compile(element.contents())(scope);
            });
        }
    }
}]);



angular.module('Twitter').directive('bindHtmlUnsafe', function( $parse, $compile ) {
    return function( $scope, $element, $attrs ) {
        var compile = function( newHTML ) {
            newHTML = $compile(newHTML)($scope);
            $element.html('').append(newHTML);
        };

        var htmlName = $attrs.bindHtmlUnsafe;

        $scope.$watch(htmlName, function( newHTML ) {
            if(!newHTML) return;
            compile(newHTML);
        });

    };
});

})();
