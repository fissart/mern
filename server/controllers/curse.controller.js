const notesww = {};
const fs = require("fs");

const Curse = require("../models/curse.model");
const User = require("../models/auth.model");
const Link = require("../models/link.model");

notesww.getUu = async (req, res) => {
  const notes = await Curse.find();
  res.json(notes);
};

notesww.createU = async (req, res) => {
  const {
    category,
    nombre,
    contenido,
    tarea,
    test,
    fechaexamen,
    fechatarea,
    timexa,
  } = req.body;
  const newNote = new Curse({
    category,
    nombre,
    contenido,
    tarea,
    test,
    fechaexamen,
    fechatarea,
    timexa,
  });
  console.log(newNote);
  await newNote.save();
  res.json("New Note added");
};

notesww.getU = async (req, res) => {
  const note = await Curse.findById(req.params.id);
  res.json(note);
};

notesww.getCURSOUser = async (req, res) => {
  req.io.on("wwwww", async (www) => {
    console.log("www2768")
  })
  const { ObjectId } = require("mongodb");
  const id = ObjectId(req.params.iduser);
  const user = ObjectId(id);
  const curseshow = req.params.true;
  console.log(req.params.true, req.params.iduser, "www")
  const Curses = await User.aggregate([
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
    {
      $lookup: {
        from: "integers",
        let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$user", "$$www"] }, { $eq: ["$show", curseshow] },] } } },
          {
            $lookup: {
              from: "curses",
              let: { curse: "$curse" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$curse"] } } }
              ],
              as: "cursse",
            },

          },
        ],
        as: "cursesstd",
      },
    },
  ])
  console.log("Curses")
  req.io.emit("www", { content: Curses })
  //const Curses = await Curse.find();

  return res.json(Curses)
  // return res.send({success: true})
};


notesww.getCURSOThemes = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const curse = ObjectId(req.params.id);
  const user = ObjectId(req.params.idw);
  //console.log(curse,user)
  const Curseuser = await Curse.aggregate([
    {
      $match: {
        _id: curse,
      },
    },
    {
      $lookup: {
        from: "sections",
        let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$curse", "$$www"] } } },
          {
            $lookup: {
              from: "themes",
              let: { www: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$unidad", "$$www"] } } },
                {
                  $lookup: {
                    from: "tasks",
                    let: { www: "$_id" },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              { $eq: ["$theme", "$$www"] },
                              {
                                $eq: ["$user", user],
                              },
                            ]
                          }
                        }
                      }
                    ],
                    as: "usertask",
                  },
                },
                {
                  $lookup: {
                    from: "tasks",
                    let: { www: "$_id", usser: "$user" },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              { $eq: ["$theme", "$$www"] },
                              {
                                $eq: ["$user", "$$usser"],
                              },
                            ]
                          }
                        }
                      }
                    ],
                    as: "usertaskteacher",
                  },
                }
              ],
              as: "temas",
            },
          },
        ],
        as: "unidades",
      },
    },
    {
      $lookup: {
        from: "sections",
        let: { www: "$codigo" },
        pipeline: [
          { $match: { $expr: { $eq: ["$codecurse", "$$www"] } } },
          {
            $lookup: {
              from: "themes",
              let: { www: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$unidad", "$$www"] } } },
              ],
              as: "temascopy",
            },
          },
        ],
        as: "unidadescopy",
      },
    },
    {
      $lookup: {
        from: "filecurses",
        let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$curse", "$$www"] } } },
        ],
        as: "archivos",
      },
    },
  ]);
  // console.log(Curseuser);
  return res.json(Curseuser);
}

notesww.getCURSOstd = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const id = ObjectId(req.params.id);
  const user = ObjectId(id)
  const integers = await Curse.aggregate([
    {
      $match: {
        $expr: { $and: [{ $eq: ["$user", user] }, { $eq: ["$show", "true"] }] }

      },
    },
    {
      $lookup: {
        from: "users",
        let: { www: "$userteach" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
        ],
        as: "userw",
      },
    },
    {
      $lookup: {
        from: "curses",
        let: { ww: "$curse" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$ww"] } } },
        ],
        as: "cursse",
      },
    },
  ]);
  console.log(integers);
  return res.json(integers);
}

notesww.getCURSOrefresh = async (req, res) => {
  const note = await Curse.find({
    _id: req.params.id,
    category: req.params.categ,
  });
  res.json(note);
};

notesww.deleteU = async (req, res) => {
  await Curse.findByIdAndDelete(req.params.id);
  res.json("Note Deleted");
};

notesww.updateU = async (req, res) => {
  if (req.files) {
    const note = await Curse.findById(req.params.id);
    const file = note.img;

    try { fs.unlinkSync("files/asignature/" + file); } catch (err) { console.error(err); }

    const myFile = req.files.foto;
    myFile.mv(`files/asignature/${req.params.id + "_" + myFile.name}`);
    const nEw = {
      img: req.params.id + "_" + myFile.name,
      title: req.body.title,
      description: req.body.description,
    };
    await Curse.findByIdAndUpdate(req.params.id, nEw);
  } else {
    const nEw = {
      title: req.body.title,
      description: req.body.description,
    };
    await Curse.findByIdAndUpdate(req.params.id, nEw);
  }

  res.json("Note Updated");
};

module.exports = notesww;
