import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

const onFocus = () => {
  toast.info("Tab is in focus");
};

const onBlur = () => {
  toast.info("Tab is blurred");
};

const WindowFocusHandler = () => {
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    onFocus();
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return <>
    <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />
  </>;
};

export default WindowFocusHandler;
