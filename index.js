module.exports = process.env.TEST_COV ?
  require("./lib-cov/senf") :
  require("./lib/senf");
