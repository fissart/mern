const notesww = {};

const Note = require("../models/chat.model");
const Average = require("../models/c2.model");
const Cursesource = require("../models/c3.model");


notesww.getUwww = async (req, res) => {
  const { ciclo, mencion, year } = req.params;
  // console.log(ciclo, mencion, year)
  const order = await Average.aggregate([
    {
      $match: {
        $and: [
          { ciclo: ciclo },
          { mencion: mencion },
          { year: year }
        ]
      },
    },
    {
      $group: {
        _id: "$user",
        notas: { $sum: 1 },
        mencion: { $first: '$mencion' },
        sumacreditos: { "$sum": { $multiply: [1, { $toInt: '$credito' }] } },
        sumanotas: { "$sum": { $multiply: [1, { $toInt: '$nota' }] } },
        total: { "$sum": { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },
        records: { $push: "$$ROOT" }
      }
    },
    {
      $lookup: {
        from: "users", let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }] } } },
        ],
        as: "usser"
      }
    },
  ]).collation({ locale: 'es' }).sort({ "usser.name": 1 })
  /////////////////////////////////////////////////////////////////////////////////////
  //console.log(order)

  const orderTEACHER = await Average.aggregate([
    {
      $match: {
        $and: [
          { ciclo: ciclo },
          { mencion: mencion },
          { year: year }
        ]
      },
    },
    {
      $group: {
        _id: "$teacher",
        rol: { $first: '$uSSer.rol' },
        cursos: { $sum: 1 },
        Puntaje: { $sum: { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },
      }
    },
    {
      $lookup: {
        from: "users",
        let: { id: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$id"] }] } }, },
          { $project: { _id: 1, name: 1, dni: 1, rol: 1 } }
        ],
        as: "uSSer"
      }
    },
    { $sort: { "uSSer.name": 1 } }
  ]);




  ///////////////////////////////////////////////////////////////////////////
  const ordercurses = await Cursesource.aggregate([
    {
      $match: {
        $and: [
          { ciclo: ciclo },
          { mencion: mencion }
        ]
      }
    }
  ])

  //////////////////////////////////////////////////////////////////////////////////

  return res.json({
    order,
    orderTEACHER,
    ordercurses
  }
  )
}


notesww.getUu = async (req, res) => {
  const notes = await Note.find().limit(10);
  // req.app.io.on("connection", (socket) => {
  //   console.log("User", socket.id)
  //   socket.on("disconnect", () => {
  //     console.log("left connección")
  //   })

  // })
  console.log(notes)
  res.json(notes);
};

notesww.createU = async (req, res) => {
  const { user, name, message } = req.body
  console.log(req.body)
  if (req.files) {
    const myFile = req.files.foto
    myFile.mv(`files/link/${req.params.id + "_" + myFile.name}`)
  }
  const newNote = new Note({
    nombre: name,
    user: user,
    mensaje: message,
  })
  try {
    // nonExistentFunction();
    await newNote.save()
  } catch (error) {
    console.error(error);
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
  }  // console.log(req)
  // req.app.io.sockets.emit('update', newNote)
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
  console.log(req.body, "www")
  const { name, message, user } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    name,
    user,
    mensaje: message,
  });
  res.json("Note Updated");
};

module.exports = notesww;
