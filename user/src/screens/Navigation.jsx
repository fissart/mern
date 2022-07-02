import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuth, signout, getCookie } from "../helpers/auth";
import { toast } from "react-toastify";
import axios from "axios";
import authSvgwww from "../assests/foto.png";
export default class Navigation extends Component {
  componentDidMount() {
    if (isAuth()) {
      this.getUser();
    }
  }
  state = {
    userr: [],
  };
  getUser = async () => {
    const token = getCookie("token");
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log(res.data.email);
    this.setState({
      userr: res.data,
    });
  };

  render() {
    return (
      <nav class="navbar navbar-expand-md navbar-light py-1">
        <div className="container bg-info text-uppercase">
          <Link className="navbar-brand text-uppercase" to="/">
            {isAuth() ?
            <img
              className="card-img-top-circle p-1 m-auto wrapperestperfil this "
              src={
                `${process.env.REACT_APP_URL}/profile/` +
                this.state.userr.foto
              }
              onError={(e) => {
                e.target.src = authSvgwww; //replacement image imported above
                e.target.style = "padding: 3px; margin: 1px"; // inline styles in html format
              }}
            />:
              <Link to="/" className="text-light h7">
                Inicio
              </Link>
          }
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {isAuth() ? (
                <>
                  <li className="nav-item">
                    <Link to="/categorias" className="nav-link">
                      Users
                    </Link>
                  </li>
                  {getCookie("idc") ? (
                    <>
                      <li className="nav-item">
                        <Link
                          to={
                            "/curso/" +
                            getCookie("idc") +
                            "/" +
                            getCookie("idcat")
                          }
                          className="nav-link"
                        >
                          Curso
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/estudiante" className="nav-link">
                          Estudiante
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/meet" className="nav-link">
                          Aula
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/forum" className="nav-link">
                          Foro
                        </Link>
                      </li>
                    </>
                  ) : null}
                </>
              ) : null}
              {!isAuth() ? (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Registrarse
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Iniciar sesión
                    </Link>
                  </li>
                </>
              ) : null}
              {isAuth() ? (
                <li className="nav-item">
                  <Link
                    to="/Login"
                    onClick={() => {
                      signout(() => {
                        toast.success("Sesión cerrada satisfactoriamente");
                      });
                    }}
                    className="nav-link"
                  >
                    Cerrar sesión
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
