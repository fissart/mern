const task = {};
const TasK = require("../models/task.model");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "ciencias",
  api_key: "665428354914471",
  api_secret: "CqE6dC0WTex8bs_KZPh_UpnlLhU",
});

const fs = require("fs");

task.create = async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  const section = req.body.idsec;
  const chapter = req.body.chapter;
  const curse = req.body.curse;
  const content = req.body.contenido;
  const user = req.body.user;
  const note = "";
  if (req.files) {
    const myFile = req.files.archivo;

    myFile.mv(
      `files/tasks/${req.body.user + "_" + req.body.idsec + "_" + myFile.name}`
    );
    const file = req.body.user + "_" + req.body.idsec + "_" + myFile.name;
    const imageStr = "C:Users979PicturesProyectos de video";
    const uploadedResponse = cloudinary.uploader
      .upload(imageStr, { upload_preset: "user" })
      .then((uploadedResponse) => console.log(uploadedResponse))
      .catch((err) => console.log("error"));

    const newNote = new TasK({
      user,
      file,
      section,
      chapter,
      curse,
      content,
      note,
    });
    await newNote.save();
  } else {
    //const file = req.body.user + "_" + req.body.idsec + "_" + myFile.name;
    const section = req.body.idsec;
    const chapter = req.body.chapter;
    const content = req.body.contenido;
    const user = req.body.user;
    const note = "";
    const file = "";
    const newNote = new TasK({
      user,
      curse,
      section,
      chapter,
      content,
      note,
      file,
    });
    await newNote.save();
  }

  res.json("New Note added");
};

task.gett = async (req, res) => {
  // console.log(req.params.chap);
  // console.log(req.params.sec);
  // console.log(req.params.user);
  const notes = await TasK.find({
    user: req.params.user,
    section: req.params.sec,
    chapter: req.params.chap,
  });
  res.json(notes);
};
task.get = async (req, res) => {
  const notes = await TasK.find({
    _id: req.params.id,
  });
  res.json(notes);
};

task.createS = async (req, res) => {
  const {
    category,
    curse,
    chapter,
    nombre,
    contenido,
    tarea,
    fechaexa,
  } = req.body;
  const newNote = new TasK({
    category,
    curse,
    chapter,
    nombre,
    contenido,
    tarea,
    fechaexa,
  });
  console.log(newNote);
  await newNote.save();
  res.json("New TasK added");
};

task.getSs = async (req, res) => {
  const note = await TasK.findById(req.params.id);
  res.json(note);
};
task.getSSW = async (req, res) => {
  const note = await TasK.find({
    chapter: req.params.chap,
  });
  res.json(note);
};

task.deleteS = async (req, res) => {
  const note = await TasK.findById(req.params.id);
  const file = note.file;
  try {
    fs.unlinkSync("files/tasks/" + file);
  } catch (err) {
    console.error(err);
  }
  await TasK.findByIdAndDelete(req.params.id);
  res.json("Note Deleted");
};

task.updateS = async (req, res) => {
  // console.log(req.files);
  // console.log(req.body);
  //console.log(req.files.archivo.size);

  if (req.files) {
    const note = await TasK.findById(req.params.id);
    const file = note.file;
    try {
      fs.unlinkSync("files/tasks/" + file);
    } catch (err) {
      console.error(err);
    }
    const myFile = req.files.archivo;
    myFile.mv(
      `files/tasks/${req.body.user + "_" + req.body.idsec + "_" + myFile.name}`
    );
    const nEw = {
      file: req.body.user + "_" + req.body.idsec + "_" + myFile.name,
      content: req.body.contenido,
    };
    await TasK.findByIdAndUpdate(req.params.id, nEw);
  } else {
    const nEw = {
      content: req.body.contenido,
      note: req.body.calification,
    };
    await TasK.findByIdAndUpdate(req.params.id, nEw);
  }

  res.json("Note Updated");
};

module.exports = task;
