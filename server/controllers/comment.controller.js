const comment = {};

const Theme = require("../models/theme.model");
const Comment = require("../models/comment");
const C2 = require("../models/c2.model");
const C3 = require("../models/c3.model");
const C4 = require("../models/c4.model");
const C5 = require("../models/c5.model");

comment.getTheme = async (req, res) => {
  // const notes = await Theme.find({ curse: req.params.curse });
  // res.json(notes);
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.curse);
    const cursse = ObjectId(id)
    const Curseuser = await Theme.aggregate([
      {
        $match: {
          curse: cursse,
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { www: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$theme", "$$www"] } } },
            {
              $lookup: {
                from: "comments",
                let: { www: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$theme", "$$www"] } } },
                  {
                    $lookup: {
                      from: "comments",
                      let: { www: "$_id" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$theme", "$$www"] } } },
                        {
                          $lookup: {
                            from: "comments",
                            let: { www: "$_id" },
                            pipeline: [
                              { $match: { $expr: { $eq: ["$theme", "$$www"] } } },
                              {
                                $lookup: {
                                  from: "comments",
                                  let: { www: "$_id" },
                                  pipeline: [
                                    { $match: { $expr: { $eq: ["$theme", "$$www"] } } },
                                    {
                                      $lookup: {
                                        from: "users",
                                        let: { www: "$user" },
                                        pipeline: [
                                          { $match: { $expr: { $eq: ["$_id", "$$www"] } } }],
                                        as: "usser",
                                      },
                                    },
                                    { $sort: { "_id": -1 } }
                                  ],
                                  as: "comments",
                                },
                              },
                              {
                                $lookup: {
                                  from: "users",
                                  let: { www: "$user" },
                                  pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$www"] } } }],
                                  as: "usser",
                                },
                              },
                              { $sort: { "_id": -1 } }
                            ],
                            as: "comments",
                          },
                        },
                        {
                          $lookup: {
                            from: "users",
                            let: { www: "$user" },
                            pipeline: [
                              { $match: { $expr: { $eq: ["$_id", "$$www"] } } }],
                            as: "usser",
                          },
                        },
                        { $sort: { "_id": -1 } }
                      ],
                      as: "comments",
                    },
                  },
                  {
                    $lookup: {
                      from: "users",
                      let: { www: "$user" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$www"] } } }],
                      as: "usser",
                    },
                  },
                  { $sort: { "_id": -1 } }

                ],
                as: "comments",
              },
            },
            {
              $lookup: {
                from: "users",
                let: { www: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$www"] } } }],
                as: "usser",
              },
            },
            { $sort: { "_id": -1 } }
          ],
          as: "comments",
        },
      },
    ]).sort({ _id: -1 })
    //console.log(Curseuser)
  return res.json(Curseuser)
}

comment.getComment_User_Idtheme = async (req, res) => {
  const notes = await Comment.find({
    identificador_tema: req.params.idtheme,
    user: req.params.user,
  });
  res.json(notes);
};
comment.createTheme = async (req, res) => {
  const { user, theme, curse, title } = req.body;
  const newTheme = new Theme({
    user,
    title,
    theme,
    curse,
  });
  console.log(newTheme);
  await newTheme.save();
  res.json("Added theme");
};

comment.updateThemeget = async (req, res) => {
  console.log(req.params.idtheme);
  const notes = await Theme.find({ _id: req.params.idtheme });
  res.json(notes);
};

comment.updateTheme = async (req, res) => {
  const { theme, title } = req.body;
  await Theme.findByIdAndUpdate(req.params.idtheme, {
    title, theme
  }).then();
  res.json("Added theme");
};

comment.deleteTheme = async (req, res) => {
  console.log(req.params.idtheme);
  await Theme.findByIdAndDelete(req.params.idtheme);
  res.json("Deleted theme");
};

/////////////////////////////////////////////////////////////////////////////////////

comment.createComment = async (req, res) => {
  const { theme, curse, user, comment, } = req.body; //const ww=req.body;
  const newcomment = new Comment({ theme, curse, user, comment, });
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
  const newcomment = new Coment({
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
        from: "Coment",
        let: { cw: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$theme", "$$cw"] } } },
          {
            $lookup: {
              from: "Coment",
              let: { cww: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$foreign", "$$cww"] } } },
                {
                  $lookup: {
                    from: "Coment",
                    let: { cwww: "$_id" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$foreign", "$$cwww"] } } },
                      {
                        $lookup: {
                          from: "Coment",
                          let: { c4: "$_id" },
                          pipeline: [
                            {
                              $match: {
                                $expr: { $eq: ["$foreign", "$$c4"] },
                              },
                            },
                            {
                              $lookup: {
                                from: "Coment",
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
        as: "Coment",
      },
    },
    {
      $lookup: {
        from: "Coment",
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
        from: "Coment",
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
  console.log(req.params.idcoment, "www");
  await Comment.findByIdAndDelete(req.params.idcoment);
  res.json("Note Deleted");
};

comment.updateCommentget = async (req, res) => {
  console.log(req.params.index);
  if (req.params.index === "1") {
    const notes = await Coment.find({ _id: req.params.id });
    res.json(notes);

  }
  if (req.params.index === "2") {
    const notes = await C2.find({ _id: req.params.id });
    res.json(notes);

  }
};
comment.updateComment = async (req, res) => {
  const { comment, calification } = req.body;
  await Comment.findByIdAndUpdate(req.params.id, {
    comment, calification
  });
  res.json("Note Updated");
};
module.exports = comment;
