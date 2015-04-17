(function() {
    'use strict';
    describe('Directive: autoselect [A]', function() {
        var $scope,
            $compile,
            $document,
            tpl = '<input type="text" autoselect="{{watchProperty}}" value="something" />',
            element,
            dom;

        beforeEach(module('autoselect'));

        beforeEach(inject(function($rootScope, _$compile_, _$document_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $document = _$document_;
            $document[0].getSelection().empty();
        }));

        function compile() {
            element = $compile(tpl)($scope);
            angular.element($document[0].body).append(element);
            dom = element[0];
            spyOn(dom, 'select').and.callThrough();
        }

        afterEach(function() {
            element.remove();
        });

        describe('<input autoselect>', function() {
            it('should be selected when focused', onFocusTest);
        });

        function onFocusTest() {
            compile();
            dom.focus();
            expect(dom.select).toHaveBeenCalled();
        }

        describe('<input autoselect="watchProperty">', function() {
            beforeEach(watchBeforeEach);
            it('should not be selected when focused and $scope.watchProperty is falsy', falsyWatchTest);
            it('should be selected when focused and $scope.watchProperty is truthy', truthyWatchTest);
            it('should not be selected when not focused and $scope.watchProperty is truthy', notFocusedWatchTest);
        });

        function watchBeforeEach() {
            $scope.watchProperty = 'autoselect';
            $scope.autoselect = false;
            compile();
        }

        function falsyWatchTest() {
            dom.focus();
            expect(dom.select).not.toHaveBeenCalled();
        }

        function truthyWatchTest() {
            $scope.autoselect = true;
            $scope.$digest();
            dom.focus();
            expect(dom.select).toHaveBeenCalled();
        }

        function notFocusedWatchTest() {
            $scope.autoselect = true;
            $scope.$digest();
            expect(dom.select).not.toHaveBeenCalled();
        }
    });
})();
