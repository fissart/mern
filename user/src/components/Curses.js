import React, { Component, createRef } from "react";
import Navigation from '../screens/Navigation.jsx';
import Headroom from "react-headroom";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { removeCokie, removeLocalStorage, setCokie, setLocalStorage, isAuth, isAsignature } from "../helpers/auth";
// import Socket from "../screens/Chat.jsx";
import { IoIosRemoveCircle, IoMdAlert, IoMdCreate } from "react-icons/io";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import { MdCreate, MdOutlineCreate } from "react-icons/md";
// import LocationComponent from './calculadorajs copy 3.js'
import ExportToPdf from './boletanotas copy.jsx';
import Task from './taskUser copy.js';
// import ReactDOM from 'react-dom';
// import QRCode from 'react-qr-code';

export default class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.qrRef = createRef();
  }

  state = {
    category: this.props.match.params.id,
    nombre: "",
    notaTotaldelCurso: "",
    noww: "",
    QR: "",
    title: "",
    stdaverages: [],
    stdaveragesNative: [],
    units: [],
    task: "",
    // fechaexa: new Date(),
    // timexa: "2",
    editing: false,
    isDisabled: false,
    zz: [],
    newww: [],
    _id: "",
    submit: "",
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

  getTestSTD = async () => {

    await axios.get(
      `${process.env.REACT_APP_API_URL}/tasks/tests/new/${this.props.match.params.id}/${isAuth()._id}`
    ).then(res => {
      console.log(res.data, "zzz")
      var notas = []

      for (var j = 0; j < res.data.length; j++) {
        // if (encuestas[j].alt[0][0] === encuestas[j].rpta) {
        notas.push(res.data[j].note)
      }
      // console.log(notas, "wzzzw")
      const total = notas.reduce((acc, curr) => acc + Number(curr), 0);
      console.log(total);
      this.setState({
        notaTotaldelCurso: total
      })

    });


  };

  componentWillUnmount() {
    // removeLocalStorage('curse');
  }

  async componentDidMount() {
    console.log(isAsignature().title, "wzzzw")
    document.title = isAsignature().title
    this.getNotes();
    this.getTestSTD()
  }


  onInputChange = async (nota, email, userid) => {
    const data = {
      nota,
      codigo: this.state.zz.codigo,
      user: userid,
      useremail: email,
      teacherid: isAuth()._id,
      teacher: isAuth().email,
      curso: this.props.match.params.id,
      title: this.state.zz.title,
      ciclo: this.state.zz.ciclo,
      credito: this.state.zz.credito,
      mencion: this.state.zz.mencion,
      year: this.state.zz.year
    }
    console.log(data)
    if (nota != "") {
      if (!/\s/.test(nota)) {
        if (nota <= 20 && nota >= 0 || nota == "R") {
          if (nota == 'R' || nota == '0') {
            this.nota = "0";
          }
          // if (nota > 0) {
          //   this.nota = nota;
          // }
          await axios.post(
            `${process.env.REACT_APP_API_URL}/curses/average`,
            data
          ).then(res => {
            toast.info(res.data)
            this.getStdscalification(this.state.zz.mencion, this.state.zz.ciclo, this.state.zz.year, this.state.zz.codigo)
          })
        } else {
          this.setState({
            isDisabled: false
          })
          this.getStdscalification(this.state.zz.mencion, this.state.zz.ciclo, this.state.zz.year, this.state.zz.codigo)
          toast.info("La calificación es vigesimal o R : Retirado")
        }
      } else {
        this.getStdscalification(this.state.zz.mencion, this.state.zz.ciclo, this.state.zz.year, this.state.zz.codigo)
        toast.warning("Introdusca calificación sin espacios")
      }
    } else {
      // this.loading = ""
      // return false;
    }

    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
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

  getStdNativescalification = async (id) => {
    // toast.info(id)
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/stdaveragesnative/` + id
    );
    this.setState({
      stdaveragesNative: res.data,
    });
  };


  CreateUnit = async () => {
    var data = this.state.zz ? this.state.zz : []
    console.log(data)
    if (data.units === undefined || data.units === null) {
      data.units = []
    }
    data.units.push(
      {
        "title": "this.state.title",
        "detail": "this.state.detail",
        "themes": [],
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    )
    this.setState({
      units: data.units,
    });

    console.log(data)
    await axios.put(
      `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
      data
    )

  }


  updateUnit = async (event, i) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(event, i)
    data.units[i].title = event
    data.units[i].updatedAt = new Date()
    this.setState({
      units: data.units,
    });
    await axios.put(
      `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
      data
    )
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
    await axios.put(
      `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
      data
    )
  }

  updateTheme = async (event, i, j) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(event, i)
    data.units[i].themes[j].title = event
    data.units[i].themes[j].updatedAt = new Date()
    this.setState({
      units: data.units,
    });
    await axios.put(
      `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
      data
    )
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
    await axios.put(
      `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
      data
    )
  }

  updateSubTheme = async (event, i, j, k) => {
    var data = this.state.zz ? this.state.zz : []
    console.log(event, i)
    data.units[i].themes[j].subthemes[k].title = event
    data.units[i].themes[j].subthemes[k].updatedAt = new Date()
    this.setState({
      units: data.units,
    });
    await axios.put(
      `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
      data
    )
  }



  removeUnit = async (i) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data.units.splice(i, 1);
      console.log(data, "www")
      this.setState({ units: data.units })
      await axios.put(
        `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
        data
      )
    }
  }

  removeTheme = async (i, j) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data.units[i].themes.splice(j, 1);
      this.setState({ units: data.units })
      await axios.put(
        `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
        data
      )
    }
  }

  removeSubTheme = async (i, j, k) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      var data = this.state.zz ? this.state.zz : []
      data.units[i].themes[j].subthemes.splice(k, 1);
      this.setState({ units: data.units })
      await axios.put(
        `${process.env.REACT_APP_API_URL}/curses/curse/` + this.props.match.params.id,
        data
      )
    }
  }

  removeCalification = async (id) => {
    const response = window.confirm("Deseas eliminar este item?");
    if (response) {
      toast.info(id)
      await axios.delete(`${process.env.REACT_APP_API_URL}/curses/average/` + id).then(res => {
        this.getStdscalification(this.state.zz.mencion, this.state.zz.ciclo, this.state.zz.year, this.state.zz.codigo)
        this.setState({
          // zz: res.data[0],
          // units: res.data[0].units,
          isDisabled: false
        })
      });
    }
  }


  downloadBase64 = () => {
    const svg = this.qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL("image/png"); // This is your Base64 string
      console.log(base64);
      this.setState({ QR: base64 })
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };



  createatachTheme = async (idtheme, titleunit, titletheme) => {
    if (isAuth().rol === '1') {
      this.setState({
        isDisabled: "true"
      });
      console.log(idtheme, this.props.match.params.id)
      await axios.post(`${process.env.REACT_APP_API_URL}/seccions`,
        {
          user: isAuth()._id,
          curse: this.props.match.params.id,
          idtheme,
          title: titletheme,
          description: `# Wwwww
     
 Estoy pasando varias cantidades de datos en react markdown sich como tablas, listas y etiquetas h. Quería saber cómo diseñar cada elemento por separado. Busqué por todas partes pero no se menciona cómo diseñar los elementos más allá de simplemente negrita o énfasis, etc. 
    
## Wwwww

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>

Pensé que podría pasar un nombre de clase en el componente ReactMarkdown para darle estilo, pero eso no solo proporcionaría estilo solo para el componente. ¿Cómo puedo darle estilo a los distintos elementos que contiene?

1. www
    1. First item
 2. Second item
 3. Third item
    1. Indented item
    2. Indented item
4. Fourth item $\\epsilon\\sum_1^3\\alpha$
 
# Wwwwwww

  $$
  \\sum_1^3=w_w^w
  $$
      
1. www
      
  * This is the first list item.
  
  * Heres the second list item.
   I need to add another paragraph below the second list item.
  
  * And heres the third list item.
      <iframe scrolling="no" title="Cartesian draw" src="https://www.geogebra.org/material/iframe/id/cy7eykhk/width/956/height/657/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/true/rc/false/ld/false/sdz/true/ctl/false" width="956px" height="657px" style="border:0px;"> </iframe>

    wwwww $\\rho=\\frac{\\alpha}{3}=\\sqrt{w}$
      
2. Open the file containing the Linux mascot.
3. Marvel at its beauty.
          ![Tux, the Linux mascot](https://assets.site-static.com/userFiles/1681/image/uploads/agent-1/buy-sell-land.jpg)
      
4. Close the file.
      At the command prompt, type <div class="mb-3">
      My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").
      www
      [![An old rock in the desert](https://assets.site-static.com/userFiles/1681/image/uploads/agent-1/buy-sell-land.jpg "Shiprock, New Mexico by Beau Rogers")](https://assets.site-static.com/userFiles/1681/image/uploads/agent-1/buy-sell-land.jpg)`,
          dateb: new Date(),
          datee: new Date(),
        }).then(res => {
          console.log(res)
          this.props.history.push({
            pathname: `/theme/${this.state.zz._id}/${idtheme}`,
            state: { unittitle: titleunit, title: titletheme }
          });
        })
    } else {
      this.props.history.push({
        pathname: `/theme/${this.state.zz._id}/${idtheme}`,
        state: { unittitle: titleunit, title: titletheme }
      })
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
        <div className="py-3"></div>

        {/* <Socket /> */}

        <div className="modal fade" id="modalLoginForm" >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header h1 ffont"> {this.state.title} </div>
                <div className="modal-body">
                <CKEditor editor={ClassicEditor} config={{ language: 'es', }} data={this.state.task} />
              </div>
              <div className="modal-footer p-3">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container text-center">
          {/* <LocationComponent /> */}
          <div className="bg-light">
            {this.state.zz.length != 0 ? <>
              <h3 className="ffont">{this.state.zz.title}</h3>
              <p className="ffont">{isAuth().email} {isAuth()._id}</p>
              <h5 className="ffont">{this.state.zz.ciclo ? 'Ciclo:' + this.state.zz.ciclo : ''} Crédito: {this.state.zz.credito} {this.state.zz.ciclo ? 'Carrera:' + this.state.zz.ciclo : ''} Año: {this.state.zz.year}</h5>
            </> : null}
          </div>
          <a className="btn btn-warning m-1" style={{ color: 'white' }} href={'/video/' + this.props.match.params.id} >VIDEO CONFERENCIA DEL CURSO</a>
          <Link className="btn btn-info" style={{ color: 'white' }} to={'/forum/' + this.props.match.params.id} > FORO  DEL CURSO</Link>
          <Link className="btn btn-info m-1" style={{ color: 'white' }} to={'/meet/' + this.props.match.params.id} > ARCHIVOS DEL CURSO</Link>
          <ExportToPdf datacurse={this.state.zz} datarq={this.state.QR} user={isAuth()} nota={this.state.notaTotaldelCurso} />

          <div className="text-center" style={{ background: 'white', padding: '16px' }}>
            {/* <QRCode ref={this.qrRef} value="https://www.esfapa.edu.pe/foroesfa" /> */}
            {/* <br /> */}
            {/* <button className="btn btn-info" onClick={this.downloadBase64}>Getin</button> */}
            Credito acumulado [{this.state.notaTotaldelCurso===0?'Ninguno':this.state.notaTotaldelCurso}]
          </div>

          {/* {isAuth()._id === this.state.zz.user ? */}
          {isAuth().rol === '1' ?
            <button className='btn btn-info w-100' disabled={this.state.isDisabled === 'true'} onClick={() => {
              this.getStdscalification(this.state.zz.mencion, this.state.zz.ciclo, this.state.zz.year, this.state.zz.codigo)
            }}>Calificar</button>
            : ''}

          {/* {isAuth()._id === this.state.zz.user ? */}
          {isAuth().rol === '1' ?
            <button className='btn btn-info w-100' disabled={this.state.isDisabled === 'true'} onClick={() => {
              this.getStdNativescalification(this.state.zz._id)
            }}>Calificar Native</button>
            : ''}

          <div className="p-1 text-center">
            <div className="row justify-content-center align-items-center">
              {this.state.stdaverages.map((note, index) => (
                <div className="col-md-4 p-1 m-0 text-center" key={index}>
                  <div className="">
                    {note._id}
                    {/* {note.email}
                    {note.name} */}
                    {note.notta[0] ? note.notta[0].nota : ''}
                  </div>
                  <div className="input-group">
                    {note.notta.length > 0 ?
                      <>
                        <input type="text" className="form-control bg-warning" placeholder="Calificación" value={note.notta.length > 0 ? note.notta[0].nota : ''} disabled={this.state.isDisabled} onBlur={this.onInputChange} required />
                        <button className='form-control btn btn-info' disabled={this.state.isDisabled} onClick={() => {
                          this.removeCalification(note.notta[0]._id)
                          this.setState({
                            isDisabled: true
                          })
                        }}>Remover</button>
                      </>
                      :
                      <input type="text" className="form-control bg-light" placeholder="Calificación" onBlur={(e) => {
                        this.onInputChange(e.target.value, note.email, note._id)
                        this.setState({
                          isDisabled: true
                        })
                      }} required />
                    }
                    {/* <button className='form-control btn btn-warning' disabled={this.state.isDisabled === 'true'} onClick={() => {
                      this.getStdscalification(this.state.newww.mencion, this.state.newww.ciclo, this.state.newww.year, this.state.newww.codigo)
                    }}>Calificar</button> */}
                  </div>

                </div>
              ))}
            </div>
          </div>

          <div className="p-1 text-center">
            <div className="row justify-content-center align-items-center">
              {this.state.stdaveragesNative.map((note, index) => (
                <div className="col-md-4 p-1 m-0 text-center" key={index}>
                  <div className="text-center bg-primary">
                    {note.usser[0].email}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* {isAuth()._id === this.state.zz.user ? */}
          {isAuth().rol === '1' ?
            <button className='form-control btn btn-warning' disabled={this.state.isDisabled === 'true'} onClick={() => { this.CreateUnit() }}>Agregar unidad</button>
            : ''}

          <div className="row d-flex justify-content-center" >
            {this.state.units ? this.state.units.map((note, i) => (
              <div
                className="col-md-6 col-lg-6" style={{ padding: '.1em' }}
                key={i}
              >
                <div className="bg-light rounded" style={{ padding: '.1em', margin: '.1em' }}>
                  <div className="ffont h5" contentEditable="true" suppressContentEditableWarning={true} onBlur={(e) => { this.updateUnit(e.target.innerText, i) }}>
                    {note.title}
                  </div>
                  {isAuth() && isAuth()._id === this.state.zz.user ? <>
                    <button className="btn text-center" onClick={() => { this.CreateTheme(i) }}>
                      <IoMdCreate style={{ color: '#3d85bdff', fontSize: '34px' }} />
                    </button>
                    <button className="btn text-center" onClick={() => { this.removeUnit(i) }}>
                      <IoIosRemoveCircle style={{ color: '#bd3d79ff', fontSize: '34px' }} />
                    </button></> : ''}

                  <div className="row d-flex justify-content-center" style={{ padding: '.1em', margin: '.1em' }}>
                    {note.themes ? note.themes.map((notte, j) => (
                      <div
                        className="col-md-6 col-lg-6" style={{ padding: '.1em' }}
                        key={j}
                      >
                        <div className="rounded" style={{ padding: '.3em', backgroundColor: '#e0ebecff' }}>
                          <div className="" contentEditable="true" suppressContentEditableWarning={true} onBlur={(e) => { this.updateTheme(e.target.innerText, i, j) }}>
                            {notte.title}
                          </div>
                          <Task idtheme={this.props.match.params.id} codetheme={notte.idtheme} />
                          <button className="btn btn-info w-100" style={{ color: 'white' }} onClick={() => { this.createatachTheme(notte.idtheme, note.title, notte.title) }}>
                            Ir al tema
                          </button>
                          {isAuth() && isAuth()._id === this.state.zz.user ?
                            <>
                              <button className="btn text-center" onClick={() => { this.CreateSubTheme(i, j) }}>
                                <MdCreate style={{ color: '#92bee0ff', fontSize: '34px' }} />
                              </button>
                              <button className="btn text-center" onClick={() => { this.removeTheme(i, j) }}>
                                <IoIosRemoveCircle style={{ color: '#bd3d79ff', fontSize: '34px' }} />
                              </button>
                            </> : ''}
                          <div className="row d-flex justify-content-center" style={{ padding: notte.subthemes.length > 0 ? '.1em' : null, margin: notte.subthemes.length > 0 ? '.1em' : null }}>
                            {notte.subthemes ? notte.subthemes.map((nottte, k) => (
                              <div
                                className="col-md-6 col-lg-6"
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
                      </div>
                    )) : ""}
                  </div>
                </div>
              </div>
            )) : ""}
          </div>

        </div >
      </>
    );
  }
}
