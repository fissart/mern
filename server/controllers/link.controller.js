const notesww = {};
const fs = require("fs");
const Link = require("../models/link.model");

notesww.getLink = async (req, res) => {
  const ww = await Link.find({
    curse: req.params.idcurso,
  }).sort({ _id: -1 })
  res.json(ww);
};

notesww.createLink = async (req, res) => {
  console.log(req.files);

  if (req.files) {
    const myFile = req.files.archivo;
    myFile.mv(`files/link/${req.body.curse + "_" + myFile.name}`);
    const newNote = new Link({
      file: req.body.curse + "_" + myFile.name,
      curse: req.body.curse,
      link: req.body.link,
      name: req.body.name,
      type: req.body.type,
    });
    await newNote.save();
  } else {
    const newNote = new Link({
      curse: req.body.curse,
      link: req.body.link,
      name: req.body.name,
      type: req.body.type,
    });
    await newNote.save();
  }

  res.json("notes");
};

notesww.getupdateLink = async (req, res) => {
  const note = await Link.find({
    _id: req.params.id,
  });
  res.json(note);
};

notesww.updateLink = async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  const { link, name } = req.body;
  console.log(req.params.id);

  if (req.files) {
    const note = await Link.findById(req.params.id);
    const file = note.file;
    try {
      fs.unlinkSync("files/link/" + file);
    } catch (err) {
      console.error(err);
    }
    const myFile = req.files.archivo;
    myFile.mv(`files/link/${req.body.curse + "_" + myFile.name}`);

    await Link.findByIdAndUpdate(req.params.id, {
      file: req.body.curse + "_" + myFile.name,
      link: req.body.link,
      name: req.body.name,
    });
  } else {
    const newNote = new Link({
      link: req.body.link,
      name: req.body.name,
    });
    await Link.findByIdAndUpdate(req.params.id, {
      link,
      name,
    });
  }


  res.json("notes");
};

notesww.deleteLink = async (req, res) => {
  const note = await Link.findById(req.params.id);
  const file = note.file;
  console.log(file);
  try {
    fs.unlinkSync("files/file/" + file);
  } catch (err) {
    console.error(err);
  }
  await Link.findByIdAndDelete(req.params.id);
  res.json("Note Deleted");
};

module.exports = notesww;
