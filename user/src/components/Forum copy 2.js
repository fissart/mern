import React, { Component } from "react";
import Navigation from '../screens/Navigation.jsx';
import Headroom from "react-headroom";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { isAuth, isAsignature } from "../helpers/auth";
import { IoMdAlert } from "react-icons/io";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modal } from "react-bootstrap";
import '@ckeditor/ckeditor5-build-classic/build/translations/es';

export default class CreateNote extends Component {
  state = {
    curseid: this.props.match.params.id,
    nombre: "",
    noww: "",
    // scn: "",
    title: "",
    stdaverages: [],
    units: [],
    task: "",
    // fechaexa: new Date(),
    // timexa: "2",
    // editing: false,
    // isDisabled: "false",
    zz: [],
    newww: [],
    _id: "",
    submit: "",
  };

  open = () => this.setState({ showModal: true });
  close = () => this.setState({ showModal: false });

  fileSelectHandler = (files) => {
    console.log(files);
    var array = ["image/jpeg", "image/jpg", "image/png", "image/PNG", "image/svg+xml"];
    console.log(array.includes(files[0].type));
    if (files) {
      if (files[0].size < 105048576 && array.includes(files[0].type)) {
        this.setState({
          files,
        });
      } else {
        toast.dark(
          "Solo se acepta archivos no mayor a 1MB en formatos pdf, jpeg, jpg y png "
        );
      }
    }
  };

  crearGeneral = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("title", this.state.title)
    data.append("detail", this.state.detail)
    data.append("foreign", this.state.foreign)
    data.append("user", isAuth()._id)
    data.append("foto", this.state.files[0])
    console.log(this.state.subtype)
    await axios.post(`${process.env.REACT_APP_API_URL}/links/lands`, data);
    this.close()
    toast.dark("Actualizado correctamente")
    this.getNotes()
    // this.setState({ files: [], foreign: "", i: "", select: "", title: "", detail: "", })
  };


  async componentDidMount() {
    document.title = isAsignature().title
    // this.getNotes();
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  getNotes = async () => {
    console.log("res.data[0]");
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/curses/ControllerAll/${this.props.match.params.id}/${isAuth()._id}`
    ).then(res => {
      console.log(res.data[0], "www")
      this.setState({
        zz: res.data[0],
        units: res.data[0].units,
        // isDisabled: "false"
      });
    });
  };

  getStdscalification = async (mencion, ciclo, year, codigo) => {
    console.log(mencion, ciclo, year)
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/stdaverages/` + mencion + `/` + ciclo + `/` + year + `/` + codigo
    );
    console.log(res.data);
    console.log("wwwwww");
    this.setState({
      stdaverages: res.data,
    });
  };

  save = async () => {
    this.close()
    // await axios.put(`${process.env.REACT_APP_API_URL}/curses/` + this.props.match.params.id, data)
  }

  CreateUnit = async () => {
    var data = this.state.zz ? this.state.zz : []
    console.log(data)
    if (data.units === undefined || data.units === null) {
      data.units = []
    }
    data.units.push(
      {
        "title": this.state.title,
        "detail": this.state.detail,
        "themes": [],
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    )
    this.setState({
      units: data.units,
    });
    this.save(data)
  }


  updateUnit = async (event, i) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(event, i)
    data.units[i].title = event
    data.units[i].updatedAt = new Date()
    this.setState({
      units: data.units,
    });
    this.save(data)
  }

  CreateTheme = async (i) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(i)
    data.units[i].themes.push(
      {
        "title": "this.state.title",
        "detail": "this.state.detail",
        "subthemes": [],
        "idtheme": Math.random().toString(36).substring(2, 11).toUpperCase(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    )
    this.setState({
      units: data.units,
    });
    this.save(data)
  }

  updateTheme = async (event, i, j) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(event, i)
    data.units[i].themes[j].title = event
    data.units[i].themes[j].updatedAt = new Date()
    this.setState({
      units: data.units,
    });
    this.save(data)
  }

  CreateSubTheme = async (i, j) => {
    var data = this.state.zz ? this.state.zz : []
    data.units[i].themes[j].subthemes.push(
      {
        "title": "this.state.title",
        "detail": "this.state.detail",
        "idtheme": Math.random().toString(36).substring(2, 11).toUpperCase(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    )
    this.setState({
      units: data.units,
    });
    console.log(data)
    this.save(data)
  }

  updateSubTheme = async (event, i, j, k) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(event, i)
    data.units[i].themes[j].subthemes[k].title = event
    data.units[i].themes[j].subthemes[k].updatedAt = new Date()
    this.setState({
      units: data.units,
    });
    this.save(data)
  }



  removeUnit = async (i) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data.units.splice(i, 1);
      console.log(data, "www")
      this.setState({ units: data.units })
      this.save(data)
    }
  }

  removeTheme = async (i, j) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data.units[i].themes.splice(j, 1);
      this.setState({ units: data.units })
      this.save(data)
    }
  }

  removeSubTheme = async (i, j, k) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data.units[i].themes[j].subthemes.splice(k, 1);
      this.setState({ units: data.units })
      this.save(data)
    }
  }



  render() {
    return (
      <>
        <ToastContainer
          closeButton={false}
        />
        <Headroom>
          <Navigation />
        </Headroom>
        <div className="container text-center">


          <Modal size="lg" show={this.state.showModal} onHide={() => { this.close(); }} animation={false}>
            <Modal.Body> {this.state.type}
              {(this.state.select === 'subclase' && this.state.subtype !== 'link') || this.state.type === 'nuevas' || this.state.type === 'reference' ? <div className="card form-group">
                <input type="file" className="custom-file-input" onChange={(e) => { this.fileSelectHandler(e.target.files); }} ></input>
                <label className="custom-file-label" htmlFor="customFile">
                  Subir archivo
                </label>
              </div> : ""}
              <div className="card form-group">
                <input type="text" placeholder="Título" name="title" onChange={this.onInputChange} value={this.state.title} required />
              </div>
              <div className="card form-group">
                {this.state.select === 'subclase' ? < textarea type="text" placeholder="Detalles" name="detail" onChange={this.onInputChange} value={this.state.detail} required /> :
                  <CKEditor editor={ClassicEditor} config={{
                    language: 'es', placeholder: "Descripción",
                    toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"]
                  }} data={this.state.detail} onChange={(event, editor) => {
                    //wwWw(editor.getData())
                    this.setState({ detail: editor.getData() })
                  }} onReady={editor => {
                    console.log('Editor is ready to use!', editor)
                    //wwWw(editor.getData())
                  }}
                    name="detail"
                  />
                }
              </div>
            </Modal.Body>
            <Modal.Footer>

              {this.state.select === 'crear' ?
                <button className="btn btn-info" onClick={() => { this.CreateUnit() }}> Crear </button> : ""
              }
              {/* {this.state.select === 'subclase' ?
              <button className="btn btn-info" onClick={this.updatefirst}> Actualizarsubclase </button> : ""
            }
            {this.state.select === 'clase' ?
              <button className="btn btn-info" onClick={this.onSubmitUpdate}> Actualizarclase </button> : ""
            }
            {this.state.select === 'newclass' ?
              <button className="btn btn-info" onClick={this.createSesion}>Crearsubclase</button> : ""
            }
            <button className="btn btn-info" onClick={this.createSesionw}>Crearsubsubclase</button> */}

              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.close() }}>
                Cerrar
              </button>
            </Modal.Footer>
          </Modal>



          {/* <button className='form-control btn btn-warning' disabled={this.state.isDisabled === 'true'} onClick={() => { this.CreateUnit() }}>Unidad</button> */}

          <button className="form-control text-center btn btn-primary" onClick={() => { this.open(); this.setState({ select: "crear", files: [], title: "", detail: "", foreign: isAuth()._id }) }}>Generar documentos</button>


          <div className="row d-flex justify-content-center border" style={{ padding: '.1em', margin: '.1em' }} >
            {this.state.units ? this.state.units.map((note, i) => (
              <div
                className="col-md-6 col-lg-6 border border-warning"
                key={note._id}
              >
                <div className="" contentEditable="true" suppressContentEditableWarning={true} onBlur={(e) => { this.updateUnit(e.target.innerText, i) }}>
                  {note.title}
                </div>
                <button className="btn text-center" onClick={() => { this.CreateTheme(i) }}>
                  <IoMdAlert style={{ color: '#3d85bdff', fontSize: '34px' }} />
                </button>
                <button className="btn text-center" onClick={() => { this.removeUnit(i) }}>
                  <IoMdAlert style={{ color: '#bd3d79ff', fontSize: '34px' }} />
                </button>

                <div className="row d-flex justify-content-center border" style={{ padding: '.1em', margin: '.1em' }}>
                  {note.themes ? note.themes.map((notte, j) => (
                    <div
                      className="col-md-6 col-lg-6 border"
                      key={j}
                    >
                      <div className="" contentEditable="true" suppressContentEditableWarning={true} onBlur={(e) => { this.updateTheme(e.target.innerText, i, j) }}>
                        {notte.title}
                      </div>
                      {isAuth() && JSON.parse(localStorage.getItem("user")).rol == '2' ? <Link
                        className="btn btn-info w-100"
                        style={{ color: 'white' }}
                        to={{ pathname: '/theme/' + this.state.zz._id + '/' + notte.idtheme, state: { title: notte.title } }}
                      >
                        Actualizar tema
                      </Link> : null}
                      <button className="btn text-center" onClick={() => { this.CreateSubTheme(i, j) }}>
                        <IoMdAlert style={{ color: '#92bee0ff', fontSize: '34px' }} />
                      </button>
                      <button className="btn text-center" onClick={() => { this.removeTheme(i, j) }}>
                        <IoMdAlert style={{ color: '#bd3d79ff', fontSize: '34px' }} />
                      </button>

                      <div className="row d-flex justify-content-center border" style={{ padding: '.1em', margin: '.1em' }}>
                        {notte.subthemes ? notte.subthemes.map((nottte, k) => (
                          <div
                            className="col-md-6 col-lg-6 border"
                            key={k}
                          >
                            <div className="" contentEditable="true" suppressContentEditableWarning={true} onBlur={(e) => { this.updateSubTheme(e.target.innerText, i, j, k) }}>
                              {nottte.title}
                            </div>
                            {isAuth() && JSON.parse(localStorage.getItem("user")).rol == '2' ? <Link
                              style={{ color: 'white' }}
                              to={{ pathname: '/theme/' + this.state.zz._id + '/' + nottte.idtheme, state: { title: nottte.title } }}
                            >
                              Actualizar sesion {this.state.zz._id}
                            </Link> : null}
                            <button className="btn text-center" onClick={() => { this.CreateSubTheme(i, j) }}>
                              <IoMdAlert style={{ color: '#92bee0ff', fontSize: '34px' }} />
                            </button>
                            <button className="btn text-center" onClick={() => { this.removeSubTheme(i, j, k) }}>
                              <IoMdAlert style={{ color: '#bd3d79ff', fontSize: '34px' }} />
                            </button>

                          </div>
                        )) : ""}

                      </div>
                    </div>
                  )) : ""}
                </div>

              </div>
            )) : ""}
          </div>

        </div>

      </>
    );
  }
}
