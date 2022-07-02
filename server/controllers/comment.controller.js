const comment = {};

const Theme = require("../models/theme.model");
const C1 = require("../models/c1.model");
const C2 = require("../models/c2.model");
const C3 = require("../models/c3.model");
const C4 = require("../models/c4.model");
const C5 = require("../models/c5.model");

comment.getTheme = async (req, res) => {
  const notes = await Theme.find({ curse: req.params.curse });
  res.json(notes);
};

comment.getComment_User_Idtheme = async (req, res) => {
  const notes = await C1.find({
    identificador_tema: req.params.idtheme,
    user: req.params.user,
  });
  res.json(notes);
};
comment.createTheme = async (req, res) => {
  const { fechaforum, theme, curse } = req.body;
  //  console.log(req.body);
  const newTheme = new Theme({
    fechaforum,
    theme,
    curse,
  });
  //console.log(newTheme);
  await newTheme.save();
  res.json("Added theme");
};

comment.updateThemeget = async (req, res) => {
  console.log(req.params.idtheme);
  const notes = await Theme.find({ _id: req.params.idtheme });
  res.json(notes);
};

comment.updateTheme = async (req, res) => {
  const { fechaforum, theme, curse } = req.body;
  console.log(req.body);
  await Theme.findByIdAndUpdate(req.params.idtheme, {
    fechaforum,
    theme,
    curse,
  }).then();
  res.json("Added theme");
};

comment.deleteTheme = async (req, res) => {
  console.log(req.params.idtheme);
  await Theme.findByIdAndDelete(req.params.idtheme);
   res.json("Deleted theme");
};

/////////////////////////////////////////////////////////////////////////////////////

comment.createComment1 = async (req, res) => {
  const {
    theme,
    curse,
    user,
    comment,
    calification,
    likes,
    identificadortema,
    foreign,
  } = req.body;
  //const ww=req.body;
  const newcomment = new C1({
    theme,
    curse,
    foreign,
    user,
    identificadortema,
    comment,
    calification,
    likes,
  });
  console.log(newcomment);
  await newcomment.save();
  res.json("Added");
};
comment.createComment2 = async (req, res) => {
  const {
    foreign,
    comment,
    user,
    curse,
    calification,
    identificadortema,
    likes,
  } = req.body;
  //const ww=req.body;
  const newcomment = new C1({
    user,
    curse,
    identificadortema,
    comment,
    foreign,
    calification,
    likes,
  });
  console.log(newcomment);
  await newcomment.save();
  res.json("Added");
};

comment.getComments = async (req, res) => {
  console.log(req.params.theme);
  const { ObjectId } = require("mongodb");
  const idtheme = ObjectId(req.params.idtheme);
  const user = ObjectId(req.params.user);
  const notes = await Theme.aggregate([
    {
      $match: {
        _id: idtheme,
      },
    },
    {
      $lookup: {
        from: "c1",
        let: { cw: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$theme", "$$cw"] } } },
          {
            $lookup: {
              from: "c1",
              let: { cww: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$foreign", "$$cww"] } } },
                {
                  $lookup: {
                    from: "c1",
                    let: { cwww: "$_id" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$foreign", "$$cwww"] } } },
                      {
                        $lookup: {
                          from: "c1",
                          let: { c4: "$_id" },
                          pipeline: [
                            {
                              $match: {
                                $expr: { $eq: ["$foreign", "$$c4"] },
                              },
                            },
                            {
                              $lookup: {
                                from: "c1",
                                let: { c5: "$_id" },
                                pipeline: [
                                  {
                                    $match: {
                                      $expr: { $eq: ["$foreign", "$$c5"] },
                                    },
                                  },
                                ],
                                as: "c5",
                              },
                            },
                          ],
                          as: "c4",
                        },
                      },
                    ],
                    as: "c3",
                  },
                },
              ],
              as: "c2",
            },
          },
        ],
        as: "c1",
      },
    },
    {
      $lookup: {
        from: "c1",
        let: { wrw: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$identificadortema", "$$wrw"] },
                  { $eq: ["$user", user] },
                ],
              },
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "c1",
        let: { wrw: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$identificadortema", "$$wrw"] },
                  { $eq: ["$user", ObjectId("60132a88faebf824b455a1c9")] },
                ],
              },
            },
          },
          {
            $group: {
              _id: "$identificadortema",
              conteo: { $sum: 1 },
              totalCalification: { $sum: { $sum: ["$calification", "$fee"] } },
              averageCalification: {
                $avg: { $sum: ["$calification", "$fee"] },
              },
            },
          },
        ],
        as: "result",
      },
    },
  ]);
  res.json(notes);
};

comment.getU = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

comment.deleteComment = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.index);
  if (req.params.index === "1") {
    await C1.findByIdAndDelete(req.params.id);
  }
  if (req.params.index === "2") {
    await C2.findByIdAndDelete(req.params.id);
  }
  res.json("Note Deleted");
};

comment.updateCommentget= async (req, res) => {
 console.log(req.params.index);
  if (req.params.index === "1") {
    const notes = await C1.find({ _id: req.params.id });
    res.json(notes);

  }
  if (req.params.index === "2") {
    const notes = await C2.find({ _id: req.params.id });
    res.json(notes);

  }
};
comment.updateComment= async (req, res) => {
  const { comment,calification } = req.body;
  console.log(req.params.index);
  console.log(req.params.id);
  if (req.params.index === "1") {
    await C1.findByIdAndUpdate(req.params.id, {
      comment,calification
    });
  }
  if (req.params.index === "1") {
    await C1.findByIdAndUpdate(req.params.id, {
      comment, calification
    });
  }
  if (req.params.index === "2") {
    await C2.findByIdAndUpdate(req.params.id, {
      comment, calification
    });
  }
  res.json("Note Updated");
};
module.exports = comment;
