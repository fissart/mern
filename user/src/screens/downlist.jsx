import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { isAuth, signout, getCokie } from "../helpers/auth";
//import { toast } from "react-toastify";
import Www from "./www";
//import authSvg from "../assests/ww2.svg";
import axios from "axios";
import { IconButton } from "@material-ui/core";

import {
  MdMessage,
  MdAccountCircle,
  MdPermPhoneMsg,
  MdMap,
  MdPhoneBluetoothSpeaker,
} from "react-icons/md";
import {
  IoMdCreate,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoGoogle,
  IoLogoGithub,
} from "react-icons/io";

export default class Wwwwww extends Component {
  componentDidMount() {
    if (isAuth()) {
      this.getUser();
    }
  }
  state = {
    userr: [],
  };
  getUser = async () => {
    const token = getCokie("token");
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
      <div className=" text-center p-0 border-0">
        <div class="container-flex p-0 mt-0">
          <div class="container">
            <iframe width={'100%'} height={500}
              src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=es&amp;q=+(Escuela%20de%20Bellas%20Artes%20Felipe%20Guam%C3%A1n%20Poma%20de%20Ayala-Ayacucho)&amp;t=k&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"><a
                href="https://www.gps.ie/car-satnav-gps/">Car GPS</a></iframe>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!4v1655850799758!6m8!1m7!1sGm3v-xYcR1tj1gz95RrkYg!2m2!1d-13.15635415471263!2d-74.2180525291301!3f124.85298126566764!4f2.1996870284465047!5f0.7820865974627469"
              width={'100%'} height={500} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"></iframe> */}
          </div>
        </div>

        <div className="card-body">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="text-center p-1  col-md-6 col-lg-4 col-xl-4">
              <h3>Fisart.cf</h3>
              < Www />
              {/*<div className="container col-md-5 px-1">
                  <img className="img-fluid" src={authSvg} alt="img" />
                </div>*/}
              <p className="footer-links">
                Matemáticas, programación y artes plásticas{" "}
              </p>
              <p className="footer-company-name">fisarth.com</p>
              <div></div>
            </div>

            <div className="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
              <IconButton
                className="btn"
              // style={{ color: "#fff" }}
              >
                <MdMap />
              </IconButton>

              <div>
                <i className="text-secondary fa fa-map-marker fa-2x"></i>
                <p>Ayacucho</p>
              </div>
              <div>
                <i className="text-secondary fa fa-phone fa-2x"></i>
                <p>ricardomallqui6@gmail.com</p>
              </div>
              <div>
                <i className="text-secondary fa fa-envelope fa-2x"></i>
                <p>
                  <a className="text-secondary" href="wwwww"></a>
                </p>
              </div>
            </div>

            <div className="container text-center p-1  col-md-6 col-lg-4 col-xl-4">
              <p className="text-center p-3">
                Físico matemático, artista plástico, diseñador 3D (3DSmax,
                Zbrush, Mudbox, Blender), programador (Latex, Rstudio,
                Mathlab, Mathematica, Asymptote), diseñador web (Javascript,
                Nodejs, Reactjs, Angular, Python, PHP, Threejs, CSS, HTML).
              </p>

              <a
                className="text-secondary mx-1"
                target="_blank"
                href="https://api.whatsapp.com/send?phone=+51 966878340&text=Hola%20bienvenido"
              >
                <IconButton
                  data-title="Wattsapp"
                  className="btn"
                //style={{ color: "#fff" }}
                >
                  <MdMessage />{" "}
                </IconButton>
              </a>
              <a
                className="text-secondary"
                target="_blank"
                href="https://m.me/ricardo.mallquib"
              >
                <IconButton
                  data-title="Messenger"
                  className="btn"
                //style={{ color: "#fff" }}
                >
                  <MdPhoneBluetoothSpeaker />
                </IconButton>
              </a>
              <a
                className="text-secondary mx-1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/mallquibanos/"
              >
                <IconButton
                  data-title="Instagram"
                  className="btn"
                //style={{ color: "#fff" }}
                >
                  <IoLogoInstagram />
                </IconButton>
              </a>
              <a
                className="text-secondary mx-1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/ricardofisma?tab=repositories"
              >
                <IconButton
                  data-title="Github"
                  className="btn"
                //style={{ color: "#fff" }}
                >
                  <IoLogoGithub />
                </IconButton>
              </a>
              <a
                className="text-secondary mx-1"
                target="_blank"
                href="https://rilatex.blogspot.com"
              >
                <IconButton
                  data-title="Blogspot"
                  className="btn"
                //style={{ color: "#fff" }}
                >
                  <IoLogoGoogle />
                </IconButton>
              </a>

              <a
                className="text-secondary mx-1"
                target="_blank"
                href="https://web.facebook.com/ricardo.mallquib"
              >
                <IconButton
                  data-title="Facebook"
                  className="btn"
                //style={{ color: "#fff" }}
                >
                  <IoLogoFacebook />
                </IconButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
