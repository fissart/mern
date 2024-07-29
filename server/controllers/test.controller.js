const Testroute = {};

const Test = require("../models/test.model");
const TestResp = require("../models/testresp.model");

Testroute.getC = async (req, res) => {
  const notes = await Test.find();
  res.json(notes);
};

Testroute.createTest = async (req, res) => {
  const { preguntas, respuestas, user, foreign } = req.body;
  console.log(req.body);
  const newNote = new Test({
    preguntas,
    respuestas,
    user,
    foreign,
  });
  console.log(newNote);
  await newNote.save();
  res.json("New Test added");
};

Testroute.getTest = async (req, res) => {
  console.log(req.params.id);
  const note = await Test.findById(req.params.id);
  res.json(note);
};
Testroute.getupdateTest = async (req, res) => {
  console.log(req.params.id);
  const note = await Test.find({ foreign: req.params.id });
  console.log(note);
  res.json(note);
};
Testroute.getC = async (req, res) => {
  res.json(notes);
};

Testroute.deleteTest = async (req, res) => {
  await Test.findByIdAndDelete(req.params.id);
  console.log("object");
  const { ObjectId } = require("mongodb");
  const _id = ObjectId(req.params.id);
  await Sec.remove({ chapter: _id });

  res.json("Test Deleted");
};

Testroute.updateTest = async (req, res) => {
  //  const { title, content, duration, date, author } = req.body;
  const { preguntas, respuestas } = req.body;
  await Test.findByIdAndUpdate(req.params.id, {
    preguntas,
    respuestas,
  });
  res.json("Test Updated");
};
////////////////////////////////////////////////////////
Testroute.createTestResp = async (req, res) => {
  const { curse, calification, respuesta, user, foreign } = req.body;
  console.log(req.body);
  const newNote = new TestResp({
    calification: "",
    respuesta,
    user,
    foreign,
    curse,
  });
  console.log(newNote);
  await newNote.save();
  res.json("New TestResp added");
};

Testroute.getTestResp = async (req, res) => {
  const note = await TestResp.find({
    foreign: req.params.idtest,
    user: req.params.user,
  });
  console.log(note);
  res.json(note);
};
Testroute.getupdateTestResp = async (req, res) => {
  console.log(req.params.id);
  const note = await TestResp.find({ foreign: req.params.id });
  console.log(note);
  res.json(note);
};
Testroute.getC = async (req, res) => {
  res.json(notes);
};

Testroute.deleteTestResp = async (req, res) => {
  await TestResp.findByIdAndDelete(req.params.id);
  console.log("object");
  const { ObjectId } = require("mongodb");
  const _id = ObjectId(req.params.id);
  await Sec.remove({ chapter: _id });

  res.json("TestResp Deleted");
};

Testroute.updateTestResp = async (req, res) => {
  //  const { title, content, duration, date, author } = req.body;
  const { respuesta, calification } = req.body;
  await TestResp.findByIdAndUpdate(req.params.id, {
    respuesta,
    calification,
  });
  res.json("TestResp Updated");
};

module.exports = Testroute;
