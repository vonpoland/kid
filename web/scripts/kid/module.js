(function (ng) {
    'use strict';

    ng.module('kid', [])
        .directive("kidSay", ['KidService', function (KidService) {
            return {
                link: function (scope, element) {
                    KidService.setSound(function (text) {
                        element.attr("src", "https://translate.google.pl/translate_tts?ie=UTF-8&q=" + text +
                        '&tl=pl&total=1&idx=0&textlen=' + text.length + '&client=t&prev=input');
                        element[0].play();
                    })
                }
            }
        }])
        .service('KidService', [function () {
            var texts = [];
            var isSaying = false;
            var playSoundFn;

            function say() {
                var text = texts.pop();

                if(playSoundFn == null) {
                    console.info(text);
                    return;
                }

                playSoundFn(text);
            }

            this.say = function (text) {
                texts.push(text);
                say();
            };

            this.setSound = function (soundFn) {
                playSoundFn = soundFn;
            }
        }]);
}(window.angular));