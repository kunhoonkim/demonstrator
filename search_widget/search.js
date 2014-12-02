/**
 * Created by Kadir on 21.11.2014.
 */

ExampleApp.directive('exWidget1', ['MetadataService', function(MetadataService) {

    // @review(ms) I don't see the usage of this widget.
    // is this deprecated?
    return {
        restrict: 'AE',
        templateUrl: 'search_widget/search.html',
        scope: {},
        link: function(scope, element, attrs) {

            // @review(ms) better than the keyup method to trigger updateDimension
            scope.searchCriteria = '';
            // add to the input field data-ng-model="searchCriteria"

            // @review(ms) initialize a watcher that watches for changes on
            // the attribute searchCriteria bound to the input field as mentioned above
            scope.$watch('searchCriteria', function(val) {
                if(val != undefined) {
                    // @review(ms) as the value should be an attribute of scope
                    // we don't need to handle it via parameter
                    scope.updateDimension();
                }
            });


            // @review(ms) see date widget
            scope.$on('init', function() {
                scope.data = MetadataService.getData();
                // @review(ms) see date widget
                scope.dimName = scope.data.dimension(function(d){return d.title;});

                //initialize keyup event
                // t
                // @review(ms) key events are nice BUT this is the wrong place and wrong way

                $("#w1_search_field").keyup(function (e) {
                    var value = $('#w1_search_field').val();
                    scope.updateDimension(value);
                });
            });

            // @review(ms) value should be a scope attribute and so not be passed as parameter
            scope.updateDimension = function(value)
            {
                scope.dimName.filterAll();
                scope.dimName.filter(function(d) {
                    d = d.toLowerCase();
                    value = value.toLowerCase();
                    return d.indexOf(value) > -1;
                });
                MetadataService.triggerUpdate();
            }

            scope.$on('filterChanged', function() {
            });
        }
    };
}]);
