import { Link } from "react-router-dom";
import Navigation from "../screens/Navigation";
import React, { useState, useEffect } from 'react';
//import authSvg from '../assests/reset.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const ResetPassword = ({ match, history }) => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: '',
    textChange: 'Submit'
  });
  const { password1, password2, token } = formData;

  useEffect(() => {
    let token = match.params.token;
    console.log(token)
    if (token) {
      setFormData({ ...formData, token });
    }
    // eslint-disable-next-line
  }, [])
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/auth/resetpassword`, {
          newPassword: password1,
          resetPasswordLink: token
        })
        .then(res => {
          console.log(password1, password2)
          console.log(res.data.message)
          setFormData({
            ...formData,
            password1: '',
            password2: ''
          });
          toast.success(res.data.message);
          history.push("/login")
        })
        .catch(err => {
          if (err.response) {
            console.error(err.response); // 400
            toast.error(err.response.data.errors);
            // console.error(err.response.data.error); // 'Missing username...'
          } else {
            console.error('An unexpected err occurred:', err.message);
          }
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };
  return (
    <div className="">
      <Navigation />
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />
      <div className="justify-content-center align-items-center" style={{ height: "81.9vh", display: 'flex' }}>
        <div className="container col-lg-5 p-2 text-center rounded-left">

          <h3 className='text-center'>Cambie tu password </h3>
          <form onSubmit={handleSubmit}>
            <input className='form-control my-1' type='password' placeholder='Password' onChange={handleChange('password1')} value={password1} />
            <input className='form-control my-1' type='password' placeholder='Confirme password' onChange={handleChange('password2')} value={password2}
            />
              <button className='btn btn-success w-100'>Cambiar password</button>
            <div className="btn btn-group">
              {/* <Link to="/users/password/forget" className="btn btn-warning">Volver a enviar el link con el token</Link> */}

            </div>
            {/* <Link to="/login" className="btn btn-warning"> Www </Link> */}
          </form>
          <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
            {/*        <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>*/}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResetPassword;
