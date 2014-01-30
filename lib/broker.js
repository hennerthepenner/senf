"use strict";

/* The broker converts strings (i.e. raw) to messages and sends them off to
 * the dispatcher.
 */

var Q = require("q");


function Broker(dispatcher) {
  this.dispatcher = dispatcher;
}
module.exports = Broker;

Broker.prototype.handleRawMessage = function(raw) {
  this.convert(raw)
      .done(this.dispatch.bind(this), this.logError.bind(this));
};

/* It converts only string containing valid json to javascript objects. Maybe
 * in the future we can add other types like bson or some other binary stuff
 */
Broker.prototype.convert = function(raw) {
  var deferred = Q.defer();
  try {
    var parsed = JSON.parse(raw);
    deferred.resolve(parsed);
  } catch(err) {
    deferred.reject(err);
  }
  return deferred.promise;
};

/* Send away the parsed message. */
Broker.prototype.dispatch = function(parsed) {
  this.dispatcher.emit("message", parsed);
};

Broker.prototype.logError = function(unparsable) {
  console.error(unparsable);
};
