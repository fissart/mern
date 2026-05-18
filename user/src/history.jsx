import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Row } from "react-bootstrap";
// import Www_w from "./screens/www";
import { Input } from "@material-ui/core";
// import { IconButton } from "@material-ui/core";
import { MdMessage, MdAccountCircle, MdPermPhoneMsg, MdMap, MdPhoneBluetoothSpeaker, } from "react-icons/md";
import { IoMdCreate, IoLogoFacebook, IoLogoGoogle, IoIosAdd, IoMdAdd, IoIosAlert, IoMdAlert } from "react-icons/io";
import { getCokie, signout, isAuth } from "./helpers/auth";
// import { BiLogoTiktok } from "react-icons/bi"
// import { FaInstagram } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa"
// import { FaBloggerB } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa"
// import { FaFacebookMessenger } from 'react-icons/fa';
import Navigate from "./screens/Navigation";
// import { useNavigate } from 'react-router-dom';

import Headroom from "react-headroom";
import Wwwwww from "./screens/downlist";
import Socket from "./screens/Chat";
import authSvg from "./assests/www.jpg";
import authSvgwww from "./assests/www3.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectCoverflow, EffectFade, Autoplay, Scrollbar, A11y } from 'swiper';
import { title } from "process";
// import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation, Pagination, EffectCoverflow, EffectFade, Autoplay, Scrollbar, A11y])

export default class App extends Component {
  // swiper = new Swiper('.swiper', {
  //   centeredSlides: true,
  //   slidesPerView: 'auto', // Often used together for best effect
  // });

  state = {
    files: [],
    file: "",
    news: [],
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
    console.log(this.state.files[0], this.state.title)
    await axios.post(`${process.env.REACT_APP_API_URL}/links/lands`, data);
    this.close()
    toast.dark("Actualizado correctamente")
    this.getNotes();
    this.getnews();
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


  openInNewTab = async (url) => {
    window.open(url, "_blank", "noreferrer");
  }

  async componentDidMount() {
    this.getNotes();
    this.getnews()
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
          this.getnews();
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

  updateparent = () => {
    if (this.state.type === 'general') {
      const data = this.state.zz
      data[this.state.i].title = this.state.title
      data[this.state.i].description = this.state.detail
      this.setState({ zz: data })
      const id = data[this.state.i]._id
      this.save(this.state.zz[this.state.i], id)
    }
    if (this.state.type === 'nuevas') {
      const data = this.state.news
      data[this.state.i].title = this.state.title
      data[this.state.i].description = this.state.detail
      this.setState({ news: data })
      const id = data[this.state.i]._id
      this.save(this.state.news[this.state.i], id)
    }
  }

  createSesion = () => {
    var data = this.state.zz ? this.state.zz : []
    for (var k = 0; k < data.length; k++) {
      if (k == this.state.i) {
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


  save = (data, id) => {
    fetch(`${process.env.REACT_APP_URL}/api/links/lands/${id}`, {
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



  createSesionw = (i) => {
    console.log(i)
    // var units = this.state.zz ? this.state.zz : []
    // for (var k = 0; k < units.usertask.length; k++) {
    //   if (k == i) {
    //     var data = units.usertask[k]
    //     data.wwwusertask.push(
    //       {
    //         "new": "Change title",
    //         "newdescription": "www",
    //         "newtask": "www",
    //         "newusertask": [],
    //         "newusertaskteacher": []
    //       }
    //     )
    //   }
    // }
    // this.setState({ zz: units })
  }

  createSesionww = () => {
    var units = this.state.zz ? this.state.zz : []
    for (var k = 0; k < units.usertask.length; k++) {
      if (units.usertask[k].wwwusertask.length > 0) {
        for (var t = 0; t < units.usertask[k].wwwusertask.length; t++) {
          var www = units.usertask[k].wwwusertask[t]
          if (t == 1) {
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
              if (w == 1) {
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          closeButton={false}
        />
        <Headroom>
          <Navigate />
        </Headroom>


        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="p-1 col-md-6 text-center">
              <h3 className="p-1 text-center">Escuela Superior de Formación Artística
                Felipe Guamán Poma de Ayala -
                ESFAPA
                Ayacucho</h3>
              <div cassName="text-center">
                Escuela Superior de Formación Artística pública de formación profesional en artes visuales desarrollado en un plan de estudios de 5 años ubicado en la ciudad de Ayacucho.
              </div>
              <Link to="/login" className="btn btn-info text-white mx-1" >Saber más</Link>
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
                    <h5 className="text-center">{www.title}</h5>
                    <p className="text-center">{www.description}</p>
                    <img className="img-fluid" src={`${process.env.REACT_APP_URL}/collections/${www.file}`} alt="Thumb" onClick={() => { this.openw(); this.setState({ select: "crear", files: [], file: www.file, title: www.title, detail: www.description }) }} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />
                  </SwiperSlide>
                ) : ''}
              </Swiper>
            </div>
          </div >

          <div className="p-1 text-center">
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow, EffectFade, Autoplay, Scrollbar, A11y]}
              spaceBetween={50}
              effect="coverflow"
              // effect="fade"
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
                <SwiperSlide key={www._id} className="justify-content-center align-items-center">
                  <h5 className="text-center">{www.title}</h5>
                  <p className="text-center">{www.description}</p>
                  {isAuth().rol === '1' ?
                    <>
                      <button className="btn" onClick={() => { this.open(); this.setState({ select: "clase", type: "nuevas", files: [], title: www.title, detail: www.description, id: www._id }) }}>
                        <IoMdCreate style={{ color: '#3d85bdff', fontSize: '34px' }} />
                      </button>
                      <a className="btn" onClick={() => { this.removelink(www._id) }}>
                        <IoIosAlert style={{ color: '#bd3d50ff', fontSize: '34px' }} />
                      </a>
                    </>
                    : ''}
                  <img className="img-fluid" src={`${process.env.REACT_APP_URL}/collections/${www.file}`} alt="Thumb" onClick={() => { this.openw(); this.setState({ select: "crear", files: [], file: www.file, title: www.title, detail: www.description }) }} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />

                </SwiperSlide>
              ) : ''}
            </Swiper>
            {isAuth().rol === '1' ? <a className="btn" onClick={() => { this.open(); this.setState({ select: "crear", files: [], type: "nuevas", title: "", detail: "", foreign: isAuth()._id }) }}>
              <MdMap style={{ color: '#3d85bdff', fontSize: '34px' }} />
            </a> : ""}
          </div>

          {isAuth() ? <Socket /> : null}
          {/* < Socket /> */}


          <Modal size="lg" show={this.state.showModalw} onHide={() => { this.closew(); }} animation={false}>
            <Modal.Header>
              <div className="text-uppercase ">
                {this.state.title}
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="">
                {this.state.detail}
              </div>
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
              {(this.state.select == 'subclase' && this.state.subtype != 'link') || this.state.type === 'nuevas' ? <div className="card form-group">
                <Input type="file" className="custom-file-input" onChange={(e) => { this.fileSelectHandler(e.target.files); }} ></Input>
                <label className="custom-file-label" htmlFor="customFile">
                  Subir archivo
                </label>
              </div> : ""}
              <div className="card form-group">
                <input type="text" placeholder="Título" name="title" onChange={this.onInputChange} value={this.state.title} required />
              </div>
              <div className="card form-group">
                <textarea type="text" placeholder="Detalles" name="detail" onChange={this.onInputChange} value={this.state.detail} required />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {this.state.select === 'crear' ?
                <button className="btn btn-info" onClick={this.crearGeneral}> Crear </button>
                : ""}
              {this.state.select === 'subclase' ? <button className="btn btn-info" onClick={this.updatefirst}> Actualizarsubclase1 </button> : ""}
              {this.state.select === 'clase' ?
                <button className="btn btn-info" onClick={this.onSubmitUpdate}> Actualizarclase </button>
                : ""}
              {this.state.select === 'newclass' ?
                <button className="btn btn-info" onClick={this.createSesion}>Crearsubclase</button>
                : ""}
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.close() }}>
                Cerrar
              </button>
            </Modal.Footer>
          </Modal>




          {isAuth() && isAuth().rol === '1' ? (
            <div className="card-body p-3 my-5 text-center">
              <a className="text-center btn btn-secondary" onClick={() => { this.open(); this.setState({ select: "crear", files: [], type: "general", subtype: "image", foreign: isAuth()._id }) }}>Generar clase tipo imagen</a>
            </div>
          ) : null}


          <div className="justify-content-center align-items-center">
            {this.state.zz ? this.state.zz.map((note, i) => (
              <div className="border border-warning p-1 mt-2 rounded" key={i} >
                <div className="bg-warning text-center text-uppercase h5 rounded p-1">
                  {note.title}
                </div>
                <div className="text-center text-warning">
                  {note.description}
                </div>
                {isAuth() && isAuth().rol === '1' ?
                  <div className="btn btn-group w-100">
                    <a className="btn" onClick={() => { this.open(); this.setState({ select: "newclass", files: [], type: "general", i: i, title: "", detail: "" }) }}>
                      <IoIosAdd style={{ color: '#3d85bdff', fontSize: '34px' }} />
                    </a>
                    <button className="btn" onClick={() => { this.open(); this.setState({ select: "clase", type: "general", files: [], title: note.title, detail: note.description, i: i }) }}>
                      <IoMdCreate style={{ color: '#3d85bdff', fontSize: '34px' }} />
                    </button>
                    <a className="btn" onClick={() => { this.remove(i) }}>
                      <IoIosAlert style={{ color: '#bd3d50ff', fontSize: '34px' }} />
                    </a>
                  </div>
                  : ''}
                <div className="row d-flex justify-content-center align-items-center">
                  {note.usertask ? note.usertask.map((notte, j) => (
                    <div className="col-md-6 col-lg-4 p-1" key={j} >
                      <div className="w-100 h-100">
                        <button className="btn btn-light w-100 h-100" onClick={() => { this.openInNewTab(notte.detail) }}>{notte.title}</button>
                        {isAuth() && isAuth().rol === '1' ?
                          <div className="btn btn-group w-100">
                            <button className="btn text-center" onClick={() => { this.open(); this.setState({ select: "subclase", files: [], title: notte.title, detail: notte.detail, i: i, j: j }) }}>
                              <IoMdCreate style={{ color: '#3d85bdff', fontSize: '34px' }} />
                            </button>
                            <a className="btn text-center" onClick={() => { this.remove(i, j) }}>
                              <IoMdAlert style={{ color: '#3d85bdff', fontSize: '34px' }} />
                            </a>
                          </div> : ''}
                        {/* <div className="justify-content-center align-items-center">
                          {notte.newusertask ? notte.newusertask.map((nottte, k) => (
                            <div
                              className="border border-warning col-md-6 col-lg-6 p-1"
                              key={k}
                            >
                              <div className="border border-warning rounded p-1 mt-3">
                                {k + 1}
                              </div>

                              <div className="justify-content-center align-items-center">
                                {nottte.newusertask ? nottte.newusertask.map((wnottte, t) => (
                                  <div
                                    className="border border-warning col-md-6 col-lg-6 p-1"
                                    key={t}
                                  >
                                    <div className="border border-warning rounded p-1 mt-3">
                                      {t + 1}
                                    </div>
                                    <a className="text-center btn btn-info" onClick={() => { this.createSesionww() }}>Generar 3</a>
                                    <a className="text-center btn btn-info" onClick={() => { this.createSesionwww() }}>Generar 3</a>

                                  </div>
                                ))
                                  : null}
                              </div>
                            </div>
                          ))
                            : null}
                        </div> */}
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
          <Wwwwww />
        </div >
      </>
    );
  }
}


