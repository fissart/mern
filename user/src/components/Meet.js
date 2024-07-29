import React, { Component } from "react";
//import { Input, Button } from "@material-ui/core";
import axios from "axios";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { Document, Page } from "react-pdf";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Navigation from "../screens/Navigation.jsx";
import { getCokie, isAuth, isAsignature } from "../helpers/auth";
import { Modal, Row } from "react-bootstrap";
//import { IconButton } from "@material-ui/core";
import { MdEdit, MdDelete, MdFileDownload } from "react-icons/md";



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      show: true,
      curse: getCokie("idc"),
      links: [],
      link: "",
      name: "",
      showModal: false,
      submit: "",
      _id: "",
      idlink: "",
      type: "",
      editing: false,
      numPages: null,
      file: "",
      files: [],
      pageNumber: 1,
    };
  }
  uuu = ({ numPages }) => {
    this.setState({ numPages });
    //console.log(numPages);
  };

  // ww = (ww) => {
  //   this.setState({
  //     file: ww,
  //     pageNumber: 1,
  //   });
  // };

  open = () => this.setState({ showModal: true });
  close = () => this.setState({ showModal: false });

  prev = () => this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
  next = () => this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

  getLink = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/links/www/${this.props.match.params.curse}`);
    console.log(res.data);
    this.setState({
      links: res.data,
    });
  };

  componentDidMount() {
    document.title =  `FILES ${isAsignature().title}`
    this.getLink();
  }

  createLink = () => {
    this.setState({
      submit: "Crear link",
      editing: false,
    });
  };

  upDateLink = async (idlink) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/links/` + idlink
    );
    //console.log(res.data);
    this.setState({
      submit: "Editar link",
      name: res.data[0].name,
      curse: res.data[0].curse,
      link: res.data[0].link,

      editing: true,
      _id: idlink,
    });
    //console.log(this.state.idlink);
  };

  onInputChange = (e) => {
    //console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange = (e) => this.setState({ url: e.target.value });

  delteLink = async (IdL) => {
    const response = window.confirm("Deseas eliminar este link?");
    if (response) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/links/` + IdL);
      this.getLink();
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    //console.log(this.state.files[0]);
    const data = new FormData();
    data.append("archivo", this.state.files[0]);
    data.append("curse", this.props.match.params.curse);
    data.append("link", this.state.link);
    data.append("name", this.state.name);
    data.append("type", this.state.type);
    //console.log(data);
    if (!this.state.editing) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/links`, data)
        .then((res) => {
          this.getLink();
          this.close();
          this.setState({
            curse: "",
            link: "",
            files: [],
          })
        })
        .catch((err) => console.log(err));
      toast.info("Creado correctamente");
    } else {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/links/` + this.state._id,
        data
      )
        .then((res) => {
          this.getLink();
          this.close();
          this.setState({
            curse: "",
            link: "",
            files: [],
          })
        })
        .catch((err) => console.log(err));
      this.close();
      this.setState({
        curse: "",
        link: "",
        files: []
      });
      toast.info("Actualizado correctamente");
    }
  };

  fileSelectHandler = (files) => {
    this.setState({
      files,
    });
  };


  render() {
    return (
      <>
        <Navigation />
        <ToastContainer closeButton={false} />

        <Modal show={this.state.showModal} onHide={() => { this.close(); }} animation={false} >
          <div className="modal-header font-weight-bold">
            {this.state.submit}
          </div>
          <Modal.Body>
            <input type="text" className="form-control mb-1" placeholder="Name" onChange={this.onInputChange} name="name" value={this.state.name} required />
            <input type="text" className="form-control mb-1" placeholder="Link" name="link" onChange={this.onInputChange} value={this.state.link} required />
            <select className="form-control text-capitalize mb-1" name="type" onChange={this.onInputChange} >
              <option value="">Tipo</option>
              <option value="imagen">Imagen</option>
              <option value="documento">Documento</option>
              <option value="link">Link</option>
              <option value="meet">Meet</option>
              <option value="embed">Embed (src)</option>
            </select>
            <div className="form-group">
              <input type="file" placeholder={this.state.files} onChange={(e) => { this.fileSelectHandler(e.target.files); }} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-info" onClick={this.state.selectsubmit ? this.onSubmit : this.onSubmit} >
              {this.state.submit}
            </button>
            <button type="button" className="btn btn-light" data-dismiss="modal" aria-label="Close" onClick={this.close} >
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>


        <div className="container my-3 p-0">
          <div className="container p-1 my-3 text-center text-uppercase">
            Archivos de {isAsignature().title} [{isAsignature().mencion}]
          </div>

          {isAuth().rol === "2" ? (
            <button className="btn btn-info w-100" onClick={() => { this.createLink(); this.open(); }} >
              Agregar archivo
            </button>
          ) : null}

          <div className="card p-1">
            {this.state.links.map((note, index) => (
              <div className="my-1 border border-info p-1" key={index} >
                <div className="text-uppercase">
                  {index + 1}--{note.type}--{note.name}
                </div>
                <div className="btn-group">
                  {isAuth().rol === "2" ?
                    <><button className="btn btn-danger" onClick={() => this.delteLink(note._id)} > <MdDelete /> </button>
                      <button data-toggle="modal" className="btn btn-info" onClick={() => { this.upDateLink(note._id); this.open(); }} > <MdEdit /> </button>
                    </>
                    : null}
                  <a className="btn btn-secondary" target="_blank" href={`${process.env.REACT_APP_URL}/link/${note.file}`} > <MdFileDownload /> </a>
                </div>

                {note.type === "imagen" ?
                  <div className="img-fluid w-100">
                    <img src={note.file ? `${process.env.REACT_APP_URL}/link/${note.file}` : null} className="img-fluid w-100" alt="www" />
                  </div>
                  : null
                }

                {note.type === "embed" ? (
                  <div className="">
                    <iframe width="100%" height="700" frameBorder="0" scrolling="no" src={note.link}></iframe>
                  </div>
                ) : null}

                {note.type === "documento" ? (
                  <>
                    {index + 1}--{note.type}--{note.name}.{note.file}
                    <div
                      className="btn-group mb-1"
                      role="group"
                      aria-label="First group"
                    >
                      {this.state.pageNumber === 1 ? (
                        <button className="btn btn-light" disabled>
                          <MdKeyboardArrowLeft />
                        </button>
                      ) : (
                        <button
                          className="btn btn-light"
                          onClick={this.prev}
                        >
                          <MdKeyboardArrowLeft />
                        </button>
                      )}
                      {this.state.pageNumber === this.state.numPages ? (
                        <button className="btn btn-light" disabled>
                          <MdKeyboardArrowRight />
                        </button>
                      ) : (
                        <button
                          className="btn btn-light"
                          onClick={this.next}
                        >
                          <MdKeyboardArrowRight />
                        </button>
                      )}
                    </div>
                    {this.state.numPages ? (
                      <div className="text-white">
                        {this.state.numPages}--{this.state.pageNumber}
                      </div>
                    ) : null}

                    <div className="">
                      {this.state.file ? (
                        <>
                          {/* <Document
                            className="m-auto"
                            file={`${process.env.REACT_APP_URL}/link/${note.file}`}
                            onLoadSuccess={this.uuu}
                          >
                          </Document> */}
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
