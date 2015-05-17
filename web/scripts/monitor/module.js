(function (ng) {
    'use strict';

    ng.module('monitor', ['firebase', 'kid'])
        .constant("FirebaseConfig", {
            configuration: "https://marcin-tests.firebaseio.com/configuration",
            builds: "https://marcin-tests.firebaseio.com/builds"
        })
}(window.angular));