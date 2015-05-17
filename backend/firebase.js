var firebaseAddress = "https://marcin-tests.firebaseio.com/builds";
var Firebase = require("firebase");

function FirebaseFacade() {
    this.ref = new Firebase(firebaseAddress);
}

FirebaseFacade.prototype.set = function (data) {
    this.ref.set(data);
};

FirebaseFacade.prototype.get = function (data) {
    this.ref.once("value", data);
};

module.exports = FirebaseFacade;