import React, { Component } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authSvgwww from "../assests/foto.png";
import { isAuth, getCokie } from "../helpers/auth";
import axios from "axios";
//import addNotification from "react-push-notification";
// import { MeetingItem, SideBar, Navbar, MeetingList, Input, MessageBox, MeetingMessage, MessageList, ChatList, Button, Popup, ChatItem, } from "react-chat-elements";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
//var beep = require("beepbeep");
//import Notifier from "react-desktop-notification"
// import authSvg from "../assests/1295198.svg";
import foto from "../assests/foto.png";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import Markdownkatexnew from "../components/Markdown";
import { BlockMath, InlineMath } from "react-katex";
const { format, register } = require('timeago.js') //Puede utilizar `import` para Javascript code.

register('es_ES', (number, index, total_sec) => [
  ['justo ahora', 'ahora mismo'],
  ['hace %s segundos', 'en %s segundos'],
  ['hace 1 minuto', 'en 1 minuto'],
  ['hace %s minutos', 'en %s minutos'],
  ['hace 1 hora', 'en 1 hora'],
  ['hace %s horas', 'in %s horas'],
  ['hace 1 dia', 'en 1 dia'],
  ['hace %s dias', 'en %s dias'],
  ['hace 1 semana', 'en 1 semana'],
  ['hace %s semanas', 'en %s semanas'],
  ['1 mes', 'en 1 mes'],
  ['hace %s meses', 'en %s meses'],
  ['hace 1 año', 'en 1 año'],
  ['hace %s años', 'en %s años']
][index]);

const timeago = timestamp => format(timestamp, 'es_ES');


export default class Admin extends Component {
  state = {
    userr: [],
  };

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


  componentWillUnmount() {
    this.socket.disconnect();
  }

  componentDidMount() {
    console.log(isAuth(), "wwwww123")
    if (this.ref.current) {
      console.log("wwwork")
      renderMathInElement(this.ref.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
        ],
      });
    }
    // renderMathInElement(this.ref.current);
    this.getUser();
    if (!("Notification" in window)) { alert("This browser does not support desktop notification"); } else { Notification.requestPermission(); }

    this.socket = io(`${process.env.REACT_APP_URL}`);

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

    this.socket.on("users", (ww) => {
      console.log(ww, "ww")
      this.setState({
        users: []
      })

      for (let i = 0; i < ww.length; i++) {
        //console.log(ww[i])
        // const www = {
        //   user: ww[i],
        //   i: i,
        // };
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



  handleSubmit = (e) => {
    e.preventDefault();
    const user = `${this.state.userr._id}`
    const name = `${this.state.userr.name}`
    const email = `${this.state.userr.email}`
    const mensaje = e.target.value;
    //console.log(e.target.value)
    if (e.keyCode === 13 && mensaje) {
      this.socket.emit("mesagess", { mensaje, user, name, email });
      e.target.value = "";
    }
  };

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
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/json; charset=UTF-8',
          Accept: `application/json`,
        },
      }
    );
    this.setState({
      userr: res.data,
    })
    const www = { user: res.data._id, email: res.data.email, name: res.data.name.replace(/[^\x00-\x7F]/g, '&#209'), id: res.data._id, foto: res.data.foto };
    await this.socket.emit("usssers", www)
  }


  showNotification() {
    new Notification("Hey");
    //toast.warn("Mensaje de www");

  }



  render() {
    const messagges = this.state.messages.map((message, index) => {
      return (
        <div key={index} className={`my-2 bg-light p-1 ${isAuth().email === message.email ? 'border-right border-warning' : 'border-left border-primary'}`} style={isAuth().email === message.email ? { fontSize: 14, float: "right", clear: "right" } : { fontSize: 14, float: "left", clear: "left" }}>
          <div className={`text-left ${isAuth().email === message.email ? 'text-info' : 'text-primary'}`} style={{ fontSize: 14 }}>
            {message.name + '-' + message.email}
          </div>

          <Markdownkatexnew>
            {message.mensaje.replace(/(<oembed url="https:\/\/www.dailymotion.com\/video\/)(.*?)(".*?oembed>)/g, `<iframe width='100%' height='350' src="https://www.dailymotion.com/embed/video/$2"></iframe>`).replace(/(<oembed url="https:\/\/www.youtube.com\/watch\?v=)(.*?)(".*?oembed>|&.*?oembed>)/g, ` <iframe width='100%' height='350' src="https://www.youtube.com/embed/$2"></iframe>`).replace(/(<script type="math\/tex; mode=display">)(.*?)(<\/script>)/g, "\n$$$$\n$2\n$$$$\n").replace(/(<script type="math\/tex">)(.*?)(<\/script>)/g, "$$$2$$").replace(/(<p>)/g, "").replace(/(<\/p>)/g, "").replace(/(<h2>)/g, "").replace(/(<\/h2>)/g, "").replace(/(<li>)/g, "\n 1. ").replace(/(<\/li>)/g, "").replace(/(<ol>)/g, "").replace(/(<\/ol>)/g, "").replace(/(<blockquote>)/g, "\n > ").replace(/(<\/blockquote>)/g, "\n\n ")}
          </Markdownkatexnew>
          {/* {message.mensaje.replace(/(<oembed url="https:\/\/www.dailymotion.com\/video\/)(.*?)(".*?oembed>)/g, `<iframe width='100%' height='350' src="https://www.dailymotion.com/embed/video/$2"></iframe>`).replace(/(<script type="math\/tex; mode=display">)(.*?)(<\/script>)/g, "\n\n$$$$\n$2\n$$$$\n\n").replace(/(<script type="math\/tex">)(.*?)(<\/script>)/g, "$$$2$$").replace(/(<p>)/g, "").replace(/(<\/p>)/g, "")} */}
          {/* <Markdownkatexnew>
          {"$\\epsilon$ entonces \n$$\n\\epsilon\n$$\n <iframe width='100%' height='350' src='https://www.dailymotion.com/embed/video/x8uv6iq'></iframe>"}
          </Markdownkatexnew> */}
          {/* {message.mensaje.replace(/(<oembed url="https:\/\/www.dailymotion.com\/video\/)(.*?)(".*?oembed>)/g, `<iframe width='100%' height='350' src="https://www.dailymotion.com/embed/video/$2"></iframe>`).replace(/(<script type="math\/tex; mode=display">)(.*?)(<\/script>)/g, "\n$$$$\n$2\n$$$$\n").replace(/(<script type="math\/tex">)(.*?)(<\/script>)/g, " $$$2$$ ").replace(/(<p>)/g, "").replace(/(<\/p>)/g, "")} */}
          {/* <div dangerouslySetInnerHTML={{ __html: `$\\int_0^\\infty x^2dx$
          $$$$\n\\int_0^\\infty x^2dx\n$$$$
          <iframe width='100%' height='350' src='https://www.dailymotion.com/embed/video/x8uv6iq'></iframe>` }} /> */}

          {/* <div dangerouslySetInnerHTML={{ __html: message.mensaje.replace(/(<oembed url="https:\/\/www.dailymotion.com\/video\/)(.*?)(".*?oembed>)/g, `<iframe width='100%' height='350' src="https://www.dailymotion.com/embed/video/$2"></iframe>`).replace(/(<script type="math\/tex; mode=display">)(.*?)(<\/script>)/g, "\n$$$$\n$2\n$$$$\n").replace(/(<script type="math\/tex">)(.*?)(<\/script>)/g, "$$$2$$") }} /> */}

          {/* ..................................................{message.mensaje.replace(/(<oembed url="https:\/\/www.dailymotion.com\/video\/)(.*?)(".*?oembed>)/g, `<iframe width='100%' height='350' src="https://www.dailymotion.com/embed/video/$2"></iframe>`).replace(/(<script type="math\/tex; mode=display">)(.*?)(<\/script>)/g, "<InlineMath>$2</InlineMath>").replace(/(<script type="math\/tex">)(.*?)(<\/script>)/g, "<InlineMath>$2</InlineMath>")}
        */}
          <div className="text-secondary text-right" style={{ fontSize: 12 }}>
            {timeago(message.create)}
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

    const usser = this.state.users.map((user, i) => {
      return (
        <div key={i} className="border border-info p-1">
          <img className="wrapperestchat p-0"
            src={
              `${process.env.REACT_APP_URL}/profile/` + user.foto
            }
            onError={(e) => {
              e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px";
            }}
          />
          <div className="text-secondary text-right" style={{ fontSize: 12 }}>
            {user.email} {user.name}
          </div>
          <div className="text-secondary text-right" style={{ fontSize: 12 }}>
            {timeago(new Date())}
            {/* <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: user.foto!=undefined ? `${process.env.REACT_APP_URL}/profile/` + user.foto : foto,
                alt: "Reactjs",
                title: user.email,
                subtitle: user.name,
                date: new Date(),
                // unread: this.state.messages.length,
              },
            ]}
          /> */}
          </div>
        </div>
      );
    });

    return (
      <div className="container border">
        <div className="row">
          <div className="col-md-4 rounded-left p-2"> {usser} </div>
          <div className="col-md-8 rounded-right p-2">
            {/* <textarea value={this.state.mensaje} ></textarea> */}
            <CKEditor
              editor={ClassicEditor}
              config={{ language: 'es', }}
              data={this.state.mensaje}
              onChange={(event, editor) => { this.setState({ mensaje: editor.getData() }) }}
              onReady={editor => { console.log('Editor is ready to use!', editor) }}
            />
            <div className="w-100"> <button className="btn btn-info w-100 rounded-0" onClick={this.sendMessage} > Enviar </button> </div>
            {messagges}
          </div>
        </div>
      </div>
    );
  }
}
