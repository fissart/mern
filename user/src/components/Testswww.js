import React, { useState, useEffect } from "react";
import Navigation from "../screens/Navigation";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'

const Alpha = ({ history }) => {
  const { idtest } = useParams()
  const [data, setData] = useState()
  const [timenow, setTimenow] = useState()
  const [formData, setFormData] = useState({
    task: "",
    solution: "",
    textChange: "Iniciar sesión",
  })

  const timeNow = () => {
    var str = new Date()
    let day = str.getDate()
    let month = str.getMonth() + 1
    let year = str.getFullYear()
    let hour = str.getHours()
    let mnt = str.getMinutes()
    let scn = str.getSeconds()
    let format1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${mnt < 10 ? '0' + mnt : mnt}`
    setTimenow(format1)
    console.log(scn)
  }

  useEffect(() => {
    timeNow()
    axios.get(
      `${process.env.REACT_APP_API_URL}/tasks/${idtest}`
    ).then(res => {
      console.log(res.data[0]);
      if (res.data.length != 0) {
        setData(res.data[0])
        setFormData({ ...formData, task: res.data[0].task })
      } else {
        history.push("/categorias");
      }
    })
  }, []);

  const Task = () => {
    const [www, wwWw] = useState()
    //const [timenow, setTimenow] = useState()
    const submitTest = async () => {
      const Data = {
        task: www,
        solution: data.solution,
        note: data.note
      };
      await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${idtest}`, Data).then(res => {
        //console.log(res)
        toast.dark('Actualizado correctamente')
      });
    };
    return (
      <>
        

        {formData.task ?
          <>
            <CKEditor
              editor={ClassicEditor}
              config={{
                language: 'es',
                //toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"]
              }}
              data={formData.task}
              onChange={(event, editor) => {
                wwWw(editor.getData())
                timeNow()
              }}
              onReady={editor => {
                console.log('Editor is ready to use!', editor)
                wwWw(editor.getData())
              }}
            />
            {data.dateb < timenow && timenow < data.datee || JSON.parse(localStorage.getItem("user")).rol == '2' ?
              <button className="btn btn-info w-100 my-5" onClick={submitTest}>
                Actualizar
              </button>
              : <div className="bg-warning w-100 p-1 my-5 text-center">Culminó el tiempo establecido
                <Link
                  className="btn btn-outline-info w-100"
                  style={{ color: 'dark' }}
                  to={'/curso/' + this.state.theme.curse}
                >Ir al curso</Link>
              </div>
            }
          </>
          : null
        }

      </>
    );
  };


  return (
    <div className="container">
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
      <Navigation />
      <Task />
    </div>
  );
};

export default Alpha;
