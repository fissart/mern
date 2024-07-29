import React, { Component } from "react";
//import authSvg from "../assests/update.svg";
import Navigation from "../screens/Navigation.jsx";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { IconButton } from "@material-ui/core";
// import { MdEdit, MdDelete, MdOpenInNew, } from "react-icons/md";
import authSvgwww from "../assests/www.jpg";
import axios from "axios"
import { removeCokie, removeLocalStorage, setCokie, setLocalStorage, isAuth, isAsignature} from "../helpers/auth";
// import { Alpha, Www, getData } from "../components/new"
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import KatexMarkdown from "./Markdown";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';




export default class CreateNote extends Component {
  state = {
    category: this.props.match.params.id,
    nombre: "",
    noww: "",
    scn: "",
    title: "",
    task: "",
    fechaexa: new Date(),
    timexa: "2",
    editing: false,
    isDisabled: "false",
    zz: [],
    zzz: [],
    _id: "",
    submit: "",
  };


  getNotes = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/curses/ControllerAll/${this.props.match.params.id}/${isAuth()._id}`
    ).then(res => {
      this.setState({
        zz: res.data[0].unidades,
        zzz: res.data[0],
        isDisabled: "false"
      });
    });
    //console.log(res.data[0]);
  };

  async componentDidMount() {
    document.title =  isAsignature().title
    this.getNotes();
    this.timeNow()
    if (this.props.match.params.id && isAuth()) {
      //console.log(this.props.match.params.id);
      setCokie("id", this.props.match.params.id);
      setLocalStorage("id", this.props.match.params.id);
    } else {
      removeCokie("id");
      removeLocalStorage("id");
      this.props.history.push("/some/Path");
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


  timeNow() {
    var str = new Date()
    let day = str.getDate()
    let month = str.getMonth() + 1
    let year = str.getFullYear()
    let hour = str.getHours()
    let mnt = str.getMinutes()
    let scn = str.getSeconds()
    let format1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${mnt < 10 ? '0' + mnt : mnt}`
    this.state.noww = format1
    this.state.scn = scn
  }

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

  createTask = async (task, solution, theme, unidad, curse, user, dateb, datee) => {
    this.setState({
      isDisabled: "true"
    });
    console.log(task, solution, theme, unidad, curse, user, dateb, datee)
    await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { note: "", task, solution, theme, unidad, curse, user, dateb, datee }).then(res => {
      console.log(res)
    })
    this.getNotes()
  }

  render() {
    return (
      <>
        <ToastContainer
          closeButton={false}
        />
        <Navigation />

        <div className="modal fade" id="modalLoginForm" >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header h3"> {this.state.title} </div>
              <div className="modal-body">
                <CKEditor editor={ClassicEditor} config={{ language: 'es', }} data={this.state.task} />
              </div>
              <div className="modal-footer p-3">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="container p-1 text-center">
            <img className="p-0 wrapperestperfillcurse" src={`${process.env.REACT_APP_URL}/asignature/${this.state.zzz.img}`} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px" }} />
            <div className="bg-light">
              {this.state.zzz.length != 0 ? <><h3 className="text-uppercase">{this.state.zzz.title}</h3>
                <h5>{this.state.zzz._id}</h5>
                <h5>Ciclo: {this.state.zzz.ciclo} Crédito: {this.state.zzz.credito} Carrera: {this.state.zzz.mencion}</h5>
              </> : null}
            </div>
            <a className="btn btn-warning m-1" style={{ color: 'white' }} href={'/video/' + this.props.match.params.id} >CONFERENCIA</a>
            <Link className="btn btn-info m-1" style={{ color: 'white' }} to={'/forum/' + this.state.zzz._id} > FORUM </Link>
            <Link className="btn btn-info m-1" style={{ color: 'white' }} to={'/meet/' + this.state.zzz._id} > ARCHIVOS </Link>

            <div className="row d-flex justify-content-center p-1">
              {this.state.zz.map((note) => (
                <div
                  className="col-md-6 col-lg-6 p-1"
                  key={note._id}
                >
                  <div className="border border-warning rounded p-1 mt-3">
                    <div className="h5 text-center text-uppercase">
                      {note.title}
                    </div>
                    <div className="row p-0 mx-0">
                      {note.temas.map((notew) => (
                        <div
                          className="col-md-6 col-lg-6 m-0 p-1"
                          key={notew._id}
                        >
                          <div className={`rounded p-1 ${notew.dateb < this.state.noww && this.state.noww < notew.datee ? 'bg-warning' : 'border border-info rounded'}`}>
                            <div className="text-uppercase">
                              {notew.title}
                            </div>
                            <span style={{ fontSize: 11 }}>[{notew.dateb}] [{notew.datee}]</span>
                            {isAuth() && JSON.parse(localStorage.getItem("user")).rol == '2' ? <Link
                              className="btn btn-info w-100"
                              style={{ color: 'white' }}
                              to={'/theme/' + notew._id + '/' + notew.curse}
                            >
                              Actualizar sesion
                            </Link> : null}

                            {notew.usertaskteacher.map((taskteacher, index) => (
                              <div
                                key={taskteacher._id}
                              >
                                {isAuth() && JSON.parse(localStorage.getItem("user")).rol == '3' && notew.usertask.length < 1 ?
                                  <div className="">
                                    <span className="text-info">{taskteacher.note}</span>
                                    {notew.dateb < this.state.noww && this.state.noww < notew.datee && index == this.state.scn % notew.usertaskteacher.length ?
                                      <button className='btn btn-light w-100' disabled={this.state.isDisabled == 'true'} onClick={() => {
                                        this.createTask(
                                          taskteacher.solution, this.state.scn % notew.usertaskteacher.length, notew._id, notew.unidad, notew.curse, JSON.parse(localStorage.getItem("user"))._id, notew.dateb, notew.datee
                                        )
                                      }}>Generar</button> :
                                      <></>
                                    }
                                  </div> :
                                  null
                                }
                              </div>
                            ))}
                            {notew.usertask.map((www) => (
                              <div
                                key={www._id}
                              >
                                {isAuth() && JSON.parse(localStorage.getItem("user")).rol == '3' ?
                                  <div className="">
                                    <span className="text-info">{www.note}</span>
                                    {notew.dateb < this.state.noww && this.state.noww < notew.datee && www.note == '' ?
                                      <Link className="btn btn-light w-100" style={{ color: 'orange' }} to={'/test/' + www._id} > Actualizar tarea
                                      </Link>
                                      :
                                      <span className=""></span>
                                    }
                                    <button
                                      className="btn btn-outline-info w-100 mt-1 text-uppercase" data-toggle="modal" data-target="#modalLoginForm" onClick={() => {
                                        this.setState({ task: www.task, title: notew.title });
                                      }} style={{ color: "inherit" }}
                                    >
                                      Mi tarea
                                    </button>
                                  </div> :
                                  null
                                }
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
          </div>
        </div >
      </>
    );
  }
}
