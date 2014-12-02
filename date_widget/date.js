/**
 * Created by Kadir on 21.11.2014.
 */

ExampleApp.directive('exWidget3', ['MetadataService', function(MetadataService) {

    return {
        restrict: 'AE',
        templateUrl: 'date_widget/date.html',
        scope: {},
        link: function(scope, element, attrs) {

            scope.available_from = "";
            scope.available_to = "";
            scope.span_visible = false;

            //  @review(ms) nope that should be avoided
            // as this may trigger init more than once

            scope.$on('init', function() {
                scope.data = MetadataService.getData();
                // @review(ms)  in my opinion this should be done within the Metadataservice
                // as this might be informative for all widgets
                scope.dimDateFrom = scope.data.dimension(function(d){return parseDate(d.extras["temporal_coverage-from"]);});
                scope.dimDateTo = scope.data.dimension(function(d){return parseDate(d.extras["temporal_coverage-to"]);});

                // @review(ms)  please use angular.element()
                // and no ids because this directive could be used more than once
                // also this should be made via watcher see search widget
                //initialize keyup event
                $("#w3_date").keyup(function (e) {
                    if (e.keyCode == 13){
                        var value = $('#w3_date').val();
                        scope.updateDimension(value);
                    }
                });
            });

            // @review(ms)value should be a scope attribute see search widget
            scope.updateDimension = function(value)
            {
                if (value === undefined || value === ""){

                    // @review(ms) again this should be in the Metadatasevice
                    scope.dimDateFrom.filterAll();
                    scope.dimDateTo.filterAll();
                }
                else{
                    var passedDate = parseDate(value);
                    // @review(ms) again this should be in the Metadatasevice
                    scope.dimDateFrom.filter(function(d){return d <= passedDate});
                    scope.dimDateTo.filter(function(d){return passedDate <= d});
                }
                // @review(ms) as the above code should be in the
                MetadataService.triggerUpdate();
            }

            scope.$on('filterChanged', function() {
                scope.span_visible = MetadataService.length() > 0;
                if(scope.span_visible)//only do this if there are values to extract
                {
                    scope.available_from = scope.dimDateFrom.bottom(1)[0].extras["temporal_coverage-from"];
                    scope.available_to = scope.dimDateTo.top(1)[0].extras["temporal_coverage-to"];
                }
                // @review(ms) that is bad code in general an $apply should not be needed
                scope.$apply();
            });
        }
    };
}]);
