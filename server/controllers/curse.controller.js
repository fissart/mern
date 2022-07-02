const notesww = {};
const fs = require("fs");

const Curse = require("../models/curse.model");
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

notesww.getCURSO = async (req, res) => {
  const note = await Curse.find({
    category: req.params.id,
  });
  res.json(note);
};

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
  //  const { title, content, duration, date, author } = req.body;
  console.log(req.params.id);
  const {
    nombre,
    contenido,
    tarea,
    test,
    fechaexamen,
    fechatarea,
    timexa,
  } = req.body;
  console.log(req.body);
  await Curse.findByIdAndUpdate(req.params.id, {
    nombre,
    contenido,
    tarea,
    test,
    fechaexamen,
    fechatarea,
    timexa,
  });
  res.json("Note Updated");
};

module.exports = notesww;
