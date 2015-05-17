"use strict";

var jenkinsMonitor = require("./backend/jenkinsMonitor");
var express = require("express");
var tts = require("./backend/tts");
var app = express();

app.use(express.static("web"));
app.get("/text/:text", function(req, res) {
    tts.processText(req.params.text, function(err, data) {
        if(err) {
            res.end();

            return;
        }

        var fs = require('fs');

        fs.writeFile("./test.wav", data, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        res.contentType('audio/mpeg');
        res.end(data, 'binary');
    })
});
app.listen(8080);
jenkinsMonitor.start();