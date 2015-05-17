(function (ng) {
    'use strict';

    ng.module('monitor')
        .service('BuildCheckService', ['KidService', function (KidService) {
            var config = {};
            var builds = {};

            function checkBuilds(newBuilds) {
                if (!newBuilds || !newBuilds.jobs) {
                    return;
                }

                newBuilds.jobs.forEach(function (job) {
                    if (job.lastStatus === "red" && job.newStatus === "blue") {
                        console.info('Bilt ' + job.jobName + ' został naprawiony');
                        KidService.say('Bilt ' + job.jobName + ' został naprawiony');
                    } else {
                        console.info('Bilt ' + job.jobName + ' zepsuł się');
                        KidService.say('Bilt ' + job.jobName + ' zepsuł się');
                    }
                })
            }

            this.setConfig = function (newConfig) {
                config = newConfig;
            };

            this.setBuilds = function (newBuilds) {
                checkBuilds(newBuilds);
                builds = newBuilds;
            }
        }]);
}(window.angular));