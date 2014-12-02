var ExampleApp = angular.module('ExampleApp', []);

ExampleApp.controller('ExampleMainController',["$scope", function ($scope) {
}]);

ExampleApp.service('MetadataService',["$rootScope", "$location", "$http", function($rootScope, $location, $http){

    this.init = function() {
        //@review(ms) not really needed
        var self = this;
        console.log("loading data");

        // @review(ms)  ajax is solved via $http service
        // to include a service you have to DI it in the service declaration
        // better would be something like
        /*
         $http({
            method: 'JSONP', // alternative method: 'GET',
            url: "assets/dist/data.json"
         }).success(function(data) {
            crossData = crossfilter(data);
            all = crossData.groupAll();
            $rootScope.$broadcast('filterChanged');
         }).error(function(data) {
            console.log("Request failed");
         });
         */



        $.getJSON("assets/dist/data.json", function(data){
            console.log("loaded data.json");
            self.crossData = crossfilter(data);
            self.all = self.crossData.groupAll();
            $rootScope.$broadcast('init');
            $rootScope.$broadcast('filterChanged');
        });
    }
    this.init();

    this.getData = function(){
        return this.crossData;
    }

    this.triggerUpdate = function() {
        $rootScope.$broadcast('filterChanged');
    }

    this.length = function()
    {
        return this.all.value();
    }

}]);

// @review(ms)  this should be a extra js file just to make the context clear
function parseDate(input) {
    if(input == undefined)
        return;
    var parts = input.split('-');
    return new Date(parts[0], parts[1], parts[2]); // Note: months are 0-based
}
