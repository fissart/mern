import React, { useState, useEffect } from "react";
//import authSvg from "../assests/update.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import Navigation from "../screens/Navigation.jsx";
import { Link } from "react-router-dom";

const Private = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    textChange: "Actualizar",
    role: "",
  });


  const loadProfile = () => {
    const token = getCookie("token");
    axios
    .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const { role, name, email } = res.data;
      setFormData({ ...formData, role, name, email });
    })
    .catch((err) => {
      toast.error(`Error To Your Information ${err.response.statusText}`);
      if (err.response.status === 401) {
        signout(() => {
          history.push("/login");
        });
      }
    });
  };
  useEffect(loadProfile, []);

  const { name, email, password1, textChange, role } = formData;

  const handleChange = (text) => (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    const token = getCookie("token");
    console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: "Submitting" });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/update`,
        {
          name,
          email,
          password: password1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateUser(res, () => {
          toast.success("Perfil actualizado satisfactoriamente");
          setFormData({ ...formData, textChange: "Actualizar" });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  /*
  const fileSelectHandler = (files) => {
    //console.log(files[0]);
    this.setState({
      files,
      progress: 0,
    })
  }
*/
  /*
 const fileUploadHandler = () => {
    console.log(this.state.files[0]);
    const data = new FormData();
    data.append('filesww', this.state.files[0]);
    data.append('filesS', "WWWWWW");
    data.append('file', "W_ WWWWW");
    console.log(data.get('filesww'), data.get('filesS'))
    axios.post('http://localhost:4001/api/seccions/file', data, {
    }).then(res => {
      console.log(res);
    }).catch(err => console.log(err))
  }
*/

  return (
    <>
      <Navigation />
      <div className="container my-3 text-center">
        <div className="row">
          <div className="container p-3 col-md-4 rounded-left bg-light">
            <ToastContainer />
            <h5>Actualizar perfil</h5>
            <form onSubmit={handleSubmit}>
              <input
                disabled
                className="form-control my-1 d-none"
                type="text"
                placeholder="Role"
                value={role}
              />
              <input
                className="form-control my-1"
                type="email"
                placeholder="Email"
                disabled
                value={email}
              />

              <input
                className="form-control my-1"
                type="text"
                placeholder="Name"
                onChange={handleChange("name")}
                value={name}
              />
              <input
                className="form-control my-1"
                type="password"
                  placeholder="Password"
                onChange={handleChange("password1")}
                value={password1}
              />

              <button type="submit" className="btn btn-info mb-1">
                {textChange}
              </button>

              <div className="text-center">
                <Link
                  className="btn btn-primary text-white"
                  to="/"
                  target="_self"
                >
                  Inicio
                </Link>
              </div>
            </form>
          </div>
  {/*        <div className="container col-md-8 rounded-right p-5 bg-light">
            <img className="img-fluid" src={authSvg} alt="img" />
          </div>
*/}        </div>
      </div>
    </>
  );
};

export default Private;
