(function() {
    'use strict';
    angular
        .module('autoselect', [])
        .directive('autoselect', Autoselect);
 
    function Autoselect($document) {
        function link($scope, $element, $attrs) {
            var dom = $element[0],
                autoselect = $attrs.autoselect;

            if ($attrs.autoselect) {
                $scope.$watch($attrs.autoselect, selectIf);
            }
            $element.on('focus', function() {
                selectIf(autoselect ? $scope.$eval(autoselect) : true);
            });

            function selectIf(condition) {
                if (condition) {
                    if (dom == $document[0].activeElement) {
                        dom.select();
                        // Firefox will clear selection and re-place the cursor on mouseup
                        $element.one('mouseup', function(e) {
                            e.preventDefault();
                        });
                    }
                }
            }
        }

        return {
            restrict: 'A',
            link: link
        };
    }
})();
