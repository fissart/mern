import React, { Component } from "react";
import authSvg from "../assests/foto.png";
import authSvgw from "../assests/image.png";
import Navigation from "../screens/Navigation.jsx";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IconButton } from "@material-ui/core";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdCreate, IoIosCloseCircleOutline } from "react-icons/io";
import KatexMarkdown from "./Markdown";
import { Modal, Row } from "react-bootstrap";

import axios from "axios";
import {
  //removeCookie,
  //removeLocalStorage,
  //setCookie,
  //setLocalStorage,
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
    showModal: false,
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

  open = () => this.setState({ showModal: true });
  close = () => this.setState({ showModal: false });

  getNotes = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/` + getCookie("idc")
    );
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

  onInputChange = (e) => {
    //console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createUs = () => {
    this.setState({
      editing: false,
      submit: "Crear usuario",
    });
  };

  upDateUs = async (iduser) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/userId/` + iduser
    );
    console.log(res.data);
    this.setState({
      name: res.data.name,
      email: res.data.email,
      foto: res.data.foto,
      role: res.data.role,
      password: res.data.passw,
      _id: res.data._id,
      editing: true,
      submit: "Actualizar usuario",
    });
  };

  onSubmitUser = async (e) => {
    e.preventDefault();
    const Data = {
      name: this.state.name,
      email: this.state.email,
      foto: this.state.foto,
      role: this.state.role,
      password: this.state.password,
      curse: getCookie("idc"),
      id: this.state.id,
    };
    if (this.state.editing) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/userUp/` + this.state._id,
        Data
      );
      this.getNotes();
      toast.dark("Actualizado correctamente");
    } else {
      console.log(Data);

      // const curseAdd = {
      //   user: isAuth()._id,
      //   curse: getCookie("idc"),
      // };

      await axios.post(`${process.env.REACT_APP_API_URL}/userCr`, Data);
      // await axios.post(`${process.env.REACT_APP_API_URL}/mycurses`, curseAdd);

      //  await axios.post(`${process.env.REACT_APP_API_URL}/mycurses`, curseAdd);
      this.getNotes();
      this.setState({
        nombre: "",
        contenido: "",
      });
    }
  };

  onSubmitask = async (e) => {
    console.log("wwwwwww");
    e.preventDefault();
    const Data = {
      contenido: this.state.content,
      calification: this.state.calification,
    };
    await axios.put(
      `${process.env.REACT_APP_API_URL}/tasks/` + this.state._id,
      Data
    );
    this.getChp(this.state.idcurse);
    this.getNotes();
    this.close();
    toast.dark("Actualizado correctamente");
  };

  onSubmitest = async (e) => {
    console.log("wwwwwww");
    e.preventDefault();
    const Data = {
      respuesta: this.state.content,
      calification: this.state.calification,
    };
    console.log(Data);
    await axios.put(
      `${process.env.REACT_APP_API_URL}/tests/respuesta/` + this.state._id,
      Data
    );
    this.getChp(this.state.idcurse);
    this.getNotes();
    this.close();
    toast.dark("Actualizado correctamente");
  };

  onSubmiSection = async (e) => {
    e.preventDefault();
    const Data = {
      contenido: this.state.content,
    };
    await axios.put(
      `${process.env.REACT_APP_API_URL}/seccions/updateSFromStudent/` +
        this.state._id,
      Data
    );
    console.log(this.state.idcurse);
    this.getChp(this.state.idcurse);
    this.getNotes();
    toast.success("Actualizado correctamente");
  };

  deleteUs = async (noteId) => {
    console.log(noteId);
    const response = window.confirm("Deseas eliminar este usuario del curso?");
    if (response) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/mycurses/` + noteId);
      this.getNotes();
    }
  };

  Clean = () => {
    this.setState({
      nombre: "",
      contenido: "",
      tarea: "",
      file: "",
    });
  };
  render() {
    return (
      <>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/*////////////////////////////////////////////////////////////////////////////usuario */}
        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-xl"
            role="document"
          >
            <div className="modal-content">
              <form onSubmit={this.onSubmitUser}>
                <div className="modal-header p-2 h3">
                  {this.state.submit}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">
                      <IoIosCloseCircleOutline />
                    </span>
                  </button>
                </div>
                <div className="modal-body p-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      onChange={this.onInputChange}
                      name="name"
                      value={this.state.name}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      onChange={this.onInputChange}
                      name="email"
                      value={this.state.email}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rol"
                      onChange={this.onInputChange}
                      name="role"
                      value={this.state.role}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Foto"
                      onChange={this.onInputChange}
                      name="foto"
                      value={this.state.foto}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={this.onInputChange}
                      name="password"
                      value={this.state.password}
                      required
                    />
                    {this.state.password}
                  </div>
                </div>
                <div className="modal-footer p-2">
                  <button className="btn btn-info">{this.state.submit}</button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Navigation />
        {/* /////////////////////////////////////////////////////////////create user */}
        {isAuth().role === "admin" ? (
          <div
            style={{
              position: "fixed",
              bottom: 0 + "em",
              left: 0,
              zIndex: 1050,
            }}
          >
            <IconButton
              className="btn btn-primary"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              onClick={() => this.createUs()}
              style={{ color: "primary" }}
            >
              <IoMdCreate />
            </IconButton>
          </div>
        ) : null}
        {/* ///////////////////////////////////////////////////////////////////////modal tarea */}
        <Modal
          show={this.state.showModal}
          onHide={() => {
            this.close();
          }}
          animation={false}
        >
          <div className="modal-header text-uppercase">{this.state.submit}</div>
          <div className="modal-body p-2">
            {/* {this.state.file.split(".").pop()} */}
            <div className="text-center">
              {this.state.selectsubmit &&
              this.state.file.split(".").pop() != "pdf" ? (
                <img
                  src={
                    this.state.file
                      ? `${process.env.REACT_APP_URL}/tasks/` + this.state.file
                      : null
                  }
                  className="img-fluid"
                  alt="www"
                />
              ) : null}
            </div>

            {this.state.selectasktheory || isAuth().role === "admin" ? (
              <textarea
                type="text"
                className="form-control"
                placeholder="Tarea"
                name="content"
                rows="5"
                onChange={this.onInputChange}
                value={this.state.content}
                required
              ></textarea>
            ) : null}
            <KatexMarkdown className="border p-2">
              {this.state.content}
            </KatexMarkdown>
            {this.state.selectasktheory && isAuth().role === "admin" ? (
              <input
                type="text"
                className="form-control"
                placeholder="Nota"
                onChange={this.onInputChange}
                name="calification"
                value={this.state.calification}
                required
              />
            ) : null}
          </div>
          <div className="modal-footer p-2">
            <button
              className="btn btn-info"
              onClick={
                this.state.selectsubmit
                  ? this.onSubmitask
                  : this.state.selectsubmitest
                  ? this.onSubmitest
                  : this.onSubmiSection
              }
            >
              {this.state.submit}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={(this.Clean, this.close)}
            >
              Cerrar
            </button>
          </div>
        </Modal>
        {/* ///////////////////////////////////////////////////////////////////////////////////acordion estudiantes */}
        <div className="container p-1 my-3">
          <div className="d-none container p-1 text-center text-uppercase border this">
            {getCookie("namecurse")} -- {this.state.zz.length} Estudiantes
          </div>

          <div id="accordion">
            {this.state.zz.map((note, index) => (
              <div
                className={
                  note.cursew[0]._id === isAuth()._id
                    ? "container my-2 p-1"
                    : "container my-2 p-1"
                }
                key={index}
              >
                <button
                  className={
                    note.cursew[0]._id === isAuth()._id
                      ? "btn blue3 m-0 w-100 text-left text-uppercase"
                      : "btn this m-0 w-100 text-left text-uppercase"
                  }
                  data-toggle={
                    note.cursew[0]._id === isAuth()._id ||
                    isAuth().role === "admin"
                      ? "collapse"
                      : null
                  }
                  data-target={"#collapseOne" + note._id}
                  aria-expanded="true"
                  onClick={
                    note.cursew[0]._id === isAuth()._id ||
                    isAuth().role === "admin"
                      ? () => this.getChp(note.cursew[0]._id)
                      : null
                  }
                  aria-controls={"collapseOne" + note._id}
                >
                  <div className="card this mt-5 mb-4">
                    <div className="card-body my-3">
                      <a
                        data-toggle="modal"
                        data-target="#modalLoginFormWW"
                        // onClick={() => this.fileSelectHandlerww(wwwww._id, note._id)}
                        className="componentWrapper text-center btn"
                      >
                        <img
                          className="card-img-top-circle p-1 m-auto color wrapperestmid this"
                          src={
                            note.cursew[0].foto
                              ? `${process.env.REACT_APP_URL}/profile/` +
                                note.cursew[0].foto
                              : authSvg
                          }
                        />
                      </a>
                    </div>
                    <div className="componentWrapperbottom this2 color text-center">
                      <div className="componentWrappertextbottom text-uppercase text-light this3">
                        {index + 1} -- {note.cursew[0].email}
                      </div>
                      <div className="text-uppercase pb-2 text-light">
                        {note.cursew[0].name}
                      </div>
                    </div>
                  </div>
                </button>
                <div
                  id={"collapseOne" + note._id}
                  className="collapse"
                  aria-labelledby={note._id}
                  data-parent="#accordion"
                >
                  <div className="card py-3 p-1 sky my-4 mx-3 ">
                    <div className="componentWrapper color p-1 text-center text-uppercase sky1 text-white">
                      Tareas
                    </div>
                    <div className="componentWrapperbottom color p-1 text-center text-uppercase sky1 text-light">
                      {this.state.taskavg.length === 0
                        ? "Aún no tiene notas"
                        : this.state.taskchp.length === 1
                        ? "Promedio " +
                          (this.state.taskavg[0].totalCalification -
                            this.state.taskchp[0].note) /
                            this.state.nsec[0].n
                        : this.state.taskchp.length === 0
                        ? this.state.taskavg[0].totalCalification /
                          this.state.nsec[0].n
                        : null}
                    </div>
                    {this.state.wwr.map((message, index) => (
                      <div
                        className="card my-4  mx-3 pt-3 pb-2 this"
                        key={index}
                      >
                        <div className="componentWrapper card this2 pb-2 text-center text-uppercase text-light">
                          <div className="rounded sky1 componentWrappertextbottom">
                            {message.nombre}
                          </div>
                          Capítulo {index + 1}
                        </div>
                        <div className="">
                          {message.sec.map((wwwww, i) => (
                            <div
                              key={wwwww._id}
                              className={
                                wwwww.tasks.length === 0
                                  ? "card py-3 p-1  sky1 my-4 mx-3"
                                  : "card py-3 p-1  this1 my-4 mx-3"
                              }
                            >
                              <a
                                href={"#testkend" + wwwww._id}
                                data-toggle="collapse"
                                className={
                                  wwwww.tasks.length === 0
                                    ? "componentWrapper small color text-center text-uppercase sky2 rounded  text-light pb-1"
                                    : "componentWrapper small color text-center text-uppercase this2 rounded  text-light pb-1"
                                }
                              >
                                SECCIÓN-{i + 1}
                                <div
                                  className={
                                    wwwww.tasks.length === 0
                                      ? "componentWrappertextbottom sky3"
                                      : "componentWrappertextbottom this3"
                                  }
                                >
                                  {wwwww.nombre}
                                </div>
                              </a>
                              <a
                                className={
                                  wwwww.tasks.length === 0
                                    ? "componentWrapperbottom small text-center sky2 rounded text-light"
                                    : "componentWrapperbottom small text-center text-light this2  rounded"
                                }
                              >
                                {wwwww.tasks.length === 0
                                  ? "Entregar tarea"
                                  : wwwww.tasks[0].note === null
                                  ? "Falta calificar"
                                  : "Nota" + wwwww.tasks[0].note}
                                {"-"}
                                Hasta{" "}
                                {new Date(wwwww.fechaexa)
                                  .toLocaleString()
                                  .substring(0, 21)}
                              </a>
                              <div
                                id={"testkend" + wwwww._id}
                                className="collapse card p-0"
                              >
                                <div className="card border border-light my-2 p-1 pb-3 pt-2">
                                  <div className="componentWrappertext text-center">
                                    Teoría
                                  </div>

                                  <KatexMarkdown>
                                    {wwwww.contenido}
                                  </KatexMarkdown>
                                  {isAuth().role === "admin" ? (
                                    <button
                                      className="componentWrapperbottom text-center text-uppercase border btn-sm btn btn-info p-0"
                                      data-toggle="modal"
                                      data-target=".bd-example"
                                      onClick={() => {
                                        this.setState({
                                          idcurse: note.cursew[0]._id,
                                          _id: wwwww._id,
                                          editing: true,
                                          submit: "Guardar",

                                          content: wwwww.contenido,
                                        });
                                      }}
                                    >
                                      Editar teoría
                                    </button>
                                  ) : null}
                                </div>
                                <div
                                  className={
                                    wwwww.tasks.length === 0
                                      ? "d-none"
                                      : "card border border-light my-3 p-2 pb-3"
                                  }
                                >
                                  <div className="componentWrappertext text-center">
                                    Tarea entregada
                                  </div>

                                  {wwwww.tasks.length === 0 ? null : (
                                    <>
                                      {wwwww.tasks[0].file === "" ? null : (
                                        <>
                                          <div className="text-center">
                                            <img
                                              src={
                                                wwwww.tasks[0].file
                                                  ? `${process.env.REACT_APP_URL}/tasks/` +
                                                    wwwww.tasks[0].file
                                                  : null
                                              }
                                              className="img-fluid"
                                              alt="www"
                                              onError={(e) => {
                                                e.target.src = authSvgw; //replacement image imported above
                                                e.target.style =
                                                  "padding: 3px; margin: 1px;  width:3em"; // inline styles in html format
                                              }}
                                            />
                                          </div>
                                          <a
                                            className="btn btn-outline-info mt-1 btn-sm small"
                                            target="_blank"
                                            href={`${process.env.REACT_APP_URL}/tasks/${wwwww.tasks[0].file}`}
                                          >
                                            Descargar
                                            {/* {wwwww.tasks[0].file} */}
                                          </a>
                                        </>
                                      )}
                                      <KatexMarkdown>
                                        {wwwww.tasks[0].content}
                                      </KatexMarkdown>
                                    </>
                                  )}

                                  {wwwww.tasks.map((ww) => (
                                    <div key={ww._id}>
                                      {wwwww.tasks[0].note === null ||
                                      Date.parse(new Date(wwwww.fechaexa)) /
                                        1000 >
                                        Date.parse(new Date()) / 1000 ||
                                      isAuth().role === "admin" ? (
                                        <button
                                          className="componentWrapperbottom text-center text-uppercase border btn-sm btn btn-info p-0"
                                          data-toggle="modal"
                                          data-target=".bd-example"
                                          onClick={() => {
                                            this.open();
                                            this.setState({
                                              lenght: wwwww.tasks.length,
                                              file: wwwww.tasks[0].file,
                                              idcurse: note.cursew[0]._id,
                                              _id: wwwww.tasks[0]._id,
                                              selectsubmit: true,
                                              selectasktheory: true,
                                              content: wwwww.tasks[0].content,
                                              calification: wwwww.tasks[0].note,
                                              submit: "Actualizar tarea",
                                            });
                                          }}
                                        >
                                          Editar tarea encargada
                                          {wwwww.tasks[0].note}
                                        </button>
                                      ) : null}
                                      <div
                                        id={"testkend"}
                                        className="collapse bg-info p-1 rounded"
                                      >
                                        {wwwww.contenido}--
                                        {wwwww.tasks[0].content}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="componentWrapperbottom this1 rounded text-center text-light">
                            {
                              message.resultasks.length === 0
                                ? "Aun no hay nota"
                                : "Total puntos " +
                                  message.resultasks[0].totalCalification // /  message.sec.length
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card py-3 p-1 this my-5 mx-3 ">
                    <div className="componentWrapper color p-0 text-center text-uppercase this1 rounded text-white">
                      Examenes
                    </div>
                    <div className="componentWrapperbottom color text-center this1 rounded  text-light">
                      Promedio{" "}
                      {this.state.testavg.length === 0
                        ? "No dió examen alguno"
                        : this.state.testchp.length === 1
                        ? (this.state.testavg[0].totalCalification -
                            this.state.testchp[0].calification) /
                          this.state.tests.length
                        : this.state.testchp.length === 0
                        ? this.state.testavg[0].totalCalification /
                          this.state.tests.length
                        : null}
                    </div>
                    {this.state.tests.map((www, i) => (
                      <div className="card py-3 p-1 sky my-4 mx-3">
                        <a
                          href={"#demo" + www._id}
                          data-toggle="collapse"
                          className="componentWrapper sky1 text-center text-uppercase rounded  text-light"
                        >
                          Examen del capitulo {1 + i}
                        </a>

                        {www.testresp.length === 1 ? (
                          <button
                            className="componentWrapperbottom text-center text-uppercase border btn-sm btn btn-info p-0"
                            data-toggle="modal"
                            data-target=".bd-example"
                            onClick={() => {
                              this.setState({
                                lenght: www.testresp.length,
                                idcurse: note.cursew[0]._id,
                                _id: www.testresp[0]._id,
                                selectsubmitest: true,
                                selectsubmit: false,
                                selectasktheory: true,
                                content: www.testresp[0].respuesta,
                                calification: www.testresp[0].calification,
                                submit: "Actualizar examen",
                              });
                            }}
                          >
                            Editar examen {www.testresp[0].calification}
                          </button>
                        ) : (
                          <div className="componentWrapperbottom sky1 text-center rounded  text-light">
                            No dió examen
                          </div>
                        )}
                        {www.testresp.map((w, i) => (
                          <div
                            id={"demo" + www._id}
                            className="collapse bg-light border p-1 rounded"
                          >
                            <div className="card rounded mt-1 p-1">
                              <div className="border border-secondary  componentWrappertext">
                                Pregunta
                              </div>
                              {www.test}
                            </div>
                            <div className="card border border-secondary rounded mt-2 p-1">
                              <div className="border border-secondary  componentWrappertext">
                                Respuesta
                              </div>
                              {w.respuesta}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="card  py-3 p-1  bg-warning my-5 mx-3">
                    <div className="componentWrapper color text-center text-uppercase bg-warning text-white">
                      Foro
                    </div>
                    <div className="componentWrapperbottom color text-center text-uppercase bg-warning  text-light">
                      Promedio
                      {this.state.commentavg.length === 0
                        ? " No comments"
                        : this.state.commentavg[0].totalCalification /
                          this.state.ncomment[0].n}
                    </div>
                    {this.state.themes.map((www, i) => (
                      <div className="card this px-1 my-4 py-3 mx-3">
                        <a
                          href={"#taskend" + i}
                          data-toggle="collapse"
                          className="componentWrapper color pt-1 text-center text-uppercase this1 rounded  text-light"
                        >
                          <div className="componentWrappertext text-uppercase">
                            {www.comments.length} comments
                          </div>
                          Tema {1 + i}
                        </a>

                        <div className="componentWrapperbottom text-center this1 rounded">
                          Puntos, tema {1 + i}
                          {": "}
                          {
                            www.resulthemes.length === 0
                              ? "Aun no calificado"
                              : www.resulthemes[0].totalCalification // /www.comments.length
                          }
                        </div>
                        <div
                          id={"taskend" + i}
                          className="collapse bg-light p-1 border"
                        >
                          {www.comments.map((ww, i) => (
                            <div className="border my-1">
                              {ww.comment}--
                              {ww.calification
                                ? ww.calification
                                : "Aun no calificado"}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card pt-3 pb-2 p-1 sky my-4 mx-3">
                    <div className="componentWrapper text-center text-uppercase sky1  rounded text-light">
                      TAREA Y EXAMEN FINAL
                    </div>
                    {this.state.curse.map((www, i) => (
                      <>
                        <div className="componentWrapperbottom text-center text-uppercase sky1 rounded  text-light">
                          {www.taskchp.length === 1 && www.testchp.length === 1
                            ? "Promedio: " +
                              (www.taskchp[0].note +
                                www.testchp[0].calification) /
                                2
                            : www.taskchp.length === 1
                            ? "Promedio: " + www.taskchp[0].calification / 2
                            : www.testchp.length === 1
                            ? "Promedio:  " + www.testchp[0].calification / 2
                            : "No entregó tarea final y no dió examen"}
                        </div>

                        <div className="card py-3 p-1 border border-light my-4 mx-3">
                          <a
                            href={"#taskend"}
                            data-toggle="collapse"
                            className="componentWrapper color text-center text-uppercase border border-secondary rounded  text-info"
                          >
                            Tarea final
                          </a>
                          <div className="componentWrapperbottom color small">
                            {www.taskchp.length === 1 ? (
                              <button
                                className="componentWrapperbottom text-center text-uppercase border btn-sm btn btn-info p-0"
                                data-toggle="modal"
                                data-target=".bd-example"
                                onClick={() => {
                                  this.open();
                                  this.setState({
                                    lenght: www.taskchp.length,
                                    file: www.taskchp[0].file,
                                    idcurse: note.cursew[0]._id,
                                    _id: www.taskchp[0]._id,
                                    selectsubmit: true,
                                    selectasktheory: true,
                                    content: www.taskchp[0].content,
                                    calification: www.taskchp[0].note,
                                    submit: "Actualizar tarea",
                                  });
                                }}
                              >
                                Editar tarea encargada {www.taskchp[0].note}
                              </button>
                            ) : null}
                          </div>
                          <div
                            id={"taskend"}
                            className="collapse bg-light border p-1"
                          >
                            <div className="card border border-secondary rounded mt-1 p-1">
                              <div className="border border-secondary  componentWrappertext text-uppercase">
                                Tarea encargada
                              </div>
                              {www.tarea}
                            </div>
                            <div className="card border border-secondary rounded mt-2 p-1 pt-2">
                              <div className="border border-secondary  componentWrappertext text-uppercase">
                                Tarea entregada
                              </div>
                              {www.taskchp.length === 0 ? (
                                "Entregue al final del curso, verifique la fecha de entrega"
                              ) : (
                                <>
                                  <KatexMarkdown>
                                    {www.taskchp[0].content}
                                  </KatexMarkdown>
                                  <div className="text-center">
                                    <img
                                      src={
                                        www.taskchp[0].file
                                          ? `${process.env.REACT_APP_URL}/tasks/` +
                                            www.taskchp[0].file
                                          : null
                                      }
                                      className="img-fluid"
                                      alt="www"
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                    {this.state.curse.map((www, i) => (
                      <div className="card py-3 p-1 border border-light my-4 mx-3">
                        <a
                          href={"#testkendww"}
                          data-toggle="collapse"
                          className="componentWrapper color text-center text-uppercase border border-secondary rounded  text-info"
                        >
                          Examen final
                        </a>

                        <div className="componentWrapperbottom color small">
                          {www.testchp.length === 1 &&
                          isAuth().role === "admin" ? (
                            <button
                              className="componentWrapperbottom text-center text-uppercase border btn-sm btn btn-info p-0"
                              data-toggle="modal"
                              data-target=".bd-example"
                              onClick={() => {
                                this.open();
                                this.setState({
                                  lenght: www.testchp.length,
                                  idcurse: note.cursew[0]._id,
                                  _id: www.testchp[0]._id,
                                  selectsubmitest: true,
                                  selectsubmit: false,
                                  selectasktheory: true,
                                  content: www.testchp[0].respuesta,
                                  calification: www.testchp[0].calification,
                                  submit: "Actualizar examen",
                                });
                              }}
                            >
                              Editar examen {www.testchp[0].calification}
                            </button>
                          ) : null}
                        </div>
                        <div
                          id={"testkendww"}
                          className="collapse bg-light p-1 border"
                        >
                          <div className="card border border-secondary rounded mt-1 p-1">
                            <div className="border border-secondary rounded componentWrappertext text-uppercase">
                              Preguntas examen final
                            </div>
                            {www.testchp.length === 0
                              ? "Se mostrará cuando de su examen"
                              : www.test}
                          </div>
                          <div className="card border border-secondary rounded mt-2 pt-1 p-1">
                            <div className="border border-secondary rounded componentWrappertext text-uppercase">
                              Respuesta examen final
                            </div>

                            {www.testchp.length === 0
                              ? "Aún no dió verifique la fecha"
                              : www.testchp[0].respuesta}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {isAuth().role === "admin" ? (
                    <div className="text-center p-0 rounded">
                      <IconButton
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg"
                        onClick={() => this.upDateUs(note.cursew[0]._id)}
                        className="btn btn-light"
                      >
                        <MdEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => this.deleteUs(note._id)}
                        className="btn btn-light"
                      >
                        <MdDelete />
                      </IconButton>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
