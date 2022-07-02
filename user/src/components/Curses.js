import React, { Component } from "react";
//import authSvg from "../assests/update.svg";
import Navigation from "../screens/Navigation.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IconButton } from "@material-ui/core";
import {
  MdEdit,
  MdDelete,
  MdOpenInNew,
} from "react-icons/md";

import axios from "axios";
import {
  removeCookie,
  removeLocalStorage,
  setCookie,
  setLocalStorage,
  isAuth,
} from "../helpers/auth";


import { CountdownCircleTimer } from "react-countdown-circle-timer";

import KatexMarkdown from "./Markdown";







export default class CreateNote extends Component {
  state = {
    category: this.props.match.params.id,
    nombre: "",
    contenido: "",
    tarea: "",
    fechaexa: new Date(),
    timexa: "2",
    editing: false,
    zz: [],
    _id: "",
    submit: "",
  };

  getNotes = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/curses/cursosespecificos/` +
      this.props.match.params.id
    );
    this.setState({
      zz: res.data,
    });
    //console.log(res.data);
  };

  async componentDidMount() {
    this.getNotes();

    if (this.props.match.params.id) {
      //console.log(this.props.match.params.id);
      setCookie("id", this.props.match.params.id);
      setLocalStorage("id", this.props.match.params.id);
    } else {
      removeCookie("id");
      removeLocalStorage("id");
    }
  }

  createcurso = async (curseId) => {
    const newNote = {
      nombre: "this.state.nombre",
      contenido: "this.state.contenido",
      tarea: "this.state.tarea",
      fechaexa: "2022-06-25T16:23:08.196Z",
      timexa: "2022-06-25T16:23:08.196Z",
    };

    await axios.post(`${process.env.REACT_APP_API_URL}/curses`, newNote);
    this.getNotes();
    this.setState({
      nombre: "",
      contenido: "",
      tarea: "",
      fechaexa: "",
      timexa: "",
    });
    };
  upDate = async (curseId) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/curses/` + curseId
    );
    this.setState({
      category: res.data.category,
      nombre: res.data.nombre,
      contenido: res.data.contenido,
      tarea: res.data.tarea,
      fechaexa: new Date(res.data.fechaexa),
      timexa: res.data.timexa,
      editing: true,
      _id: res.data._id,
      submit: "Actualizar curso",
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    //console.log(this.state.editing);
    if (this.state.editing) {
      const updatedNote = {
        category: this.state.category,
        nombre: this.state.nombre,
        contenido: this.state.contenido,
        tarea: this.state.tarea,
        fechaexa: this.state.fechaexa,
        timexa: this.state.timexa,
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/curses/` + this.state._id,
        updatedNote
      );
      this.getNotes();
      toast.success("Actualizado correctamente");
    } else {
      const newNote = {
        category: this.state.category,
        nombre: this.state.nombre,
        contenido: this.state.contenido,
        tarea: this.state.tarea,
        fechaexa: this.state.fechaexa,
        timexa: this.state.timexa,
      };
      console.log(newNote);
      await axios.post(`${process.env.REACT_APP_API_URL}/curses`, newNote);
      this.getNotes();
      this.setState({
        nombre: "",
        contenido: "",
        tarea: "",
        fechaexa: "",
        timexa: "",
      });
    }
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDate = (fechaexa) => {
    this.setState({ fechaexa });
  };
  deleteNote = async (noteId) => {
    const response = window.confirm("Deseas eliminar este curso?");
    if (response) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/curses/` + noteId);
      this.getNotes();
    }
  };


  render() {
    return (
      <>
        <ToastContainer />
        <div
          className="modal fade"
          id="modalLoginForm"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-xl" role="document">
            <div className="modal-content">
              <form onSubmit={this.onSubmit}>
                <div className="modal-header h3">
                  Curso
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      onChange={this.onInputChange}
                      name="nombre"
                      value={this.state.nombre}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Contenido"
                      name="contenido"
                      rows="5"
                      onChange={this.onInputChange}
                      value={this.state.contenido}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Tarea"
                      name="tarea"
                      onChange={this.onInputChange}
                      value={this.state.tarea}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <DatePicker
                      className="form-control"
                      selected={this.state.fechaexa}
                      onChange={this.onChangeDate}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tiempo"
                      onChange={this.onInputChange}
                      name="timexa"
                      value={this.state.timexa}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer p-3">
                  <button className="btn btn-info">{this.state.submit}</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>

                </div>
              </form>
            </div>
          </div>
        </div>
        <Navigation />
        <div
          style={{ position: "fixed", bottom: 0 + "em", left: 0, zIndex: 1050 }}
        >
          <button
            className="btn btn-info"
            data-toggle="modal"
            data-target="#modalLoginForm"
            onClick={() => this.createcurso()}
            style={{ color: "inherit" }}
          >
            Nuevo capítulo
          </button>
        </div>
        <div className="container border p-0">
          <div className="container p-1 text-center bg-warning">
            <CountdownCircleTimer
              isPlaying
              duration={50}
              colors={[
                ["#004777", 0.33],
                ["#F7B801", 0.33],
                ["#A30000", 0.33],
              ]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>

            <div className="row m-0 d-flex justify-content-center align-items-center">
              {this.state.zz.map((note) => (
                <div
                  className="col-md-4 col-lg-4 p-1 bg-warning"
                  key={note._id}
                >
                  <div className="card">
                    <div className="card-header h5 text-center">
                        Curso: {note.nombre}

                    </div>
                    <div className="card-body">
                      <div>Id: {note._id}</div>
                      <div>Categoria: {note.category}</div>
                      <div>
                        Nombre: <KatexMarkdown>{note.nombre}</KatexMarkdown>
                      </div>
                      <div>
                        Contenido: <KatexMarkdown>{note.contenido}</KatexMarkdown>
                      </div>

                      <div className="text-left">
                        Tarea: <KatexMarkdown>{note.tarea}</KatexMarkdown>
                      </div>

                      <div>Fecha examen: {note.fechaexa}</div>
                      <div>Tiempo examen: {note.timexa}</div>

                    </div>
                    <div className="card-footer text-center">
                      <IconButton
                        className="btn btn-light"
                        data-toggle="modal"
                        data-target="#modalLoginForm"
                        onClick={() => this.upDate(note._id)}
                        style={{ color: "primary" }}
                      >
                        <MdEdit />
                      </IconButton>

                      <Link
                        to={
                          "/curso/" +
                          note._id +
                          "/" +
                          this.props.match.params.id
                        }
                      >
                        <IconButton className="btn btn-light" style={{ color: "primary" }}>
                          <MdOpenInNew />
                        </IconButton>
                      </Link>

                      <IconButton
                        onClick={() => this.deleteNote(note._id)}
                        className="btn btn-light" style={{ color: "primary" }}
                      >
                        <MdDelete />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isAuth()._id}
        </div>
      </>
    );
  }
}
