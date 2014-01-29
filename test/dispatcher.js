"use strict";

/* Tests for the dispatcher. */

var Dispatcher = require("../").Dispatcher;
require("should");


describe("Dispatcher", function testDispatcher() {
  describe("dispatching nicely formed messages", function correctMsg() {
    /* A nicely formed message is an object with the field "cmd" like:
     * {cmd: "playBall"}
     */
    it("emits message via given command", function emitMsg(done) {
      var dispatcher = new Dispatcher();
      var content = {cmd: "playBall"};
      dispatcher.emit("message", content);
      dispatcher.on("playBall", function knownMsg() {
        done();
      });
    });
  });

  describe("dispatching badly formed messages", function badMsg() {
    /* The dispatcher needs to know the cmd to dispatch the message. If he
     * doesn't, he emits "unknown" with the given message
     */
    it("emits unknown when without 'cmd'", function emitUnknown(done) {
      var dispatcher = new Dispatcher();
      var content = "bla";
      dispatcher.emit("message", content);
      dispatcher.on("unknown", function unknownMsg(msg) {
        msg.should.eql(content);
        done();
      });
    });

    /* The 'cmd' has to be a string */
    it("emits unknown when 'cmd' isn't string", function emitUnknown(done) {
      var dispatcher = new Dispatcher();
      var content = {cmd: 23};
      dispatcher.emit("message", content);
      dispatcher.on("unknown", function unknownMsg(msg) {
        msg.should.eql(content);
        done();
      });
    });
  });
});
