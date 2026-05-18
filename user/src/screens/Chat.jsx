import React, { Component } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authSvgwww from "../assests/foto.png";
import { signout, isAuth, getCokie } from "../helpers/auth";
import axios from "axios";
// import "react-chat-elements/dist/main.css";
// import { ChatList } from 'react-chat-elements'
//var beep = require("beepbeep");
//import Notifier from "react-desktop-notification"
// import authSvg from "../assests/1295198.svg";
// import foto from "../assests/foto.png";
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-build-classic';
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
// import { PiVideoConference } from "react-icons/pi"
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
// import renderMathInElement from 'katex/dist/contrib/auto-render';
import Markdownkatexnew from "../components/Markdown";
import * as timeago from 'timeago.js';

// import it first.
import es from 'timeago.js/lib/lang/es';

// register it.
timeago.register('es', es);


export default class Admin extends Component {
  state = {
    userr: [],
  };

  // nodes = document.querySelectorAll('.timeago');

  constructor() {
    super();
    this.ref = React.createRef();
    this.showNotification = this.showNotification.bind(this);
    this.state = {
      messages: [],
      users: [],
      mensaje: "",

    };
  }

  // componentDidUpdate() {
  //   render(nodes, 'zh_CN');
  // }
  componentWillUnmount() {
    this.socket.disconnect();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {

    this.socket = io(`${process.env.REACT_APP_URL}`);
    if (isAuth()) {
      // console.log("new")
      this.getUser();
    } else {
      const www = { user: 'res.data._id', email: 'res.data.email', name: 'www', id: 'res.data._id', foto: 'res.data.foto', ref: window.location.href };
      this.socket.emit("usssers", www)

    }
    if (!("Notification" in window)) { alert("This browser does not support desktop notification"); } else { Notification.requestPermission(); }


    this.socket.on("mesages", (ww) => {
      //console.log(ww, "www");
      if (isAuth()._id === ww.user) { } else {
        toast.warn("Mensaje de " + ww.name);
      }
      this.setState({
        messages: [ww, ...this.state.messages],
      });
      //beep([1000, 500, 2000]);
    })

    this.socket.on("usersss", (ww) => {
      console.log(ww, "ww")
      this.setState({
        users: []
      })

      for (let i = 0; i < ww.length; i++) {
        console.log(ww[i])
        this.setState({
          users: [ww[i], ...this.state.users],
        })
      }
    })


    this.socket.on("load old msgs", (ww) => {
      console.log(ww, "load old msgs")
      for (let i = 0; i < ww.length; i++) {
        const www = { mensaje: ww[i].mensaje, email: ww[i].usser[0].email, name: ww[i].usser[0].name, create: ww[i].createdAt, foto: ww[i].usser[0].foto };

        this.setState({
          messages: [www, ...this.state.messages],
        });
      }
      console.log(this.state.messages);
    });

  }
  ///////////////////////////////////////////////////////////////////////////////////////////////



  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const user = `${this.state.userr._id}`
  //   const name = `${this.state.userr.name}`
  //   const email = `${this.state.userr.email}`
  //   const mensaje = e.target.value;
  //   //console.log(e.target.value)
  //   if (e.keyCode === 13 && mensaje) {
  //     this.socket.emit("mesagess", { mensaje, user, name, email });
  //     e.target.value = "";
  //   }
  // };

  sendMessage = () => {
    //e.preventDefault();
    const user = isAuth()._id
    const name = `${this.state.userr.name}`
    const email = `${this.state.userr.email}`
    const mensaje = this.state.mensaje
    //console.log(mensaje, name)
    if (mensaje && name && email) {
      this.socket.emit("mesagess", { mensaje, user, name, email });
    }
    this.setState({ mensaje: "" });
    // if (e.keyCode === 13 && mensaje) {
    //   this.socket.emit("mesagess", { mensaje, user, name, email });
    // }
    //e.target.value = ""
  };
  // = () => {
  //   socket.emit("chat-message", this.state.message, this.state.username);
  // };



  getUser = async () => {
    const token = getCokie("token");
    await axios.get(
      `${process.env.REACT_APP_API_URL}/users/user/${isAuth()._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/json; charset=UTF-8',
          Accept: `application/json`,
        },
      }
    ).then((res) => {
      this.setState({
        userr: res.data,
      })
      // console.log(token, "wwWWW")
      // console.log(res.data, "wwWWW")
      const www = { user: res.data._id, email: res.data.email, name: res.data.name.replace(/[^\x00-\x7F]/g, '&#209'), id: res.data._id, foto: res.data.foto, ref: window.location.href };
      this.socket.emit("usssers", www)
    })
      .catch((err) => {
        // toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            window.location.href = "/login";
          });
        }
      });
    // this.setState({
    //   userr: res.data,
    // })
  }


  showNotification() {
    new Notification("Hey");
    //toast.warn("Mensaje de www");

  }



  render() {
    const messagges = this.state.messages.map((message, i) => {
      return (
        <div key={i} className={`my-2 bg-light p-1 ${isAuth().email === message.email ? 'border-right border-warning' : 'border-left border-primary'}`} style={isAuth().email === message.email ? { fontSize: 14, float: "right", clear: "right" } : { fontSize: 14, float: "left", clear: "left" }}>
          <div className={`text-left ${isAuth().email === message.email ? 'text-info' : 'text-primary'}`} style={{ fontSize: 14 }}>
            {message.name + '-' + message.email}
          </div>
          <Markdownkatexnew>
            {message.mensaje}
          </Markdownkatexnew>
          <div className="text-secondary text-right" style={{ fontSize: 12 }}>
            <TimeAgo datetime={message.create} locale='es_ES' />
          </div>

          {/* <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={[
              {
                title: message.name + '-' + message.email,
                position: isAuth().email === message.email ? "right" : "left",
                type: "text",
                text: <Markdownkatexnew>{message.mensaje.replace(new RegExp('</p>', 'g'), '').replace(new RegExp('<p>', 'g'), '')}</Markdownkatexnew>,
                date: message.create ? new Date(message.create) : new Date(),
              },
            ]}
          /> */}
        </div>
      );
    });

    const usser = this.state.users.map((user, j) => {
      return (
        <div key={j} className="border bg-light p-1 pb-0 rounded" style={{ marginBottom: ".2em" }}>
          <img className="wrapperestchat p-0" alt="www"
            src={
              `${process.env.REACT_APP_URL}/profile/` + user.foto
            }
            onError={(e) => {
              e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px";
            }}
          />
          <div className="text-secondary text-right" style={{ fontSize: 12 }}>
            {user.email} {isAuth().rol == '1' ? user.ip.substring(7) : ""}
          </div>
          <div className="text-secondary text-right" style={{ fontSize: 12 }}>
            {isAuth().rol == '1' ? user.ref : ""}
          </div>
          <div className="timeago text-secondary text-right" style={{ fontSize: 12 }}>
            <TimeAgo datetime={user.time} locale='es_ES' />
            {/* <ChatList
                className="chat-list"
                dataSource={[
                  {
                    avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
                    alt: "Reactjs",
                    title: user.email,
                    subtitle: user.name,
                    date: new Date(),
                    unread: 2,
                  },
                ]}
              /> */}
          </div>
        </div>
      );
    });

    return (
      <>
        {
          isAuth().rol === '1' || window.location.href === `http://localhost:3000/tramites` ?
            // isAuth().rol === '1' || window.location.href === `${process.env.REACT_APP_pro}/tramites` ?
            <div className="container border my-3 rounded">
              <div className="row">
                <div className="col-md-4 rounded-left p-2"> {usser} </div>
                <div className="col-md-8 rounded-right p-2">
                  {/* <textarea value={this.state.mensaje} ></textarea> */}
                  <CKEditor className="rounded"
                    editor={ClassicEditor}
                    config={{ language: 'es', toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "blockQuote", "insertTable", "|", "undo", "redo"], placeholder: 'Descripción', isReadOnly: 'true' }}
                    data={this.state.mensaje}
                    onChange={(event, editor) => { this.setState({ mensaje: editor.getData() }) }}
                    onReady={editor => { console.log('Editor is ready to use!', editor) }}
                  />
                  <div className="w-100"> <button className="btn btn-info w-100 rounded-0" onClick={this.sendMessage} > Enviar </button> </div>
                  {messagges}
                </div>
              </div>
            </div>
            : ""
        }
      </>
    );
  }
}
