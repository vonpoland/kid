(function (ng, Firebase) {
    'use strict';

    ng.module('monitor')
        .controller('monitorCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 'FirebaseConfig', 'BuildCheckService',
            function ($scope, $firebaseObject, $firebaseArray, FirebaseConfig, BuildCheckService) {
                $firebaseObject(new Firebase(FirebaseConfig.configuration)).$bindTo($scope, "configuration");
                $firebaseObject(new Firebase(FirebaseConfig.builds)).$bindTo($scope, "builds");

                $scope.$watch("configuration", function (data) {
                    if (typeof(data) !== "undefined") {
                        BuildCheckService.setConfig(data);
                    }
                });

                $scope.$watch("builds", function (data) {
                    if (typeof(data) !== "undefined") {
                        console.info(data);
                        BuildCheckService.setBuilds(data);
                    }
                })
            }]);
}(window.angular, window.Firebase));