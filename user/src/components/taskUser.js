import React, { useState } from 'react';
import { useEffect } from 'react';
import Markdownkatexnew from "./Markdown.js";
// import 'katex/dist/katex.min.css';
// import { BlockMath } from 'react-katex';
import axios from "axios"
import { isAuth } from '../helpers/auth';
import { ToastContainer, toast } from "react-toastify";

const ExportToExcel = ({ idtheme, codetheme, task_id }) => {
  const [value, setValue] = useState('')
  const [evaluacion, setEvaluacion] = useState()
  const [items, setItems] = useState([])

  useEffect(() => {
    // Your setup code here (the "effect")
    // return () => {
    //   // Optional cleanup code here
    // };
    getTask()
  }, []);

  const getTask = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/test/${idtheme}/${codetheme}/${isAuth()._id}`)
      .then((response) => response.json())
      .then(async (www) => {
        if (www.length > 0) {
          setItems(www[0].items)
          var encuestas = www[0].items
          var rptas = []
          if (encuestas.length > 0) {
            for (var j = 0; j < encuestas.length; j++) {
              if (encuestas[j].alt[0][0] === encuestas[j].rpta) {
                rptas.push(1)
              } else {
                rptas.push(0)
              }
            }
          }
          setEvaluacion(rptas.filter(x => x == 1).length)
        }
      })
  };


  const sendTest = async (w, ww) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/tasks/test/${task_id}`, { items: w, note: ww }).then((www) => {
      toast.success(www.data)
      getTask()
    }).catch((error) => { console.log("ERROR", error.response) })
  }

  const onChange = (text) => (e) => {
    // console.log(items[text].alt)
    console.log(e.target.value, text);
    items[text].alt[0] = [e.target.value]
    setItems(items)
    var encuestas = items
    var rptas = []
    for (var j = 0; j < encuestas.length; j++) {
      if (encuestas[j].alt[0][0] === encuestas[j].rpta) {
        rptas.push(1)
      } else {
        rptas.push(0)
      }
    }
    setEvaluacion(rptas.filter(x => x == 1).length)

    console.log(items)
    if (items != null) { sendTest(items, rptas.filter(x => x == 1).length) }
    // setFormData({ ...formData, [text]: e.target.value });
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />

      <div className='text-center text-warning h5'>
        Evaluación {value} - {idtheme} {codetheme}
      </div>

      <div className='row justify-content-center align-items-center' style={{ margin: '.5em' }}>
        {items.map((number, i) =>
          <div key={i + 1} className="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1">
            <div className="p-1 bg-light rounded">
              {/* {number.prg} */}
              [{i + 1}]
              <Markdownkatexnew>
                {number.prg}
              </Markdownkatexnew>
              {number.alt.length > 1 ?
                <select className='form-control' name="cars" id="cars" onChange={onChange(i)} required="required">
                  {number.alt.map((alternativa, j) =>
                    <option key={j + 'www' + i} style={{ border: 'solid 1pt orange', padding: '.1cm', margin: '.2cm', width: '9cm', borderRadius: '.02cm' }} value={alternativa}>
                      {alternativa}
                    </option>
                  )}
                </select>
                :
                <textarea className="form-control" onChange={onChange(i)} required="required"></textarea>
              }
            </div>
          </div>
        )}
      </div>
      {/* <div className='text-center text-warning h5'>
        <button type="submit" onClick={sendTest} className='btn btn-warning'>
          Guardar encuesta ({evaluacion})
        </button>
      </div> */}
    </div>
  );
};

export default ExportToExcel