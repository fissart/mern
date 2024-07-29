import React, { useState } from "react";
import axios from "axios"

//import { useState, memo } from "react";
import { Layout, Button, VisualComponent } from "./componentes";
import cookie from "js-cookie";

//import { GoogleLogout } from 'react-google-login';
// Set in Cookie
export const setCookie = (key, value) => {
 if (window !== "undefiend") {
  cookie.set(key, value, {
   // 1 Day
   // expires: 1,
  });
 }
};

export const Alpha = () => {
 const Contador = () => {
  const [counter, setCounter] = useState(0);
  return (
   <>
    <h4 className="-mt-2 mb-1  font-thin"> {counter}</h4>

    <Button onClick={() => setCounter(counter + 1)}>
     Actualizar Estado
    </Button>
   </>
  );
 };
 return (
  <VisualComponent title="Alpha" metodo="abstracción">
   <Contador />
   {/* <Bravo /> */}
  </VisualComponent>
 );
};

const Wwwww = () => {
 const [counter, setCounter] = useState(5);
 return (
  <div className="container">
   <h4 className="-mt-2 mb-1  font-thin"> {counter}</h4>
   <button className="btn btn-info" onClick={() => setCounter(counter + 1)}>
    Actualizar
   </button>
  </div>
 )
};

export function getData(endpoint) {
 return axios.get(endpoint);
}

export const Www = () => {
 const Wwwwwww = () => {
  const [counter, setCounter] = useState(5);
  return (
   <div className="container">
    <h4 className="-mt-2 mb-1  font-thin"> {counter}</h4>
    <button className="btn btn-info" onClick={() => setCounter(counter + 1)}>
     Actualizarwww{name}
    </button>0
   </div>
  )
 };
 return (
  <div className="container">
   <Wwwwwww />
   <Wwwww />
  </div>
 )
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
 if (window !== "undefined") {
  return cookie.get(key);
 }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
 if (window !== "undefined") {
  localStorage.setItem(key, JSON.stringify(value));
 }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
 if (window !== "undefined") {
  localStorage.removeItem(key);
 }
};

// Authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
 console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE ww", response);
 setCookie("token", response.data.token);
 setLocalStorage("user", response.data.user);
 const myObject = {
  name: "john doe",
  age: 32,
  gender: "male",
  profession: "optician"
 }
 setLocalStorage("userwww", myObject);
 next();
};

// Access user info from localstorage
export const isAuth = () => {
 if (window !== "undefined") {
  const cookieChecked = getCookie("token");
  if (cookieChecked) {
   if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
   } else {
    return false;
   }
  }
 }
};

export const signout = (next) => {
 removeCookie("token");
 removeLocalStorage("user");
 removeLocalStorage("token");
 removeCookie("idcat");
 removeLocalStorage("idcat");
 removeCookie("idc");
 removeLocalStorage("idc");
 removeCookie("id");
 removeLocalStorage("id");
 removeCookie("namecurse");
 removeLocalStorage("namecurse");
 next();
};

export const updateUser = (response, next) => {
 console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
 if (typeof window !== "undefined") {
  let auth = JSON.parse(localStorage.getItem("user"));
  auth = response.data;
  localStorage.setItem("user", JSON.stringify(auth));
 }
 next();
};