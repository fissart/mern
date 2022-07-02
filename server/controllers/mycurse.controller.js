const curseadd = {};

const Curse = require("../models/mycurse.model");

curseadd.getUu = async (req, res) => {
  const notes = await Curse.find();
  res.json(notes);
};

curseadd.createU = async (req, res) => {
  const { curse, user } = req.body;
  const newNote = new Curse({
    curse,
    user,
  });
  console.log(newNote);
  await newNote.save();
  res.json("New Note added");
};

curseadd.getU = async (req, res) => {
  console.log(req.params.id);
  const { ObjectId } = require("mongodb");
  const curseid = ObjectId(req.params.id);
  const userid = ObjectId(req.params.user);
  const note = await Curse.find({ curse: curseid, user: userid });
  res.json(note);
};
curseadd.getNuser = async (req, res) => {
  console.log(req.params.user);
  const { ObjectId } = require("mongodb");
  const userid = ObjectId(req.params.user);
  const note = await Curse.find({ user: userid });
//  console.log(note);
  res.json(note);
};
curseadd.getCURSO = async (req, res) => {
  const note = await Curse.find({
    category: req.params.id,
  });
  res.json(note);
};

curseadd.getCURSOrefresh = async (req, res) => {
  const note = await Curse.find({
    _id: req.params.id,
    category: req.params.categ,
  });
  res.json(note);
};

curseadd.deleteU = async (req, res) => {
  await Curse.findByIdAndDelete(req.params.id);
  res.json("Note Deleted");
};

curseadd.updateU = async (req, res) => {
  //  const { title, content, duration, date, author } = req.body;
  const { category, nombre, contenido, tarea, fechaexa, timexa } = req.body;
  console.log(req.body);
  await Curse.findByIdAndUpdate(req.params.id, {
    category,
    nombre,
    contenido,
    tarea,
    fechaexa,
    timexa,
  });
  res.json("Note Updated");
};

module.exports = curseadd;
