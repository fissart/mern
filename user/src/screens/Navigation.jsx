import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuth, signout, getCokie } from "../helpers/auth"
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

  getUser = () => {
    const token = getCokie("token");
    axios.get(
      `${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({
          userr: res.data,
        })
      })
      .catch((err) => {
        // // toast.error(`Error To Your Information ${err.response.statusText}`);
        // if (err.response.status === 401) {
        //   signout(() => {
            // window.location.href = "/";
        //   });
        // }
      })
    //console.log(res.data  );

  };

  render() {
    return (
      <nav className="navbar navbar-expand-md p-1">
        <div className="container-fluid text-uppercase text-dark p-0">
          <div className="navbar-brand text-uppercase p-0" to="/">
            {this.state.userr ? <a href="/private" className="shadow-none" >
              <img className="wrapperestperfil p-0"
                src={
                  `${process.env.REACT_APP_URL}/profile/` +
                  this.state.userr.foto
                }
                onError={(e) => {
                  e.target.src = authSvgwww; //replacement image imported above
                  e.target.style = "padding: 3px; margin: 1px"; // inline styles in html format
                }}
              />
            </a> :
              <Link to="/">
                <img
                  className="p-1 m-auto wrapperestperfil"
                  src={`${authSvgwww}`}
                ></img>
              </Link>
            }
          </div>
          <button className="navbar-toggler bg-info" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
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
          </div>
        </div>
      </nav>
    );
  }
}
