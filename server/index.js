const express = require("express");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
var fs = require('fs');
const https = require("https");
const port = process.env.PORT || 9997;
// const fileUpload = require('express-fileupload');
const connectDB = require("./configs/db");
const path = require('path');
const Theme = require("./models/theme.model");
const Note = require("./models/chat.model");
const morgan = require("morgan");
var xss = require("xss")


require("dotenv").config({
  path: "./configs/config.env",
})
const app = express();
// const server = http.createServer(app);

// var server = https.createServer(
var server = https.createServer(
   {
    cert: fs.readFileSync('/etc/letsencrypt/live/www.esfapa.edu.pe/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/www.esfapa.edu.pe/privkey.pem'),
    requestCert: false,
    rejectUnauthorized: false
   },
  //   ca: fs.readFileSync('./test_ca.crt'),
  app);

// var io = require('socket.io').listen(server);
const io = socketIo(server, {
  cors: { origin: "*" }
});

// server.listen(8080);




// app.io=io
// app.use((req, res, next) => {
//   req.io = io
//   return next()
// })

// body parser
app.use(bodyParser.json());
app.use(cors()); // it enables all cors requests
// app.use(fileUpload());
// static files
app.use(express.static(path.join(__dirname, 'uploads')));


// if (process.env.NODE_ENV === "development") {
//     app.use(
//       cors({
//         origin: process.env.CLIENT_URL,
//       })
//     );
// }
app.use(morgan("dev"));


//Load routes
//Use Routes

app.use("/api/land", require("./routes/cursesourcew"))
app.use("/api/category", require("./routes/category.route"))
app.use("/api/curses", require("./routes/curse.route"))
app.use("/api/chapters", require("./routes/chapter.route"))
app.use("/api/seccions", require("./routes/seccion.route"))
app.use("/api/tasks", require("./routes/task.route"))
app.use("/api/mycurses", require("./routes/mycurse.route"))
app.use("/api/tests", require("./routes/test.route"))
app.use("/api/links", require("./routes/link.route"))
app.use("/api/auth", require("./routes/auth.route"))
// app.use("/api", require("./routes/chat.route"))
app.use("/api/users", require("./routes/user.route"))
app.use("/api/foros", require("./routes/comment.route"))

// io.on("connection", (socket) => {
//   console.log("User www", socket.id);
//   socket.on("send_message", (data, data2, callback) => {
//     console.log("Message Received ", data, data2);
//     io.emit("receive_message", data);
//     callback({
//       status: "ok"
//     })
//   })

// socket.on("disconnect", () => {
//   console.log("left connection")
// var diffTime = Math.abs(timeOnline[socket.id] - new Date());
// var key;
// for (const [k, v] of JSON.parse(
//   JSON.stringify(Object.entries(connections))
// )) {
//   for (let a = 0; a < v.length; ++a) {
//     if (v[a] === socket.id) {
//       key = k;

//       for (let a = 0; a < connections[key].length; ++a) {
//         io.to(connections[key][a]).emit("user-left", socket.id);
//       }

//       var index = connections[key].indexOf(socket.id);
//       connections[key].splice(index, 1);

//       console.log(key, socket.id, Math.ceil(diffTime / 1000));

//       if (connections[key].length === 0) {
//         delete connections[key];
//       }
//     }
//   }
// }
// })

// })




// io.on("connection", async (socket) => {
//   ussers.push(socket.id)
//   io.emit("ussers", ussers)
//   socket.on("disconnect", () => {
//     if (ussers.indexOf(socket.id) != -1) {
//       ussers.splice(ussers.indexOf(socket.id), 1);
//       io.emit("ussers", ussers);
//     console.log(ussers)
//     }
//   });

// });




// let interval;
let usserws = [];

io.on("connection", async (socket) => {
  // console.log("Nuevo chat", socket.id, socket.connected)

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

  socket.emit("load old msgs", mensajes);

  socket.on("mesagess", async (body) => {
    io.emit("mesages", body)
    // console.log(body, "body")
    const newNote = new Note(body)
    const www = await newNote.save();
    // console.log(www, "newNote")
  })

  socket.on("message", async ({ name, message }) => {
    io.sockets.emit("message", { name, message });
    // console.log(name, message);
    const newNote = new Note({
      nombre: name,
      mensaje: message,
    });
    await newNote.save();
  })

  socket.on("usssers", async (user) => {
    // console.log("usssersNEW", user)
    // console.log(user.email && usserws.findIndex(obj => obj.id === socket.id) === -1)
    if (user.email && usserws.findIndex(obj => obj.id === socket.id) === -1) {
      user = {
        ...user, idsocket: socket.id, ip: socket.request.connection.remoteAddress, time: new Date()
      }
      socket.www = user
      usserws.push(socket.www)
      // console.log("usssers", { usserws })
      io.emit('usersss', usserws);
    }

    socket.on("disconnect", () => {
      // console.log(usserws, "Client disconnected", socket.id);
      usserws.splice(usserws.findIndex(obj => obj.idsocket === socket.id), 1);
      // console.log(usserws, "Client disconnected", socket.id);
      //clearInterval(interval);
      io.emit("usersss", usserws);
    });

  })
});


let users = [];
io.on("connection", async (socket) => {
  socket.join("www")
  console.log("Nuevo foroesfa", socket.id, socket.connected)
  socket.on("temas", async (curse) => {
    console.log("Nuevo www", curse)

    const { ObjectId } = require("mongodb");
    const id = ObjectId(curse);
    const cursse = ObjectId(id)
    const themes = await Theme.aggregate([
      { $match: { curse: cursse, }, },
      {
        $lookup: {
          from: "users",
          let: { www: "$user" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$www"] } } }],
          as: "usser",
        },
      }
    ]).sort({ _id: -1 })
    io.to(curse).emit("foro", themes);
  });

  socket.on("disconnect", () => {
    console.log(users, "foro disconnected", socket.id, socket.connected);
  });

  socket.on('foroesfa', function (idw) {
    socket.join(idw)
    console.log(idw, "foro")
  })

});



sanitizeString = (str) => {
  return xss(str)
}

connections = {}
messages = {}
timeOnline = {}

io.on('connection', (socket) => {

  socket.on('join-call', (path) => {
    if (connections[path] === undefined) {
      connections[path] = []
    }
    connections[path].push(socket.id)

    timeOnline[socket.id] = new Date()

    for (let a = 0; a < connections[path].length; ++a) {
      io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
    }

    if (messages[path] !== undefined) {
      for (let a = 0; a < messages[path].length; ++a) {
        io.to(socket.id).emit("chat-message", messages[path][a]['data'],
          messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
      }
    }

    console.log(path, connections[path])
  })

  socket.on('signal', (toId, message) => {
    io.to(toId).emit('signal', socket.id, message)
  })

  socket.on('chat-message', (data, sender) => {
    data = sanitizeString(data)
    sender = sanitizeString(sender)

    var key
    var ok = false
    for (const [k, v] of Object.entries(connections)) {
      for (let a = 0; a < v.length; ++a) {
        if (v[a] === socket.id) {
          key = k
          ok = true
        }
      }
    }

    if (ok === true) {
      if (messages[key] === undefined) {
        messages[key] = []
      }
      messages[key].push({ "sender": sender, "data": data, "socket-id-sender": socket.id })
      console.log("message", key, ":", sender, data)

      for (let a = 0; a < connections[key].length; ++a) {
        io.to(connections[key][a]).emit("chat-message", data, sender, socket.id)
      }
    }
  })

  socket.on('disconnect', () => {
    var diffTime = Math.abs(timeOnline[socket.id] - new Date())
    var key
    for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
      for (let a = 0; a < v.length; ++a) {
        if (v[a] === socket.id) {
          key = k

          for (let a = 0; a < connections[key].length; ++a) {
            io.to(connections[key][a]).emit("user-left", socket.id)
          }

          var index = connections[key].indexOf(socket.id)
          connections[key].splice(index, 1)

          console.log(key, socket.id, Math.ceil(diffTime / 1000))

          if (connections[key].length === 0) {
            delete connections[key]
          }
        }
      }
    }
  })
})

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
