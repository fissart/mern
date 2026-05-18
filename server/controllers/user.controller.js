const User = require("../models/auth.model");
const Average = require("../models/average.model");
const Mycurse = require("../models/mycurse.model");
const Cursesource = require("../models/cursesource.model");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const getDni = require('peru-dni');
// const perudni = require('peru-dni');
var scraper = require("sunat-ruc-scraper2");

const fs = require("fs");

exports.getAllUsers = async (req, res) => {
  const { rol } = req.params;
  console.log(rol)

  const ww = await User.aggregate([
    {
      $match: {
        rol: rol,
      },
    },
    {
      $group: {
        _id: "$mencion",
        notas: { $sum: 1 },
        mencion: { $first: '$mencion' },
        sumacreditos: { "$sum": { $multiply: [1, { $toInt: '$credito' }] } },
        sumanotas: { "$sum": { $multiply: [1, { $toInt: '$nota' }] } },
        total: { "$sum": { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },
        records: { $push: "$$ROOT" }
      }
    },
    { $sort: { "_id": 1 } },
    {
      $lookup: {
        from: "users", let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$mencion", "$$www"] }, { $eq: ["$rol", rol] }] } } },
          {
            $group: {
              _id: "$ciclo",
              notas: { $sum: 1 },
              mencion: { $first: '$mencion' },
              sumacreditos: { "$sum": { $multiply: [1, { $toInt: '$credito' }] } },
              sumanotas: { "$sum": { $multiply: [1, { $toInt: '$nota' }] } },
              total: { "$sum": { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },
              records: { $push: "$$ROOT" }
            }
          },
          { $sort: { "_id": 1 } }
        ],
        as: "usser"
      }
    }
  ]).collation({ locale: "es", numericOrdering: true })
  console.log(ww)
  
  res.json(ww);
};

exports.getAveragesStd = async (req, res) => {
  const { mencion, ciclo, year, codigo } = req.params;
  // console.log(req.params)

  const ww = await User.aggregate([
    {
      $match: {
        $and: [
          { mencion: mencion },
          { ciclo: ciclo },
        ]
      },
    },
    {
      $lookup: {
        from: "averages", let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$user", "$$www"] }, { $eq: ["$ciclo", ciclo] }, { $eq: ["$mencion", mencion] }, { $eq: ["$year", year + ''] }, { $eq: ["$codigo", codigo] }] } } },
        ],
        as: "notta"
      }
    }
  ]).collation({ locale: "es", numericOrdering: true })
  // console.log(ww)

  res.json(ww);
};

exports.getAveragesStdNative = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const curse = ObjectId(req.params.id);
  // console.log(req.params)

  const ww = await Mycurse.aggregate([
    {
      $match: {
        curse: curse,
      },
    },
    {
      $lookup: {
        from: "users", let: { www: "$user" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }] } } },
        ],
        as: "usser"
      }
    }
  ]).collation({ locale: "es", numericOrdering: true })
  console.log(ww)

  res.json(ww);
};



exports.getReport = async (req, res) => {
  const { ciclo, mencion, year } = req.params;
  console.log(ciclo, mencion, year)
  const order = await Average.aggregate([
    {
      $match: {
        $and: [
          { ciclo: ciclo },
          { mencion: mencion },
          { year: year }
        ]
      },
    },
    {
      $group: {
        _id: "$user",
        notas: { $sum: 1 },
        mencion: { $first: '$mencion' },
        sumacreditos: { "$sum": { $multiply: [1, { $toInt: '$credito' }] } },
        sumanotas: { "$sum": { $multiply: [1, { $toInt: '$nota' }] } },
        total: { "$sum": { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },
        records: { $push: "$$ROOT" }
      }
    },
    {
      $lookup: {
        from: "users", let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }] } } },
        ],
        as: "usser"
      }
    },
  ]).collation({ locale: 'es' }).sort({ "usser.name": 1 })
  /////////////////////////////////////////////////////////////////////////////////////
  //console.log(order)

  const orderTEACHER = await Average.aggregate([
    {
      $match: {
        $and: [
          { ciclo: ciclo },
          { mencion: mencion },
          { year: year }
        ]
      },
    },
    {
      $group: {
        _id: "$teacher",
        rol: { $first: '$uSSer.rol' },
        cursos: { $sum: 1 },
        Puntaje: { $sum: { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },
      }
    },
    {
      $lookup: {
        from: "users",
        let: { id: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$id"] }] } }, },
          { $project: { _id: 1, name: 1, dni: 1, rol: 1 } }
        ],
        as: "uSSer"
      }
    },
    { $sort: { "uSSer.name": 1 } }
  ]);




  ///////////////////////////////////////////////////////////////////////////
  const ordercurses = await Cursesource.aggregate([
    {
      $match: {
        $and: [
          { ciclo: ciclo },
          { mencion: mencion }
        ]
      }
    }
  ])

  //////////////////////////////////////////////////////////////////////////////////

  return res.json({
    order,
    orderTEACHER,
    ordercurses
  }
  )
}



exports.usersstdController = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const user = ObjectId(req.params.id);

  const data = await Average.aggregate([
    {
      $match: {
        user: user,
      },
    },
    {
      $group: {
        _id: "$ciclo", total: { $sum: 1 },
      }
    },
    {
      $lookup: {
        from: "averages",
        let: { www: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$ciclo", "$$www"] }, { $eq: ["$user", user] }] } } },
          {
            $group: {
              _id: "$year",
              notas: { $sum: 1 },
              sumacreditos: { "$sum": { $multiply: [1, { $toInt: '$credito' }] } },
              sumanotas: { "$sum": { $multiply: [1, { $toInt: '$nota' }] } },
              total: { "$sum": { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },
            }
          },
          {
            $lookup: {
              from: "averages",
              let: { wwwww: "$_id" },
              pipeline: [
                { $match: { $expr: { $and: [{ $eq: ["$year", "$$wwwww"] }, { $eq: ["$ciclo", "$$www"] }, { $eq: ["$user", user] }] } } },
              ],
              as: "cycles",
            },
          },
          { $sort: { "_id": 1 } },
        ],
        as: "mencions",
      },
    },
    { $sort: { "_id": 1 } }
  ])
  // console.log(data)
  return res.json(data);
};

exports.usersController = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const curse = ObjectId(req.params.user);

  const users = await Mycurse.aggregate([
    { $match: { curse: curse } },
    {
      $lookup: {
        from: "users",
        let: { ww: "$user" },
        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$ww"] } } }],
        as: "cursew",
      },
    },
  ]);
  res.json(users);
};

exports.usersCr = async (req, res) => {
  const response = await fetch('https://app.apiinti.dev/api/v1/ruc/20100017491', {
    headers: {
      Authorization: 'Bearer inti_live_c75066875b09bdb9be310b991cda5d26'
    }
  })

  // const response = await fetch(
  //   "https://app.apiinti.dev/api/v1/dni/72578511",
  //   { headers: { "Authorization": ' Bearer inti_live_c75066875b09bdb9be310b991cda5d26' } }
  // );

  const data = await response.json();
  console.log(data);

  console.log("www");
  // scraper.getInformation("10725785114", function (err, data) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(data, "wwwww")
  //   }
  // });
  // try {
  //   let data = await getDni.getNameFromDNI(72578511);
  //   console.log(`${data.dni} > ${data.fullname}`);
  // } catch (err) {
  //   console.log('Something went wrong ', err);
  // }
  res.json("user");
};

exports.usersId = async (req, res) => {
  //console.log(req.params.id);
  const user = await User.findById(req.params.id);
  res.json(user);
};


exports.usersUp = async (req, res) => {
  const note = await User.findById(req.params.id);
  const file = note.foto;
  console.log(req.body);
  if (req.file) { try { fs.unlinkSync("uploads/collections/" + file); } catch (err) { console.error(err); } }
  const myFile = req.file ? req.file.filename : file
  await User.findByIdAndUpdate(req.params.id,
    req.body
  );
  // }

  res.json("user");
};

exports.DelUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Mycurse.remove({ user: req.params.id });
  res.json("Note Deleted");
}

exports.readController = (req, res) => {
  const userId = req.params.id;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  // const decode = jwt.verify(token, process.env.JWT_SECRET);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Link expirado. Intente otra vez",
      });
    }

    console.log(jwt.verify(token, process.env.JWT_SECRET))
    User.findById(userId).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      user.hashed_password = undefined;
      res.json(user);
    })
  })
}

exports.updateController = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { name, password } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.length < 3) {
        return res.status(400).json({
          error: "Password debe tener mínimo 3 caracteres",
        });
      } else {
        user.password = password;
        user.passw = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};
