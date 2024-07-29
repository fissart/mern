const notesww = {};

const Note = require("../models/chat.model");

notesww.getUu = async (req, res) => {
  const notes = await Note.find().limit(10);
  console.log(notes)
  res.json(notes);
}; 

notesww.createU = async (req, res) => {
  const { name, message } = req.body;
  const newNote = new Note({
    nombre:name,
    mensaje:message,
  });
  //console.log(req.body);
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
  const { passw, nombre, email, tipo, foto } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    passw,
    nombre,
    email,
    tipo,
    foto,
  });
  res.json("Note Updated");
};

module.exports = notesww;
