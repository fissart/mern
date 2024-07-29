import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { getCokie, signout, isAuth } from "./helpers/auth";
import { ToastContainer, toast } from "react-toastify";
import authSvg from "./assests/image.png";
import gltf from "./assests/scene.gltf";
//import gltf_w from "./assests/w_w.gltf";
//import ww_w from "./assests/w_w.glb";
//import authSvgwww from "./assests/foto.png";
import Navigation from "./screens/Navigation";
import Wwwwww from "./screens/downlist";
//import Www from "./screens/ww1";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Socket from "./screens/Chat";
import axios from "axios";
import { Modal, Row } from "react-bootstrap";
import Www_w from "./screens/www";
//import {Admin } from "./screens/Chat";
import { Input } from "@material-ui/core";
import "./App.css";




export default class App extends Component {
  state = {
    files: [],
    user: [],
    name: "",
    showModal: false,
  };

  open = () => this.setState({ showModal: true });
  close = () => this.setState({ showModal: false });


  fileSelectHandler = (files) => {
    console.log(files);
    var array = ["image/jpeg", "image/jpg", "image/png", "image/PNG", "image/svg+xml"];
    console.log(array.includes(files[0].type));
    if (files) {
      if (files[0].size < 105048576 && array.includes(files[0].type)) {
        this.setState({
          files,
        });
      } else {
        toast.dark(
          "Solo se acepta archivos no mayor a 1MB en formatos pdf, jpeg, jpg y png "
        );
      }
    }
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault()
    //console.log(this.state.files[0])
    const data = new FormData()
    data.append("foto", this.state.files[0])
    data.append("name", this.state.name)
    console.log(this.state.files[0], this.state.name)
    //await axios.put(`${process.env.REACT_APP_API_URL}/userUp/` + isAuth()._id, data);
    this.close()
    toast.dark("Actualizado correctamente")
  };

  // removeCookie("id");
  // removeLocalStorage("id");





  async componentDidMount() {
    const token = getCokie("token");
    console.log(token)
    //this.getUser();
    if (isAuth()) {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/userId/` + isAuth()._id
      );
      this.setState({
        user: user.data,
        name: user.data.name,
      });
      console.log(this.state.user);
    }
    const pStyle = {
      fontSize: "15px",
      textAlign: "center",
    };
    //     var scene = new THREE.Scene();
    //     const loader = new GLTFLoader();
    //     const loaderglb = new GLTFLoader();

    //     //scene.background = new THREE.Color("rgb(250,30,200)");
    //     scene.background = null;

    //     /*
    //     scene.background = new THREE.CubeTextureLoader()
    //       .setPath( "./assets/" )
    //       .load( [
    //         src,
    //         src,
    //         'foto.png',
    //         'ny.png',
    //         'pz.png',
    //         'nz.png'
    //       ] );
    // */
    //     var camera = new THREE.PerspectiveCamera(
    //       75,
    //       window.innerWidth / window.innerHeight,
    //       0.1,
    //       1000
    //     );

    //     loader.load(
    //       // resource URL
    //       gltf,
    //       // called when the resource is loaded
    //       function (gltf) {
    //         scene.add(gltf.scene);
    //       }
    //     );

    //     loader.load(
    //       // resource URL
    //       `${process.env.REACT_APP_URL}/profile/${this.state.user.foto}`,
    //       //ww_w,
    //       // called when the resource is loaded
    //       function (gltf) {
    //         var sword = gltf.scene;  // sword 3D object is loaded
    //         sword.scale.set(.1, .1, .1);
    //         sword.position.y = 0;
    //         scene.add(sword);
    //         scene.add(gltf.scene);
    //       }
    //     );
    //     var renderer = new THREE.WebGLRenderer({ antialias: true, autoSize: true, alpha: true });
    //     renderer.setSize(0.9 * window.innerWidth, 0.9 * window.innerHeight);
    //     //this.mount.appendChild(renderer.domElement);
    //     renderer.domElement.style.height = '50%';
    //     renderer.domElement.style.width = '100%';
    //     //renderer.domElement.style.border = '1px solid blue';
    //     //renderer.domElement.style.position = 'relative';
    //     //renderer.domElement.style.display = "block";
    //     const controls = new OrbitControls(camera, renderer.domElement);
    //     //controls.target.set( 0, 0.5, 0 );
    //     controls.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
    //     controls.keys = {
    //       LEFT: 'ArrowLeft', //left arrow
    //       UP: 'ArrowUp', // up arrow
    //       RIGHT: 'ArrowRight', // right arrow
    //       BOTTOM: 'ArrowDown' // down arrow
    //     }
    //     controls.touches = {
    //       ONE: THREE.TOUCH.ROTATE,
    //       TWO: THREE.TOUCH.DOLLY_PAN
    //     }
    //     controls.update();

    //     var geometry = new THREE.TorusKnotGeometry(0.7, 0.05, 200, 32, 1, 3);
    //     var geometry2 = new THREE.SphereGeometry(0.3, 10, 20);
    //     var geometry3 = new THREE.SphereGeometry(0.2, 10, 20);
    //     var material = new THREE.MeshPhongMaterial({
    //       color: "orange",
    //       flatShading: true,
    //       shading: THREE.SmoothShading,
    //     });
    //     var material1 = new THREE.MeshPhongMaterial({
    //       color: "orange",
    //     });
    //     var cube = new THREE.Mesh(geometry, material);
    //     //var sphere = new THREE.Mesh(geometry2, material1);
    //     var sphere2 = new THREE.Mesh(geometry3, material);
    //     scene.add(cube, sphere2);

    //     const light = new THREE.SpotLight("rgb(20,250,250)", .5);
    //     light.position.set(0, 3, 0);
    //     light.castShadow = true;
    //     light.shadow.bias = -0.0001;
    //     light.shadow.mapSize.width = 1024 * 4;
    //     light.shadow.mapSize.height = 1024 * 4;


    //     const light1 = new THREE.DirectionalLight("rgb(250,250,20)", .5);
    //     light1.position.set(0, -3, 0);
    //     light1.castShadow = true;
    //     light1.shadow.bias = -0.01;
    //     light1.shadow.mapSize.width = 1024 * 4;
    //     light1.shadow.mapSize.height = 1024 * 4;
    //     scene.add(light);
    //     scene.add(light1);

    //     const light3 = new THREE.AmbientLight("rgb(250,250,250)", 1); // soft white light
    //     scene.add(light3);

    //     controls.mouseButtons = {
    //       LEFT: THREE.MOUSE.ROTATE,
    //       MIDDLE: THREE.MOUSE.DOLLY,
    //       RIGHT: THREE.MOUSE.PAN
    //     }//griffmd
    //     camera.position.set(.5, .8, 1);
    //     var animate = function () {
    //       requestAnimationFrame(animate);
    //       cube.rotation.x += 0.001;
    //       cube.rotation.y += 0.01;
    //       //cube.rotation.z += 0.01;
    //       controls.update();
    //       renderer.render(scene, camera);
    //     };
    //     animate()
  }





  render() {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          closeButton={false}
        />
        <Navigation />


        <div className="container">

          {/* <div>
            $$\sum_1^3f(x)=\int_1^2$$
            $\sum_1^3f(x)=\int_1^2$
          </div>

          <iframe className="video" frameBorder="0" type="text/html" src="https://www.dailymotion.com/embed/video/x8uv6iq"></iframe>
          <figure class="media">
            www
            <iframe className="video" frameBorder="0" type="text/html" src="https://www.dailymotion.com/embed/video/x8r5idr"></iframe>
            www     <iframe className="video" frameBorder="0" type="text/html" src="https://www.youtube.com/embed/y881t8ilMyc"></iframe>
          </figure> */}

          {/* <Modal show={this.state.showModal} onHide={() => { this.close(); }} animation={false}>
            <Modal.Body>
              <div className="card form-group">
                <Input type="file" className="custom-file-input" onChange={(e) => { this.fileSelectHandler(e.target.files); }} ></Input>
                <label className="custom-file-label" htmlFor="customFile">
                  Cambiar foto actual
                </label>
              </div>
              <div className="card form-group">
                <div className="componentWrappertextleft ">
                  Apellidos y nombres
                </div>
                <input type="text" placeholder="Apellidos y nombres" name="name" onChange={this.onInputChange} value={this.state.name} required />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button className="btn btn-info" onClick={this.onSubmit}>
                Actualizar datos
              </button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.close() }}>
                Cerrar
              </button>
            </Modal.Footer>
          </Modal>
 */}
          {/* {isAuth() ? (
            <div className="card-body p-3 my-5">
              <a className="text-center btn btn-info " onClick={() => { this.open(); this.setState({ user: this.state.user._id, name: this.state.user.name }) }}>
                Actualizar
              </a>
              <div className="text-uppercase p-1">
              </div>
            </div>
          ) : null} */}





          {/*<Www_w />*/}
          {/* <div className={isAuth() ? "container p-1 my-3 text-center" : null}>
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
            {35 == 35 ? (
              <>
                {isAuth().role === "admin" ? (
                  <>
                    <Link
                      to="/admin"
                      className="btn btn-info text-white mx-1"
                    >
                      Perfil administrador
                    </Link>
                    <Link
                      to="/estudianteAll"
                      className="btn btn-info text-white mx-1 text-uppercase"
                    >
                      Estudiantes
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/private"
                    className="btn btn-info text-white mx-1"
                  >
                    Perfil estudiante
                  </Link>
                )}
              </>
            ) : null}
            <>
              <div className="card my-3 sky text-light">
                <div className="row sky">
                  <div className="container col-md-4 p-3 text-center rounded-left ">
                    <h1>Fisart.cf</h1>
                  </div>

                  <div className="container col-md-8 p-5 rounded-right">
                    <img className="img-fluid" src={authSvg} alt="img" />
                  </div>
                </div>
              </div>
            </>
          </div> */}

          {/* <div className="w-100 text-center d-none" ref={(ref) => (this.mount = ref)} />
          <div class="container p-0">
            <div class="card-body ">
              <div class="row align-items-center">
                <div class="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
                  <iframe title="Fractal Alien Landmark" frameborder="0" width="100%" height="480" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/a2be9c119f7848df9864c0df1272af06/embed"> </iframe>
                </div>
                <div class="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
                  <iframe title="Cthulhu (Animated)" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="100%" height="480" src="https://sketchfab.com/models/e4593e6681e84889a4d1df34ae30b5c6/embed"> </iframe>
                </div>
                <div class="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
                  <iframe title="Fractal Alien Landmark" frameborder="0" width="100%" height="480" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/a2be9c119f7848df9864c0df1272af06/embed"> </iframe>
                </div>
                <div class="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
                  <iframe title="Study" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="100%" height="480" src="https://sketchfab.com/models/9b3f278bacc54f219addd98215008ceb/embed"> </iframe>
                </div>
                <div class="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
                  <iframe title="Sculpture Allure" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" width="100%" height="480" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/eb51e179d6634973875205a8485940d4/embed"> </iframe>
                </div>
                <div class="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
                  <iframe title="Rossebändiger" frameborder="0" allowfullscreen mozallowfullscreen="true" width="100%" height="480" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/fd8153d1cd8d4fefaf4825d8a0c6abe3/embed"> </iframe>
                </div>
                <div class="container text-center p-1 col-md-6 col-lg-4 col-xl-4">
                  <iframe title="My Sketchfab Mesh" frameborder="0" width="100%" height="480" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/f39c1bc8170c44348f3bea92868a8dae/embed"> </iframe>
                </div>

              </div>
            </div>
          </div> */}
          {isAuth() ? <Socket /> : null}
          <Wwwwww />
        </div>
      </>
    );
  }
}


