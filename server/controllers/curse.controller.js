const notesww = {};
const fs = require("fs");

const Curse = require("../models/curse.model");
const User = require("../models/auth.model");
const GenCurse = require("../models/mycurse.model");
const CurseSource = require("../models/cursesource.model");
const Seccion = require("../models/seccion.model");
const Average = require("../models/average.model");

notesww.getUu = async (req, res) => {
  const notes = await Curse.find();
  res.json(notes);
};

notesww.createU = async (req, res) => {
  const note = await Curse.find({ ciclo: req.body.ciclo, mencion: req.body.mencion, year: req.body.year, codigo: req.body.codigo, show: 'true' });
  if (note.length > 0) {
    res.json("Ya agregó el curso")
  } else {
    const newNote = new Curse(req.body);
    await newNote.save();
    res.json("Curso agregado correctamente");
  }
};

notesww.getU = async (req, res) => {
  const note = await Curse.findById(req.params.id);
  res.json(note);
};

notesww.getCURSOSources = async (req, res) => {
  var arraw = []
  if (req.params.ciclo === 'i') {
    var arraw = ['1', '3', '5', '7', '9']
  }
  else {
    var arraw = ['2', '4', '6', '8', '10']
  }
  console.log(req.params.mencion, req.params.ciclo, arraw);
  // const note = await CurseSource.find({ mencion: req.params.mencion, ciclo: { $in: arraw } });
  const note = await CurseSource.aggregate([
    {
      $match: {
        $and: [
          { mencion: req.params.mencion },
          { ciclo: { $in: arraw } },
        ]
      },
    },
    {
      $group: {
        _id: "$ciclo",
        notas: { $sum: 1 },
        mencion: { $first: '$mencion' },
        sumacreditos: { "$sum": { $multiply: [1, { $toInt: '$credito' }] } },
        sumanotas: { "$sum": { $multiply: [1, { $toInt: '$nota' }] } },
        total: { "$sum": { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },
        records: { $push: "$$ROOT" }
      }
    },
    { $sort: { "_id": 1 } },
  ]).collation({ locale: "es", numericOrdering: true })
  res.json(note);
};

notesww.getCURSOCulqui = async (req, res) => {
  const note = await Curse.aggregate([
    {
      $match: {
        type: req.params.type,
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userr: "$user" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$userr"] }] } } },
        ],
        as: "usser",
      },
    },
  ])
  // find({ type: req.params.type });
  // console.log(note, "wew");
  res.json(note);
};


notesww.CreateCURSOCulqui = async (req, res) => {
  const newNote = new Curse(req.body);
  console.log(newNote);
  await newNote.save();
  res.json("New Seccion added");
};

notesww.getGenerateCURSOCulqui = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const id = ObjectId(req.params.user);
  // const user = ObjectId(id);
  // const note = await GenCurse.find({ show: req.params.true, user: id });
  const Curses = await GenCurse.aggregate([
    {
      $match: {
        $expr: { $and: [{ $eq: ["$user", id] }, { $eq: ["$type", "cursos"] }] }
      },
    },
    {
      $lookup: {
        from: "curses",
        let: { www: "$curse" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }, { $eq: ["$show", req.params.true] },] } } },
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
  ])

  // console.log(Curses, "wew");
  res.json(Curses);
};

notesww.GenerateCURSOCulqui = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const id = ObjectId(req.body.curse);
  const user = ObjectId(req.body.user);
  const note = await GenCurse.find({ curse: id, user: user });
  if (note.length > 0) {
    res.json("Ya tiene agregado este curso");
  } else {
    const newNote = new GenCurse(req.body);
    await newNote.save();
    res.json("New Seccion added");
  }
};

notesww.GenerateAverage = async (req, res) => {
  console.log(req.body)
  const newNote = new Average(req.body);
  await newNote.save();
  res.json("Calificación adicionada");
};

notesww.RemoveAverage = async (req, res) => {
  console.log("req.body")
  await Average.findByIdAndDelete(req.params.id);
  res.json("Seccion Deleted")
};

notesww.getCURSOUser = async (req, res) => {
  // req.io.on("wwwww", async (www) => {
  //   console.log("www2768")
  // })
  const { ObjectId } = require("mongodb");
  const id = ObjectId(req.params.iduser);
  const user = ObjectId(id);
  const curseshow = req.params.true;
  const source = req.params.source;
  // console.log(req.params.true, req.params.iduser, "www")
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

          { $match: { $expr: { $and: [{ $eq: ["$user", "$$www"] }, { $eq: ["$show", curseshow] }, { $eq: ["$type", source] }] } } },

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
  ])
  // console.log("Curses")
  // req.io.emit("www", { content: Curses })
  //const Curses = await Curse.find();

  return res.json(Curses)
  // return res.send({success: true})
};


notesww.getCURSOThemes = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const curse = ObjectId(req.params.id);
  const user = ObjectId(req.params.idw);
  console.log(curse, user)
  const Curseuser = await Curse.aggregate([
    {
      $match: {
        _id: curse,
      },
    },
    // {
    //   $lookup: {
    //     from: "sections",
    //     let: { www: "$_id" },
    //     pipeline: [
    //       { $match: { $expr: { $eq: ["$curse", "$$www"] } } },
    //       {
    //         $lookup: {
    //           from: "themes",
    //           let: { www: "$_id" },
    //           pipeline: [
    //             { $match: { $expr: { $eq: ["$unidad", "$$www"] } } },
    //             {
    //               $lookup: {
    //                 from: "tasks",
    //                 let: { www: "$_id" },
    //                 pipeline: [
    //                   {
    //                     $match: {
    //                       $expr: {
    //                         $and: [
    //                           { $eq: ["$theme", "$$www"] },
    //                           {
    //                             $eq: ["$user", user],
    //                           },
    //                         ]
    //                       }
    //                     }
    //                   }
    //                 ],
    //                 as: "usertask",
    //               },
    //             },
    //             {
    //               $lookup: {
    //                 from: "tasks",
    //                 let: { www: "$_id", usser: "$user" },
    //                 pipeline: [
    //                   {
    //                     $match: {
    //                       $expr: {
    //                         $and: [
    //                           { $eq: ["$theme", "$$www"] },
    //                           {
    //                             $eq: ["$user", "$$usser"],
    //                           },
    //                         ]
    //                       }
    //                     }
    //                   }
    //                 ],
    //                 as: "usertaskteacher",
    //               },
    //             }
    //           ],
    //           as: "temas",
    //         },
    //       },
    //     ],
    //     as: "unidades",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "sections",
    //     let: { www: "$codigo" },
    //     pipeline: [
    //       { $match: { $expr: { $eq: ["$codecurse", "$$www"] } } },
    //       {
    //         $lookup: {
    //           from: "themes",
    //           let: { www: "$_id" },
    //           pipeline: [
    //             { $match: { $expr: { $eq: ["$unidad", "$$www"] } } },
    //           ],
    //           as: "temascopy",
    //         },
    //       },
    //     ],
    //     as: "unidadescopy",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "filecurses",
    //     let: { www: "$_id" },
    //     pipeline: [
    //       { $match: { $expr: { $eq: ["$curse", "$$www"] } } },
    //     ],
    //     as: "archivos",
    //   },
    // },
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
  const note = await Curse.findById(req.params.id);
  const file = note.img;
  console.log(file)
  try { fs.unlinkSync("uploads/collections/" + file); }
  catch (err) {
    console.error(err)
  }

  await Curse.findByIdAndDelete(req.params.id);
  await Seccion.deleteMany({ curse: req.params.id });
  await GenCurse.deleteMany({ curse: req.params.id });
  res.json("Seccion Deleted");
};

notesww.deleteUGenerate = async (req, res) => {
  await GenCurse.findByIdAndDelete(req.params.id);
  res.json("Seccion Deleted");
};

notesww.updateU = async (req, res) => {
  console.log(req.body)
  const note = await Curse.findById(req.params.id);
  const file = note.img;
  if (req.file) { console.log(file); try { fs.unlinkSync("uploads/collections/" + file); } catch (err) { console.error(err); } }
  const myFile = req.file ? req.file.filename : file
  // await Link.findByIdAndUpdate(req.params.id, req.body)
  await Curse.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    img: myFile,
  });
  // await Curse.findByIdAndUpdate(req.params.id, data) //this from category
  // await Curse.findByIdAndUpdate(req.params.id, {units:req.body}) //this from curses
  // await Curse.findByIdAndUpdate(req.params.id, {units:req.body.units});
  // }


  res.json("Seccion Updated");
}

notesww.updateUcurse = async (req, res) => {
  console.log(req.body)

  await Curse.findByIdAndUpdate(req.params.id, req.body) //this from category
  // await Curse.findByIdAndUpdate(req.params.id, {units:req.body}) //this from curses
  // await Curse.findByIdAndUpdate(req.params.id, {units:req.body.units});
  // }


  res.json("Seccion Updated");
}


module.exports = notesww;
