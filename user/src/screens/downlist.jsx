import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { isAuth, signout, getCokie } from "../helpers/auth";
//import { toast } from "react-toastify";
// import Www from "./www";
import authSvg from "../assests/www3.svg";
// import axios from "axios";
import { IconButton } from "@material-ui/core";
import { MdMessage, MdAccountCircle, MdPermPhoneMsg, MdMap, MdPhoneBluetoothSpeaker, } from "react-icons/md";
import { IoMdCreate, IoLogoFacebook, IoLogoGoogle } from "react-icons/io";
// import { getCokie, signout, isAuth } from "./helpers/auth";
import { BiLogoTiktok } from "react-icons/bi"
import { FaFacebookMessenger } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa"
import { FaBloggerB } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa"


export default class Wwwwww extends Component {
  // componentDidMount() {
  //   if (isAuth()) {
  //     this.getUser();
  //   }
  // }
  openInNewTab = async (url) => {
    window.open(url, "_blank", "noreferrer");
  }

  state = {
    // userr: [],
    month: new Date().getMonth()
    // changeFavicon('/www' + (month + 1) + '.svg')

  }

  // getUser = async () => {
  //   const token = getCokie("token");
  //   const res = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   //console.log(res.data.email);
  //   this.setState({
  //     userr: res.data,
  //   });
  // };

  render() {
    return (
      <div className=" text-center p-0 border-0">
        <div className="p-0 mt-0">
          <div className="container">
            <iframe width={'100%'} height={500}
              src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=es&amp;q=+(Escuela%20de%20Bellas%20Artes%20Felipe%20Guam%C3%A1n%20Poma%20de%20Ayala-Ayacucho)&amp;t=k&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"><a
                href="https://www.gps.ie/car-satnav-gps/">Car GPS</a></iframe>
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1750534065961!6m8!1m7!1syWFe4Rj4ga1j6fqlrkocMA!2m2!1d-13.15626194436401!2d-74.21787224051161!3f200.16657941141062!4f3.2355809602561294!5f0.7820865974627469"
              width={'100%'} height={620} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"></iframe>
          </div>
        </div>

        <div className="card-body">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="text-center p-1  col-md-6 col-lg-4 col-xl-4">
              <h5 className="footer-links my-0 ffont">
                Escuela Superior de Formación Artística
              </h5>
              <p className="my-0">
                "Felipe Guamán Poma de Ayala"
              </p>
              {/* <p>{process.env.REACT_APP_pagetitle}</p> */}
              {/* < Www /> */}
              <div className="container col-md-5 px-1">
                {/* <img className="img-fluid" src={require('../../src/assests/www'+(this.state.month+1)+'svg')} alt="img" /> */}
                <img className="img-fluid wrapperestperfil" src={authSvg} alt="img" />
              </div>
              <div>
                <p className="text-primary">©Copyright {process.env.REACT_APP_pagetitle} 2025</p>
              </div>
            </div>

            <div className="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
              <div>
                <p className="text-center">
                  Jr. Mariano Melgar Nº 398, Distrito Jesús Nazareno Huamanga, Ayacucho
                </p>
              </div>
              <div>
                <p>This Platform did it ricardomallqui6@gmail.com</p>
              </div>
            </div>

            <div className="container text-center p-1  col-md-6 col-lg-4 col-xl-4">
              <div>
                <h5 className="ffont">{process.env.REACT_APP_page}</h5>
              </div>
              <p>
                Teléfono: 066-287499
              </p>

              <div className="container text-center p-1">
                <button className="btn p-1" onClick={() => { this.openInNewTab('https://api.whatsapp.com/send?phone=+51 966999215&text=Hola%20bienvenido') }} >
                  <MdMessage style={{ color: '#069d12ff', fontSize: '34px' }} />
                </button>
                <button className="btn p-1" onClick={() => { this.openInNewTab('https://web.facebook.com/bellasartes.ayacucho') }} > <FaFacebook style={{ color: '#0672a0ff', fontSize: '34px' }} />
                </button>
                <button className="btn p-1" onClick={() => { this.openInNewTab('https://m.me/bellasartes.ayacucho') }} > <FaFacebookMessenger style={{ color: '#00B2FF', fontSize: '34px' }} />
                </button>
                <button className="btn p-1" onClick={() => { this.openInNewTab('https://instagram.com/bellasartes.ayacucho') }}> <FaInstagram style={{ color: '#ff00eeff', fontSize: '34px' }} />
                </button>
                <button className="btn p-1" onClick={() => { this.openInNewTab('https://bellasartes.blogspot.com') }} > <IoLogoGoogle style={{ color: '#ff4800ff', fontSize: '34px' }} />
                </button>
                <button className="btn p-1" onClick={() => { this.openInNewTab('https://bellasartes.blogspot.com') }} > <FaBloggerB style={{ color: '#ff4800ff', fontSize: '34px' }} />
                </button>
                <button className="btn p-1" onClick={() => { this.openInNewTab('https://www.tiktok.com/@bellasartes.ayacucho') }}>
                  <BiLogoTiktok style={{ color: '#9500ffff', fontSize: '34px' }} />
                </button>
                <button className="btn p-1" onClick={() => { this.openInNewTab('https://www.youtube.com/channel/UCkYf1NyZ1kUl3965WgeL6rw') }}>
                  <FaYoutube style={{ color: '#ff0011ff', fontSize: '34px' }} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div >
    );
  }
}
