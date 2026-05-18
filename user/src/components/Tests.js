//import authSvg from '../assests/file.jpg';
//import DatePicker from 'react-datepicker';
//import { IconButton, Input, TextareaAutosize, ThemeProvider } from '@material-ui/core';
//import { Modal, Row } from 'react-bootstrap';
// import { Alpha, Www } from "../components/new"
import React, { Component } from 'react';
import Navigation from '../screens/Navigation.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import WindowFocusHandler from "./isvisible.js";

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import es from 'timeago.js/lib/lang/es';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import { registerLocale } from "react-datepicker";
import { parseISO } from "date-fns";
import wes from 'date-fns/locale/es';
registerLocale('es', wes);

timeago.register('es', es);

export default class Tests extends Component {

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
      items: [],
      theme: "",
      dateb: new Date(),
      datee: "",
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
      console.log(res.data, "www");
      if (res.data.length != 0) {
        this.setState({
          dateb: parseISO(res.data.dateb),
          datee: parseISO(res.data.datee),
          theme: res.data,
          items: res.data.items,
          solution: res.data.solution,
          task: res.data.task == '' ? 'www' : res.data.task.replace(new RegExp('<script type="math/tex"></script>', 'g'), '').replace(new RegExp('<script type="math/tex; mode=display"></script>', 'g'), ''),
          note: res.data.note,
        });
      } else {
        // history.push("/categorias");
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
    console.log(this.state.items, this.state.note);
    const Data = {
      task: this.state.task,
      solution: this.state.solution,
      items: JSON.parse(this.state.items),
      note: this.state.note
    };
    await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${this.props.match.params.idtest}`, Data).then(res => {
      console.log(res)
      toast.dark('Actualizado correctamente')
    });
  };

  async componentDidMount() {
    await this.getNotes()
    // await this.timeNow()
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
    let scn = str.getSeconds()
    let format1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${mnt < 10 ? '0' + mnt : mnt}`
    this.state.noww = str//format1
    //console.log(format1)
  }

  convertir = async () => {
    var message = this.state.task + ''
    const replacedMessage = message.replace(/\<blockquote[^>]*>(.*?)\<\/blockquote>/g, (match, key) => {
      if (key === key) {
        return '<blockquote>' + key.replace(/\\left\\{(.*)\\right\\}/g, '\\left\\{?\\right\\}').replace(/\d+/g, '?').replace(/\d/g, '?').replace(/\<script[^>]*>(.{1,7})\<\/script>/g, '<script type="math/tex">?</script>').replace(/\(.{1,8}\)/g, '(?)') + '</blockquote>';
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
      <div className='container'>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />
        <Navigation />
        <WindowFocusHandler />

        {/* <Www name="www" /> */}
        {/* <span>{this.state.solution.length}</span> */}
        {this.state.dateb < this.state.noww && this.state.noww < this.state.datee ?
          <div className="bg-warning w-100 p-1 my-5 text-center">Inició <TimeAgo datetime={this.state.theme.dateb} locale='es' />. Termina <TimeAgo datetime={this.state.theme.datee} locale='es' /></div>
          :
          <div className="bg-secondary w-100 p-1 my-5 text-center">Culminó el tiempo establecido hace <TimeAgo datetime={this.state.theme.datee} locale='es' />
          </div>
        }
        {/* <CKEditor
          editor={ClassicEditor}
          config={{
            language: 'es',
            //toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"]
          }}
          data={this.state.task}

          onChange={(event, editor) => {
            this.setState({
              task: editor.getData()
            });
            this.timeNow()
            if (this.state.dateb < this.state.noww && this.state.noww < this.state.datee) {
              //this.submitTest
              //console.log("www")
            } else {
              this.setState({
                one: this.state.one + 1
              });
              if (3 < this.state.one && this.state.one < 8) {
                this.submitTest()
              }
            }
            //console.log(editor.getData());
          }}
        //onBlur={(event, editor) => {
        //console.log('Blur.', editor.getData())
        //this.submitTest()
        //}}
        //onFocus={(event, editor) => {
        //console.log('Focus.', editor)
        //this.submitTest()
        //}}
        /> */}
        {/* {this.state.solution.length != 1 && JSON.parse(localStorage.getItem("user")).rol == '1' ?
          <div className="mt-5">
            <CKEditor
              className="bordr border-info"
              editor={ClassicEditor}
              config={{
                language: 'es',
                toolbar: ["math", "|", "undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "indent", "outdent", "|", "imageUpload", "blockQuote", "insertTable", "mediaEmbed", "heading"]
              }}
              data={this.state.solution}
              //onReady={editor => {
              //  console.log('Editor is ready to use!', editor);
              //}}
              onChange={(event, editor) => {
                this.setState({
                  solution: editor.getData()
                })
                //console.log(editor.getData());
              }}
            //</div>onBlur={(event, editor) => {
            //console.log('Blur.', editor.getData());
            //this.submitTest()
            //}}
            //onFocus={(event, editor) => {
            //  console.log('Focus.', editor);
            //}}
            />
            <button className="btn btn-secondary w-100 mt-3" onClick={this.convertir}>
              Convertir
            </button>
          </div>
          : null
        } */}
        {JSON.parse(localStorage.getItem("user")).rol == '1' ?
          <>
            <textarea className="form-control" value={JSON.stringify(this.state.items, null, 5)} rows={19} onChange={(event) => {
              this.setState({
                items: event.target.value
              })
            }}
              required="required"></textarea>

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
        {this.state.dateb < this.state.noww && this.state.noww < this.state.datee || JSON.parse(localStorage.getItem("user")).rol == '1' ?
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
    );
  }
}
