/**
 * Created by Kadir on 21.11.2014.
 */

ExampleApp.directive('exWidget1', ['MetadataService', function(MetadataService) {

    return {
        restrict: 'AE',
        templateUrl: 'widget1/widget1.html',
        scope: {},
        link: function(scope, element, attrs) {

            scope.$on('init', function() {
                scope.data = MetadataService.getData();
                scope.dimName = scope.data.dimension(function(d){return d.name;});

                //initialize keyup event
                $("#w1_search_field").keyup(function (e) {
                    if (e.keyCode == 13) {
                        var value = $('#w1_search_field').val();
                        scope.updateDimension(value);
                    }
                });
            });

            scope.updateDimension = function(value)
            {
                scope.dimName.filterAll();
                scope.dimName.filter(function(d){return d.indexOf(value) > -1;});
                MetadataService.triggerUpdate();
            }

            scope.$on('filterChanged', function() {
            });
        }
    };
}]);
