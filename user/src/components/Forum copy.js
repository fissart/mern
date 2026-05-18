import React, { Component } from "react";
import Headroom from "react-headroom";
import Navigation from "../screens/Navigation.jsx";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { IconButton } from "@material-ui/core";
// import { MdEdit, MdDelete, MdOpenInNew, MdComment } from "react-icons/md";
import io from "socket.io-client";
// import { IoMdCreate, IoMdTrash } from "react-icons/io";
// import { MdAddCircle, MdWork, MdBook, } from "react-icons/md";
// import KatexMarkdown from "./Markdown"
import axios from "axios"
// import { Modal, Row } from "react-bootstrap";
// import { Input } from "@material-ui/core";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';

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

  // open = () => this.setState({ showModal: true });
  // close = () => this.setState({ showModal: false });

  getNotes = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/lands/news/` + this.props.match.params.idcurse)
      .then(() => {
        toast.dark("Tema creado correctamente")
      })
      .catch((error) => { console.log("ERROR", error.response) });
    // toast.dark("Procesado correctamente")
  };

  componentWillUnmount() {
    // this.getNotes()
    // this.socket.disconnect();
  }

  async componentDidMount() {
    document.title = `History ${process.env.REACT_APP_pagetitle}`
    this.getNotes()
    // this.socket = io(`${process.env.REACT_APP_URL}`)
    // this.socket.emit('forocurse', this.props.match.params.idcurse)
    // this.socket.emit("notes", this.props.match.params.idcurse)
    // this.socket.on("forum", (ww) => {
    //   console.log(ww, "newww")
    //   this.setState({ zz: ww });
    // })
  }

  cretetheme = async (curseId) => {
    this.setState({ submit: "Crear tema", option: true, });
  }

  updatetheme = async (id, theme, title) => {
    console.log(id, theme, title);
    this.setState({ editing: true, option: true, submit: "Actualizar tema", _id: id, theme, title });
  }

  render() {
    return (
      <>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />
        <Headroom>
          <Navigation />
        </Headroom>

        <div className="container p-1 my-3">

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
La escuela es una familia integrado por profesores, estudiantes y administrativos identificados con la educación, la cultura y el arte comprometidos para contribuir con la formación artística y el desarrollo artístico de nuestra región. La Escuela Superior de Formación Artística Pública “Felipe Guamán Poma de Ayala” de Ayacucho, fue creada el 13 de septiembre de l952, en mérito a la R.M. 8078 como Escuela Regional de Bellas Artes Pública “Felipe Guamán Poma de Ayala” de acuerdo con la partida Nº. 28 del Pliego de Educación Pública del Presupuesto General de la Republica vigente, promoviendo a don José Ricardo Respaldiza Martínez, del cargo de Jefe de la Sección de Museos y Monumentos Nacionales, al de Director de la Escuela Regional de Bellas Artes “Felipe Guamán Poma de Ayala” de Ayacucho. 

La escuela se fundó con la finalidad de formas artista profesionales en artes plástica es por eso que al inicio de sus labores académicas dio prioridad a los cursos prácticos como: Dibujo, Pintura y Escultura, posteriormente se incrementó nuevos talleres como Platería. Filigrana, Joyería, Cerámica, y cursos teóricos. El Ministerio de Educación en l968, propone el primer Plan de Estudios para los artistas plásticos; en 1973 las Escuelas de Arte del País llegan a ser dependientes del Instituto Nacional de Cultura con la consecuente modificación del Plan de Estudios y el ingreso con secundaria completa. 

El Instituto Nacional de Cultura mediante la RD. No. 2068-77 resuelve otorgar el Título de Bachiller Profesional con mención en la Especialidad al cumplir los cinco años de estudios. En l982, reunidos los docentes de las Escuelas de Bellas Artes del Perú realizado en el Centro Recreacional de Huampaní, se modifica el Plan de Estudios con RD. No. 962-82 incluyendo Grabado como especialidad. El año de l985 Las Escuelas de Arte vuelven a depender del Ministerio de Educación. 

El año de l986 las Escuelas de Arte son categorizadas al nivel de Educación Superior no Universitaria, por D.S. No.013-86-ED y la RD. 723, en mérito a estos dispositivos legales se da el cambio de nombre a Escuela Regional a Escuela Superior de Bellas Artes “Felipe Guamán Poma de Ayala” de Ayacucho; por iniciativa de los profesores se implementó una nueva Estructura Curricular Básica, aprobada por RD. No.2448-86-ED, con la que se mantiene la sección de Artistas Profesionales y se crea la especialidad de Profesor de Educación Artística. 

En mérito a la RD. No. 6653-86-ED, norma el Otorgamiento de Título de Artista Profesional con mención en la Especialidad y de Profesor de Educación Artística, ambas carreras con una duración de cinco años de estudios. El Ministerio de Educación en l968, propone el primer Plan de Estudios para los artistas plásticos; en l973 las Escuelas de Arte del País llegan a ser dependientes del Instituto Nacional de Cultura con la consecuente modificación del Plan de Estudios y el ingreso con secundaria completa. El Instituto Nacional de Cultura mediante la RD. No. 2068-77 resuelve otorgar el Título de Bachiller Profesional con mención en la Especialidad al cumplir los cinco años de estudios.

        </div>
      </>
    );
  }
}
