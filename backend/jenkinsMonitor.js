var FirebaseFacade = require("./firebase");
var _ = require("lodash");
var http = require("http");
var firebaseFacade = new FirebaseFacade();
var jenkins = {
    hostname: "ruszt",
    port: 8080,
    path: "api/json",
    interval: 5000
};

var lastJenkins = {};

function toMap(data, key) {
    return _.reduce(data, function (map, object) {
        var keyValue = object[key];

        map[keyValue] = {
            url: object.url,
            color: object.color
        };

        return map;
    }, {});
}

function check(lastConfig, newConfig) {
    if (!lastConfig || !newConfig) {
        return;
    }

    console.info("CHANGE DETECTED");

    var difference = [];
    var newJobs = toMap(newConfig.jobs, "name");
    var lastJobs = toMap(lastConfig.jobs, "name");

    Object.keys(newJobs).forEach(function (key) {
        if (!newJobs[key] || !lastJobs[key]) {
            return;
        }

        var newStatus = newJobs[key].color;
        var oldStatus = lastJobs[key].color;

        if (newStatus !== oldStatus) {
            difference.push({
                jobName: key,
                lastStatus: oldStatus,
                newStatus: newStatus,
                date: new Date()
            });
        }
    });

    return difference.length ? difference : null;
}

function compareJenkins(jenkins) {
    console.info("COMPARING JENKINS");
    if (JSON.stringify(lastJenkins) !== jenkins) {
        var newConfig = JSON.parse(jenkins);
        var difference = check(lastJenkins, newConfig);
        lastJenkins = newConfig;

        if (difference) {
            console.info("Setting diferrence to firebase", difference);
            firebaseFacade.set({
                jobs: difference
            });
        }
    }
}

function checkJenkins() {
    var request = http.get({
        hostname: jenkins.hostname,
        path: "/api/json",
        method: "GET",
        port: jenkins.port
    }, function (response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            compareJenkins(str);
            setTimeout(checkJenkins, jenkins.interval)
        });
    });

    request.on('error', function (err) {
        console.info(err);
        setTimeout(checkJenkins, 5000);
    })
}

exports.start = checkJenkins;