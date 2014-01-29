"use strict";

/* The dispatcher is an event emitter that is fed by messages with a format
 * like {cmd: "playBall"} and dispatches those messages to others by using
 * the given cmd. E.g. {cmd: "playBall"} -> emit("playBall").
 */

var events = require("events");
var util = require("util");
var _ = require("lodash");


function Dispatcher() {
  events.EventEmitter.call(this);
  this.on("message", this.dispatch.bind(this));
}
util.inherits(Dispatcher, events.EventEmitter);
module.exports = Dispatcher;


Dispatcher.prototype.dispatch = function(message) {
  var self = this;

  // For messages without "cmd" (being string), re-emit them as "unknown"
  if(!message.hasOwnProperty("cmd") || !_.isString(message.cmd)) {
    setImmediate(function dispatchUnknown() {
      self.emit("unknown", message);
    });
    return;
  }

  setImmediate(function dispatchImmediate() {
    self.emit(message.cmd);
  });
};
