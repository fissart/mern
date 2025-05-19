const User = require("../models/auth.model");
const Mycurse = require("../models/mycurse.model");
const expressJwt = require("express-jwt");

const fs = require("fs");

exports.getAllUsers = async (req, res) => {
  const ww = await User.aggregate([
    {
      $lookup: {
        from: "mycurses",
        let: { ww: "$_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$user", "$$ww"] } } }],
        as: "mycurses",
      },
    },
  ]);
  res.json(ww);
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
  const { name, email, foto, role, password, curse } = req.body;
  const newU = new User({
    name,
    email,
    foto,
    role,
    password,
    passw: password,
  });
  const newmycurse = new Mycurse({
    curse,
    user: newU._id,
  });
  //console.log(newU._id);
  await newU.save();
  await newmycurse.save();
  res.json("user");
};

exports.usersId = async (req, res) => {
  //console.log(req.params.id);
  const user = await User.findById(req.params.id);
  res.json(user);
};


exports.usersUp = async (req, res) => {
  //console.log(req.params.id);
  //console.log(req.body);
  //console.log(req.files);
  if (req.files) {
    const note = await User.findById(req.params.id);
    const file = note.foto;
    try {
      fs.unlinkSync("files/profile/" + file);
    } catch (err) {
      console.error(err);
    }
    const myFile = req.files.foto;
    myFile.mv(`files/profile/${req.params.id + "_" + myFile.name}`);
    const nEw = {
      foto: req.params.id + "_" + myFile.name,
      name: req.body.name,
      rol: req.body.rol,
      email: req.body.email,
      password: req.body.password,
    };
    //console.log(nEw);
    await User.findByIdAndUpdate(req.params.id, nEw);
  } else {
    const nEw = {
      name: req.body.name,
      rol: req.body.rol,
      email: req.body.email,
      password: req.body.password,
    };
    console.log(nEw);
    await User.findByIdAndUpdate(req.params.id, nEw);
  }

  res.json("user");
};

exports.DelUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Mycurse.remove({ user: req.params.id });
  res.json("Note Deleted");
}

exports.readController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    res.json(user);
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
