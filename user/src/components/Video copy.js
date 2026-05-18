import React, { Component } from "react";
import io from "socket.io-client";
// import { isAsignature, isAuth } from "../helpers/auth";
import { IoMdText } from "react-icons/io"
import { IconButton, Badge, Input, Button } from "@material-ui/core";
import { MdCallEnd } from "react-icons/md";
import { MdVideocam, MdVideocamOff, MdStopScreenShare, MdScreenShare, MdMic, MdMicOff } from "react-icons/md";
//import { message } from "antd";
//import "antd/dist/antd.css";
import { Modal, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../screens/Navigation.jsx";
import { isAuth } from "../helpers/auth.js";

const server_url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_URL
    : process.env.REACT_APP_URL
//:"http://localhost:9997";

var connections = {};
const peerConnectionConfig = {
  iceServers: [
    // { 'urls': 'stun:stun.services.mozilla.com' },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
var socket = null;
var socketId = null;
var elms = 0;

class Video extends Component {

  async componentDidMount() {
    document.title = "Conferencia ESFA"
  }

  constructor(props) {
    super(props);

    this.localVideoref = React.createRef();

    this.videoAvailable = false;
    this.audioAvailable = false;

    this.state = {
      video: false,
      audio: false,
      screen: false,
      showModal: false,
      screenAvailable: false,
      messages: [],
      message: "",
      newmessages: 0,
      askForUsername: true,
      username: 'isAuth().name',
    };
    connections = {};

    this.getPermissions();
  }

  componentWillUnmount() {
    this.handleEndCallNav();
  }

  //////////////////////////////////////////
  getPermissions = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => (this.videoAvailable = true))
        .catch(() => (this.videoAvailable = false));

      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => (this.audioAvailable = true))
        .catch(() => (this.audioAvailable = false));

      if (navigator.mediaDevices.getDisplayMedia) {
        this.setState({ screenAvailable: true });
      } else {
        this.setState({ screenAvailable: false });
      }

      if (this.videoAvailable || this.audioAvailable) {
        navigator.mediaDevices
          .getUserMedia({
            video: this.videoAvailable,
            audio: this.audioAvailable,
          })
          .then((stream) => {
            window.localStream = stream;
            this.localVideoref.current.srcObject = stream;
          })
          .then((stream) => { })
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };
  //////////////////////////////////////////
  getMedia = () => {
    this.setState(
      {
        video: this.videoAvailable,
        audio: this.audioAvailable,
      },
      () => {
        this.getUserMedia();
        this.connectToSocketServer();
      }
    );
  };
  //////////////////////////////////////////

  getUserMedia = () => {
    if (
      (this.state.video && this.videoAvailable) ||
      (this.state.audio && this.audioAvailable)
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: this.state.video, audio: this.state.audio })
        .then(this.getUserMediaSuccess)
        .then((stream) => { })
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = this.localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) { }
    }
  };
  //////////////////////////////////////////

  getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
      (track.onended = () => {
        this.setState(
          {
            video: false,
            audio: false,
          },
          () => {
            try {
              let tracks = this.localVideoref.current.srcObject.getTracks();
              tracks.forEach((track) => track.stop());
            } catch (e) {
              console.log(e);
            }

            let blackSilence = (...args) =>
              new MediaStream([this.black(...args), this.silence()]);
            window.localStream = blackSilence();
            this.localVideoref.current.srcObject = window.localStream;

            for (let id in connections) {
              connections[id].addStream(window.localStream);

              connections[id].createOffer().then((description) => {
                connections[id]
                  .setLocalDescription(description)
                  .then(() => {
                    socket.emit(
                      "signal",
                      id,
                      JSON.stringify({
                        sdp: connections[id].localDescription,
                      })
                    );
                  })
                  .catch((e) => console.log(e));
              });
            }
          }
        );
      })
    );
  };
  //////////////////////////////////////////

  getDislayMedia = () => {
    if (this.state.screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(this.getDislayMediaSuccess)
          .then((stream) => { })
          .catch((e) => console.log(e));
      }
    }
  };
  //////////////////////////////////////////

  getDislayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
      (track.onended = () => {
        this.setState(
          {
            screen: false,
          },
          () => {
            try {
              let tracks = this.localVideoref.current.srcObject.getTracks();
              tracks.forEach((track) => track.stop());
            } catch (e) {
              console.log(e);
            }

            let blackSilence = (...args) =>
              new MediaStream([this.black(...args), this.silence()]);
            window.localStream = blackSilence();
            this.localVideoref.current.srcObject = window.localStream;

            this.getUserMedia();
          }
        );
      })
    );
  };
  //////////////////////////////////////////

  gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketId) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };
  //////////////////////////////////////////

  changeCssVideos = (main) => {
    let height = String(100 / elms) + "%";
    let width = "";
    if (elms === 0 || elms === 1) { width = "100%"; height = "100%"; } else if (elms === 2) { width = "45%"; height = "100%"; } else if (elms === 3 || elms === 4) { width = "31%"; height = "50%"; } else { width = String(100 / elms) + "%"; }

    let videos = main.querySelectorAll("video");

    for (let a = 0; a < videos.length; ++a) {
      // videos[a].style.minWidth = minWidth;
      // videos[a].style.minHeight = minHeight;
      videos[a].style.setProperty("width", width);
      videos[a].style.setProperty("height", height);
    }
    return { width, height }
    // return { minWidth, minHeight, width, height };
  };
  //////////////////////////////////////////

  connectToSocketServer = () => {
    socket = io.connect(server_url, { secure: true });

    socket.on("signal", this.gotMessageFromServer);

    socket.on("connect", () => {
      socket.emit("join-call", window.location.href);
      socketId = socket.id;

      socket.on("chat-message", this.addMessage);

      socket.on("user-left", (id) => {
        let video = document.querySelector(`[data-socket="${id}"]`);
        if (video !== null) {
          elms--;
          video.parentNode.removeChild(video);

          let main = document.getElementById("main");
          this.changeCssVideos(main);
        }
      });

      socket.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConnectionConfig
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socket.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            // TODO mute button, full screen button
            var searchVidep = document.querySelector(
              `[data-socket="${socketListId}"]`
            );
            if (searchVidep !== null) {
              // if i don't do this check it make an empyt square
              searchVidep.srcObject = event.stream;
            } else {
              elms = clients.length;
              elms = clients.length;
              let main = document.getElementById("main");
              // let cssMesure = this.changeCssVideos(main);
              // console.log(cssMesure)

              const parentElement = document.createElement('div');
              parentElement.className = 'p-1 bg-info col-md-4  w-100';

              let video = document.createElement("video");
              video.className = 'bg-info w-100 h-100';
              // video.style.setProperty("height", cssMesure.height);
              video.setAttribute("data-socket", socketListId[0]);
              video.srcObject = event.stream;
              video.autoplay = true;
              // video.playsinline = true

              const titlet = document.createElement('div');
              titlet.textContent = socketListId;
              titlet.className = 'rounded bg-light p-1 text-center';


              // let css = { minWidth: cssMesure.minWidth, minHeight: cssMesure.minHeight, minHeight: "100%", borderStyle: "solid", borderColor: "orange", objectFit: "fill", }

              // for (let i in css) { video.style[i] = css[i] }

              // for (let i in css) www.style[i] = css[i]

              parentElement.appendChild(video);
              parentElement.appendChild(titlet);

                // www.style.setProperty("width", cssMesure.width);
              // www.style.setProperty("height", cssMesure.height);
              // www.setAttribute("data-socket", socketListId[0]);
              // www.srcObject = event.stream;
              // www.autoplay = true;
              // www.playsinline = true
              // www.textContent = 'This is the name';
              main.appendChild(parentElement)
              // video.appendChild(www)
            }
          };

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([this.black(...args), this.silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketId) {
          for (let id2 in connections) {
            if (id2 === socketId) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) { }

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socket.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };
  //////////////////////////////////////////

  silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  //////////////////////////////////////////

  black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };
  //////////////////////////////////////////

  handleVideo = () =>
    this.setState({ video: !this.state.video }, () => this.getUserMedia());
  //////////////////////////////////////////

  handleAudio = () =>
    this.setState({ audio: !this.state.audio }, () => this.getUserMedia());
  //////////////////////////////////////////

  handleScreen = () =>
    this.setState({ screen: !this.state.screen }, () => this.getDislayMedia());
  //////////////////////////////////////////

  handleEndCallNav = () => {
    try {
      let tracks = this.localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) { }

  };

  handleEndCall = () => {
    try {
      let tracks = this.localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) { }
    window.location.href = "/";
  };
  //////////////////////////////////////////

  openChat = () => this.setState({ showModal: true, newmessages: 0 });
  //////////////////////////////////////////

  closeChat = () => this.setState({ showModal: false });
  //////////////////////////////////////////

  handleMessage = (e) => this.setState({ message: e.target.value });

  addMessage = (data, sender, socketIdSender) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, { sender: sender, data: data }],
    }));
    if (socketIdSender !== socketId) {
      this.setState({ newmessages: this.state.newmessages + 1 });
    }
  };

  handleUsername = (e) => this.setState({ username: e.target.value });

  sendMessage = () => {
    socket.emit("chat-message", this.state.message, this.state.username);
    this.setState({ message: "", sender: this.state.username });
  };

  copyUrl = () => {
    let text = window.location.href;
    if (!navigator.clipboard) {
      let textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        //message.error("Link copied to clipboard!");
      } catch (err) {
        //message.error("Failed to copy");
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        //message.success("Link copied to clipboard!");
        toast.success("Link copiado");
      },
      () => {
        //message.error("Failed to copy");
      }
    );
  };

  connect = () =>
    this.setState({ askForUsername: false }, () => this.getMedia());

  isChrome = function () {
    let userAgent = (navigator && (navigator.userAgent || "")).toLowerCase();
    let vendor = (navigator && (navigator.vendor || "")).toLowerCase();
    let matchChrome = /google inc/.test(vendor)
      ? userAgent.match(/(?:chrome|crios)\/(\d+)/)
      : null;
    let matchFirefox = userAgent.match(/(?:firefox|fxios)\/(\d+)/)
    return matchChrome !== null || matchFirefox !== null
    return matchChrome !== null;
  };

  render() {
    if (this.isChrome() === false) {
      return (
        <div
          style={{
            background: "white",
            width: "30%",
            height: "auto",
            padding: "20px",
            minWidth: "400px",
            textAlign: "center",
            margin: "auto",
            marginTop: "50px",
            justifyContent: "center",
          }}
        >
          <h1>Sorry, this works only with Google Chrome</h1>
        </div>
      );
    }

    return (
      <div>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />
        <Navigation />
        {this.state.askForUsername === true ? (
          <div className="container my-1 border border-info p-1 rounded">
            {/* <div className="container bg-light p-1 text-center">
              <button
                className="btn btn-info mt-1"
                onClick={this.connect}
              >
                Conectarse a la conferencia
              </button>
            </div> */}

            {/* <div className="container bg-warning text-center"> */}
            {/* <p>Set your username</p> */}
            {/* <Input
                placeholder="Username"
                value={this.state.username}
                onChange={(e) => this.handleUsername(e)}
                /> */}
            <button
              className="btn btn-info w-100 mb-1"
              onClick={this.connect}
            >
              Conectarse como {isAuth().email}
            </button>
            {/* </div> */}

            <div className="text-center">
              <video
                id="my-video"
                ref={this.localVideoref}
                autoPlay
                muted
                style={{
                  // borderStyle: "solid",
                  // borderColor: "rgba(134, 234, 232, 1)",
                  // objectFit: "fill",
                  // width: "100%",
                  height: "100%",
                }}
              ></video>
            </div>
          </div>
        ) : (
          <div className="container my-2 rounded border p-1">
            <div className="container text-center fixed-bottom">
              <IconButton
                style={{ color: "#424242" }}
                onClick={this.handleVideo}
              >
                {this.state.video === true ? <MdVideocam /> : <MdVideocamOff />}
              </IconButton>

              <IconButton
                style={{ color: "#f44336" }}
                onClick={this.handleEndCall}
              >
                <MdCallEnd />
              </IconButton>

              <IconButton
                style={{ color: "#424242" }}
                onClick={this.handleAudio}
              >
                {this.state.audio === true ? <MdMic /> : <MdMicOff />}
              </IconButton>

              {this.state.screenAvailable === true ? (
                <IconButton
                  style={{ color: "#424242" }}
                  onClick={this.handleScreen}
                >
                  {this.state.screen === true ? (
                    <MdScreenShare />
                  ) : (
                    <MdStopScreenShare />
                  )}
                </IconButton>
              ) : null}

              <Badge
                badgeContent={this.state.newmessages}
                max={999}
                color="secondary"
                onClick={this.openChat}
              >
                <IconButton
                  style={{ color: "#424242" }}
                  onClick={this.openChat}
                >
                  <IoMdText />
                </IconButton>
              </Badge>
            </div>

            <Modal
              show={this.state.showModal}
              onHide={this.closeChat}
              style={{ zIndex: "999999" }}
              animation={false}
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body
                style={{
                  overflow: "auto",
                  overflowY: "auto",
                  height: "400px",
                  textAlign: "left",
                }}
              >
                {this.state.messages.length > 0 ? (
                  this.state.messages.map((item, index) => (
                    <div key={index} style={{ textAlign: "left" }}>
                      <p style={{ wordBreak: "break-all" }}>
                        <b>{item.sender}</b>: {item.data}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No hay mensajes aún</p>
                )}
              </Modal.Body>
              <Modal.Footer className="div-send-msg">
                <Input
                  placeholder="Message"
                  value={this.state.message}
                  onChange={(e) => this.handleMessage(e)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.sendMessage}
                >
                  Enviar
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="container bg-warning rounded justify-content-center align-items-center p-1">
              {/* <div className="card"> */}
              {/* <Input
                  className="form-class"
                  value={window.location.href}
                  disable="true"
                ></Input> */}
              <button
                className="btn btn-info w-100"
                onClick={this.copyUrl}
              >
                Copiar y enviar link
              </button>
              {/* </div> */}

              <div id="main" className="row justify-content-center align-items-center border" style={{margin: ".0em", padding: ".1em", }}>
                <video className="w-100 h-100 col-md-4" id="my-video" ref={this.localVideoref} autoPlay muted >
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Video;
