// npm i @react-three/drei@10.0.0-rc.3
// npm i @react-three/fiber@9.0.0-alpha.8
// npm i @xyflow/react@12.8.3
// npm i exceljs@3.10.0
// import { SiGooglemeet } from "react-icons/si"
// import { HexColorPicker } from "react-colorful"
// import { Canvas } from '@react-three/fiber'
// import { Center, AccumulativeShadows, RandomizedLight, OrbitControls, Environment, useGLTF, ContactShadows } from '@react-three/drei'
// import Www_w from "./screens/www";
// import { IconButton } from "@material-ui/core";
import React, { Component } from "react";
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import { FaBloggerB, FaCertificate, FaExpandAlt, FaFileArchive, FaForumbee } from "react-icons/fa"
import { MdAppBlocking, MdForum, MdOutlineCircleNotifications, MdOutlineForum, MdOutlineSmartDisplay, MdOutlineVideoCameraFront } from "react-icons/md"
import { MdModeEdit } from "react-icons/md"
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Input } from "@material-ui/core";
// import { MdMap, } from "react-icons/md";
import { GiCursedStar, GiDiploma, GiVideoConference } from "react-icons/gi"
// import { PiVideoConferenceFill } from "react-icons/pi"
// import { PiVideoConferenceFill } from "react-icons/pi"
import { IoMdCreate, IoIosAlert, IoMdAlert, IoIosAddCircleOutline, IoIosAirplane } from "react-icons/io";
import { getCokie, setLocalStorage, removeCokie, removeLocalStorage, isAuth } from './helpers/auth.js';
import Markdownkatexnew from "../src/components/Markdown";
import Navigate from "./screens/Navigation";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';

import Headroom from "react-headroom";
import Wwwwww from "./screens/downlist";
import Socket from "./screens/Chat.jsx";
import authSvgwww from "./assests/www3.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectCoverflow, EffectCube, EffectFlip, EffectFade, Autoplay, Scrollbar, A11y } from 'swiper';
import { BiCertification, BiFile, BiLogoBlogger, BiSolidCertification } from "react-icons/bi";
// import authSvg from "./assests/www.jpg";
// import { title } from "process";
// import { detach } from "@react-three/fiber/dist/declarations/src/core/utils";
// import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation, Pagination, EffectCoverflow, EffectCube, EffectFlip, EffectFade, Autoplay, Scrollbar, A11y])

export default class App extends Component {
  // swiper = new Swiper('.swiper', {
  //   centeredSlides: true,
  //   slidesPerView: 'auto', // Often used together for best effect
  // });

  state = {
    files: [],
    file: "",
    news: [],
    newsw: [],
    zz: [],
    user: [],
    id: "",
    i: "",
    j: "",
    k: "",
    foreign: "",
    type: "",
    select: "",
    title: "",
    detail: "",
    userssocket: [],
    showModal: false,
    showModalw: false,
  };

  open = () => this.setState({ showModal: true });
  close = () => this.setState({ showModal: false });
  openw = () => this.setState({ showModalw: true });
  closew = () => this.setState({ showModalw: false });


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

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  crearGeneral = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("type", this.state.type)
    data.append("subtype", this.state.subtype)
    data.append("title", this.state.title)
    data.append("detail", this.state.detail)
    data.append("foreign", this.state.foreign)
    data.append("user", isAuth()._id)
    data.append("foto", this.state.files[0])
    console.log(this.state.subtype)
    await axios.post(`${process.env.REACT_APP_API_URL}/links/lands`, data);
    this.close()
    toast.dark("Actualizado correctamente")
    if (this.state.type === 'reference') {
      this.getnewsw()
    }
    if (this.state.type === 'general') {
      this.getNotes()
    }
    if (this.state.type === 'nuevas') {
      this.getnews()
    }
    this.setState({
      files: [],
      foreign: "",
      i: "",
      select: "",
      title: "",
      detail: "",
    })
  };


  onSubmitUpdate = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("title", this.state.title)
    data.append("description", this.state.detail)
    data.append("user", isAuth()._id)
    data.append("foto", this.state.files[0])
    await axios.put(`${process.env.REACT_APP_API_URL}/links/lands/` + this.state.id, data).then(res => {
      console.log(res.data, "wwwww");
      toast.dark(res.data)
      this.close()
      this.getNotes();
      this.getnews();
      this.setState({
        files: [],
        foreign: "",
        type: "",
        select: "",
        title: "",
        detail: "",
      })
      // if (this.state.type === 'reference') {
      this.getnewsw()
      // }
      // if (this.state.type === 'general') {
      this.getNotes()
      // }
      // if (this.state.type === 'nuevas') {
      this.getnews()
      // }

    }).catch((err) => {
      console.log(err.response.statusText);
      toast.error(`Error To Your Information ${err.response.statusText}`);
      if (err.response.status === 401) {
        // signout(() => {
        // history.push("/login");
        // });
      }
    })

  };

  onSubmitRemove = async (id) => {
    const response = window.confirm('Deseas eliminar este capítulo?');
    if (response) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/links/lands/` + id);
      this.getNotes();
      toast.dark('Removido correctamente');
    }
  };



  getNotes = async () => {
    await axios.get(
      `${process.env.REACT_APP_API_URL}/links/lands`, {
      headers: {
        Authorization: `Bearer ${getCokie("token")}`,
      },
    }
    ).then(res => {
      console.log(res.data, "wwwww");
      this.setState({
        zz: res.data,
      });
    }).catch((err) => {
      console.log(err.response.statusText);
      toast.error(`Error To Your Information ${err.response.statusText}`);
      if (err.response.status === 401) {
        // signout(() => {
        // history.push("/login");
        // });
      }
    });
  };


  getnews = async () => {
    await fetch(process.env.REACT_APP_API_URL + "/links/lands/news")
      .then((response) => response.json())
      .then((www) => {
        this.setState({
          news: www,
        });
        console.log(www, "wwwwwwwwwwwwwwwwwwwwwww")
      })
      .catch(error => console.error(error))
  }

  getnewsw = async () => {
    await fetch(process.env.REACT_APP_API_URL + "/links/lands/newsw")
      .then((response) => response.json())
      .then((www) => {
        this.setState({
          newsw: www,
        });
        console.log(www, "wwwwwwwwwwwwwwwwwwwwwww")
      })
      .catch(error => console.error(error))
  }


  openInNewTab = async (url) => {
    window.open(url, "_blank", "noreferrer");
  }

  async componentDidMount() {
    this.getNotes();
    document.title = "INICIO ESFA"
    this.getnews()
    this.getnewsw()

    document.title = "PANEL USUARIO"
    removeCokie('idc');
    removeLocalStorage('idc');
    removeCokie('idcat');
    removeLocalStorage('idcat');
    removeCokie('curse');
    removeLocalStorage('curse');

  }


  remove = (i, j) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data[i].usertask.splice(j, 1);
      console.log(data, "www")
      this.setState({ zz: data })
      const id = data[i]._id
      this.save(this.state.zz[i], id)
    }
  }

  removelink = (id) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      fetch(`${process.env.REACT_APP_URL}/api/links/lands/${id}`, {
        method: 'delete',
      })
        .then(response => response.json())
        .then(data => {
          toast.info(data);
          this.getnewsw()
          this.getNotes()
          this.getnews()
        })
        .catch(error => console.error(error))
    }
  }

  updatefirst = () => {
    console.log(this.state.type)
    if (this.state.type === 'general') {
      const data = this.state.zz
      data[this.state.i].usertask[this.state.j].title = this.state.title
      data[this.state.i].usertask[this.state.j].detail = this.state.detail
      this.setState({ zz: data })
      const id = data[this.state.i]._id
      this.save(this.state.zz[this.state.i], id)
    }
    if (this.state.type === 'nuevas') {
      const data = this.state.news
      data[this.state.i].usertask[this.state.j].title = this.state.title
      data[this.state.i].usertask[this.state.j].detail = this.state.detail
      this.setState({ news: data })
      const id = data[this.state.i]._id
      this.save(this.state.news[this.state.i], id)
    }
  }

  createSesion = () => {
    var data = this.state.zz ? this.state.zz : []
    for (var k = 0; k < data.length; k++) {
      if (k === this.state.i) {
        var www = data[k].usertask
        // console.log(data)
        www.push(
          {
            "title": this.state.title,
            "detail": this.state.detail,
            "link": "",
          }
        )
      }
    }
    this.setState({ zz: data })
    const id = data[this.state.i]._id
    this.save(this.state.zz[this.state.i], id)
  }

  createSesionw = () => {
    const data = this.state.zz
    if (data[this.state.i].usertask[this.state.j].usetask === undefined) {
      data[this.state.i].usertask[this.state.j].usertast = []
    }
    data[this.state.i].usertask[this.state.j].usertast.push({
      "title": this.state.title,
      "detail": this.state.detail,
      "link": "",
    })
    console.log(data, "www")
    this.setState({ zz: data })
    const id = data[this.state.i]._id
    this.save(this.state.zz[this.state.i], id)
  }


  save = (data, id) => {
    fetch(`${process.env.REACT_APP_URL}/api/links/landswithoutfile/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        toast.info(data);
        this.close()
      })
      .catch(error => console.error(error))
  }


  createSesionww = () => {
    var units = this.state.zz ? this.state.zz : []
    for (var k = 0; k < units.usertask.length; k++) {
      if (units.usertask[k].wwwusertask.length > 0) {
        for (var t = 0; t < units.usertask[k].wwwusertask.length; t++) {
          var www = units.usertask[k].wwwusertask[t]
          if (t === 1) {
            www.newusertask.push(
              {
                "title": "Change title",
                "newdescription": "www",
                "newtask": "www",
                "newusertask": [],
                "newusertaskteacher": []
              }
            )
          }
        }
      }
    }
    this.setState({ unidades: units })
    console.log(units)
  }

  createSesionwww = () => {
    var units = this.state.unidades ? this.state.unidades : []
    for (var k = 0; k < units.usertask.length; k++) {
      if (units.usertask[k].wwwusertask.length > 0) {
        for (var t = 0; t < units.usertask[k].wwwusertask.length; t++) {
          if (units.usertask[k].wwwusertask[t].newusertask.length > 0) {
            for (var w = 0; w < units.usertask[k].wwwusertask[t].newusertask.length; w++) {
              if (w === 1) {
                var www = units.usertask[k].wwwusertask[t].newusertask[w]
                www.newusertask.push(
                  {
                    "wwwnew": "Change title",
                    "wwwnewdescription": "www",
                    "wwwnewtask": "www",
                    "wwwnewusertask": [],
                    "wwwnewusertaskteacher": []
                  }
                )
              }
            }
          }
        }
      }
    }
    this.setState({ unidades: units })
  }


  render() {
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />

        <Headroom>
          <Navigate />
        </Headroom>
        <div className="py-1"></div>

        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="p-1 col-md-6 text-center">
              <h1 className="p-1 text-center ffont" >Escuela Superior de Formación Artística Pública Ayacucho
                "Felipe Guamán Poma de Ayala" (ESFAPA)
              </h1>
              <div className="text-center" >
                Escuela Superior de Formación Artística pública de formación profesional en artes visuales desarrollado en un plan de estudios de 5 años ubicado en la ciudad de Ayacucho. <Link to='/acerca' className="" >Saber más
                </Link>
              </div>

              <Link to="/cursos"
                className="btn btn-outline-info ffont" style={{ margin: '.1em' }}>
                ESFACAP<br />
                <BiCertification style={{ fontSize: '54px' }} />
              </Link>
              <Link to={`/video/${Math.random().toString(36).substring(2, 11).toUpperCase()}`}
                className="btn btn-outline-warning ffont" style={{ margin: '.1em' }} >
                WebRTC<br />
                <MdOutlineVideoCameraFront style={{ fontSize: '54px' }} />
              </Link>
              <Link to="/foroesfa"
                className="btn btn-outline-success ffont" style={{ margin: '.1em' }}>
                Blog<br />
                <MdForum style={{ fontSize: '54px' }} />
              </Link>
              <Link to="/tramites"
                className="btn btn-outline-warning ffont" style={{ margin: '.1em' }}>
                Tramites<br />
                <FaFileArchive style={{ fontSize: '54px' }} />
              </Link>
            </div>
            <div className="p-1 col-md-6 text-center">
              <Swiper
                modules={[Navigation, Pagination, EffectCoverflow, EffectFade, Autoplay, Scrollbar, A11y]}
                spaceBetween={50}
                // effect="coverflow"
                effect="fade"
                slidesPerView={3}
                grabCursor={true}
                centeredSlides={true}
                coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true, }}
                fadeEffect={{ crossFade: true, }}
                autoplay={{ delay: 2500, disableOnInteraction: true }}
                loop={true}
                pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log('slide change')}
              >
                {this.state.news ? this.state.news.map((www, i) =>
                  <SwiperSlide key={www._id}>
                    <h1 className="text-left text-info ffont">{www.title}</h1>
                    <Markdownkatexnew>
                      {www.description}
                    </Markdownkatexnew>
                    <button className="btn" onClick={() => { this.openw(); this.setState({ select: "crear", files: [], file: www.file, title: www.title, detail: www.description }) }}>
                      <FaExpandAlt style={{ color: '#3d85bdff', fontSize: '34px' }} />
                    </button>

                    {isAuth().rol === '1' ?
                      <>
                        <button className="btn" onClick={() => { this.open(); this.setState({ select: "clase", type: "nuevas", files: [], title: www.title, detail: www.description, foreign: isAuth()._id, id: www._id }) }}>
                          <IoMdCreate style={{ color: '#3d85bdff', fontSize: '34px' }} />
                        </button>
                        <button className="btn" onClick={() => { this.removelink(www._id) }}>
                          <IoIosAlert style={{ color: '#bd3d50ff', fontSize: '34px' }} />
                        </button>
                      </>
                      : ''}

                    <img className="img-fluid" src={`${process.env.REACT_APP_URL}/collections/${www.file}`} alt="Thumb" onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />
                  </SwiperSlide>
                ) : ''}
              </Swiper>
              {isAuth().rol === '1' ? <button className="btn btn-primary" onClick={() => { this.open(); this.setState({ select: "crear", files: [], type: "nuevas", title: "", detail: "", foreign: isAuth()._id }) }}>
                Generar referencias
              </button> : ""}
            </div>
          </div >

          <div className="p-1 text-center">
            <Swiper
              modules={[Navigation, Pagination, EffectCube, EffectCoverflow, EffectFade, EffectFlip, Autoplay, Scrollbar, A11y]}
              spaceBetween={50}
              // effect="coverflow"
              effect='flip'
              // effect='cube'
              // effect='flip'
              slidesPerView={3}
              grabCursor={true}
              centeredSlides={true}
              // coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true, }}
              // fadeEffect={{ crossFade: true, }}
              // flipEffect={{ crossFade: true, }}
              autoplay={{ delay: 2500, disableOnInteraction: true }}
              loop={true}
              pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            >
              {this.state.newsw ? this.state.newsw.map((www, i) =>
                <SwiperSlide key={www._id} className="">
                  <h1 className="text-left text-info ffont">{www.title}</h1>
                  <div className="text-secondary text-right" style={{ fontSize: 12 }}>Creado <TimeAgo datetime={www.createdAt} locale='es_ES' />. Actualizado <TimeAgo datetime={www.updatedAt} locale='es_ES' /> [{www.usser[0].email}]</div>
                  <Markdownkatexnew>
                    {www.description}
                  </Markdownkatexnew>

                  <button className="btn" onClick={() => { this.openw(); this.setState({ select: "crear", files: [], file: www.file, title: www.title, detail: www.description }) }}>
                    <FaExpandAlt style={{ color: '#3d85bdff', fontSize: '34px' }} />
                  </button>

                  {isAuth().rol === '1' ?
                    <>
                      <button className="btn" onClick={() => { this.open(); this.setState({ select: "clase", type: "nuevas", files: [], title: www.title, detail: www.description, foreign: isAuth()._id, id: www._id }) }}>
                        <MdModeEdit style={{ color: '#3d85bdff', fontSize: '34px' }} />
                      </button>
                      <button className="btn" onClick={() => { this.removelink(www._id) }}>
                        <IoIosAlert style={{ color: '#bd3d50ff', fontSize: '34px' }} />
                      </button>
                    </>
                    : ''}
                  <img className="img-fluid" src={`${process.env.REACT_APP_URL}/collections/${www.file}`} alt="Thumb" onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />

                </SwiperSlide>
              ) : ''}
            </Swiper>
            {isAuth().rol === '1' ? <button className="btn btn-info" onClick={() => { this.open(); this.setState({ select: "crear", files: [], type: "reference", title: "", detail: "", foreign: isAuth()._id }) }}>
              Generar comunicado
            </button> : ""}
          </div>


          {isAuth() ? <Socket /> : null}
          {/* < Socket /> */}

          {/* //////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////////////////////////////////////////////////////////// */}
          <Modal size="lg" show={this.state.showModalw} onHide={() => { this.closew(); }} animation={false}>
            <Modal.Header>
              <div className="text-uppercase ">
                {this.state.title}
              </div>
            </Modal.Header>
            <Modal.Body>
              <Markdownkatexnew>
                {this.state.detail}
              </Markdownkatexnew>
              <img className="img-fluid" src={`${process.env.REACT_APP_URL}/collections/${this.state.file}`} alt="Thumb" onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.closew() }}>
                Cerrar
              </button>
            </Modal.Footer>
          </Modal>

          <Modal size="lg" show={this.state.showModal} onHide={() => { this.close(); }} animation={false}>
            <Modal.Body> {this.state.type}
              {(this.state.select === 'subclase' && this.state.subtype !== 'link') || this.state.type === 'nuevas' || this.state.type === 'reference' ? <div className="card form-group">
                <Input type="file" className="custom-file-input" onChange={(e) => { this.fileSelectHandler(e.target.files); }} ></Input>
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
                <button className="btn btn-info" onClick={this.crearGeneral}> Crear </button> : ""
              }
              {this.state.select === 'subclase' ?
                <button className="btn btn-info" onClick={this.updatefirst}> Actualizarsubclase </button> : ""
              }
              {this.state.select === 'clase' ?
                <button className="btn btn-info" onClick={this.onSubmitUpdate}> Actualizarclase </button> : ""
              }
              {this.state.select === 'newclass' ?
                <button className="btn btn-info" onClick={this.createSesion}>Crearsubclase</button> : ""
              }
              <button className="btn btn-info" onClick={this.createSesionw}>Crearsubsubclase</button>

              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.close() }}>
                Cerrar
              </button>
            </Modal.Footer>
          </Modal>
          {/* //////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////////////////////////////////////////////////////////// */}




          {isAuth() && isAuth().rol === '1' ? (
            <div className="card-body p-3 my-5 text-center">
              <button className="text-center btn btn-secondary" onClick={() => { this.open(); this.setState({ select: "crear", files: [], type: "general", subtype: "image", foreign: isAuth()._id }) }}>Generar documentos</button>
            </div>
          ) : null}





          <div id="section-one" className="justify-content-center align-items-center" style={{ minHeight: '200px' }} >
            {this.state.zz ? this.state.zz.map((note, i) => (
              <div className="border border-primary p-1 mt-2 rounded" key={i} >
                <div className="text-primary text-center h1 p-1 ffont">
                  {note.title}
                </div>
                {isAuth() && isAuth().rol === '1' ?
                  <button className="btn btn-warning w-100" style={{ height: '11px', padding: '.1px' }} type="button" data-toggle="collapse" data-target={"#collapseOne" + note._id} aria-expanded="false">
                  </button> : ""}
                <div className="collapse" id={"collapseOne" + note._id}>
                  <div className="btn btn-group w-100">
                    <button className="btn btn-info" onClick={() => { this.open(); this.setState({ select: "newclass", files: [], type: "general", i: i, title: "", detail: "" }) }}>
                      <IoIosAddCircleOutline style={{ fontSize: '34px' }} />
                    </button>
                    <button className="btn  btn-success" onClick={() => { this.open(); this.setState({ select: "clase", type: "general", files: [], title: note.title, detail: note.description, id: note._id }) }}>
                      <IoMdCreate style={{ fontSize: '34px' }} />
                    </button>
                    <button className="btn  btn-info" onClick={() => { this.removelink(note._id) }}>
                      <IoIosAlert style={{ color: '#bd3d50ff', fontSize: '34px' }} />
                    </button>
                  </div>
                </div>
                <div className="text-warning">
                  <Markdownkatexnew>
                    {note.description}
                  </Markdownkatexnew>
                </div>

                <div className="row d-flex justify-content-center align-items-center" style={{ margin: '1px', padding: '1px' }}>
                  {note.usertask ? note.usertask.map((notte, j) => (
                    <div className="col-md-6 col-lg-4 p-1" key={j} >
                      <div className="w-100 h-100">
                        <button className="btn btn-outline-primary w-100 h-100" onClick={() => { this.openInNewTab(notte.detail) }}>{notte.title}</button>
                        {isAuth() && isAuth().rol === '1' ?
                          <button className="btn btn-primary w-100" style={{ height: '9px', padding: '.1px' }} type="button" data-toggle="collapse" data-target={"#collapseOne" + j} aria-expanded="false">
                          </button> : ""}
                        <div className="collapse" id={"collapseOne" + j}>
                          {isAuth() && isAuth().rol === '1' ?
                            <div className="btn btn-group w-100">
                              <button className="btn p-0" onClick={() => { this.open(); this.setState({ select: "newclass", files: [], type: "general", i: i, j: j, title: "", detail: "" }) }}>
                                <IoIosAddCircleOutline style={{ color: '#3d85bdff', fontSize: '34px' }} />
                              </button>

                              <button className="btn text-center" onClick={() => { this.open(); this.setState({ select: "subclase", type: "general", files: [], title: notte.title, detail: notte.detail, i: i, j: j }) }}>
                                <IoMdCreate style={{ color: '#3d85bdff', fontSize: '34px' }} />
                              </button>
                              <button className="btn text-center" onClick={() => { this.remove(i, j) }}>
                                <IoMdAlert style={{ color: '#3d85bdff', fontSize: '34px' }} />
                              </button>
                            </div> : ''}
                        </div>

                        <div className="justify-content-center align-items-center">
                          {notte.usertask ? notte.usertask.map((nottte, k) => (
                            <div className="border border-warning col-md-6 col-lg-6 p-1" key={k} >
                              <div className="border border-warning rounded p-1 mt-3">
                                {k + 1}
                              </div>
                            </div>
                          ))
                            : null}
                        </div>

                      </div>

                    </div>
                  ))
                    : null}
                </div>
              </div>
            ))
              : ''}
          </div>
          <hr />
        </div >
        <Wwwwww />
      </>
    );
  }
}


