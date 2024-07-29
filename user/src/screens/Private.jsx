import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { isAuth, getCokie, signout } from "../helpers/auth";
import Navigation from "../screens/Navigation.jsx";
import authSvgwww from "../assests/foto.png";

const Private = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    photoSelected: "",
    namefile: "",
    files: [],
    email: "",
    password: "",
    textChange: "Actualizar",
    rol: "",
  })

  const fileSelectHandler = (file) => {
    //console.log(formData.files, file);
    // var array = ["image/jpeg", "image/jpg", "image/png", "image/PNG", "image/svg+xml"];
    // console.log(array.includes(files[0].type));
    // if (files) {
    //   if (files[0].size < 105048576 && array.includes(files[0].type)) {
    if (file[0]) {
      console.log(file[0])
      // setFormData({ ...formData, files: file, namefile: file[0].type })
      const reader = new FileReader();
      reader.onload = e => setFormData({ ...formData, photoSelected: reader.result, files: file, namefile: file[0].type });
      reader.readAsDataURL(file[0]);
    }
    // } else {
    //   toast.dark(
    //     "Solo se acepta archivos no mayor a 1MB en formatos pdf, jpeg, jpg y png "
    //   );
    // }
    //    }
  };

  const loadProfile = () => {
    const token = getCokie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res)
        const { rol, name, email, foto, password } = res.data;
        setFormData({ ...formData, rol, name, email, foto, password });
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

  const { name, email, password, textChange, rol } = formData;

  const handleChange = (text) => (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = async (e) => {
    //const token = getCookie("token");
    //console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: "Submitting" });
    const data = new FormData()
    data.append("foto", formData.files[0])
    data.append("rol", rol)
    data.append("name", name)
    data.append("email", email)
    data.append("password", password)
    //console.log(formData.files[0])
    await axios.put(`${process.env.REACT_APP_API_URL}/userUp/` + isAuth()._id, data);
    toast.info("Perfil actualizado satisfactoriamente");
    history.push("/");

    // axios.put(`${process.env.REACT_APP_API_URL}/user/update`, data, { headers: { Authorization: `Bearer ${token}`, }, }).then((res) => {
    //   updateUser(res, () => {
    //     setFormData({ ...formData, textChange: "Actualizar" });
    //   });
    // }).catch((err) => { console.log(err.response); });
  };

  // const fotto = async () => {
  //   foto.click();
  // }

  return (
    <>
      <Navigation />
      <div className="container my-3 text-center">
        <div className="row">
          <div className="container p-3 rounded-left bg-light">
            <ToastContainer />
            <h5>Actualizar perfil</h5>
            <form onSubmit={handleSubmit} className="row">
              <input className="form-control my-1 md-col-6" type="text" placeholder="rol" onChange={handleChange("rol")} value={rol} />
              <input className="form-control my-1" type="email" placeholder="Email" onChange={handleChange("email")} value={email} />
              <input className="form-control my-1" type="text" placeholder="Name" onChange={handleChange("name")} value={name} />
              <input className="form-control my-1" type="text" placeholder="Password" onChange={handleChange("password")} value={password} />
              <input type="file" className="form-control d-none" onChange={(e) => { fileSelectHandler(e.target.files); }} id="foto"></input>
              <button type="submit" className="btn btn-info mb-1 w-100">
                {textChange} {formData.namefile}
              </button>
            </form>
            {/* <img className="img-fluid" src={formData.photoSelected ? formData.photoSelected : `${process.env.REACT_APP_URL}/profile/${formData.foto}`} alt="Thumb" onClick={fotto} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Private;
