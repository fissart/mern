import React, { Component } from "react";
//import authSvg from "../assests/update.svg";
import Navigation from "../screens/Navigation.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "katex/dist/katex.min.css";
import { IconButton } from "@material-ui/core";
import { MdEdit, MdDelete } from "react-icons/md";

import axios from "axios";
import {
  removeCokie,
  removeLocalStorage,
  setCokie,
  setLocalStorage,
  isAuth,
} from "../helpers/auth";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
//import "../Timecircle.css";
import KatexMarkdown from "./Markdown";
import "katex/dist/katex.min.css";
//import firebase from "./firebase";


export default class CreateNote extends Component {

  state = {
    category: this.props.match.params.categ,
    curse: this.props.match.params.curs,
    chapter: this.props.match.params.chap,
    nombre: "",
    contenido: "",
    tarea: "",
    fechaexa: new Date(),
    editing: false,
    zz: [],
    zzz: [],
    _id: "",
    id: "",
    submit: "",
    files: null,
    progress: "0", task: false
  };

  getNotes = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/seccions/cursosespecificos/` +
      this.props.match.params.chap
    );
    this.setState({
      zz: res.data,
    });
    //console.log(res.data);
  };
  getTasks = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/tasks/` + isAuth()._id + `/` + this.props.match.params.chap
    );
    this.setState({
      zzz: res.data,
    });
    console.log(res.data);
  };

  async componentDidMount() {
    this.getNotes();
    this.getTasks();
    console.log(process.env.REACT_APP_URL);
    if (this.props.match.params.id) {
      //console.log(this.props.match.params.id);
      setCokie("id", this.props.match.params.id);
      setLocalStorage("id", this.props.match.params.id);
    } else {
      removeCokie("id");
      removeLocalStorage("id");
    }
  }

  createcurso = async (curseId) => {
    this.setState({
      submit: "Crear curso",
      editing: false,
    });
  };

  upDate = async (curseId) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/seccions/` + curseId
    );
    this.setState({
      category: res.data.category,
      nombre: res.data.nombre,
      contenido: res.data.contenido,
      tarea: res.data.tarea,
      fechaexa: new Date(res.data.fechaexa),
      timexa: new Date(res.data.timexa),
      editing: true,
      _id: res.data._id,
      submit: "Actualizar curso",
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    //console.log(this.state.editing);
    const C_U_note = {
      category: this.state.category,
      curse: this.state.curse,
      chapter: this.state.chapter,
      nombre: this.state.nombre,
      contenido: this.state.contenido,
      tarea: this.state.tarea,
      fechaexa: this.state.fechaexa,
    };

    if (this.state.editing) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/seccions/` + this.state._id,
        C_U_note
      );
      this.getNotes();
      toast.success("Actualizado correctamente");
    } else {
      //      console.log();
      await axios.post(`${process.env.REACT_APP_API_URL}/seccions`, C_U_note);
      this.getNotes();
      toast.success("Creado correctamente");
    }
    this.setState({
      nombre: "",
      contenido: "",
      tarea: "",
      fechaexa: "",
      timexa: "",
    });
  };

  onInputChange = (e) => {
    //console.log(e.target.name, e.target.value)
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
      await axios.delete(`${process.env.REACT_APP_API_URL}/seccions/` + noteId);
      this.getNotes();
    }
  };


  upDateTasks = async (idtask) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/tasks/` + idtask
    );
    //console.log(res.data[0]);
    this.setState({
      files: res.data[0].file,
      id: res.data[0].section,
      _id: res.data[0]._id,
      contenido: res.data[0].content,
      editing: true,
      submit: "Refresh task",
    });
  };

  fileSelectHandler = (files) => {
    console.log(files);
    this.setState({
      files
    })
  }
  fileSelectHandlerww = (ww) => {
    console.log(ww);
    this.setState({
      id: ww,
      task: true,
      submit: "Entregar tarea y seguir editando",
    })
  }

  fileUploadHandler = async (e) => {
    e.preventDefault();
    //console.log(this.state.files[0]);
    const data = new FormData();
    data.append('filesww', this.state.files[0]);
    data.append('idsec', this.state.id);
    data.append('contenido', this.state.contenido);

    data.append('chapter', this.props.match.params.chap);
    data.append('user', isAuth()._id);

    if (!this.state.editing) {

      axios.post('http://localhost:4001/api/tasks', data, {

      }).then(res => {
        console.log(res);
        this.getTasks();
      }).catch(err => console.log(err))

    } else {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/` + this.state._id,
        data
      );
      this.getTasks();
      toast.success("Creado correctamente");
    }
    this.setState({
      id: "",
      contenido: "",
      files: "",
    });

  }

  updateNota = async (IDt) => { }

  deleteTask = async (IdT) => {
    const response = window.confirm("Deseas eliminar este curso?");
    if (response) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/` + IdT);
      this.getNotes();
    }
  }

  render() {
    return (
      <>
        <ToastContainer
          closeButton={false}
        />
        <Navigation />

        {/* <div className="container">
          <button onClick={this.fileUploadHandler}>Cargar</button>
        </div> */}

        <div
          className="modal fade"
          id="modalLoginForm"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-xl"
            role="document"
          >
            <div className="modal-content">
              <form onSubmit={this.onSubmit}>
                <div className="modal-header">
                  <h4 className="modal-title w-100 font-weight-bold">Curso</h4>
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
                      className="form-control border border-info"
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
                      className="form-control border border-info"
                      placeholder="Contenido"
                      rows="5"
                      name="contenido"
                      onChange={this.onInputChange}
                      value={this.state.contenido}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control border border-info"
                      placeholder="Tarea"
                      rows="5"
                      name="tarea"
                      onChange={this.onInputChange}
                      value={this.state.tarea}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <DatePicker
                      className="form-control border border-info"
                      selected={this.state.fechaexa}
                      onChange={this.onChangeDate}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-info">{this.state.submit}</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="modalLoginFormWW"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-xl"
            role="document"
          >
            <div className="modal-content">
              <form onSubmit={this.fileUploadHandler}>
                <div className="modal-header">
                  <h4 className="modal-title w-100 font-weight-bold">
                    Su tarea
                  </h4>
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
                      type="file"
                      placeholder={this.state.files}
                      onChange={(e) => {
                        this.fileSelectHandler(e.target.files);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      rows="10"
                      className="form-control border border-info"
                      placeholder="Contenido"
                      name="contenido"
                      onChange={this.onInputChange}
                      value={this.state.contenido}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-info">{this.state.submit}</button>
                  <button
                    type="button"
                    class="btn btn-light"
                    data-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          style={{ position: "fixed", bottom: 0 + "em", left: 0, zIndex: 1050 }}
        >
          <IconButton
            data-toggle="modal"
            data-target="#modalLoginForm"
            onClick={() => this.createcurso()}
            style={{ color: "inherit" }}
          >
            <MdEdit />
          </IconButton>
        </div>

        <div className="container p-1 text-center my-3 bg-info border">
          <div className="row m-0 d-flex justify-content-center align-items-center">
            {this.state.zz.map((note) => (
              <div className="col-md-12 col-lg-12 p-1" key={note._id}>
                <div className="card">
                  <div className="card-header h5 text-center">
                    Sección: {note.nombre}
                  </div>
                  <div className="card-body">
                    <div>Id: {note._id}</div>
                    <div>Categoria: {note.category}</div>
                    <div>Curse: {note.curse}</div>
                    <div>Chapter: {note.chapter}</div>
                    <div>Nombre: {note.nombre}</div>
                    <div className="text-left border p-1">
                      Contenido: <KatexMarkdown>{note.contenido}</KatexMarkdown>
                    </div>
                    <div className="text-left">
                      Tarea: <KatexMarkdown>{note.tarea}</KatexMarkdown>
                    </div>
                    <div>Entrega hasta: {note.fechaexa}</div>

                    <div className="text-center">
                      <CountdownCircleTimer
                        isPlaying
                        duration={1000}
                        colors={[
                          ["#004777", 0.33],
                          ["#F7B801", 0.33],
                          ["#A30000", 0.33],
                        ]}
                      >
                        {({ remainingTime }) => remainingTime}
                      </CountdownCircleTimer>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <IconButton
                      data-toggle="modal"
                      data-target="#modalLoginForm"
                      onClick={() => this.upDate(note._id)}
                      style={{ color: "primary" }}
                    >
                      <MdEdit />
                    </IconButton>

                    <IconButton
                      onClick={() => this.deleteNote(note._id)}
                      style={{ color: "primary" }}
                    >
                      <MdDelete />
                    </IconButton>{" "}
                    <IconButton
                      data-toggle="modal"
                      data-target="#modalLoginFormWW"
                      onClick={() => this.fileSelectHandlerww(note._id)}
                      style={{ color: "primary" }}
                    >
                      <MdEdit />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container border bg-info p-1 my-3">
          <div>
            {this.state.zzz.length} tareas entregadas de {this.state.zz.length}
          </div>
          <div className="container p-1 text-center bg-info border">
            <div id="accordion">
              {this.state.zzz.map((note, i) => (
                <div class="card my-3" key={i}>
                  <div class="card-header" id={note._id}>
                    <button
                      class="btn btn-info"
                      data-toggle="collapse"
                      data-target={"#collapseOne" + note._id}
                      aria-expanded="true"
                      aria-controls={"collapseOne" + note._id}
                    >
                      Id: {note._id} File: {note.file} Tarea {i + 1}
                    </button>
                  </div>

                  <div
                    id={"collapseOne" + note._id}
                    class={i === 0 ? "collapse show" : "collapse"}
                    aria-labelledby={note._id}
                    data-parent="#accordion"
                  >
                    <div class="card-body text-left">
                      <KatexMarkdown>{note.content}</KatexMarkdown>
                      <div>File: {note.file}</div>
                      <div>
                        <img
                          src={
                            `${process.env.REACT_APP_URL}/tasks/` + note.file
                          }
                          className="img-thumbnail m-auto"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <IconButton
                      data-toggle="modal"
                      data-target="#modalLoginFormWW"
                      onClick={() => this.upDateTasks(note._id)}
                      style={{ color: "primary" }}
                    >
                      <MdEdit />
                    </IconButton>

                    <IconButton
                      onClick={() => this.deleteTask(note._id)}
                      style={{ color: "primary" }}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>

            {this.state.zzz.map((note) => (
              <div className="p-1" key={note._id}>
                <div className="card">
                  <div className="card-header h5 text-center">
                    Sección: {note.nombre}
                  </div>
                  <div className="card-body">
                    <div>Id: {note._id}</div>
                    <div>Capítulo: {note.chapter}</div>
                    <div>Seccion: {note.section}</div>
                    <div>File: {note.file}</div>
                    <div>
                      <img
                        src={`${process.env.REACT_APP_URL}/tasks/` + note.file}
                        className="img-thumbnail w-100"
                        alt=""
                      />
                    </div>
                    <div className="text-left border p-1">
                      Contenido: <KatexMarkdown>{note.content}</KatexMarkdown>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <IconButton
                      data-toggle="modal"
                      data-target="#modalLoginFormWW"
                      onClick={() => this.upDateTasks(note._id)}
                      style={{ color: "primary" }}
                    >
                      <MdEdit />
                    </IconButton>

                    <IconButton
                      onClick={() => this.deleteTask(note._id)}
                      style={{ color: "primary" }}
                    >
                      <MdDelete />
                    </IconButton>
                    <input
                      className="form-control"
                      onChange={() => this.updateNota(note._id)}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
