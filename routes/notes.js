var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const { Notes } = require("../models");

/* GET notes page. */
// router.get("/", function (req, res, next) {
//   res.send("Hello tested again");
// });

// COPY
// router.get("/env", function (req, res, next) {
//   res.send(process.env.APP_NAME);
// });

// GET
// all data
router.get("/", async (req, res, next) => {
  const notes = await Notes.findAll();
  return res.json({
    status: 200,
    message: "Success get all data",
    data: notes,
  });
});

// GET DATA BY ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  // check id in table note db
  let note = await Notes.findByPk(id);
  if (!note) {
    return res.status(404).json({ status: 404, message: "Data not found" });
  } else {
    return res.json({ status: 200, message: "Success get data", data: notes });
  }
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

// PUT
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  let note = await Notes.findByPk(id);
  // misal id tidak ditemukan
  if (!note) {
    return res.status(404).json({ status: 404, message: "Data not found" });
  }
  // validasi
  const schema = {
    title: "string|optional",
    description: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  // proses update
  note = await note.update(req.body);
  res.json({
    status: 200,
    message: "Success update data",
    data: note,
  });
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  // check id in table note
  let note = await Notes.findByPk(id);
  if (!note) {
    return res.status(404).json({ status: 404, message: "Data not found" });
  }

  // proses delete data
  await note.destroy();
  res.json({
    status: 200,
    message: "Success delete data",
  });
});

module.exports = router;
