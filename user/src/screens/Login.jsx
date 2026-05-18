import React, { useEffect, useState } from "react";
//import authSvg from "../assests/ww2.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth } from "../helpers/auth";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Navigation from "../screens/Navigation";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
// import { Alpha, Www } from "../components/new"

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    ip: [],
    textChange: "Iniciar sesión",
  });


  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "wwwwwwww")
        setFormData({ ...formData, ip: data });
        // setLocation({
        //   ip: data.ip,
        //   city: data.city,
        //   region: data.region,
        //   country: data.country_name
        // });
      })
      .catch((err) => console.error("Error fetching IP location:", err))

  }, []);


  const { email, password1, ip } = formData;
  //submit data to backend
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = (tokenId) => {
    // console.log(ip)
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/googlelogin`, {
        idToken: tokenId,
        ip: ip,
      })
      .then((res) => {
        console.log(res.data);
        informParent(res);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().rol === "3"
        ? history.push("/carpeta")
        : history.push("/carpeta");
    });
  };

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/facebooklogin`, {
        userID,
        accessToken,
        ip: ip,
      })
      .then((res) => {
        console.log(res.data);
        informParent(res);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };

  const responseGoogle = (response) => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = (response) => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken);
  };

  const handleSubmit = (e) => {
    //console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios.get(`${process.env.REACT_APP_API_URL}/auth/login/${email}/${password1}`, {
        email,
        password: password1,
      })
        .then((res) => {
          console.log(res)
          authenticate(res, () => {
            console.log(res.data);
            isAuth() && isAuth().rol === "1"
              ? history.push("/")
              : history.push("/carpeta");
            // toast.success(`Hey ${res.data.user.name}, Bienvenido otra vez!`);
            //window.location.href = "/admin";
          });
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.errors)
        });
    } else {
      toast.error("Rellene todos los campos");
    }
  };

  return (
    <div className="">
      <Navigation />
      {isAuth() ? <Redirect to="/" /> : null}
      <div className="justify-content-center align-items-center" style={{ height: "71.9vh", display: 'flex' }}>
        <div className="container col-lg-5 p-2 text-center rounded-left">
          {/* {isAuth() ? <Redirect to="/" /> : null} */}
          <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />

          <h5 className="ffont">Iniciar sesión en {process.env.REACT_APP_page}</h5>
          <Link to="/register" className="btn btn-light my-1">
            Registrarse
          </Link>
          <div>
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="btn btn-danger m-auto"
                >
                  Iniciar sesion con Google
                </button>
              )}
            ></GoogleLogin>
          </div>
          <div className="my-1">
            <FacebookLogin
              appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
              autoLoad={false}
              callback={responseFacebook}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className="btn btn-primary"
                >
                  Iniciar sesión con Facebook
                </button>
              )}
            />
          </div>


          {/* <div className="text-center">O inicie sesión con e-mail</div> */}

          <form onSubmit={handleSubmit} className="col-lg-12">
            <input
              className="form-control my-2"
              type="email"
              placeholder="Email"
              onChange={handleChange("email")}
              value={email}
            />
            <input
              className="form-control my-2"
              type="password"
              placeholder="Password"
              onChange={handleChange("password1")}
              value={password1}
            />
            <div className="my-1">
              <button type="submit" className="btn btn-info w-100">
                Iniciar sesion
              </button>
            </div>

            <Link
              to="/users/password/forget"
              className="btn btn-light btn-sm"
            >
              Olvidaste tu contaseña?
            </Link>
          </form>
        </div>
        {/*      <div className="container col-md-8 bg-light p-5 rounded-right">
          <img className="img-fluid" src={authSvg} alt="img" />
        </div>
  */}    </div>
      {/* <Www /> */}
    </div>
  );
};

export default Login;
