const notesww = {};
/*
var express = require('express');
var app = express();
const multer = require('multer')
var cors = require('cors');

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, '../files')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})
const upload = multer({ storage: storage }).single('file')
*/

const TasK = require("../models/task.model");
const Note = require("../models/seccion.model");

notesww.file = async (req, res) => {
  const file = req.files.filesww.name;
  const section = req.body.idsec;
  const contenido = req.body.contenido;

  const newNote = new Note({
    file,
    section,
    contenido,
  });
  //  console.log(newNote);
  await newNote.save();
  res.json("New Note added");

  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files.filesww;

  //  mv() method places the file inside public directory
  myFile.mv(`files/images/${myFile.name}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });

};


notesww.getS = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

notesww.createS = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const ifdata = await Note.find({ idtheme: req.body.idtheme, curse: ObjectId(req.body.curse) })
  console.log(ifdata, req.body.curse, req.body.idtheme, "req.body.curse");
  if (ifdata.length > 0) {
    res.json("New Note Not added");
  } else {
    const newNote = new Note(req.body)
    await newNote.save();
    res.json("New Note added")
  }
};

notesww.getSs = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const cursse = ObjectId(req.params.id);
  const usser = ObjectId(req.params.iduser);
  const curssse = req.params.curssse
  // console.log(curssse, cursse)
  const Curses = await Note.aggregate([
    {
      $match: {
        curse: cursse,
        idtheme: curssse,
      },
    },
    {
      $lookup: {
        from: "tasks", let: { usser: "$user", www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$user", "$$usser"] }, { $eq: ["$theme", "$$www"] }] } } },
        ],
        as: "tassks"
      }
    },
    {
      $lookup: {
        from: "tasks", let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$user", usser] }, { $eq: ["$theme", "$$www"] }] } } },
        ],
        as: "tasskstd"
      }
    }
  ]);
  // console.log(Curses)
  // //const Curses = await Curse.find();
  return res.json(Curses);
};
notesww.getSS = async (req, res) => {
  const note = await Note.find({
    chapter: req.params.chap,
  });
  res.json(note);
};

notesww.deleteS = async (req, res) => {
  const { ObjectId } = require("mongodb");
  // const theme = ObjectId(req.params.id);
  console.log(req.params.id)
  await Note.findByIdAndDelete(req.params.id);
  await TasK.deleteMany({ theme: ObjectId(req.params.id) });
  res.json("Note Deleted");
};

notesww.updateS = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const theme = ObjectId(req.params.id);
  // console.log(req.body)
  // const { title, content, duration, date, author } = req.body;
  // const { title, description, dateb, datee } = req.body;
  await TasK.updateMany({ theme: theme }, { $set: { dateb: req.body.dateb, datee: req.body.datee } });
  await Note.findByIdAndUpdate(req.params.id, req.body);
  res.json("Nota actualizado");
};

notesww.updateSfromStudent = async (req, res) => {
  //  const { title, content, duration, date, author } = req.body;
  const { contenido } = req.body;
  // console.log(req.body);
  await Note.findByIdAndUpdate(req.params.id, {
    contenido,
  });
  res.json("Note Updated");
};

module.exports = notesww;
