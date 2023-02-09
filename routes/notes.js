var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const { Notes } = require("../models");

/* GET notes page. */
router.get("/", function (req, res, next) {
  res.send("Hello tested again");
});

// COPY
router.get("/env", function (req, res, next) {
  res.send(process.env.APP_NAME);
});

// POST
router.post("/", async (req, res, next) => {
  // validasi
  const schema = {
    title: "string",
    description: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  // proses create
  const note = await Notes.create(req.body);
  res.json({
    status: 200,
    message: "Success create data",
    data: note,
  });
});

module.exports = router;
