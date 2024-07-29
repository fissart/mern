const notesww = {};

const Note = require("../models/category.model");
const Curse = require("../models/curse.model");

notesww.getUu = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const id = ObjectId(req.params.iduser);
  const user = ObjectId(id);
  const curseshow = req.params.true;
  console.log(req.params.true, req.params.iduser, "www")
  const Curses = await Note.aggregate([
    {
      $match: {
        _id: user,
      },
    },
    {
      $lookup: {
        from: "curses",
        let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$user", "$$www"] }, { $eq: ["$show", curseshow] },] } } },
          {
            $lookup: {
              from: "integers",
              let: { curse: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$curse", "$$curse"] } } }
              ],
              as: "integers",
            },

          },
        ],
        as: "curses",
      },
    },
  ]);
  console.log("Curses")
  //const Curses = await Curse.find();
  return res.json(Curses)
};

notesww.getCateg = async (req, res) => {
  console.log(req.params.categ);
  console.log(req.params.user);
  const { ObjectId } = require("mongodb");
  const curse = ObjectId(req.params.categ);
  const user = ObjectId(req.params.user);
  const notes = await Curse.aggregate([
    {
      $match: {
        _id: curse,
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
        as: "testchp",
      },
    },
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
        as: "taskchp",
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
                              {
                                $eq: ["$user", user],
                              },
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
              from: "tasks",
              let: { wrw: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$chapter", "$$wrw"] },
                        {
                          $eq: ["$user", user],
                        },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: "$chapter",
                    conteo: { $sum: 1 },
                    totalCalification: {
                      $sum: { $sum: ["$note", "$fee"] },
                    },
                    averageCalification: {
                      $avg: { $sum: ["$note", "$fee"] },
                    },
                  },
                },
              ],
              as: "resultasks",
            },
          },
        ],
        as: "capitulos",
      },
    },
    {
      $lookup: {
        from: "tasks",
        let: { wrw: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$curse", "$$wrw"] },
                  {
                    $eq: ["$user", user],
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: "$curse",
              conteo: { $sum: 1 },
              totalCalification: {
                $sum: { $sum: ["$note", "$fee"] },
              },
            },
          },
        ],
        as: "tasksavg",
      },
    },
    {
      $lookup: {
        from: "seccions",
        let: { wrw: "$_id" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$curse", "$$wrw"] } },
          },
          {
            $group: {
              _id: "$curse",
              n: { $sum: 1 },
            },
          },
        ],
        as: "nsec",
      },
    },
    {
      $lookup: {
        from: "chapters",
        let: { wwwzz: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$curse", "$$wwwzz"] } } },
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
                        {
                          $eq: ["$user", user],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "testresp",
            },
          },
        ],
        as: "chptests",
      },
    },
    {
      $lookup: {
        from: "testresps",
        let: { wrw: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$curse", "$$wrw"] },
                  {
                    $eq: ["$user", user],
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: "$curse",
              conteo: { $sum: 1 },
              totalCalification: {
                $sum: { $sum: ["$note", "$fee"] },
              },
            },
          },
        ],
        as: "testsavg",
      },
    },
    {
      $lookup: {
        from: "testresps",
        let: { wrw: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$curse", "$$wrw"] }, { $eq: ["$user", user] }],
              },
            },
          },
          {
            $group: {
              _id: "$identificadortema",
              conteo: { $sum: 1 },
              totalCalification: {
                $sum: { $sum: ["$calification", "$fee"] },
              },
              averageCalification: {
                $avg: { $sum: ["$calification", "$fee"] },
              },
            },
          },
        ],
        as: "testsavg",
      },
    },
    {
      $lookup: {
        from: "themes",
        let: { wwwzz: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$curse", "$$wwwzz"] } } },
          {
            $lookup: {
              from: "c1",
              let: { wwz: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$identificadortema", "$$wwz"] },
                        {
                          $eq: ["$user", user],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "comments",
            },
          },
          {
            $lookup: {
              from: "c1",
              let: { wrw: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$identificadortema", "$$wrw"] },
                        {
                          $eq: ["$user", user],
                        },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: "$identificadortema",
                    conteo: { $sum: 1 },
                    totalCalification: {
                      $sum: { $sum: ["$calification", "$fee"] },
                    },
                    averageCalification: {
                      $avg: { $sum: ["$calification", "$fee"] },
                    },
                  },
                },
              ],
              as: "resulthemes",
            },
          },
        ],
        as: "themes",
      },
    },
    {
      $lookup: {
        from: "c1",
        let: { wrw: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$curse", "$$wrw"] },
                  {
                    $eq: ["$user", user],
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: "$curse",
              conteo: { $sum: 1 },
              totalCalification: {
                $sum: { $sum: ["$calification", "$fee"] },
              },
            },
          },
        ],
        as: "commentsavg",
      },
    },
    {
      $lookup: {
        from: "c1",
        let: { wrw: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$curse", "$$wrw"] },
                  {
                    $eq: ["$user", user],
                  },
                ],
              },
            },
          },

          {
            $group: {
              _id: "$curse",
              n: { $sum: 1 },
            },
          },
        ],
        as: "ncomment",
      },
    },
  ]);

  res.json(notes);
};
notesww.createU = async (req, res) => {
  const { nombre, contenido } = req.body;
  const newNote = new Note({
    nombre,
    contenido,
  });
  console.log(newNote);
  await newNote.save();
  res.json("New Note added");
};

notesww.getU = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

notesww.deleteU = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json("Note Deleted");
};

notesww.updateU = async (req, res) => {
  //  const { title, content, duration, date, author } = req.body;
  const { nombre, contenido } = req.body;
  // console.log(req.body);
  // console.log(req.params.id);
  await Note.findByIdAndUpdate(req.params.id, {
    nombre,
    contenido,
  });
  res.json("Note Updated");
};

module.exports = notesww;
