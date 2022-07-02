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
  console.log(req.body);
  const {
    chapter,
    nombre,
    contenido,
    tarea,
    fechaexa,
  } = req.body;
  const newNote = new Note({
    chapter,
    nombre,
    contenido,
    tarea,
    fechaexa,
  });
  console.log(newNote);
  await newNote.save();
  res.json("New Note added");
};

notesww.getSs = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};
notesww.getSS = async (req, res) => {
  const note = await Note.find({
    chapter: req.params.chap,
  });
  res.json(note);
};
notesww.deleteS = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json("Note Deleted");
};

notesww.updateS = async (req, res) => {
  //  const { title, content, duration, date, author } = req.body;
  const { category,
    curse,
    chapter,
    nombre,
    contenido,
    tarea,
    fechaexa} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    category,
    curse,
    chapter,
    nombre,
    contenido,
    tarea,
    fechaexa,
  });
  res.json("Note Updated");
};

notesww.updateSfromStudent = async (req, res) => {
  //  const { title, content, duration, date, author } = req.body;
  const { contenido } = req.body;
  console.log(req.body);
  await Note.findByIdAndUpdate(req.params.id, {
    contenido,
  });
  res.json("Note Updated");
};

module.exports = notesww;
