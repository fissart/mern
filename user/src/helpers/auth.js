import cookie from "js-cookie";
//import { GoogleLogout } from 'react-google-login';
// Set in Cookie
export const setCokie = (key, value) => {
  if (window !== "undefiend") {
    cookie.set(key, value, {
      // 1 Day
      //  expires: 1,
    });
  }
}

// remove from cookie
export const removeCokie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
       expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCokie = (key) => {
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
  // console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE ww", response);
  setCokie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  // const myObject = {
  //   name : "john doe",
  //   age : 32,
  //   gender : "male",
  //   profession : "optician" 
  // }
  // setLocalStorage("userwww", myObject);
  next();
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    // console.log(getCokie("token"),"wwwisauth")
    const cookieChecked = getCokie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    } else {
      console.log("www")
    }
  }
};

export const isAsignature = () => {
  if (window !== "undefined") {
    const cookieChecked = getCokie("token");
    if (cookieChecked) {
      if (localStorage.getItem("curse")) {
        return JSON.parse(localStorage.getItem("curse"));
      } else {
        return false;
      }
    }
  }
};


export const signout = (next) => {
  removeCokie("token");
  removeLocalStorage("user");
  removeLocalStorage("token");
  removeCokie("idcat");
  removeLocalStorage("idcat");
  removeCokie("idc");
  removeLocalStorage("idc");
  removeCokie("id");
  removeLocalStorage("id");
  removeCokie("namecurse");
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
