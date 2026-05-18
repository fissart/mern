import React, { Component } from "react";
import Navigation from "../screens/Navigation.jsx";
// import DatePicker from "react-datepicker";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "react-datepicker/dist/react-datepicker.css";
import Headroom from "react-headroom";
import { ToastContainer, toast } from "react-toastify";
import io from "socket.io-client";
import axios from "axios"
import { Modal, Row } from "react-bootstrap";
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import Markdownkatexnew from "./Markdown.js";
import { IoMdCreate, IoIosAlert, IoMdAlert, IoIosAddCircleOutline, IoIosAirplane, IoIosCreate } from "react-icons/io";
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import { setLocalStorage, isAuth, } from "../helpers/auth.js";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { MdCreate, MdEdit, MdRemove } from "react-icons/md";


export default class CreateNote extends Component {
  state = {
    showModal: false, title: "", detail: "", option: '', calification: "", curse: this.props.match.params.idcurse, likes: "", i: '', j: '', k: '', zz: [], id: "", files: "", submit: "Crear", editing: false
  };

  open = () => this.setState({ showModal: true });
  close = () => this.setState({ showModal: false });

  getNotes = async () => {
    this.socket.emit('foroesfa', this.props.match.params.idcurse)
    this.socket.emit("temas", this.props.match.params.idcurse)
    this.socket.on("foro", (ww) => {
      console.log(ww, "new")
      this.setState({ zz: ww });
    })
  };

  componentWillUnmount() {
    this.socket.disconnect();
  }

  async componentDidMount() {
    this.getCurses()
    document.title = `FORO ${process.env.REACT_APP_pagetitle}`
    this.socket = io(`${process.env.REACT_APP_URL}`)
    this.socket.emit('foroesfa', this.props.match.params.idcurse)
    this.socket.emit("temas", this.props.match.params.idcurse)
    this.socket.on("foro", (ww) => {
      this.setState({ zz: ww });
      console.log(ww, "new")
    })
  }

  getCurses = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/curses/cursosculqui/${JSON.parse(localStorage.getItem("user"))._id}/true`);
    console.log(res.data[0], "w wwwwww")
    this.setState({
      cursesteacher: res.data[0].curses,
      report: res.data[0].cursesstd ? res.data[0].cursesstd : [],
    });
  };
  CreateCurses = async () => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/curses/CreateCurses`, {
      detail: "this.state.detail", title: "this.state.title"
    });
    this.setState({
      cursesteacher: res.data[0].curses,
      report: res.data[0].cursesstd ? res.data[0].cursesstd : [],
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////
  CreateTheme = async () => {
    console.log(this.state.title, this.state.detail, isAuth()._id)
    await axios.post(`${process.env.REACT_APP_API_URL}/foros/theme`, {
      detail: this.state.detail,
      title: this.state.title,
      type: 'foroesfa',
      curse: this.props.match.params.idcurse,
      user: isAuth()._id
    })
      .then((res) => {
        this.getNotes()
        this.close()
      }).catch((error) => { console.log("ERROR", error.response) })
  };

  UpdateTheme = async () => {
    console.log(this.state.detail, this.state.title)
    await axios.put(`${process.env.REACT_APP_API_URL}/foros/theme/` + this.state.id, {
      detail: this.state.detail, title: this.state.title
    }).then(() => {
      this.getNotes()
      this.close()
      toast.dark("Tema actualizado correctamente")
    }).catch((error) => { console.log("ERROR", error.response) })
  };

  RemoveTheme = async (id) => {
    const response = window.confirm('Deseas eliminar este item?');
    if (response) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/foros/theme/` + id);
      this.getNotes();
      toast.dark('Removido correctamente');
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////

  Likes = async (i, id) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(data)
    if (data[i].likes === undefined || data[i].likes === null) { data[i].likes = [] }
    const hasLike = data[i].likes.some(usser => usser.user === 'fismart@w');
    if (hasLike) { } else {
      data[i].likes.unshift({ "user": isAuth().email, "likes": "w1", "unlikes": "w2", "createdAt": new Date(), "updatedAt": new Date(), })
      this.setState({ zz: data, });
      this.Save(data, id, i)
    }
  }

  UnLikes = async (i, id) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(data)
    if (data[i].unlikes === undefined || data[i].unlikes === null) { data[i].unlikes = [] }
    const hasLike = data[i].likes.some(usser => usser.user === 'fismart@w');
    if (hasLike) { } else {
      data[i].unlikes.unshift({ "user": isAuth().email, "likes": "w1", "unlikes": "w2", "createdAt": new Date(), "updatedAt": new Date(), })
      this.setState({ zz: data, });
      this.Save(data, id, i)
    }
  }


  onInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value })
  };

  Save = async (data, id, i) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/foros/theme/` + id, data[i]).then(() => {
      // this.getNotes()
      this.close()
      toast.dark("Tema actualizado correctamente")
    }).catch((error) => { console.log("ERROR", error.response) })

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////
  CreateSubTheme = async () => {
    var data = this.state.zz ? this.state.zz : []
    console.log(data)
    if (data[this.state.i].units === undefined || data[this.state.i].units === null) {
      data[this.state.i].units = []
    }
    data[this.state.i].units.unshift({ "user": isAuth().email, "title": this.state.title, "detail": this.state.detail, "themes": [], "createdAt": new Date(), "updatedAt": new Date(), })
    this.setState({ zz: data, });
    this.Save(data)
  }

  updateSubTheme = async () => {
    var data = this.state.zz ? this.state.zz : []
    data[this.state.i].units[this.state.j].title = this.state.title
    data[this.state.i].units[this.state.j].detail = this.state.detail
    data[this.state.i].units[this.state.j].updatedAt = new Date()
    this.setState({ zz: data, });
    this.Save(data)
  }


  removeSubTheme = async (i, j) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data[i].units.splice(j, 1);
      console.log(data[i], "www")
      this.setState({ zz: data })
      this.Save(data)
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////
  CreateSubSubTheme = async () => {
    var data = this.state.zz ? this.state.zz : []
    console.log(data)
    data[this.state.i].units[this.state.i].themes.unshift({ "user": isAuth().email, "title": this.state.title, "detail": this.state.detail, "themes": [], "createdAt": new Date(), "updatedAt": new Date(), })
    this.setState({ zz: data, });
    this.Save(data)
  }

  updateSubSubTheme = async () => {
    var data = this.state.zz ? this.state.zz : []
    data[this.state.i].units[this.state.j].themes[this.state.k].title = this.state.title
    data[this.state.i].units[this.state.j].themes[this.state.k].detail = this.state.detail
    data[this.state.i].units[this.state.j].themes[this.state.k].updatedAt = new Date()
    this.setState({ zz: data, });
    this.Save(data)
  }


  removeSubSubTheme = async (i, j, k) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data[i].units[j].themes.splice(k, 1);
      console.log(data[i], "www")
      this.setState({ zz: data })
      this.Save(data)
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////





  render() {
    return (
      <>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />


        <Modal show={this.state.showModal} onHide={() => { this.close(); }} animation={false}>
          <div className="modal-header font-weight-bold h5"> {this.state.submit} </div>
          <div className="modal-body">
            <div class="mb-3">
              <label for="www" class="form-label">Título</label>
              <input type="text" id="www" className="form-control my-1" placeholder="Título" onChange={this.onInputChange} name="title" value={this.state.title} />
            </div>

            <div class="mb-3">
              <label for="wwwww" class="form-label">Detalle (Escriba texto en formato Markdown [<a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Tutorial!</a>])</label>
              <textarea type="text" id="wwwww" className="form-control scroll" placeholder="Contenido" rows="9" name="detail" onChange={this.onInputChange} value={this.state.detail} required ></textarea>
              <Markdownkatexnew>
                {this.state.detail}
              </Markdownkatexnew>
            </div>

          </div>
          <div className="modal-footer d-flex right-content-center">
            {/* <button className="btn btn-info"> {this.state.submit}</button> */}
            {this.state.option === '3w' ? <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.updateSubSubTheme() }}> updateSubSubTheme </button> : ""}
            {this.state.option === '3' ? <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.CreateSubSubTheme() }}> CreateSubSubTheme </button> : ""}
            {this.state.option === '2w' ? <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.updateSubTheme() }}> updateSubTheme </button> : ""}
            {this.state.option === '2' ? <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.CreateSubTheme() }}> CreateSubTheme </button> : ""}
            {this.state.option === '1w' ? <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.UpdateTheme() }}> UpdateTheme </button> : ""}
            {this.state.option === '1' ? <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.CreateTheme() }}> CrearTheme </button> : ""}
            <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.close() }}> Close </button>
          </div>
          {/* </form> */}
        </Modal >

        <Headroom>
          <Navigation />
        </Headroom>

        <div className="container p-1 my-3">

          {isAuth().rol === '2' || isAuth().rol === '1' ?
            <button className="btn btn-info text-uppercase" onClick={() => { this.open(); this.setState({ option: "1", title: '', detail: '' }) }} >
              Crear tema
            </button>
            : ''}

          {this.state.zz.map((note, i) => (
            <div className="container my-5 border border-warning rounded-lg p-1" key={i} >
              <div className="p-1 rounded-top">
                <div className="">
                  <div className="pt-1" style={{ 'fontWeight': "100" }}>
                    <h1 className="">{note.title}</h1>
                  </div>
                  <div className="text-secondary text-right border-bottom" style={{ fontSize: 12 }}>
                    {note.usser[0].email}	Creado <TimeAgo datetime={note.createdAt} locale='es_ES' />. Actualizado <TimeAgo datetime={note.updatedAt} locale='es_ES' />
                  </div>
                  <Markdownkatexnew>
                    {note.detail}
                  </Markdownkatexnew>
                </div>
                {isAuth() ? <>
                  <div className="btn-group">
                    <button className="btn text-center btn-info" onClick={() => { this.open(); this.setState({ option: "2", title: '', detail: '', i: i, id: note._id }) }} >
                      <IoIosCreate style={{ color: '#ffffffff', fontSize: '24px' }} />
                    </button>
                    <button className="btn text-center btn-light" onClick={() => { this.Likes(i, note._id) }} >
                      <FaArrowUp style={{ color: '#49c8e7ff', fontSize: '24px' }} /> {note.likes ? note.likes.length : ''}
                    </button>
                    <button className="btn text-center btn-warning" onClick={() => { this.UnLikes(i, note._id) }} >
                      <FaArrowDown style={{ color: '#36719cff', fontSize: '24px' }} /> {note.unlikes ? note.unlikes.length : ''}
                    </button>
                  </div>

                  <button className="btn btn-warning w-100" style={{ height: '11px', padding: '.1px' }} type="button" data-toggle="collapse" data-target={"#collapseOne" + note._id} aria-expanded="false">
                  </button>
                  <div className="input-group collapse" id={"collapseOne" + note._id}>
                    <button className="btn text-center" onClick={() => { this.open(); this.setState({ option: "1w", title: note.title, detail: note.detail, i: i, id: note._id }) }} >
                      <MdEdit style={{ color: '#062033ff', fontSize: '34px' }} />
                    </button>
                    <button className="btn text-center" onClick={() => { this.RemoveTheme(note._id) }}>
                      <MdRemove style={{ color: '#bd3d79ff', fontSize: '34px' }} />
                    </button>
                  </div>
                </> : ''}
              </div>
              <div className="line pl-1">
                {note.units ? note.units.map((notte, j) => (
                  <div className="p-1" key={j} >
                    <div className="p-1 rounded-top">{notte.title}
                    </div>
                    <div className="text-secondary text-right border-bottom" style={{ fontSize: 12 }}>
                      {notte.user} Creado <TimeAgo datetime={notte.createdAt} locale='es_ES' /> Actualizado <TimeAgo datetime={notte.createdAt} locale='es_ES' />
                    </div>
                    <Markdownkatexnew>
                      {notte.detail}
                    </Markdownkatexnew>
                    {isAuth() ? <>
                      <div className="btn-group">
                        <button className="btn text-center btn-info" onClick={() => { this.open(); this.setState({ option: "3", title: '', detail: '', i: i, j: j, id: note._id }) }} >
                          <IoIosCreate style={{ color: '#ffffffff', fontSize: '24px' }} />
                        </button>
                        <button className="btn text-center btn-light" onClick={() => { this.Likes(i) }} >
                          <FaArrowUp style={{ color: '#49c8e7ff', fontSize: '24px' }} /> 2
                        </button>
                        <button className="btn text-center btn-warning" onClick={() => { this.UnLikes(i) }} >
                          <FaArrowDown style={{ color: '#36719cff', fontSize: '24px' }} /> 3
                        </button>
                      </div>

                      <button className="btn btn-info w-100" style={{ height: '11px', padding: '.1px' }} type="button" data-toggle="collapse" data-target={"#collapseOne" + i + j} aria-expanded="false">
                      </button>
                      <div className="input-group collapse" id={"collapseOne" + i + j}>
                        <button className="btn text-center" onClick={() => { this.open(); this.setState({ option: "2w", title: notte.title, detail: notte.detail, i: i, j: j, id: note._id }) }} >
                          <MdEdit style={{ color: '#657f91ff', fontSize: '34px' }} />
                        </button>
                        <button className="btn text-center" onClick={() => { this.removeSubTheme(i, j); this.setState({ id: note._id }) }}>
                          <MdRemove style={{ color: '#d67ba5ff', fontSize: '34px' }} />
                        </button>
                      </div></> : ''}
                    <div className="line pl-1">
                      {notte.themes ? notte.themes.map((nottte, k) => (
                        <div className="p-1" key={k} >
                          <div className="p-1 rounded-top">{nottte.title}
                          </div>
                          <div className="text-secondary text-right border-bottom" style={{ fontSize: 12 }}>
                            {nottte.user} <TimeAgo datetime={nottte.createdAt} locale='es_ES' /> <TimeAgo datetime={nottte.createdAt} locale='es_ES' />
                          </div>
                          <Markdownkatexnew>
                            {nottte.detail}
                          </Markdownkatexnew>
                          <button className="btn btn-info w-100" style={{ height: '11px', padding: '.1px' }} type="button" data-toggle="collapse" data-target={"#collapseOne" + i + j + k} aria-expanded="false">
                          </button>
                          <div className="input-group collapse" id={"collapseOne" + i + j + k}>
                            {/* <button className="btn text-center" onClick={() => { this.open(); this.setState({ option: "5", title: '', detail: '', i: i, id: note._id }) }} >
                              <IoMdAlert style={{ color: '#d7d098ff', fontSize: '34px' }} />
                            </button> */}
                            {isAuth() ? <>
                              <button className="btn text-center" onClick={() => { this.open(); this.setState({ option: "3w", title: nottte.title, detail: nottte.detail, i: i, j: j, k: k, id: note._id }) }} >
                                <MdEdit style={{ color: '#d7d098ff', fontSize: '34px' }} />
                              </button>
                              <button className="btn text-center" onClick={() => { this.removeSubTheme(i, j, k); this.setState({ id: note._id }) }}>
                                <MdRemove style={{ color: '#d7d098ff', fontSize: '34px' }} />
                              </button></> : ''}
                          </div>
                        </div>
                      )) : ''}
                    </div>
                  </div>
                )) : ''}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
