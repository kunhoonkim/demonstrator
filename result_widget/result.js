

ExampleApp.directive('exWidget2', ['MetadataService', function(MetadataService) {

    return {
        restrict: 'AE',
        templateUrl: 'result_widget/result.html',
        scope: {},
        link: function(scope, element, attrs) {
            scope.crossData = [];
            scope.entries = [];
            scope.length = 0;

            // @review(ms) see date widget
            scope.$on('init', function() {
                var data = MetadataService.getData();
                // @review(ms) see date widget
                // I know it's possible to set attributes without declaring them but that
                // is bad coding
                scope.dimOne = data.dimension(function(d){return d;});
                scope.all = data.groupAll();
            });

            scope.$on('filterChanged', function() {
                scope.entries = scope.dimOne.top(Infinity);
                scope.length = scope.all.value();

                // @review(ms) see date widget
                scope.$apply();
            });
        }
    };
}]);
