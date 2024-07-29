import React, { Component } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuth, getCookie } from "../helpers/auth";
import axios from "axios";
//import addNotification from "react-push-notification";

import { MeetingItem, SideBar, Navbar, MeetingList, Input, MessageBox, MeetingMessage, MessageList, ChatList, Button, Popup, ChatItem, } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
//var beep = require("beepbeep");
//import Notifier from "react-desktop-notification"

export default class Admin extends Component {
  state = {
    userr: [],
  };

  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
    this.state = {
      messages: [],
      users: [],
    };
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }

    this.getUser();

    this.socket = io(`${process.env.REACT_APP_URL}`);

    this.socket.on("mesages", (ww) => {
      this.setState({
        messages: [ww, ...this.state.messages],
      });
      //console.log(ww.id);
      //console.log(isAuth()._id);
      if (isAuth()._id === ww.id) {
      } else {
        toast.warn(ww.msg + " de " + ww.user);

      }
      //      beep([1000, 500, 2000]);
    });

    this.socket.on("users", (ww) => {
      //console.log(ww);
      for (let i = 0; i < ww.length; i++) {
        const www = {
          user: ww[i],
          i: i,
        };
        //console.log(www);
        this.setState({
          users: [www, ...this.state.users],
        });
        //console.log(this.state.users);
      }
    });


    this.socket.on("load old msgs", (ww) => {
      for (let i = 0; i < ww.length; i++) {
        const www = {
          msg: ww[i].mensaje,
          user: ww[i].nombre,
          create: ww[i].createdAt,
          id: ww[i].id,
        };
        console.log(www);
        this.setState({
          messages: [www, ...this.state.messages],
        });
        console.log(this.state.messages);
      }
    });
  }



  getUser = async () => {
    const token = getCookie("token");
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    this.socket.emit("usuarios", res.data.email);
    //console.log(res.data.email);
    this.setState({
      userr: res.data,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = `${this.state.userr.email}`;
    const id = `${this.state.userr._id}`;
    const msg = e.target.value;
    //console.log(e.target.value)
    if (e.keyCode === 13 && msg) {
      this.socket.emit("mesagess", { msg, user, id });
      e.target.value = "";
    }
  };

  showNotification() {
    new Notification("Hey");
  }


  render() {

    const messagges = this.state.messages.map((message, index) => {
      return (
        <div key={index}>
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={[
              {
                title: message.user,
                position: isAuth()._id === message.id ? "right" : "left",
                type: "text",
                text: message.msg,
                date: message.create ? new Date(message.create) : new Date(),
              },
            ]}
          />
        </div>
      );
    });

    const usser = this.state.users.map((user, i) => {
      return (
        <div key={i}>
          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar:
                  "data:image/jpeg;base64,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",
                alt: "Reactjs",
                title: user.user,
                subtitle: "What are you doingwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww?",
                date: new Date(),
                unread: 0,
              },
            ]}
          />
        </div>
      );
    });

    return (
      <div className="container bg-light">
        <ToastContainer />

        <div className="row">
          <div className="col-md-4 rounded-left p-2">
            {usser}
          </div>
          <div className="col-md-8 rounded-right p-2">
            <Input placeholder="Type here..." multiline={false} autoHeight={true} onKeyUp={this.handleSubmit.bind(this)} />
            {/* <form onSubmit={this.handleSubmit.bind(this)}>
              <textarea className="form-control" type="text" placeholder="Mensaje" onChange={this.handleSubmit} />
              <button type="submit" className="btn btn-light my-1">
                Enviar
              </button>
            </form> */}
            {messagges}
          </div>
          <div>
            <button className="btn btn-info" onClick={this.showNotification}>
              Click to show notification
            </button>
          </div>
        </div>

      </div>
    );
  }
}
