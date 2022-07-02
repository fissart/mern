import React, { useState } from "react";
//import authSvg from "../assests/ww1.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { isAuth } from "../helpers/auth";
import { Link, Redirect } from "react-router-dom";
import Navigation from "../screens/Navigation";

const Register = ({history}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
    textChange: "Registrarse",
  });

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: "Espere..." });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password1: "",
              password2: "",
              textChange: "Ok",
            });
            history.push("/login");
            toast.success(res.data.message);
          })
          .catch((err) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password1: "",
              password2: "",
              textChange: "Registrarse",
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Las contraseñas no coinciden");
      }
    } else {
      toast.error("Por favor rellene todos los campos");
    }
  };

  return (
    <div className="container">
    <Navigation/>
      <div className="row">
        <div className="container p-3 col-md-6 text-light">
          {isAuth() ? <Redirect to="/" /> : null}
          <ToastContainer />

          <h5 className="text-center text-white">Regístrese en Fisart</h5>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control my-1"
              type="text"
              placeholder="Apellidos y nombres"
              onChange={handleChange("name")}
              value={name}
            />
            <input
              className="form-control my-1"
              type="email"
              placeholder="Email"
              onChange={handleChange("email")}
              value={email}
            />
            <input
              className="form-control my-1"
              type="password"
              placeholder="Password"
              onChange={handleChange("password1")}
              value={password1}
            />
            <input
              className="form-control my-1"
              type="password"
              placeholder="Confirme Password"
              onChange={handleChange("password2")}
              value={password2}
            />
            <div className="text-center">
              <button type="submit" className="btn btn-light">
                {textChange}
              </button>
              {/* <div className="my-12 mt-5 text-center text-white">
                <h7>Inicie sesion con email o registros sociales</h7>
              </div> */}
              <div className="text-center">
                <Link to="/login" className="btn btn-success text-light mt-1">
                  Si esta registrado iniciar sesion
                </Link>
              </div>
            </div>
          </form>
        </div>
  {/*      <div className="container col-md-8 rounded-right bg-info p-5">
          <img className="img-fluid" src={authSvg} alt="img" />
        </div>
*/}      </div>
    </div>
  );
};

export default Register;
