import React, { Component } from "react";
//import authSvg from "../assests/update.svg";

import Navigation from "../screens/Navigation.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IconButton } from "@material-ui/core";
import { MdEdit, MdDelete, MdOpenInNew, MdComment } from "react-icons/md";
import io from "socket.io-client";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { MdAddCircle, MdWork, MdBook, } from "react-icons/md";
import KatexMarkdown from "./Markdown"
import axios from "axios"
import { Modal, Row } from "react-bootstrap";
import { Input } from "@material-ui/core";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';


import {  //  removeCookie,
  //  removeLocalStorage,
  isAsignature, setCookie, getCookie, setLocalStorage, isAuth,
} from "../helpers/auth";
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




export default class CreateNote extends Component {
  state = {
    showModal: false,
    title: "",
    theme: "",
    comment: "",
    calification: "",
    curse: this.props.match.params.idcurse,
    likes: "",
    fecha: new Date(),
    zz: [],
    _id: "",
    files: "",
    submit: "",
    editing: false,
    option: false,
  };

  open = () => this.setState({ showModal: true });
  close = () => this.setState({ showModal: false });

  getNotes = async () => {
    this.socket.emit('forocurse', this.props.match.params.idcurse)
    this.socket.emit("notes", this.props.match.params.idcurse)
    this.socket.on("forum", (ww) => {
      console.log(ww, "new")
      this.setState({ zz: ww });
    })
    //const res = await axios.get(`${process.env.REACT_APP_API_URL}/comments/comment/curse/` + this.props.match.params.idcurse)
    //.then(()=>{toast.dark("Tema creado correctamente")}).catch((error) => { console.log("ERROR", error.response) });
    // toast.dark("Procesado correctamente")
    // await this.socket.emit('forocurse', this.props.match.params.idcurse);
    // await this.socket.emit("notes", this.props.match.params.idcurse)
    // await this.socket.on("forum", (ww) => {
    //   console.log(ww, "new")
    //   this.setState({ zz: ww });
    // })
  };

  componentWillUnmount() {
    this.socket.disconnect();
  }

  async componentDidMount() {
    document.title = `FORO ${isAsignature().title}`
    // this.getNotes()
    this.socket = io(`${process.env.REACT_APP_URL}`)
    this.socket.emit('forocurse', this.props.match.params.idcurse)
    this.socket.emit("notes", this.props.match.params.idcurse)
    this.socket.on("forum", (ww) => {
      console.log(ww, "newww")
      this.setState({ zz: ww });
    })

  }





  // onSubmitheme = async (e) => {
  //   e.preventDefault()
  //   if (this.state.editing) {
  //     await axios.put(`${process.env.REACT_APP_API_URL}/comments/theme/` + this.state._id, {
  //       theme: this.state.comment, title: this.state.title
  //     }).then(() => { this.close() })
  //     toast.dark("Tema actualizado correctamente")
  //   } else {
  //     await axios.post(`${process.env.REACT_APP_API_URL}/comments/theme`, { theme: this.state.comment, title: this.state.title, curse: this.state.curse, user: isAuth()._id }).then((res) => {
  //       this.getNotes(); this.close(); toast.dark("Tema creado correctamente")
  //     })
  //       .catch((error) => { console.log("ERROR", error.response) })
  //   }
  //   this.getNotes();
  //   //    this.setState({ theme: "", comment: "", calification: "", likes: "" });
  // };
  cretetheme = async (curseId) => {
    this.setState({ submit: "Crear tema", option: true, });
  }
  updatetheme = async (id, theme, title) => {
    console.log(id, theme, title);
    this.setState({ editing: true, option: true, submit: "Actualizar tema", _id: id, theme, title });
  }

  CreateTheme = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/comments/theme`, { theme: "Editar tema", title: "Titulo del tema", curse: this.state.curse, user: isAuth()._id }).then((res) => {
      this.getNotes()
      //; this.close(); toast.dark("Tema creado correctamente")
    }).catch((error) => { console.log("ERROR", error.response) })
  };

  UpdateTheme = async () => {
    console.log("Update")
    await axios.put(`${process.env.REACT_APP_API_URL}/comments/theme/` + this.state._id, {
      theme: this.state.theme, title: this.state.title
    }).then(() => { this.getNotes() })
    toast.dark("Tema actualizado correctamente")

  };






  onInputChange = (e) => {
    //console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value })
  };







  creteComment = async (idtheme) => {
    this.setState({ option: false, submit: "Comentar", themeid: idtheme, });
  };
  updateComment = async (idcoment, comment, calification) => {
    //console.log(idcoment, title, comment, calification)
    this.setState({ editing: true, option: false, submit: "Actualizar comentario", _id: idcoment, comment: comment, calification });
  };
  onSubmiComment = async (e) => {
    e.preventDefault()
    if (this.state.editing) {
      await axios.put(`${process.env.REACT_APP_API_URL}/comments/comment/` + this.state._id, {
        comment: this.state.comment, calification: this.state.calification, likes: this.state.likes
      }).then((res) => { this.close() })
      toast.info("Actualizado correctamente");
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/comments/comment`, {
        curse: this.state.curse, user: isAuth()._id, theme: this.state.themeid,
        comment: this.state.comment, calification: "", likes: this.state.likes
      }).then((res) => { this.close() })
      toast.info("Creado correctamente");
    }

    this.getNotes();
    this.setState({ calification: "", theme: "", likes: "", comment: "", foreign: "", editing: false, _id: "", index: "", files: "", submit: "", task: false, calification: "", });
  };


  UpDateCommentt = async () => {
    await axios.put(`${process.env.REACT_APP_API_URL}/comments/comment/` + this.state._id, {
      comment: this.state.comment, calification: this.state.calification, likes: this.state.likes
    }).then((res) => {
      //this.close()
      toast.info("Actualizado correctamente");
    })
    this.getNotes();

    this.setState({ calification: "", theme: "", likes: "", comment: "", foreign: "", editing: false, _id: "", index: "", files: "", submit: "", task: false, calification: "", });
  }

  onChangeDate = (fecha) => { this.setState({ fecha }) }

  deleteComment = async (id) => { const response = window.confirm("Deseas eliminar este comentario?"); if (response) { await axios.delete(`${process.env.REACT_APP_API_URL}/comments/` + id).then(console.log(response)); this.getNotes() } };
  deleteTheme = async (idtheme, length) => { const response = window.confirm("Deseas eliminar este tema, también ellimará todos los comentarios?"); if (response) { await axios.delete(`${process.env.REACT_APP_API_URL}/comments/theme/` + idtheme); this.getNotes() } }

  CleanFields = async (noteId) => {
    this.setState({ nombre: "", chapter: "", contenido: "", tarea: "", files: "", calification: "", timexa: "", option: "", task: true, _id: "", fechaexa: "", })
  }

  render() {
    return (
      <>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />


        <Modal show={this.state.showModal} onHide={() => { this.close(); }} animation={false}>
          <form onSubmit={this.state.option ? this.onSubmitheme : this.onSubmiComment} >
            <div className="modal-header font-weight-bold"> {this.state.submit} </div>
            <div className="modal-body p-2">
              <input type="text" className="form-control mt-1" placeholder="Título" onChange={this.onInputChange} name="title" value={this.state.title} />
              <CKEditor editor={ClassicEditor} config={{
                language: 'es',
                toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"]
              }} data={this.state.comment} onChange={(event, editor) => {
                //wwWw(editor.getData())
                //timeNow()
              }} onReady={editor => {
                console.log('Editor is ready to use!', editor)
                //wwWw(editor.getData())
              }}
              />
              <textarea type="text" className="form-control" placeholder="Texto" name="comment" onChange={this.onInputChange} value={this.state.comment} required autoFocus>
              </textarea>
              {this.state.option ?
                <DatePicker className="form-control mt-1 d-none" selected={this.state.fecha} onChange={this.onChangeDate} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" />
                : null}
              {isAuth().rol == "2" && this.state.editing ? (
                <input type="text" className="form-control mt-1" placeholder="Calificación" onChange={this.onInputChange} name="calification" value={this.state.calification} />) : null}
            </div>
            <div className="modal-footer d-flex right-content-center">
              <button className="btn btn-info"> {this.state.submit}</button>
              <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={this.CleanFields} > close </button>
            </div>
          </form>
        </Modal>

        <Navigation />

        <div className="container p-1 my-3">

          {isAuth().rol === "2" && this.state.zz.length >= 0 ? (
            <button className="btn btn-ligth text-uppercase w-100" onClick={() => { this.CreateTheme() }} >
              Createtheme de {isAsignature().title} [{isAsignature().mencion}]
            </button>
          ) : null}
          {this.state.zz.length > 1 ?
            <div className="container bg-info p-1 text-uppercase text-center bg-light border rounded">
              {this.state.zz.length} Temas forum de {isAsignature().title}
            </div>
            : null}
          {this.state.zz.map((note, index) => (
            <div className="container my-5 border bg-light rounded-lg p-1" key={index} >
              <div className="bg-warning p-1 rounded-top">
                <div className="">
                  <div className="text-center pt-1 text-light text-uppercase" style={{ 'fontWeight': "800" }}>
                    TEMA: {index + 1}. <span className="">{note.title}</span>
                  </div>
                  {note.theme}
                  {/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: "" }} data={note.theme} /> */}
                </div>
                <div className="text-center pb-1">
                  <div className="btn-group">
                    <button className="btn btn-outline-light" onClick={() => { this.open(); this.creteComment(note._id, note._id, "1") }} >
                      <MdComment />
                    </button>
                    {isAuth().rol == 2 ?
                      <>
                        <button className="btn btn-outline-light" onClick={() => this.deleteTheme(note._id, note.comments.length)} >
                          <MdDelete />
                        </button>
                        <button className="btn btn-outline-light" type="button" data-toggle="collapse" data-target={"#collapseOne" + note._id} aria-expanded="false" onClick={() => { this.updatetheme(note._id, note.theme, note.title) }}>
                          <MdEdit />
                        </button>
                      </> : null}
                  </div>

                  <div className="collapse" id={"collapseOne" + note._id}>
                    {/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"] }} data={note.theme} onChange={(event, editor) => { this.setState({ theme: editor.getData() }) }} /> */}
                    <button className="btn btn-info" type="button" data-toggle="collapse" data-target={"#collapseOne" + note._id} aria-expanded="false" onClick={() => { this.UpdateTheme() }}>
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="line pl-1">
                  {note.comments.map((coment, index) => (
                    <div key={index}>
                      <div className="text-info">{coment.usser[0].email} </div>
                      {coment.comment}{/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: "" }} data={coment.comment} /> */}
                      <div className="text-secondary text-right border-bottom" style={{ fontSize: 12 }}>{timeago(coment.createdAt)}</div>
                      <div className="pb-1">
                        {isAuth()._id == coment.user || isAuth().rol == 2 ? <div className="btn-group">
                          <button className="btn btn-outline-warning" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => { this.open(); this.creteComment(coment._id, coment._id, "1") }}>
                            <MdComment />
                          </button>
                          <button className="btn btn-outline-warning" onClick={() => this.deleteComment(coment._id)} >
                            <MdDelete />
                          </button>
                          <button className="btn btn-outline-warning" type="button" data-toggle="collapse" data-target={"#collapseOne" + coment._id} aria-expanded="false" onClick={() => { this.updateComment(coment._id, coment.comment, coment.calification) }}>
                            <MdEdit />
                          </button>
                        </div> : null}
                        <div className="collapse" id={"collapseOne" + coment._id}>
                          {/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"] }} data={coment.comment} onChange={(event, editor) => { this.setState({ comment: editor.getData() }) }} /> */}
                          <button className="btn btn-warning" type="button" data-toggle="collapse" data-target={"#collapseOne" + coment._id} aria-expanded="false" onClick={() => { this.UpDateCommentt() }}>
                            Actualizar
                          </button>
                        </div>
                      </div>
                      <div className="line pl-1">
                        {coment.comments.map((comentt, index) => (
                          <div key={index}>
                            <span className="text-info">{comentt.usser[0].email} </span>
                            {comentt.comment}{/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: "" }} data={comentt.comment} /> */}
                            <div className="text-secondary text-right border-bottom" style={{ fontSize: 12 }}>{timeago(coment.createdAt)}</div>
                            <div className="pb-1">
                              {isAuth()._id == coment.user || isAuth().rol == 2 ? <div className="btn-group">
                                <button className="btn btn-outline-warning" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => { this.open(); this.creteComment(comentt._id, comentt._id, "1") }}>
                                  <MdComment />
                                </button>
                                <button className="btn btn-outline-warning" onClick={() => this.deleteComment(comentt._id)} >
                                  <MdDelete />
                                </button>
                                <button className="btn btn-outline-warning" type="button" data-toggle="collapse" data-target={"#collapseOne" + comentt._id} aria-expanded="false" onClick={() => { this.updateComment(comentt._id, comentt.comment, comentt.calification) }}>
                                  <MdEdit />
                                </button>
                              </div> : null}
                              <div className="collapse" id={"collapseOne" + comentt._id}>
                                {/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"] }} data={comentt.comment} onChange={(event, editor) => { this.setState({ comment: editor.getData() }) }} /> */}
                                <button className="btn btn-warning" type="button" data-toggle="collapse" data-target={"#collapseOne" + comentt._id} aria-expanded="false" onClick={() => { this.UpdateTheme() }}>
                                  Actualizar
                                </button>
                              </div>
                            </div>

                            <div className="line pl-1">
                              {comentt.comments.map((comenttt, index) => (
                                <div key={index}>
                                  <span className="text-info">{comenttt.usser[0].email} </span>
                                  {comenttt.comment}{/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: "" }} data={comenttt.comment} /> */}
                                  <div className="text-secondary text-right border-bottom" style={{ fontSize: 12 }}>{timeago(coment.createdAt)}</div>
                                  <div className="pb-1">
                                    {isAuth()._id == coment.user || isAuth().rol == 2 ? <div className="btn-group">
                                      <button className="btn btn-outline-warning" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => { this.open(); this.creteComment(comenttt._id, comenttt._id, "1") }}>
                                        <MdComment />
                                      </button>
                                      <button className="btn btn-outline-warning" onClick={() => this.deleteComment(comenttt._id)} >
                                        <MdDelete />
                                      </button>
                                      <button className="btn btn-outline-warning" type="button" data-toggle="collapse" data-target={"#collapseOne" + comenttt._id} aria-expanded="false" onClick={() => { this.updateComment(comenttt._id, comenttt.comment, comenttt.calification) }}>
                                        <MdEdit />
                                      </button>
                                    </div> : null}
                                    <div className="collapse" id={"collapseOne" + comenttt._id}>
                                      {/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"] }} data={comenttt.comment} onChange={(event, editor) => { this.setState({ comment: editor.getData() }) }} /> */}
                                      <button className="btn btn-warning" size="small" onClick={() => { this.UpdateTheme() }}>
                                        Actualizar
                                      </button>
                                    </div>
                                  </div>
                                  <div className="line pl-1">
                                    {comenttt.comments.map((comentttt, index) => (
                                      <div key={index}>
                                        <span className="text-info">{comentttt.usser[0].email} </span>
                                        {comentttt.comment}{/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: "" }} data={comentttt.comment} /> */}
                                        <div className="pb-1">
                                          <div className="btn-group">
                                            <button className="btn btn-outline-warning" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => { this.open(); this.creteComment(comentttt._id, comentttt._id, "1") }}>
                                              <MdComment />
                                            </button>
                                            <button className="btn btn-outline-warning" onClick={() => this.deleteComment(comentttt._id)} >
                                              <MdDelete />
                                            </button>
                                            <button className="btn btn-outline-warning" type="button" data-toggle="collapse" data-target={"#collapseOne" + comentttt._id} aria-expanded="false" onClick={() => { this.updateComment(comentttt._id, comentttt.comment, comentttt.calification) }}>
                                              <MdEdit />
                                            </button>
                                          </div>
                                          <div className="collapse" id={"collapseOne" + comentttt._id}>
                                            {/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"] }} data={comentttt.comment} onChange={(event, editor) => { this.setState({ comment: editor.getData() }) }} /> */}
                                            <button className="btn btn-warning" size="small" onClick={() => { this.UpdateTheme() }}>
                                              Actualizar
                                            </button>
                                          </div>
                                        </div>
                                        <div className="line pl-1">
                                          {comentttt.comments.map((comenttttt, index) => (
                                            <div key={index}>
                                              <span className="text-info">{comenttttt.usser[0].email} </span>
                                              {comenttttt.comment}{/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: "" }} data={comenttttt.comment} /> */}
                                              <div className="pb-1">
                                                <div className="btn-group">
                                                  <button className="btn btn-outline-warning" onClick={() => this.deleteComment(comenttttt._id)} >
                                                    <MdDelete />
                                                  </button>
                                                  <button className="btn btn-outline-warning" type="button" data-toggle="collapse" data-target={"#collapseOne" + comenttttt._id} aria-expanded="false" onClick={() => { this.updateComment(comenttttt._id, comenttttt.comment, comenttttt.calification) }}>
                                                    <MdEdit />
                                                  </button>
                                                </div>
                                                <div className="collapse" id={"collapseOne" + comenttttt._id}>
                                                  {/* <CKEditor editor={ClassicEditor} config={{ language: 'es', toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"] }} data={commentt.comment} onChange={(event, editor) => { this.setState({ comment: editor.getData() }) }} /> */}
                                                  <button className="btn btn-warning" size="small" onClick={() => { this.UpdateTheme() }}>
                                                    Actualizar
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
