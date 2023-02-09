var express = require("express");
var router = express.Router();

/* GET notes page. */
router.get("/", function (req, res, next) {
  res.send("Hello tested again");
});

// COPY
router.get("/env", function (req, res, next) {
  res.send(process.env.APP_NAME);
});

module.exports = router;
