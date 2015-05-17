var tts = require('node-google-text-to-speech');

exports.processText = function (text, callback) {
    tts.translate('pl', text, function (result) {
        console.log(result);
        if (result.success) { //check for success
            callback(null, result.audio);
            console.info("response")
        } else {
            callback(result);
        }
    });
};