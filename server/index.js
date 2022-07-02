const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./configs/db");
const port = process.env.PORT || 9000;
//const indexww = require("./routes/indexww");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Note = require("./models/chat.model");
var xss = require("xss")
const fileUpload = require('express-fileupload');
const path = require('path');

//var multer = require('multer')
//var cors = require('cors');
//ricardomallqui6@gmail.com
//@Qq1w2e3r4t5y6u7
//qwertyqwerty
// Config dotev
require("dotenv").config({
  path: "./configs/config.env",
});

const app = express();
//app.use(indexww);

const server = http.createServer(app);
const io = socketIo(server);
// body parser
app.use(bodyParser.json());
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
// static files
app.use(express.static(path.join(__dirname, 'files')));

// Dev Logginf Middleware

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

let interval;
let users = [];
io.on("connection", async (socket) => {
  console.log("New client connected", socket.id, socket.connected);
  let msgs = await Note.find();
  //  console.log(msgs);
  socket.emit("load old msgs", msgs);

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("usuarios", async (wr) => {
    if (users.indexOf(wr) != -1) {
    } else {
      socket.userww = wr;
      users.push(socket.userww);
    }

    socket.on("disconnect", () => {
      if (!socket.userww) return;
      users.splice(users.indexOf(socket.userww), 1);
      io.emit("users", users);

      console.log("Client disconnected", socket.id, socket.connected);
      console.log(users);
      clearInterval(interval);
    });

    io.emit("users", users);

    console.log(users);
  });

  socket.on("mesagess", async (body) => {
    io.emit("mesages", body);
    //console.log(body);

    const newNote = new Note({
      nombre: body.user, //socket.id,
      mensaje: body.msg,
      id: body.id,
    });
    //console.log(newNote);
    await newNote.save();
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
  //console.log(req.body);



});

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

app.set("port", process.env.PORT || 4001);

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



const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

//Load routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

//Use Routes
app.use("/api", authRouter);
app.use("/api", userRouter);

app.use("/api/categories", require("./routes/category.route"));
app.use("/api/curses", require("./routes/curse.route"));
app.use("/api/chapters", require("./routes/chapter.route"));
app.use("/api/seccions", require("./routes/seccion.route"));
app.use("/api/tasks", require("./routes/task.route"));
app.use("/api/comments", require("./routes/comment.route"));
app.use("/api/mycurses", require("./routes/mycurse.route"));
app.use("/api/tests", require("./routes/test.route"));
app.use("/api/links", require("./routes/link.route"));

// Load routes
const chatRout = require("./routes/chat.route");
// Use Routes
app.use("/api", chatRout);

//////////////////////////////////////////////

app.post('/upload', (req, res) => {
  console.log(req.files);
  console.log(req.body);
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files.filesww;

  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/files/images/${myFile.name}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });
})

// Connect to database
connectDB();

server.listen(port, () => console.log(`Listening on port ${port}`));
