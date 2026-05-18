import React, { useState } from "react";
import Navigation from "../screens/Navigation";
import { Link } from "react-router-dom";
//import authSvg from "../assests/forget.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ForgetPassword = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    token: "www",
    textChange: "Submit",
  });

  const { email, token } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: "Enviando" });
      axios.put(`${process.env.REACT_APP_API_URL}/auth/forgotpassword`, { email, })
        .then((res) => {
          setFormData({ ...formData, email: "", });
          setFormData({ ...formData, token: res.data.message });
          console.log(res);
          history.push(`/users/password/reset/${res.data.message}`)
          // toast.info("Enviado correctamente")
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error("Por favor rellene todos los campos");
    }
  };
  return (
    <div className="">
      <Navigation />
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />
      <div className="justify-content-center align-items-center" style={{ height: "81.9vh", display: 'flex' }}>
        <div className="container col-lg-5 p-2 text-center rounded-left">

          <h3 className="">Recupere su password</h3>
          <p className="">Escriba su email con el cual este registrado en {process.env.REACT_APP_page} para enviarle el link con un token con caducidad de una hora el cual le permitirá la recuperacion de contraseña. Cierre la ventana y revice su email incluido la carpeta de spam</p>

          <form onSubmit={handleSubmit}>
            <input className="form-control my-1" type="email" placeholder="Email" onChange={handleChange("email")} value={email} />
            <button type="submit" className="btn btn-info w-100">
              Enviar
            </button>
          </form>
          {token != 'www' ? <Link to={`/users/password/reset/${token}`} className="btn btn-success text-light mt-1">
            Token
          </Link> : ""}
          {/*<div className="bg-info">
        <div className="" style={{ backgroundImage: `url(${authSvg})` }}></div>
      </div>*/}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
