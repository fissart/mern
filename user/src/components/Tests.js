import React, { Component } from "react";
import Navigation from "../screens/Navigation.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import KatexMarkdown from "./Markdown";
import axios from "axios";
import { getCookie, isAuth } from "../helpers/auth";

export default class CreateNote extends Component {
  state = {
    test: [],
    testchp: [],
    editing: "",
    response: "",
    resp: "",
    submit: "Guardar",
  };

  geTest = async () => {
    const test = await axios.get(
      `${process.env.REACT_APP_API_URL}/curses/` +
        this.props.match.params.idtest
    );

    const testchp = await axios.get(
      `${process.env.REACT_APP_API_URL}/chapters/` +
        this.props.match.params.idtest
    );
    const testresp = await axios.get(
      `${process.env.REACT_APP_API_URL}/tests/respuesta/` +
        this.props.match.params.idtest +
        `/` +
        isAuth()._id
    );
    console.log(testchp.data);
    if (this.props.match.params.chp === "curse") {
      if (testresp.data.length === 0) {
        this.setState({
          test: test.data,
        });
      } else {
        this.setState({
          test: test.data,
          response: testresp.data[0].respuesta,
          _id: testresp.data[0]._id,
          editing: true,
          submit: "Actualizar",
        });
      }
    } else {
      if (testresp.data.length === 0) {
        this.setState({
          test: testchp.data,
        });
      } else {
        this.setState({
          test: testchp.data,
          response: testresp.data[0].respuesta,
          _id: testresp.data[0]._id,
          editing: true,
          submit: "Actualizar",
        });
      }
    }
  };

  componentDidMount() {
    this.geTest();
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  create = () => {
    this.setState({
      editing: false,
      submit: "Crear usuario",
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const Data = {
      respuesta: this.state.response,
      user: isAuth()._id,
      foreign: this.props.match.params.idtest,
      curse: getCookie("idc"),
    };
    console.log(Data);
    if (this.state.editing) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tests/respuesta/` + this.state._id,
        Data
      );
      this.geTest();
      toast.success("Actualizado correctamente");
    } else {
      console.log(Data);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/tests/respuesta`,
        Data
      );
      this.geTest();
      this.setState({
        nombre: "",
        contenido: "",
      });
    }
  };

  delete = async (noteId) => {
    const response = window.confirm("Deseas eliminar este usuario?");
    if (response) {
      const response2 = window.confirm("esta seguro de eliminar este usuario?");
      if (response2) {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/categories/` + noteId
        );
        this.geTest();
      }
    }
  };

  Clean = () => {
    this.setState({
      nombre: "",
      contenido: "",
      tarea: "",
      file: "",
    });
  };

  render() {
    return (
      <>
        <ToastContainer />
        <Navigation />
        <div className="container border my-3 p-1">
          <div className="text-uppercase text-center text-white bg-info rounded p-1 my-1">
            Examen{" "}
            {this.props.match.params.chp === "curse"
              ? "final"
              : "del capítulo " + this.props.match.params.chp}{" "}
            del curso de {getCookie("namecurse")}
          </div>
          <div className="border rounded p-1 my-1">
            <KatexMarkdown>
              {this.props.match.params.chp === "curse"
                ? this.state.test.test
                : this.state.test.contenido}
            </KatexMarkdown>
          </div>
          <form onSubmit={this.onSubmit}>
            <textarea
              type="text"
              className="form-control"
              placeholder="Respuesta"
              name="response"
              rows="10"
              onChange={this.onInputChange}
              value={this.state.response}
              required
            ></textarea>
            <button className="btn btn-info">{this.state.submit}</button>
          </form>

          <div>
            <KatexMarkdown>{this.state.response}</KatexMarkdown>
          </div>
        </div>
      </>
    );
  }
}
