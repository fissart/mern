import React, { useState } from "react";
//import authSvg from "../assests/forget.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ForgetPassword = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    textChange: "Submit",
  });

  const { email } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: "Enviando" });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email,
        })
        .then((res) => {
          setFormData({
            ...formData,
            email: "",
          });
          toast.success(`Por favor verifique su email`);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("Por favor rellene todos los campos");
    }
  };
  return (
    <div className=" container p-2 bg-light border text-center my-3">
      <ToastContainer />

      <h5 className="">Recupere su password</h5>
      <h9 className="">Escriba su email para enviarle el link de recuperacion de contraseña. Cierre la ventana y revice su email (Spam)</h9>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-1"
          type="email"
          placeholder="Email"
          onChange={handleChange("email")}
          value={email}
        />
        <button type="submit" className="btn btn-info">
          Enviar
        </button>
      </form>

      {/*<div className="bg-info">
        <div className="" style={{ backgroundImage: `url(${authSvg})` }}></div>
      </div>*/}
    </div>
  );
};

export default ForgetPassword;
