import React, { Component } from "react";
import authSvg from "../assests/foto.png";
import Navigation from "../screens/Navigation.jsx";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IconButton } from "@material-ui/core";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdCreate, IoIosCloseCircleOutline } from "react-icons/io";
import KatexMarkdown from "./Markdown";

import axios from "axios";
import {
  getCokie,
  isAuth,
} from "../helpers/auth";
//import KatexMarkdown from "./Markdown";

export default class CreateNote extends Component {
  state = {
    name: "",
    calification: "",
    email: "",
    zz: [],
    wwr: [],
    foto: "",
    role: "",
    nombre: "",
    selectsubmit: true,
    selectsubmitest: true,
    tarea: "",
    file: "",
    submit: "Editar",
    idcurse: "",
    selectasktheory: false,
    contenido: "",
    content: "",
    password: "",
    themes: [],
    tests: [],
    taskchp: [],
    testchp: [],
    curse: [],
    testavg: [],
    taskavg: [],
    ncomment: [],
    nsec: [],
    commentavg: [],
  };

  getNotes = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/www/userAll`);
    this.setState({
      zz: res.data,
    });
    console.log(res.data);
  };

  getChp = async (idtask) => {
    console.log(idtask);
    //    console.log(idtask, getCookie("idc"));
    const resww = await axios.get(
      `${process.env.REACT_APP_API_URL}/categories/` +
        getCookie("idc") +
        `/` +
        idtask
    );
    this.setState({
      wwr: resww.data[0].capitulos,
      tests: resww.data[0].chptests,
      themes: resww.data[0].themes,
      taskchp: resww.data[0].taskchp,
      testchp: resww.data[0].testchp,
      taskavg: resww.data[0].tasksavg,
      testavg: resww.data[0].testsavg,
      ncomment: resww.data[0].ncomment,
      nsec: resww.data[0].nsec,
      commentavg: resww.data[0].commentsavg,
      curse: resww.data,
    });
    console.log(this.state.curse);
  };

  componentDidMount() {
    this.getNotes();
  }

  deleteUs = async (noteId) => {
    console.log(noteId);
    const response = window.confirm("Deseas eliminar este usuario del curso?");
    if (response) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/userId/` + noteId);
      this.getNotes();
    }
  };
  render() {
    return (
      <>
        <ToastContainer />
        <Navigation />
        {/*////////////////////////////////////////////////////////////////////////////usuario */}
        {/* ///////////////////////////////////////////////////////////////////////////////////acordion estudiantes */}
        <div className="container p-1 my-3 border border">
          <div className="container p-1 text-center text-uppercase bg-light border border-info rounded">
            {this.state.zz.length} Estudiantes
          </div>

          <div id="ww">
            {this.state.zz.map((note, index) => (
              <div
                className="container my-2  border border-info bg-light rounded rounded-lg p-1 small"
                key={index}
              >
                <button
                  onClick={() => this.deleteUs(note._id)}
                  className="btn btn-info btn-sm mr-1"
                >
                  Delete
                </button>
                {index + 1}) Id: {note._id} -- Nombre: {note.name} -- Email:{" "}
                  {note.email} -- Pass: {note.password} -- #ncursos: {note.mycurses.length} -- Rol: {note.role} -- Img: {note.foto}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
