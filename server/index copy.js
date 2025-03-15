const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./configs/db");
const port = process.env.PORT || 9997;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Note = require("./models/chat.model");
var xss = require("xss")
const fileUpload = require('express-fileupload');
const path = require('path');
const Theme = require("./models/theme.model");


require("dotenv").config({
  path: "./configs/config.env",
})

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use((req, res, next) => {
  req.io = io
  return next()
})

// body parser
app.use(bodyParser.json());
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
// static files
app.use(express.static(path.join(__dirname, 'files')));

if (process.env.NODE_ENV === "development") {
  /*
    app.use(
      cors({
        origin: process.env.CLIENT_URL,
      })
    );
  */
  app.use(morgan("dev"));
}


//Load routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
//Use Routes
app.use("/api", authRouter);
app.use("/api", userRouter);

app.use("/api/land", require("./routes/cursesourcew"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/curses", require("./routes/curse.route"));
app.use("/api/chapters", require("./routes/chapter.route"));
app.use("/api/seccions", require("./routes/seccion.route"));
app.use("/api/tasks", require("./routes/task.route"));
app.use("/api/comments", require("./routes/comment.route"));
app.use("/api/mycurses", require("./routes/mycurse.route"));
app.use("/api/tests", require("./routes/test.route"));
app.use("/api/links", require("./routes/link.route"));
app.use("/api", require("./routes/chat.route"));



let interval;
let users = [];

io.on("connection", async (socket) => {
  // socket.join("www");
  console.log("Nuevo cliente", socket.id, socket.connected);
  const mensajes = await Note.aggregate([
    { $sort: { _id: -1 } },
    { $limit: 19 },
    {
      $lookup: {
        from: "users",
        let: { www: "$user" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$www"] } } }],
        as: "usser",
      },
    },
  ])
  console.log(mensajes.reverse())

  //sort({ createdAt: 1 }).
  socket.emit("load old msgs", mensajes);

  socket.on("mesagess", async (body) => {
    io.emit("mesages", body)
    //console.log(body,"body")
    const newNote = new Note({
      mensaje: body.mensaje,
      user: body.user,
    });
    const www = await newNote.save();
    console.log(www, "newNote")
  });

  socket.on("message", async ({ name, message }) => {
    io.sockets.emit("message", { name, message });
    console.log(name, message);
    const newNote = new Note({
      nombre: name,
      mensaje: message,
    });
    await newNote.save();
  });



  socket.on("usssers", async (user) => {
    console.log(users, user, "w1");
    console.log(users.indexOf(user.email) != -1)
    if (users.indexOf(user.email) != -1) { } else {
      socket.userww = user;
      users.push(socket.userww);
      console.log(users, user, "w2");
    }
    socket.on("disconnect", () => {
      console.log(users, "newClient disconnected", socket.id, socket.connected);
      if (!socket.userww) return;
      users.splice(users.indexOf(socket.userww), 1);
      io.emit("users", users);
      // console.log(users, user, "w2")
      //clearInterval(interval);
    });
    io.emit("users", users);
  });

  socket.on("notes", async (curse) => {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(curse);
    const cursse = ObjectId(id)
    const themes = await Theme.aggregate([
      { $match: { curse: cursse, }, },
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

    console.log("themes");
    io.to(cursse).emit("forum", themes);
  });

  socket.on("disconnect", () => {
    console.log(users, "notesnewClient disconnected", socket.id, socket.connected);
  });

  socket.on('forocurse', function (idw) {
    socket.join(idw)
    console.log(idw, "foro")
  });


  //console.log(req.body);



});


// io.on("disconnect", () => {
//   console.log(users, "Client disconnected", socket.id, socket.connected);
//   // if (!socket.userww) return;
//   // users.splice(users.indexOf(socket.userww), 1);
//   // io.emit("users", users);
//   // console.log(users, user, "w2")
//   //clearInterval(interval);
// });



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
}


sanitizeString = (str) => {
  return xss(str);
};

connections = {};
messages = {};
timeOnline = {};

io.on("connection", (socket) => {
  socket.on("join-call", (path) => {
    if (connections[path] === undefined) {
      connections[path] = [];
    }
    connections[path].push(socket.id);

    timeOnline[socket.id] = new Date();

    for (let a = 0; a < connections[path].length; ++a) {
      io.to(connections[path][a]).emit(
        "user-joined",
        socket.id,
        connections[path]
      );
    }

    if (messages[path] !== undefined) {
      for (let a = 0; a < messages[path].length; ++a) {
        io.to(socket.id).emit(
          "chat-message",
          messages[path][a]["data"],
          messages[path][a]["sender"],
          messages[path][a]["socket-id-sender"]
        );
      }
    }

    console.log(path, connections[path]);
  });

  socket.on("signal", (toId, message) => {
    io.to(toId).emit("signal", socket.id, message);
  });

  socket.on("chat-message", (data, sender) => {
    data = sanitizeString(data);
    sender = sanitizeString(sender);

    var key;
    var ok = false;
    for (const [k, v] of Object.entries(connections)) {
      for (let a = 0; a < v.length; ++a) {
        if (v[a] === socket.id) {
          key = k;
          ok = true;
        }
      }
    }

    if (ok === true) {
      if (messages[key] === undefined) {
        messages[key] = [];
      }
      messages[key].push({
        sender: sender,
        data: data,
        "socket-id-sender": socket.id,
      });
      console.log("message", key, ":", sender, data);

      for (let a = 0; a < connections[key].length; ++a) {
        io.to(connections[key][a]).emit(
          "chat-message",
          data,
          sender,
          socket.id
        );
      }
    }
  });


  socket.on("disconnect", () => {
    var diffTime = Math.abs(timeOnline[socket.id] - new Date());
    var key;
    for (const [k, v] of JSON.parse(
      JSON.stringify(Object.entries(connections))
    )) {
      for (let a = 0; a < v.length; ++a) {
        if (v[a] === socket.id) {
          key = k;

          for (let a = 0; a < connections[key].length; ++a) {
            io.to(connections[key][a]).emit("user-left", socket.id);
          }

          var index = connections[key].indexOf(socket.id);
          connections[key].splice(index, 1);

          console.log(key, socket.id, Math.ceil(diffTime / 1000));

          if (connections[key].length === 0) {
            delete connections[key];
          }
        }
      }
    }
  });
});


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////



// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };





//////////////////////////////////////////////

// app.post('/upload', (req, res) => {
//   console.log(req.files);
//   console.log(req.body);
//   if (!req.files) {
//     return res.status(500).send({ msg: "file is not found" })
//   }
//   // accessing the file
//   const myFile = req.files.filesww;

//   //  mv() method places the file inside public directory
//   myFile.mv(`${__dirname}/files/images/${myFile.name}`, function (err) {
//     if (err) {
//       console.log(err)
//       return res.status(500).send({ msg: "Error occured" });
//     }
//     // returing the response with file path and name
//     return res.send({ name: myFile.name, path: `/${myFile.name}` });
//   });
// })


connectDB();
server.listen(port, () => console.log(`Listening on port ${port}`));
