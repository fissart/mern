const task = {};
const TasK = require("../models/task.model");
const Certificate = require("../models/diploma");
const Encuesta = require("../models/Encuesta");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "ciencias",
  api_key: "665428354914471",
  api_secret: "CqE6dC0WTex8bs_KZPh_UpnlLhU",
});

const fs = require("fs");
// const { Certificate } = require("crypto");


task.createencuestaController = async (req, res) => {
  const year = new Date().getFullYear()
  var mongoose = require('mongoose')
  // const { idstudent, idteacher, idcurso, codigo, ciclo, mencion, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15, w16, w17, w18, w19, w20 } = req.body
  console.log(req.body)
  //const newCurse = { idstudent, idteacher, idcurso, year, codigo, ciclo, mencion, items: [w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15, w16, w17, w18, w19, w20] };
  // const Cursew = new Encuesta.default(newCurse);
  // await Cursew.save()
  return res.json({
    msgok: "ok",
  });
}

task.getencuestaController = async (req, res) => {
  // async function getencuestaController(req, res) {
  // const ciclo = req.params.ciclo
  // const mencion = req.params.mencion
  const { ObjectId } = require("mongodb");
  const id = req.params.idtest
  const idt = ObjectId(id)
  console.log(id, "ciclo")
  const integers = await Encuesta.default.aggregate([
    {
      $match: {
        _id: idt,
      },
    },
    {
      $lookup: {
        from: "users",
        let: { www: "$idstudent" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
        ],
        as: "userw",
      },
    },
    { '$sort': { 'userw.name': 1 } },
    {
      $lookup: {
        from: "users",
        let: { www: "$idteacher" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
        ],
        as: "userwwteach",
      },
    },
  ]);
  console.log(integers);
  return res.json(integers);
}


task.UpdateTest = async (req, res) => {
  // const { ObjectId } = require("mongodb");
  // const id = req.params.idtest
  // const idt = ObjectId(id)
  console.log(req.params.idtest, "ciclo", req.body)
  await TasK.findByIdAndUpdate(req.params.idtest, { items: req.body.items, note: req.body.note });
  res.json("Note Updated");

}



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

task.getTests = async (req, res) => {
  const { ObjectId } = require("mongodb");
  console.log(req.params.user);
  const notes = await TasK.find({
    curse: ObjectId(req.params.idcurse),
    user: ObjectId(req.params.iduser),
  });
  console.log(notes);
  res.json(notes);
};

task.get = async (req, res) => {
  console.log(req.params.id, req.params.theme, req.params.user);
  const notes = await TasK.find({
    curse: req.params.id,
    codetheme: req.params.theme,
    user: req.params.user,
  });
  console.log(notes);
  res.json(notes);
};

task.createS = async (req, res) => {
  const newNote = new TasK(req.body);
  console.log(newNote);
  await newNote.save();
  res.json("New TasK added");
};

task.CreateDiploma = async (req, res) => {
  const newNote = new Certificate(req.body);
  console.log(req.body);
  await newNote.save();
  res.json("New TasK added");
};

task.getSTak = async (req, res) => {
  const note = await TasK.findById(req.params.id);
  res.json(note);
};

task.getDiploma = async (req, res) => {
  
  const note = await Certificate.findById(req.params.id);
  console.log(note);
  // res.json("New TasK added");
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


task.updaterestrictDatetaskSTD = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const id = ObjectId(req.params.id);
  const { dateb, datee } = req.body
  //console.log(dateb, datee)
  const setdate = await TasK.updateMany({ theme: id }, { $set: { dateb: dateb, datee: datee } });
  //console.log(setdate)
  return res.json("ok");
}

task.updateS = async (req, res) => {
  // console.log(req.files);
  console.log(req.body);
  //console.log(req.files.archivo.size);

  // if (req.files) {
  //   const note = await TasK.findById(req.params.id);
  //   const file = note.file;
  //   try {
  //     fs.unlinkSync("files/tasks/" + file);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   const myFile = req.files.archivo;
  //   myFile.mv(
  //     `files/tasks/${req.body.user + "_" + req.body.idsec + "_" + myFile.name}`
  //   );
  //   const nEw = {
  //     file: req.body.user + "_" + req.body.idsec + "_" + myFile.name,
  //     content: req.body.contenido,
  //   };
  //   await TasK.findByIdAndUpdate(req.params.id, nEw);
  // } else {
    await TasK.findByIdAndUpdate(req.params.id, req.body);
  // }
  res.json("Task Updated");
};

module.exports = task;
