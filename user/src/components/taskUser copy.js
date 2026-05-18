import React, { useState } from 'react';
import { useEffect } from 'react';
import Markdownkatexnew from "./Markdown.js";
// import 'katex/dist/katex.min.css';
// import { BlockMath } from 'react-katex';
import axios from "axios"
import { isAuth } from '../helpers/auth';
// import { ToastContainer, toast } from "react-toastify";

const ExportToExcel = ({ idtheme, codetheme, task_id }) => {
  // const [value, setValue] = useState('')
  const [evaluacion, setEvaluacion] = useState('')
  // const [items, setItems] = useState([])

  useEffect(() => {
    getTask()
  }, []);

  const getTask = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/test/${idtheme}/${codetheme}/${isAuth()._id}`)
      .then((response) => response.json())
      .then(async (www) => {
        console.log(www)
        if (www[0]) {
          setEvaluacion(www[0].note)
        }
      })
  };



  return (
    <div>
      <div className='text-center text-warning'>
        Crédito {evaluacion}
      </div>
    </div>
  );
};

export default ExportToExcel