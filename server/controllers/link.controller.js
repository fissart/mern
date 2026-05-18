const linkks = {};
const fs = require("fs");
const Link = require("../models/link.model");
const New = require("../models/new");

linkks.getLink = async (req, res) => {
  const ww = await Link.aggregate([
    { $match: { type: "general", }, },
    {
      $lookup: {
        from: "users", let: { www: "$user" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }] } } },
        ],
        as: "usser"
      }
    }
  ]).sort({ _id: -1 })
  // console.log(ww)
  res.json(ww);
};

linkks.getLinkCurse = async (req, res) => {
  const { ObjectId } = require("mongodb");

  const ww = await Link.find({ curse: ObjectId(req.params.idcurse) })
  // const ww = await Link.aggregate([
  //   { $match: { type: "general", }, },
  //   {
  //     $lookup: {
  //       from: "users", let: { www: "$user" },
  //       pipeline: [
  //         { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }] } } },
  //       ],
  //       as: "usser"
  //     }
  //   }
  // ]).sort({ _id: -1 })
  // console.log(req.params.id)
  console.log(req.params.idcurse, ww)
  res.json(ww);
};


linkks.getLinkNews = async (req, res) => {
  const ww = await Link.aggregate([
    { $match: { type: "nuevas", }, },
    {
      $lookup: {
        from: "users", let: { www: "$user" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }] } } },
        ],
        as: "usser"
      }
    }
  ]).sort({ _id: -1 })
  console.log(ww)
  res.json(ww);
};

linkks.getLinkNewsw = async (req, res) => {
  const ww = await Link.aggregate([
    { $match: { type: "reference", }, },
    {
      $lookup: {
        from: "users", let: { www: "$user" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }] } } },
        ],
        as: "usser"
      }
    }
  ]).sort({ _id: -1 })
  console.log(ww)
  res.json(ww);
};

linkks.mv = async (req, res) => {
  const ww = await Link.find({
    type: "mv",
  }).sort({ _id: -1 })
  console.log(ww)
  res.json(ww);
};

linkks.createLink = async (req, res) => {
  console.log(req.file)
  const myFile = req.file ? `${req.file.filename}.${req.body.type.split("/").pop()}` : ""
  const newNote = new Link({
    foreign: req.body.foreign,
    type: req.body.type,
    subtype: req.body.subtype,
    title: req.body.title,
    description: req.body.detail,
    user: req.body.user,
    curse: req.body.curse,
    usertask: [],
    wwwusertaskteacher: [],
    file: myFile,
  });
  await newNote.save();
  res.json("Creado correctamente")
}

linkks.updateLink = async (req, res) => {
  // console.log(req.body);
  console.log(req.file);
  const note = await Link.findById(req.params.id);
  const file = note.file;
  if (req.file) { console.log(file); try { fs.unlinkSync("uploads/collections/" + file); } catch (err) { console.error(err); } }
  const myFile = req.file ? req.file.filename : file
  // await Link.findByIdAndUpdate(req.params.id, req.body)

  await Link.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    file: myFile,
  });
  // await newNote.save()
  res.json("Actualizado");
};

linkks.updateLinkwithoutfile = async (req, res) => {
  await Link.findByIdAndUpdate(req.params.id, req.body)

  // await newNote.save()
  res.json("Actualizado");
};



linkks.deleteLink = async (req, res) => {
  const note = await Link.findById(req.params.id);
  const file = note.file;
  console.log("file");
  try {
    fs.unlinkSync("uploads/collections/" + file);
  } catch (err) {
    console.error(err);
  }
  await Link.findByIdAndDelete(req.params.id);
  res.json("Limpiado");
};

module.exports = linkks;
