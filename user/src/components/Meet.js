import React, { Component } from "react";
import { Input, Button } from "@material-ui/core";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Document, Page } from "react-pdf";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Navigation from "../screens/Navigation.jsx";
import { getCookie, isAuth } from "../helpers/auth";
import { Modal, Row } from "react-bootstrap";

import { IconButton } from "@material-ui/core";
import { MdEdit, MdDelete, MdOpenInNew } from "react-icons/md";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      show: true,
      curse: getCookie("idc"),
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
      files: "",
      pageNumber: 1,
    };
  }
  uuu = ({ numPages }) => {
    this.setState({ numPages });
    //console.log(numPages);
  };

  ww = (ww) => {
    //console.log(ww);
    this.setState({
      file: ww,
      pageNumber: 1,
    });
    //console.log(this.state.file);
  };

  open = () => this.setState({ showModal: true });
  close = () => this.setState({ showModal: false });

  prev = () => this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
  next = () => this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

  getLink = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/links/www/` + getCookie("idc")
    );
    console.log(res.data);
    this.setState({
      links: res.data,
    });
  };

  componentDidMount() {
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

  onSubmitw = async (e) => {
    e.preventDefault();
    //console.log(this.state.editing);
    const Data = {
      curse: this.state.curse,
      link: this.state.link,
      name: this.state.name,
    };
    //console.log(Data);
    if (this.state.editing) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/links/www/` + this.state._id,
        Data
      );
      toast.success("Actualizado correctamente");
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/links`, Data);
      toast.success("Creado correctamente");
    }
    this.getLink();
    this.close();
    this.setState({
      link: "",
      name: "",
      _id: "",
      idlink: "",
    });
  };

  onInputChange = (e) => {
    //console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange = (e) => this.setState({ url: e.target.value });

  join = () => {
    if (this.state.url !== "") {
      var url = this.state.url.split("/meet/");
      window.location.href = `meet/${url[url.length - 1]}`;
    } else {
      var urlw = getCookie("idc"); //Math.random().toString(36).substring(2, 7);
      window.location.href = `meet/${urlw}`;
    }
  };

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
    data.append("curse", getCookie("idc"));
    data.append("link", this.state.link);
    data.append("name", this.state.name);
    data.append("type", this.state.type);
    //console.log(data);
    if (!this.state.editing) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/links`, data)
        .then((res) => {
          //console.log(res);
        })
        .catch((err) => console.log(err));
      toast.success("Creado correctamente");
    } else {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/links/` + this.state._id,
        data
      );
      toast.success("Actualizado correctamente");
    }
    this.getLink();
    this.close();
    this.setState({
      curse: "",
      link: "",
      archivo: "",
    });
  };

  fileSelectHandler = (files) => {
    //console.log(files);
    this.setState({
      files,
    });
    //console.log(this.state.files[0]);
  };

  render() {
    return (
      <>
        <Navigation />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Modal
          show={this.state.showModal}
          onHide={() => {
            this.close();
          }}
          animation={false}
        >
          <div className="modal-header font-weight-bold">
            {this.state.submit}
          </div>
          <Modal.Body>
            <input
              type="text"
              className="form-control mb-1"
              placeholder="Name"
              onChange={this.onInputChange}
              name="name"
              value={this.state.name}
              required
            />

            <input
              type="text"
              className="form-control mb-1"
              placeholder="Link"
              name="link"
              onChange={this.onInputChange}
              value={this.state.link}
              required
            />
            <select
              className="form-control text-capitalize mb-1"
              name="type"
              onChange={this.onInputChange}
            >
              <option value="">Tipo</option>
              <option value="imagen">Imagen</option>
              <option value="documento">Documento</option>
              <option value="link">Link</option>
              <option value="meet">Meet</option>
              <option value="embed">Embed (src)</option>
            </select>
            <div className="form-group">
              <input
                type="file"
                placeholder={this.state.files}
                onChange={(e) => {
                  this.fileSelectHandler(e.target.files);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-info"
              onClick={this.state.selectsubmit ? this.onSubmit : this.onSubmit}
            >
              {this.state.submit}
            </button>
            <button
              type="button"
              className="btn btn-light"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.close}
            >
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>
        <div className="container  my-3 p-0 text-center">
          <div className="d-none container p-1 my-3 text-center text-uppercase sky1  text-light">
            Aula y archivos de {getCookie("namecurse")}
          </div>

          {isAuth().role === "admin" ? (
            <div
              style={{
                position: "fixed",
                bottom: 0 + "em",
                left: 0,
                zIndex: 1050,
              }}
            >
              <IconButton
                className="btn"
                style={{ color: "#000" }}
                onClick={() => {
                  this.createLink();
                  this.open();
                }}
              >
                <MdEdit />
              </IconButton>
            </div>
          ) : null}

          <div className="d-none card my-5 py-4 sky">
            <div className="componentWrapper color text-center sky1 text-uppercase">
              Salón
            </div>
            {this.state.links.map((note, index) => (
              <div
                key={note._id}
                className={note.type === "meet" ? "" : "d-none"}
              >
                <div>
                  <a
                    href={note.link}
                    className="componentWrapperbottom btn btn-success text-light"
                    target="_blank"
                  >
                    {note.name}
                  </a>
                </div>
                {isAuth().role === "admin" ? (
                  <>
                    <IconButton
                      style={{ color: "#fff" }}
                      className="btn"
                      onClick={() => {
                        this.upDateLink(note._id);
                        this.open();
                      }}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      style={{ color: "#fff" }}
                      className="btn"
                      onClick={() => this.delteLink(note._id)}
                    >
                      <MdDelete />
                    </IconButton>
                  </>
                ) : null}
              </div>
            ))}
          </div>

          <div className="d-none">
            <h1 style={{ fontSize: "45px" }}>Video conección</h1>
            <p>Video conferencia curso {getCookie("idc")}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={this.join}
              style={{ margin: "20px" }}
            >
              Ir al aula
            </Button>
          </div>

          <div className="bg-light d-none">
            <p>Start or join a meeting</p>
            <Input placeholder="URL" onChange={(e) => this.handleChange(e)} />
          </div>
          <div className="card  sky pt-4 mt-5 p-1">
            <div className="componentWrapper color text-center text-uppercase sky1 p-1  text-light">
              archivos
            </div>
            <div id="accordion">
              {this.state.links.map((note, index) => (
                <div
                  className={note.type === "meet" ? "d-none" : "pb-1 px-1"}
                  key={index}
                >
                  {note.type === "link" ? (
                    <div>
                      <a
                        href={note.link}
                        className="btn btn-light mb-0 w-100 text-left text-light text-capitalize"
                        target="_blank"
                      >
                        {index + 1}--{note.type}--{note.name}
                      </a>
                      {isAuth().role === "admin" ? (
                        <IconButton
                          className="btn"
                          style={{
                            margin: "2px",
                            backgroundColor: "rgb(15, 78, 87)",
                          }}
                          onClick={() => this.delteLink(note._id)}
                        >
                          <MdDelete />
                        </IconButton>
                      ) : null}
                    </div>

                  ) : note.type === "documento" ? (
                    <>
                      <button
                        className="btn btn-light mb-0  w-100 text-left text-capitalize"
                        data-toggle="collapse"
                        data-target={"#collapseOne" + note._id}
                        aria-expanded="true"
                        onClick={() => this.ww(note.file)}
                        aria-controls={"collapseOne" + note._id}
                      >
                        {index + 1}--{note.file}--{note.type}--{note.name}
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn blue2 mb-0  w-100 mx-0 text-left text-capitalize"
                      data-toggle="collapse"
                      data-target={"#collapseOne" + note._id}
                      aria-expanded="true"
                      aria-controls={"collapseOne" + note._id}
                    >
                      {index + 1}-{note.file}-{note.type}-{note.name}
                    </button>
                  )}
                  <div
                    id={"collapseOne" + note._id}
                    className="collapse"
                    aria-labelledby={note._id}
                    data-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <div
                        className={
                          note.type === "documento"
                            ? "container text-center bg-info  p-1 mt-0"
                            : "container text-center bg-light  p-1 mt-0"
                        }
                      >
                        {note.type === "documento" ? (
                          <>
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

                            <div className="container d-flex justify-content-center align-items-center">
                              {this.state.file ? (
                                <>
                                  <Document
                                    className="m-auto"
                                    file={`${process.env.REACT_APP_URL}/link/${this.state.file}`}
                                    onLoadSuccess={this.uuu}
                                  >
                                    <Page
                                      pageNumber={this.state.pageNumber}
                                      width={300}
                                    />
                                  </Document>
                                </>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                        {note.type === "imagen" ? (
                          <div className="text-center">
                            <img
                              src={
                                note.file
                                  ? `${process.env.REACT_APP_URL}/link/${note.file}`
                                  : null
                              }
                              className="img-fluid"
                              alt="www"
                            />
                          </div>
                        ) : null}
                        {note.type === "embed" ? (
                          <div className="text-center">
                            <iframe width="100%" height="700" frameborder="0" scrolling="no" src={note.link}></iframe>
                          </div>
                        ) : null}

                        {isAuth().role === "admin" ? (
                          <>
                            <IconButton
                              data-toggle="modal"
                              style={{
                                margin: "2px",
                                backgroundColor: "rgb(15, 78, 87)",
                                color: "#fff",
                              }}
                              data-target=".bd-example-modal-lg"
                              onClick={() => {
                                this.upDateLink(note._id);
                                this.open();
                              }}
                            >
                              <MdEdit />
                            </IconButton>
                            <IconButton
                              style={{
                                margin: "2px",
                                backgroundColor: "rgb(15, 78, 87)",
                                color: "#fff",
                              }}
                              onClick={() => this.delteLink(note._id)}
                            >
                              <MdDelete />
                            </IconButton>
                          </>
                        ) : null}
                        {note.type === "embed" ? null :
                        <a
                          className="btn btn-light mt-1" target="_blank"
                          href={`${process.env.REACT_APP_URL}/link/${this.state.file}`}
                        >
                          Descargar
                        </a>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
