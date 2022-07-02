import React, { Component } from "react";
//import authSvg from "../assests/update.svg";
import Navigation from "../screens/Navigation.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IconButton } from "@material-ui/core";
import { MdEdit, MdDelete, MdOpenInNew, MdComment } from "react-icons/md";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import {
  MdAddCircle,
  // MdBookmark,
  // MdBookmarkBorder,
  MdWork,
  MdBook,
} from "react-icons/md";
import KatexMarkdown from "./Markdown";

import axios from "axios";
import {
  //  removeCookie,
  //  removeLocalStorage,
  setCookie,
  getCookie,
  setLocalStorage,
  isAuth,
} from "../helpers/auth";

export default class CreateNote extends Component {
  state = {
    category: this.props.match.params.categ,
    curse: this.props.match.params.id,
    calification: "",
    theme: "",
    likes: "",
    comment: "",
    number_comment: 3,
    foreign: "",
    fecha: new Date(),
    timexa: "",
    editing: false,
    zz: [],
    zzz: [],
    wwr: [],
    wwrw: [],
    _id: "",
    index: "",
    ncomment: "",
    files: "",
    identificadortema: "",
    submit: "",
    option: false,
    task: false,
  };

  getNotes = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/comments/comment/curse/` +
        getCookie("idc")
    );
    this.setState({
      zz: res.data,
    });
    //console.log(this.state.zz);
  };

  getThemes = async (idtask) => {
    console.log(idtask);
    const resww = await axios.get(
      `${process.env.REACT_APP_API_URL}/comments/themes/` +
        idtask +
        `/` +
        isAuth()._id
    );
    this.setState({
      wwr: resww.data[0].c1,
      wwrw: resww.data[0],
    });
    console.log(this.state.wwr);
    console.log(resww.data[0]);
  };

  async componentDidMount() {
    this.getNotes();
  }

  creteTheme = async (curseId) => {
    this.setState({
      submit: "Crear tema",
      option: true,
    });
  };

  upDateTheme = async (themeid) => {
    console.log(themeid);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/comments/` + themeid
    );
    console.log(res.data[0]);

    this.setState({
      editing: true,
      option: true,
      submit: "Actualizar tema",
      theme: themeid,
      curse: getCookie("idc"),
      user: isAuth()._id,
      comment: res.data[0].theme,
      fecha: new Date(res.data[0].fechaforum),
    });
  };

  onSubmitheme = async (e) => {
    e.preventDefault();
    const Datos = {
      curse: getCookie("idc"),
      fechaforum: this.state.fecha,
      theme: this.state.comment,
    };
    if (this.state.editing) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/comments/` + this.state.theme,
        Datos
      );
      toast.success("Actualizado correctamente");
    } else {
      console.log(this.state.index);
      await axios.post(`${process.env.REACT_APP_API_URL}/comments`, Datos);
    }
    console.log(Datos);
    this.getNotes();
    //this.getThemes(this.state.themeid);
    this.setState({ theme: "", comment: "", calification: "", likes: "" });
  };

  onInputChange = (e) => {
    //console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  creteComment = async (idtheme, id, index) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/comments/comment/count/` +
        idtheme +
        `/` +
        isAuth()._id
    );
    console.log(res.data.length);
    if (res.data.length > 3) {
      alert("Supero los comentarios permitidos");
    }
    console.log(id);
    this.setState({
      option: false,
      ncomment: res.data.length,
      submit: "Comentar",
      option: false,
      themeid: idtheme,
      identificadortema: idtheme,
      foreign: id,
      index: index,
    });
  };

  updateComment = async (idtheme, id, index) => {
    console.log(idtheme, id, index);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/comments/comment/` + id + `/` + index
    );
    console.log(res.data[0]);

    this.setState({
      editing: true,
      option: false,
      submit: "Actualizar comentario",
      curse: getCookie("idc"),
      user: isAuth()._id,
      theme: idtheme,
      themeid: idtheme,
      _id: id,
      index: index,
      comment: res.data[0].comment,
      calification: res.data[0].calification,
    });
  };

  onSubmiComment = async (e) => {
    e.preventDefault();

    const Datos = {
      curse: getCookie("idc"),
      user: isAuth()._id, //
      theme: this.state.themeid,
      comment: this.state.comment, //
      foreign: this.state.foreign, //
      calification: this.state.calification, //
      identificadortema: this.state.identificadortema, //
      likes: this.state.likes, //
      calification: this.state.calification, //
    };
    console.log(Datos);
    if (this.state.editing) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/comments/comment/` +
          this.state._id +
          `/` +
          this.state.index,
        Datos
      );
      console.log(Datos);
      toast.success("Actualizado correctamente");
    } else {
      console.log(this.state.index);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/comments/c` + this.state.index,
        Datos
      );
    }
    //console.log(Datos);
    this.getNotes();
    this.getThemes(this.state.themeid);
    this.setState({
      calification: "",
      theme: "",
      likes: "",
      comment: "",
      foreign: "",
      editing: false,
      _id: "",
      index: "",
      files: "",
      submit: "",
      task: false,
      calification: "",
    });
  };

  onChangeDate = (fecha) => {
    this.setState({ fecha });
  };

  deleteComment = async (idtheme, noteId, index) => {
    console.log(idtheme, noteId, index);
    const response = window.confirm("Deseas eliminar este comentario?");
    if (response) {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/comments/` + noteId + `/` + index
      );
      this.setState({
        themeid: idtheme,
      });
      this.getThemes(this.state.themeid);
    }
  };

  deleteTheme = async (idtheme) => {
    console.log(idtheme);
    const response = window.confirm("Deseas eliminar este tema?");
    if (response) {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/comments/` + idtheme
      );
      this.getNotes();
      console.log("object");
    }
  };

  CleanFields = async (noteId) => {
    this.setState({
      nombre: "",
      chapter: "",
      contenido: "",
      tarea: "",
      files: "",
      calification: "",
      timexa: "",
      option: "",
      task: true,
      _id: "",
      fechaexa: "",
    });
  };

  render() {
    return (
      <>
        <ToastContainer />
        {/* Actualizar curso y seccion */}
        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <form
                onSubmit={
                  this.state.option ? this.onSubmitheme : this.onSubmiComment
                }
              >
                <div className="modal-header font-weight-bold">
                  {this.state.submit}
                </div>
                <div className="modal-body p-2">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Comment"
                    name="comment"
                    onChange={this.onInputChange}
                    value={this.state.comment}
                    required
                  ></textarea>

                  {this.state.option ? (
                    <DatePicker
                      className="form-control mt-1"
                      selected={this.state.fecha}
                      onChange={this.onChangeDate}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  ) : (
                    <>
                      {isAuth().role === "admin" ? (
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Calificación"
                            onChange={this.onInputChange}
                            name="calification"
                            value={this.state.calification}
                            required
                          />
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
                <div className="modal-footer d-flex right-content-center">
                  <button className="btn btn-info">
                    {this.state.submit}
                    {this.state._id}
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={this.CleanFields}
                  >
                    close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Navigation />

        <div
          style={{
            position: "fixed",
            bottom: 0 + "em",
            left: 0,
            zIndex: 1050,
          }}
        >
          {isAuth().role === "admin" ? (
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              onClick={() => this.creteTheme()}
            >
              Createtheme
            </button>
          ) : null}
        </div>

        <div className="container p-1 my-3">
          <div className="d-none container bg-info p-1 text-uppercase text-center bg-light border rounded">
            {this.state.zz.length} Temas forum de {getCookie("namecurse")}
          </div>

          <div id="accordion">
            {this.state.zz.map((note, index) => (
              <div
                className="container my-1 border border-info rounded-lg p-1"
                key={index}
              >
                <button
                  className="btn btn-success text-left w-100"
                  data-toggle="collapse"
                  data-target={"#collapseOne" + note._id}
                  aria-expanded="true"
                  onClick={() => this.getThemes(note._id)}
                  aria-controls={"collapseOne" + note._id}
                >
                  {index + 1}: Id: {note._id} Tema:{" "}
                  <KatexMarkdown>{note.theme}</KatexMarkdown> Fecha:{" "}
                  {note.fechaforum}
                </button>

                <div
                  id={"collapseOne" + note._id}
                  className="collapse "
                  aria-labelledby={note._id}
                  data-parent="#accordion"
                >
                  <IconButton
                    className="bg-warning"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                    onClick={() => this.creteComment(note._id, note._id, "1")}
                  >
                    <MdComment />
                  </IconButton>

                  <div className="comment py-1 pl-1">
                    {this.state.wwr.map((w1, index) => (
                      <div key={index}>
                        <div>
                          Ud tiene {this.state.wwrw.comments.length} comentarios
                          en este tema
                        </div>

                        <div className="border border-info p-1  my-1">
                          <a href={"#demo" + w1._id} data-toggle="collapse">
                            {w1.user}-- {this.state.wwrw.comments.length}
                            <KatexMarkdown>{w1.comment}</KatexMarkdown>
                            --c1
                            {w1._id} -- {w1.calification}
                          </a>
                          <div id={"demo" + w1._id} className="collapse">
                            {this.state.wwrw.comments.length <
                            this.state.number_comment ? (
                              <IconButton
                                className="btn btn-info"
                                size="small"
                                data-title="Comentar"
                                data-toggle="modal"
                                data-target=".bd-example-modal-lg"
                                onClick={() =>
                                  this.creteComment(note._id, w1._id, "2")
                                }
                              >
                                <MdComment />
                              </IconButton>
                            ) : (
                              <span className="m-1">
                                Superó el número de comentarios
                              </span>
                            )}
                            <IconButton
                              size="small"
                              data-title="Eliminar"
                              className="btn btn-warning"
                              onClick={() =>
                                this.deleteComment(note._id, w1._id, "1")
                              }
                            >
                              <MdDelete />
                            </IconButton>
                            <IconButton
                              className="btn btn-info"
                              size="small"
                              data-title="Editar"
                              data-toggle="modal"
                              data-target=".bd-example-modal-lg"
                              onClick={() =>
                                this.updateComment(note._id, w1._id, "1")
                              }
                            >
                              <MdEdit />
                            </IconButton>
                          </div>
                        </div>
                        <div className="comment pl-1 ml-3 mb-1">
                          {w1.c2.map((w2) => (
                            <div key={w2._id}>
                              <div className="border border-info p-1 my-1">
                                <a
                                  href={"#demo" + w2._id}
                                  data-toggle="collapse"
                                >
                                  {w2.user}-- {this.state.wwrw.comments.length}
                                  <KatexMarkdown>{w2.comment}</KatexMarkdown>
                                  --c2
                                  {w2._id} -- {w2.calification}
                                </a>
                                <div id={"demo" + w2._id} className="collapse">
                                  {this.state.wwrw.comments.length <
                                  this.state.number_comment ? (
                                    <IconButton
                                      className="btn btn-info"
                                      size="small"
                                      data-toggle="modal"
                                      data-target=".bd-example-modal-lg"
                                      onClick={() =>
                                        this.creteComment(note._id, w2._id, "2")
                                      }
                                    >
                                      <MdComment />
                                    </IconButton>
                                  ) : (
                                    <span className="m-1">
                                      Superó el número de comentarios
                                    </span>
                                  )}
                                  <IconButton
                                    size="small"
                                    className="btn btn-warning"
                                    onClick={() =>
                                      this.deleteComment(note._id, w2._id, "2")
                                    }
                                  >
                                    <MdDelete />
                                  </IconButton>
                                  <IconButton
                                    className="btn btn-info"
                                    size="small"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() =>
                                      this.updateComment(note._id, w2._id, "2")
                                    }
                                  >
                                    <MdEdit />
                                  </IconButton>
                                </div>
                              </div>
                              {w2.c3.length === 0 ? null : (
                                <div className=" comment pl-1 ml-3 mb-1">
                                  {w2.c3.map((w3) => (
                                    <div key={w3._id}>
                                      <div className="border border-success p-1 my-1">
                                        <a
                                          href={"#demo" + w3._id}
                                          data-toggle="collapse"
                                        >
                                          {w3.user}--{w3.comment} --c3
                                          {w3._id} -- {w3.calification}
                                        </a>
                                        <div
                                          id={"demo" + w3._id}
                                          className="collapse"
                                        >
                                          {this.state.wwrw.comments.length <
                                          this.state.number_comment ? (
                                            <IconButton
                                              className="btn btn-info"
                                              size="small"
                                              data-toggle="modal"
                                              data-target=".bd-example-modal-lg"
                                              onClick={() =>
                                                this.creteComment(
                                                  note._id,
                                                  w3._id,
                                                  "2"
                                                )
                                              }
                                            >
                                              <MdComment />
                                            </IconButton>
                                          ) : (
                                            <span className="m-1">
                                              Superó el número de comentarios
                                            </span>
                                          )}
                                          <IconButton
                                            size="small"
                                            className="btn btn-warning"
                                            onClick={() =>
                                              this.deleteComment(
                                                note._id,
                                                w3._id,
                                                "3"
                                              )
                                            }
                                          >
                                            <MdDelete />
                                          </IconButton>
                                          <IconButton
                                            className="btn btn-info"
                                            size="small"
                                            data-toggle="modal"
                                            data-target=".bd-example-modal-lg"
                                            onClick={() =>
                                              this.updateComment(
                                                note._id,
                                                w3._id,
                                                "3"
                                              )
                                            }
                                          >
                                            <MdEdit />
                                          </IconButton>
                                        </div>
                                      </div>
                                      {w3.c4.length === 0 ? null : (
                                        <div className=" comment pl-1 ml-3">
                                          {w3.c4.map((w4) => (
                                            <div key={w4._id}>
                                              <div className="border border-success p-1 my-1">
                                                <a
                                                  href={"#demo" + w4._id}
                                                  data-toggle="collapse"
                                                >
                                                  {w4.user}--{w4.comment} --c4
                                                  {w4._id} -- {w4.calification}
                                                </a>
                                                <div
                                                  id={"demo" + w4._id}
                                                  className="collapse"
                                                >
                                                  {this.state.wwrw.comments
                                                    .length <
                                                  this.state.number_comment ? (
                                                    <IconButton
                                                      className="btn btn-info"
                                                      size="small"
                                                      data-toggle="modal"
                                                      data-target=".bd-example-modal-lg"
                                                      onClick={() =>
                                                        this.creteComment(
                                                          note._id,
                                                          w4._id,
                                                          "2"
                                                        )
                                                      }
                                                    >
                                                      <MdComment />
                                                    </IconButton>
                                                  ) : (
                                                    <span className="m-1">
                                                      Superó el número de
                                                      comentarios
                                                    </span>
                                                  )}
                                                  <IconButton
                                                    size="small"
                                                    className="btn btn-warning"
                                                    onClick={() =>
                                                      this.deleteComment(
                                                        note._id,
                                                        w4._id,
                                                        "4"
                                                      )
                                                    }
                                                  >
                                                    <MdDelete />
                                                  </IconButton>
                                                  <IconButton
                                                    className="btn btn-info"
                                                    size="small"
                                                    data-toggle="modal"
                                                    data-target=".bd-example-modal-lg"
                                                    onClick={() =>
                                                      this.updateComment(
                                                        note._id,
                                                        w4._id,
                                                        "4"
                                                      )
                                                    }
                                                  >
                                                    <MdEdit />
                                                  </IconButton>
                                                </div>
                                              </div>
                                              {w4.c5.length === 0 ? null : (
                                                <div className="comment pl-1 ml-3">
                                                  {w4.c5.map((w5) => (
                                                    <div key={w5._id}>
                                                      <div className="border border-success p-1 my-1">
                                                        <a
                                                          href={
                                                            "#demow" + w5._id
                                                          }
                                                          data-toggle="collapse"
                                                        >
                                                          {w5.user}--
                                                          {w5.comment} --c5 --{" "}
                                                          {w5.calification}
                                                        </a>
                                                        <div
                                                          id={"demow" + w5._id}
                                                          className="collapse"
                                                        >
                                                          <IconButton
                                                            size="small"
                                                            className="btn btn-warning"
                                                            onClick={() =>
                                                              this.deleteComment(
                                                                note._id,
                                                                w5._id,
                                                                "5"
                                                              )
                                                            }
                                                          >
                                                            <MdDelete />
                                                          </IconButton>
                                                          <IconButton
                                                            className="btn btn-info"
                                                            size="small"
                                                            data-toggle="modal"
                                                            data-target=".bd-example-modal-lg"
                                                            onClick={() =>
                                                              this.updateComment(
                                                                note._id,
                                                                w5._id,
                                                                "5"
                                                              )
                                                            }
                                                          >
                                                            <MdEdit />
                                                          </IconButton>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {isAuth().role === "admin" ? (
                    <div className="p-0 bg-warning rounded">
                      <IconButton
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg"
                        onClick={() => this.upDateTheme(note._id)}
                        style={{ color: "primary" }}
                      >
                        <MdEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => this.deleteTheme(note._id)}
                        style={{ color: "primary" }}
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
