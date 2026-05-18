import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuth, signout, getCokie } from "../helpers/auth"
import { toast } from "react-toastify";
import axios from "axios";
import authSvgwww from "../assests/www3.svg";
import authSvgwwww from "../assests/www3.svg";
import { HashLink } from 'react-router-hash-link';
export default class Navigation extends Component {

  componentDidMount() {
    if (isAuth()) {
      console.log("new")
      this.getUser();
    }
  }
  state = {
    userr: [],
    name: '',
    hasError: false,
  };

  getUser = async () => {
    const token = getCokie("token");
    await axios.get(
      `${process.env.REACT_APP_API_URL}/users/user/${isAuth()._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({
          userr: res.data,
          // name: res.data.name.split(" ").map(n => n[0]).join("").toUpperCase(),
          name: res.data.name.slice(0, 1).toUpperCase(),
        })
        console.log(res.data, "navigation")
      })
      .catch((err) => {
        // toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            window.location.href = "/login";
          });
        }
      })
    //console.log(res.data  );

  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg p-2 text-uppercase bg-light">
        {/* <div className="container-fluid text-uppercase  bg-warning text-dark p-0"> */}
        <div className="navbar-brand text-uppercase text-center p-0" to="/">
          {isAuth() ? <Link to="/private" className="shadow-none" >
            {this.state.hasError ?
              <div className="wrapperestperfil name">{this.state.name}</div>
              :
              <img className="wrapperestperfil" src={`${process.env.REACT_APP_URL}/collections/` + this.state.userr.foto}
                onError={() => this.setState({ hasError: true })}
              />
            }
          </Link> :
            <Link to="/">
              <img className="p-1 m-auto wrapperestperfil" src={`${authSvgwwww}`} ></img>
            </Link>
          }
        </div>
        <button className="navbar-toggler bg-info" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <HashLink className="nav-link" to="/#section-one">
                Documentos
              </HashLink>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/#section-two">Biblioteca</a>
            </li> */}
            {isAuth() ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Inicio
                  </Link>
                </li>
                {/* {getCookie("idc") ? ( */}
                <>
                  {/* <li className="nav-item">
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
                      </li> */}
                  {/* <li className="nav-item">
                        <Link to="/estudiante" className="nav-link">
                          Estudiante
                        </Link>
                      </li> */}
                  {/* <li className="nav-item">
                        <Link to="/meet" className="nav-link">
                          Aula
                        </Link>
                      </li> 
                      <li className="nav-item">
                        <Link to="/forum" className="nav-link">
                          Foro
                        </Link>
                      </li>
                        */}
                </>
                {/* ) : null} */}
              </>
            ) : null}
            {!isAuth() ? (
              <>
                {/* <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Registrarse
                    </Link>
                  </li> */}
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Iniciar
                  </Link>
                </li>
              </>
            ) : null}
            {isAuth() ? (
              <>
                <li>
                  <Link to="/carpeta" className="nav-link">
                    PANEL
                  </Link>

                </li>
                <li className="nav-item">
                  <Link
                    to="/Login"
                    onClick={() => {
                      signout(() => {
                        window.location.href = "/login";
                      });
                    }}
                    className="nav-link"
                  >
                    Close
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          {/* </div> */}
        </div>
      </nav>
    );
  }
}
