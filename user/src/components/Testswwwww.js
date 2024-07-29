import React, { Component } from 'react';
import Navigation from '../screens/Navigation.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, cssTransition, toast } from 'react-toastify'
//import authSvg from '../assests/file.jpg';
//import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
//import { IconButton, Input, TextareaAutosize, ThemeProvider } from '@material-ui/core';
//import { Modal, Row } from 'react-bootstrap';
import axios from 'axios'
import { Alpha, Www } from "../components/new"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
//import "animate.css/animate.min.css";
//import "react-toastify/dist/ReactToastify.css";

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut"
})
const swirl = cssTransition({
  enter: "swirl-in-fwd",
  exit: "swirl-out-bck"
})

export default class Testswww extends Component {

  constructor(props) {
    super(props);
    this.state = {
      solution: "",
      contenido: "",
      task: "",
      themeall: "",
      fechaexa: new Date(),
      timexa: "2",
      editing: false,
      integers: [],
      theme: "",
      note: "",
      one: 3,
      noww: "",
      _id: "",
      submit: "",
    }
  };

  getNotes = async () => {
    console.log(this.props.match.params.idtest)
    await axios.get(
      `${process.env.REACT_APP_API_URL}/tasks/${this.props.match.params.idtest}`
    ).then(res => {
      console.log(res);
      if (res.data.length != 0) {
        this.setState({
          theme: res.data[0],
          solution: res.data[0].solution,
          task: res.data[0].task == '' ? 'www' : res.data[0].task.replace(new RegExp('<script type="math/tex"></script>', 'g'), '').replace(new RegExp('<script type="math/tex; mode=display"></script>', 'g'), ''),
          note: res.data[0].note,
        });
      } else {
        this.props.history.push("/categorias");
      }
    });
  }

  getNotesNotes = async () => {
    await axios.get(
      `${process.env.REACT_APP_API_URL}/tasks/${this.props.match.params.idtest}`
    ).then(res => {
      this.setState({
        theme: res.data[0],
      });
      console.log(res.data[0]);
      console.log(this.state.theme.task, this.state.theme.note);
    });
  }

  submitTest = async () => {
    //console.log(this.state.solution, this.state.note);
    const Data = {
      task: this.state.task,
      solution: this.state.solution,
      note: this.state.note
    };
    await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${this.props.match.params.idtest}`, Data).then(res => {
      //console.log(res)
      toast.dark('Actualizado correctamente')
    });
  };

  async componentDidMount() {
    await this.getNotes()
    await this.timeNow()
    // console.log(this.props.match.params.id)
    // if (this.props.match.params.id) {
    // } else {
    // }
  }

  timeNow() {
    var str = new Date()
    let day = str.getDate()
    let month = str.getMonth() + 1
    let year = str.getFullYear()
    let hour = str.getHours()
    let mnt = str.getMinutes()
    //let scn = str.getSeconds()
    let www = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${mnt < 10 ? '0' + mnt : mnt}`
    this.setState({
      noww: www
    })
    //console.log(format1)
  }

  convertir = async () => {
    var message = this.state.task + ''
    const replacedMessage = message.replace(/\<blockquote[^>]*>(.*?)\<\/blockquote>/g, (match, key) => {
      if (key === key) {
        return '<blockquote>' + key.replace(/\\left\\{(.*)\\right\\}/g, '\\left\\{?\\right\\}').replace(/\d+/g, '?').replace(/\d/g, '?').replace(/\<script[^>]*>(.{1,7})\<\/script>/g, '<script type="math/tex">?</script>').replace(/\(.{1,8}\)/g, '(?)') + '</blockquote>'
      }
      return ''
    })
    this.setState({
      solution: replacedMessage
    })
    console.log(replacedMessage)
  }

  render() {
    return (
      <>
        <ToastContainer
          closeButton={false}
        />
        <Navigation />
        <div className='container'>
          {/* <Www name="www" /> */}
          {/* <span>{this.state.solution.length}</span> */}
          {this.state.theme.dateb < this.state.noww && this.state.noww < this.state.theme.datee ?
            <div className="text-info text-uppercase w-100 p-1 my-5 text-center">Desde {this.state.theme.dateb.replace(/T/, "--")} hasta {this.state.theme.datee.replace(/T/, "--")}</div>
            :
            <div className="text-warning text-uppercase w-100 p-1 my-5 text-center">Culminó el tiempo establecido el {this.state.theme.datee}. Inicio en {this.state.theme.dateb}. Ahora es {this.state.noww}</div>
          }
          <CKEditor
            editor={ClassicEditor}
            // disabled={false}
            config={{
              language: 'es',
              //toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"]
            }}

            data={this.state.task}

            onChange={(event, editor) => {
              var str = new Date()
              let day = str.getDate(), month = str.getMonth() + 1, year = str.getFullYear(), hour = str.getHours(), mnt = str.getMinutes(), scn = str.getSeconds()
              let noww = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${mnt < 10 ? '0' + mnt : mnt}`
              if (this.state.theme.dateb < noww && noww < this.state.theme.datee || JSON.parse(localStorage.getItem("user")).rol == '2') {
                //this.submitTest
                //console.log(scn)
              } else {
                this.setState({
                  task: editor.getData(),
                  noww: noww,
                  one: this.state.one + 1
                })

                if (3 < this.state.one && this.state.one < 8) {
                  this.submitTest()
                  console.log(this.state.one)
                }
                //console.log(editor.getData())
              }
            }}

            onBlur={(event, editor) => {
              var str = new Date()
              let day = str.getDate(), month = str.getMonth() + 1, year = str.getFullYear(), hour = str.getHours(), mnt = str.getMinutes(), scn = str.getSeconds()
              let noww = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${mnt < 10 ? '0' + mnt : mnt}`
              if (this.state.theme.dateb < noww && noww < this.state.theme.datee || JSON.parse(localStorage.getItem("user")).rol == '2') {
                this.setState({
                  task: editor.getData(),
                  noww: noww
                })
                //console.log('Blur.', this.state.solution)
                const Data = {
                  task: editor.getData(),
                  solution: this.state.solution,
                  note: this.state.note
                }
                axios.put(`${process.env.REACT_APP_API_URL}/tasks/${this.props.match.params.idtest}`, Data).then(res => {
                  toast.info('Tarea actualizada correctamente', { transition: bounce })
                })
              } else {
                console.log("www")
              }
            }}
          //onFocus={(event, editor) => {
          //console.log('Focus.', editor)
          //this.submitTest()
          //}}
          />


          {this.state.solution.length != 1 && JSON.parse(localStorage.getItem("user")).rol == '2' ?
            <div className="mt-5">
              <CKEditor
                className="bordr border-info"
                editor={ClassicEditor}
                config={{
                  language: 'es',
                  // toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"]
                }}

                data={this.state.solution}
                //onReady={editor => {
                //  console.log('Editor is ready to use!', editor);
                //}}

                onChange={(event, editor) => {
                  // this.setState({
                  //   solution: editor.getData()
                  // })
                  //console.log(editor.getData());
                }}

                onBlur={(event, editor) => {
                  this.setState({
                    solition: editor.getData()
                  })
                  //console.log('Blur.', this.state.solution)
                  const Data = {
                    task: this.state.task,
                    solution: editor.getData(),
                    note: this.state.note
                  };
                  axios.put(`${process.env.REACT_APP_API_URL}/tasks/${this.props.match.params.idtest}`, Data).then(res => {
                    //console.log(res)
                    toast.dark('Solución actualizada correctamente', { transition: bounce })
                  })
                }}

              //onFocus={(event, editor) => {
              //  console.log('Focus.', editor);
              //}}
              />
              <button className="btn btn-secondary w-100 mt-3" onClick={this.convertir}>
                Convertir
              </button>
            </div>
            : null
          }


          {JSON.parse(localStorage.getItem("user")).rol == '2' ?
            <>
              <input defaultValue={this.state.solution} onChange={(event) => {
                this.setState({
                  solution: event.target.value
                });
                console.log(event.target.value)
              }} className="form-control mt-3" />
              {this.state.solution.length < 3 ? <input placeholder='Nota' defaultValue={this.state.note} onChange={(event) => {
                this.setState({
                  note: event.target.value
                });
                console.log(event.target.value)
              }} className="form-control mt-3" /> : null}
            </>
            : null}


          {this.state.theme.dateb < this.state.noww && this.state.noww < this.state.theme.datee || JSON.parse(localStorage.getItem("user")).rol == '2' ?
            <button className="btn btn-info w-100 my-5" onClick={this.submitTest}>
              Actualizar
            </button> :
            <div className="bg-warning w-100 p-1 my-5 text-center">Culminó el tiempo establecido
              <Link
                className="btn btn-outline-info w-100"
                style={{ color: 'dark' }}
                to={'/curso/' + this.state.theme.curse}
              >Ir al curso</Link>
            </div>
          }
        </div>
      </>
    );
  }
}
