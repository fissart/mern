const notesww = {};

const Note = require("../models/chapter.model");
const Sec = require("../models/seccion.model");
const Category = require("../models/curse.model");

notesww.getC = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

notesww.createC = async (req, res) => {
  const {
    curse,
    nombre,
    contenido,
    test,
    fechaexa,
    timexa,
  } = req.body;
  const newNote = new Note({
    curse,
    nombre,
    contenido,
    test,
    fechaexa,
    timexa,
  });
  await newNote.save();
  res.json("New Note added");
};

notesww.getCc = async (req, res) => {
  console.log(req.params.id);
  const note = await Note.findById(req.params.id);
  res.json(note);
};
notesww.getCC = async (req, res) => {
  console.log(req.params.categ);
  console.log(req.params.user);
  const { ObjectId } = require("mongodb");
  const curse = ObjectId(req.params.categ);
  const user = ObjectId(req.params.user);
  const notes = await Category.aggregate([
    {
      $match: {
        _id: curse,
      },
    },
    {
      $lookup: {
        from: "chapters",
        let: { ww: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$curse", "$$ww"] } } },
          {
            $lookup: {
              from: "seccions",
              let: { www: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$chapter", "$$www"] } } },
                {
                  $lookup: {
                    from: "tasks",
                    let: { wwz: "$_id" },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              { $eq: ["$section", "$$wwz"] },
                              { $eq: ["$user", user] },
                            ],
                          },
                        },
                      },
                    ],
                    as: "tasks",
                  },
                },
              ],
              as: "sec",
            },
          },
          {
            $lookup: {
              from: "testresps",
              let: { wwz: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$foreign", "$$wwz"] },
                        { $eq: ["$user", user] },
                      ],
                    },
                  },
                },
              ],
              as: "testresp",
            },
          },
          {
            $lookup: {
              from: "tests",
              let: { wwwz: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$foreign", "$$wwwz"] } } },
              ],
              as: "tests",
            },
          },
        ],
        as: "capitulos",
      },
    },
    {
      $lookup: {
        from: "tests",
        let: { wwwzz: "$_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$foreign", "$$wwwzz"] } } }],
        as: "testschp",
      },
    },
    {
      $lookup: {
        from: "testresps",
        let: { wwwzz: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$foreign", "$$wwwzz"] },
                  { $eq: ["$user", user] },
                ],
              },
            },
          },
        ],
        as: "testrespschp",
      },
    },
    {
      $lookup: {
        from: "tasks",
        let: { ww: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$chapter", "$$ww"] }, { $eq: ["$user", user] }],
              },
            },
          },
        ],
        as: "tasksend",
      },
    },
  ]);
  res.json(notes);
};

notesww.deleteC = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  console.log("object");
  const { ObjectId } = require("mongodb");
  const _id = ObjectId(req.params.id);
  await Sec.remove({ chapter: _id });

  res.json("Note Deleted");
};

notesww.updateC = async (req, res) => {
  //  const { title, content, duration, date, author } = req.body;
  const {
    category,
    curse,
    timexa,
    nombre,
    contenido,
    test,
    fechaexa,
  } = req.body;
  console.log(req.body);
  console.log(req.params.id);
  await Note.findByIdAndUpdate(req.params.id, {
    category,
    curse,
    fechaexa,
    nombre,
    contenido,
    test,
    timexa,
  });
  res.json("Note Updated");
};

module.exports = notesww;
