import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ExportToExcel from './calculadorajs'
import ExportToPdf from './boletanotas'
// import jsPDF from "jspdf"
// import autoTable from 'jspdf-autotable'
// import autoTable from 'jspdf-autotable'
// import Wwwww from './sphere.js'
import { useEffect, useState } from 'react'
import Select from 'react-select'
// import { Popover, Transition } from '@headlessui/react'
import Www from './calculadorajs copy'
import ReactModal from 'react-modal';
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom";
import { getCokie, isAuth, signout } from "../helpers/auth";
ReactModal.setAppElement('*'); // suppresses modal-related test warnings.

const ciclosacta = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '5', label: '5' },
  { value: '4', label: '4' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
]

const mencionesacta = [
  { value: 'E', label: 'E' },
  { value: 'P', label: 'P' },
  { value: 'G', label: 'G' },
  { value: 'ED', label: 'ED' },
]
const yearsacta = [
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
]
const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    overflowY: "scroll"
  },
  content: {
    top: '56%',
    left: '50%',
    background: 'blue',    // right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: "430px" //or maxHeight     // your code
  },
};

const items = [
  {
    alt: [
      [''],
      ['Muy clara'],
      ['Clara'],
      ['Regular'],
      ['Confusa'],
      ['Muy confusa']], prg: '¿Cómo califica la claridad de las explicaciones del docente?'
  },
  {
    alt: [
      [''],
      ['Totalmente de acuerdo'],
      ['De acuerdo'],
      ['Neutral'],
      ['En desacuerdo'],
      ['Totalmente en desacuerdo']], prg: '¿El docente demuestra un buen dominio del tema?'
  },
  {
    alt: [
      [''],
      ['Totalmente de acuerdo'],
      ['De acuerdo'],
      ['Neutral'],
      ['En desacuerdo'],
      ['Totalmente en desacuerdo']], prg: '¿El docente fomenta un ambiente de aprendizaje positivo?'
  },
  {
    alt: [
      [''],
      ['Muy accesible'],
      ['Accesible'],
      ['Regular'],
      ['Poco accesible'],
      ['Nada accesible']], prg: '¿Qué tan accesible es el docente para resolver dudas o consultas en horario académico?'
  },
  {
    alt: [
      [''],
      ['Muy clara'],
      ['Clara'],
      ['Regular'],
      ['Confusa'],
      ['Muy confusa']], prg: '¿Cómo calificaría la claridad de los criterios de evaluación proporcionados por el docente?'
  },
  {
    alt: [
      [''],
      ['Totalmente de acuerdo'],
      ['De acuerdo'],
      ['Neutral'],
      ['En desacuerdo'],
      ['Totalmente en desacuerdo']], prg: '¿El docente comunica de manera efectiva las fechas y formatos de las evaluaciones?'
  },
  {
    alt: [
      [''],
      ['Siempre'],
      ['A menudo'],
      ['Algunas veces'],
      ['Rara vez'],
      ['Nunca']], prg: '¿Recibe retroalimentación oportuna sobre sus evaluaciones?'
  },
  {
    alt: [
      [''],
      ['Totalmente de acuerdo'],
      ['De acuerdo'],
      ['Neutral'],
      ['En desacuerdo'],
      ['Totalmente en desacuerdo']], prg: '¿Considera que las evaluaciones reflejan de manera justa la comprensión del contenido del curso?'
  },
  {
    alt: [
      [''],
      ['Muy accesible'],
      ['Accesible'],
      ['Regular'],
      ['Poco accesible'],
      ['Nada accesible']], prg: '¿Cuán accesible es la información sobre su desempeño académico (calificaciones, comentarios del docente, etc.) en la plataforma digital?'
  },
  {
    alt: [
      [''],
      ['Muy adecuados'],
      ['Adecuados'],
      ['Neutral'],
      ['Poco adecuados'],
      ['Nada adecuados']], prg: '¿Los recursos utilizados (libros, materiales digitales, etc.) son adecuados y útiles?'
  },
  {
    alt: [
      [''],
      ['Muy justos'],
      ['Justos'],
      ['Neutral'],
      ['Injustos'],
      ['Muy injustos']], prg: '¿Cómo calificaría los métodos de evaluación del docente (exámenes, trabajos, prácticas calificadas, producción artística etc.)?'
  },
  {
    alt: [
      [''],
      ['Muy clara'],
      ['Clara'],
      ['Regular'],
      ['Confusa'],
      ['Muy confusa']], prg: '¿Cómo calificaría la claridad de las instrucciones proporcionadas para el uso de herramientas digitales?'
  },
  {
    alt: [
      [''],
      ['Totalmente de acuerdo'],
      ['De acuerdo'],
      ['Neutral'],
      ['En desacuerdo'],
      ['Totalmente en desacuerdo']], prg: '¿El docente utiliza adecuadamente las herramientas digitales para mejorar el aprendizaje?'
  },
  {
    alt: [
      [''],
      ['Totalmente de acuerdo'],
      ['De acuerdo'],
      ['Neutral'],
      ['En desacuerdo'],
      ['Totalmente en desacuerdo']], prg: '¿El docente fomenta la participación activa de los estudiantes en las plataformas digitales?'
  },
  {
    alt: [
      [''],
      ['Muy adecuados'],
      ['Adecuados'],
      ['Neutral'],
      ['Poco adecuados'],
      ['Nada adecuados']], prg: '¿Los recursos digitales (videos, foros, materiales en línea) son adecuados y útiles para su aprendizaje?'
  },
  {
    alt: [
      [''],
      ['Excelente'],
      ['Buena'],
      ['Buena'],
      ['Mala'],
      ['Muy mala']], prg: '¿Cómo calificaría la calidad de las herramientas digitales utilizadas en la clase del docente a cargo (plataformas de aprendizaje, software, etc.)?'
  },
  { alt: ['www'], prg: '¿Qué aspectos considera que el docente debería mejorar en su enseñanza?' },
  { alt: ['www'], prg: '¿Hay alguna metodología actualizada que te gustaría que se incorporara en la enseñanza?' },
  { alt: ['www'], prg: '¿Qué aspectos considera que el docente debería mejorar?' },
  { alt: ['www'], prg: '¿Hay algo más que le gustaría comentar sobre su experiencia en esta clase?' }
]


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

const Blogs = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [curse, setCurso] = useState();
  const navigate = useNavigate()

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false)
  }

  const [selectedYear, setSelectedYear] = useState({ value: '2025', label: '2025' });
  const [selectedMencion, setSelectedMencion] = useState({ value: 'P', label: 'P' });
  const [selectedOption, setSelectedOption] = useState({ value: '3', label: '3' });
  // const [options, setOptions] = useState()
  const [www, setWww] = useState()
  const [calification, setCalification] = useState()
  const [Userstv, setUserstv] = useState()
  const [Curses, setCurses] = useState()
  const token = getCokie("token");
  useEffect(() => {

    if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).rol == '2') { get() }
    if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).rol == '3') { getstdcurses() }
    if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).rol == '3') { getstdcalifications() }
  }, []);

  const get = () => {
    fetch(`${process.env.REACT_APP_URL}/api/curses/cursosespecificos/${JSON.parse(localStorage.getItem("user"))._id}/true`)
      .then((response) => response.json())
      .then((www) => {
        console.log(www)
        if (!www.error) { setWww(www[0].curses) } else {
          signout()
          navigate('/contacto')
        }
      })
  }

  const getstdcurses = () => {
    fetch(`${process.env.REACT_APP_URL}/api/curses/stdcurses/${JSON.parse(localStorage.getItem("user"))._id}/E/1`)
      .then((response) => response.json())
      .then((www) => {
        if (!www.error) { setWww(www.length === 0 ? [] : www[0].curses) } else {
          signout()
          navigate('/contacto')
        }
      })
  }

  const getstdcalifications = async () => {
    fetch(`${process.env.REACT_APP_URL}/api/users/stdnotes/${JSON.parse(localStorage.getItem("user"))._id}`)
      .then((response) => response.json())
      .then((www) => {
        setCalification(www)
        var ciclos = []
        for (var i = 0; i < www.length; i++) {
          ciclos.push({ value: www[i]._id, label: www[i]._id })
        }
        // setOptions(ciclos)
        // console.log(www)
        // setSelectedOption({ value: www[www.length - 1]._id, label: www[www.length - 1]._id })
      });
  }


  const sendEncuesta = async (e) => {
    e.preventDefault()
    console.log("w1w")
    setIsOpen(false)
  }


  // const wwdelete = (item) => {
  //   return fetch(process.env.REACT_APP_URL + '/api/curses/' + item, {
  //     method: 'delete'
  //   })
  //     .then(response => response.json())
  //     .then(data => { toast.warning(data); getstdcurses() })
  // }

  const Sencitive = (item) => {
    console.log(item)
    if (item.length > 2) {
      fetch(process.env.REACT_APP_URL + '/api/users/Stv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          www: item
        })
      })
        .then(response => response.json())
        .then(data => { setUserstv(data); console.log(data) })
        .catch(error => console.error(error))
    }
  }

  const SencitiveCurses = (item) => {
    console.log(item)
    if (item.length > 2) {
      fetch(process.env.REACT_APP_URL + '/api/curses/cursossensitive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          www: item
        })
      })
        .then(response => response.json())
        .then(data => { setCurses(data); console.log(data) })
        .catch(error => console.error(error))
    }
  }


  const createCurse = (mencion, ciclo, codigo, title, credito, requisito) => {
    console.log(mencion, ciclo, codigo, title, credito, requisito)
    if (www.title !== title)
      // if (mencion === 'www') {
      fetch(process.env.REACT_APP_URL + '/api/curses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: 'String',
          img: 'String',
          especialidad: mencion,
          mencion: mencion,
          credito: credito,
          ciclo: ciclo,
          meet: 'String',
          show: 'true',
          codigo: codigo,
          requisito: requisito,
          year: new Date().getFullYear(),
          user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : '63ab4f45a06c6fe92e7a4209',
          userteacher: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : '63ab4f45a06c6fe92e7a4209',
        })
      })
        .then(response => response.json())
        .then(data => { toast.info(data); get() })
        .catch(error => console.error(error))
    // }
  }

  const deleteCurse = (item) => {
    const response = window.confirm('Deseas eliminar este archivo?');
    if (response) {
      return fetch(process.env.REACT_APP_URL + '/api/curses/' + item, {
        method: 'delete'
      })
        .then(response => response.json())
        .then(data => { toast.warning(data); get() })
    }
  }


  const [formData, setFormData] = useState({
    ciclo: "3",
    year: "2024",
    mencion: "E",
    w1: "",
    w2: "",
    w3: "",
    w4: "",
    w5: "",
    w6: "",
    w7: "",
    w8: "",
    w9: "",
    w10: "",
    w11: "",
    w12: "",
    w13: "",
    w14: "",
    w15: "",
    w16: "",
    w17: "",
    w18: "",
    w19: "",
    w20: "",
  })

  const handleChange = (text) => (e) => {
    // console.log(e.target.value, text);
    // setFormData({ ...formData, [text]: e.target.value });
  }

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '.02cm',
      // padding: '6px 5px',
      // border: '1px solid #21274F !important',
      border: '0 !important',
      // backgroundColor: 'tomato',
      color: 'white',
      boxShadow: 'none',
      '&:focus': {
        border: '0 !important',
      },
    }),
  }

  const listItems = www ? www.map((number) =>
    <div style={{ backgroundColor: 'white', padding: '.1cm', width: '9cm', color: 'black' }} key={number._id}>
      <div style={{ alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', display: 'flex' }}>
        <Link style={{ color: 'white', padding: '7px 16px', textAlign: 'center', width: '100%', background: 'slateblue', borderRadius: '.2cm' }} to={'/curso/' + number._id} onClick={() => localStorage.setItem('curse', number._id)} >
          {number.title} {number.mencion} {number.ciclo} {number.year} {number.codigo}
        </Link>
      </div>
      <button onClick={() => deleteCurse(number._id)}>errase</button>
    </div>
  ) : <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
  </header>


  const Calificacion = calification ? calification.map((number) =>
    <div style={{ backgroundColor: 'Linen', padding: '.1cm', margin: '.2cm', padding: '.1cm', width: '9cm', width: '9cm', color: 'black', borderRadius: '.1cm' }} key={number._id}>
      <div style={{ color: 'teal', width: "100%", textAlign: 'center' }}>CICLO {number._id}</div>
      {number.mencions.map((comenttas, k) =>
        <div key={k} >
          <div style={{ color: "black" }}>Año {comenttas._id}</div>
          <table>
            <thead>
              <tr>
                <th>Curso</th>
                {/* <th>Año</th> */}
                <th>Nota</th>
                <th>Crédito</th>
                <th>Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {comenttas.cycles.map((comenttas, j) =>
                <tr key={j}>
                  <td>{comenttas.title}</td>
                  {/* <td>{comenttas.year}</td> */}
                  <td>{comenttas.nota}</td>
                  <td>{comenttas.credito}</td>
                  <td>{comenttas.nota * comenttas.credito}</td>
                </tr>
              )}
              <tr>
                <th>Total</th>
                <th>{comenttas.sumacreditos == 0 ? '' : comenttas.sumacreditos}</th>
                <th>{comenttas.sumanotas == 0 ? '' : comenttas.sumanotas}</th>
                <th>{comenttas.total == 0 ? '' : comenttas.total}</th>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Promedio</th>
                {/* <th></th> */}
                <th></th>
                <th></th>
                <th>{comenttas.total / comenttas.sumacreditos == 0 ? '' : (comenttas.total / comenttas.sumacreditos).toFixed(2)}</th>
              </tr>
            </tfoot>
          </table>

          <div style={{ padding: '.8em', width: "100%", textAlign: 'center', boxSizing: 'border-box' }}>
            <ExportToPdf data={calification} cicle={number._id} yyear={k} />
          </div>

        </div>

      )}
    </div>
  ) : ''


  const listUser = Userstv ? Userstv.map((number) =>
    <div style={{ backgroundColor: 'wheat', padding: '.1cm', margin: '.2cm', padding: '.2cm', width: '9cm', width: '9cm', color: 'black', borderRadius: '.1cm' }} key={number._id}>
      <div style={{ alignItems: 'center', textAlign: 'center' }}>
        <div>
          {number.name}
        </div>
        <div>
          {number.email}
        </div>
        <div>
          {number.password}
        </div>
      </div>
    </div>
  ) : ''

  const listCurse = Curses ? Curses.map((number) =>
    <div style={{ backgroundColor: 'wheat', padding: '.1cm', margin: '.2cm', padding: '.2cm', width: '9cm', width: '9cm', color: 'black', borderRadius: '.1cm' }} key={number._id}>
      <div style={{ alignItems: 'center', textAlign: 'center' }}>
        <div>
          {number.title}
          {number._id}
        </div>
        <div>
          {number.codigo} - {number.mencion} - {number.ciclo}
        </div>
        <button onClick={() => createCurse(number.mencion, number.ciclo, number.codigo, number.title, number.credito, number.requisito)}>
          Generar Curso
        </button>
      </div>
    </div>
  ) : ''


  return (
    <div className="contenedor" >
      <ToastContainer
        position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false}
      />
      {/* <Link to="/www">Boleta de nota</Link> */}
      {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).rol == '2' ?
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>{www!=[]?listItems:""}</div>
          <input style={{ padding: '.6em', boxSizing: 'border-box', fontSize: 'inherit', width: '100%', marginBottom: '.5em' }} placeholder="Nombre o curso mínimo tres letras inciales" onChange={e => SencitiveCurses(e.target.value)} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>{listCurse}</div>

        </>
        : ''}

      {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).rol == '1' ?
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Select styles={selectStyles} value={selectedYear} onChange={setSelectedYear} options={yearsacta} />
            <Select styles={selectStyles} value={selectedOption} onChange={setSelectedOption} options={ciclosacta} />
            <Select styles={selectStyles} value={selectedMencion} onChange={setSelectedMencion} options={mencionesacta} />
            <ExportToExcel year={selectedYear.value} ciclo={selectedOption.value} mencion={selectedMencion.value} />
            <Www year={selectedYear.value} ciclo={selectedOption.value} mencion={selectedMencion.value} />
          </div>
          <hr></hr>
          <input style={{ padding: '.6em', boxSizing: 'border-box', fontSize: 'inherit', width: '100%', marginBottom: '.5em' }} placeholder="Nombre o apellido mínimo tres letras inciales" onChange={e => Sencitive(e.target.value)} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>{listUser}</div>



          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link style={{ color: 'black', border: 'none', padding: '8px 16px', textAlign: 'center', background: 'skyblue', borderRadius: '.02cm' }} to="/imgw">STD</Link>
            <Link style={{ color: 'black', border: 'none', padding: '8px 16px', textAlign: 'center', background: 'skyblue', borderRadius: '.02cm' }} to="/img">TEACHER</Link>
            <Link style={{ color: 'black', border: 'none', padding: '8px 16px', textAlign: 'center', background: 'skyblue', borderRadius: '.02cm' }} to="/img">REGISTER</Link>
          </div>

        </>
        :
        ''
      }

      {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).rol == '3' ?
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* <Select styles={selectStyles} value={selectedOption} onChange={setSelectedOption} options={options} /> */}
            {/* <ExportToPdf data={calification} cicle={selectedOption.value} /> */}
          </div>

          <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>{JSON.parse(localStorage.getItem("user")).name} {JSON.parse(localStorage.getItem("user")).mencion === "ED" ? "EDUCACIÓN ARTÍSTICA - ARTES PLÁSTICAS" : JSON.parse(localStorage.getItem("user")).mencion === "P" ? "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (PINTURA)" : JSON.parse(localStorage.getItem("user")).mencion === "E" ? "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (ESCULTURA)" : "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (GRABADO)"} CICLO {JSON.parse(localStorage.getItem("user")).ciclo}</div>

          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>{listItems}</div> */}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>{Calificacion}</div>

          {curse ?
            <div>
              <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 style={{ color: 'blue' }}>{curse.title} [{curse.mencion} {curse.ciclo}]</h2>
                <h5 style={{ color: 'blue' }}>{curse.userw[0].email}</h5>
                <form onSubmit={sendEncuesta} >
                  <ol>
                    {items.map((number, i) =>
                      <li key={number._id}>
                        {number.prg}
                        {number.alt.length > 1 ?
                          <div>
                            <select name="cars" id="cars" onChange={handleChange("w" + (i + 1))} required="required">
                              {number.alt.map((alternativa) =>
                                <option style={{ border: 'solid 1pt orange', padding: '.1cm', margin: '.2cm', width: '9cm', borderRadius: '.02cm' }} key={alternativa._id} value={alternativa}>
                                  {alternativa}
                                </option>
                              )}
                            </select>
                          </div> :
                          <textarea onChange={handleChange("w" + (i + 1))} required="required"></textarea>
                        }
                      </li>
                    )}
                  </ol>
                  <button type="submit" style={{ color: 'black', border: 'none', padding: '8px 16px', textAlign: 'center', background: 'orange', borderRadius: '.02cm' }}>
                    {"Enviar encuesta"}
                  </button>
                  <button onClick={closeModal} style={{ color: 'white', border: 'none', padding: '8px 16px', textAlign: 'center', background: 'brown', borderRadius: '.02cm' }}>close</button>
                </form>
              </Modal>
            </div > : ''
          }
        </>
        : null}

    </div>
  )
}

export default Blogs

