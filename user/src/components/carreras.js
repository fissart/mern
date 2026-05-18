import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState, useCallback } from 'react';
// import logo from '../logo.svg';
import Modal from 'react-modal'
import { Controls, MiniMap, Background, ReactFlow } from '@xyflow/react'
import React, { Suspense } from "react";
// import Model from './ww2 copy'
// const Model = React.lazy(() => import("../componentes/ww2 copy.js"));

function isSmallScreen() {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
}

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.8)",
    overflowY: "scroll"
  },
  content: {
    background: 'white',
    borderRadius: "3px !important",
    top: '50%',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: "none",
    padding: '.9em',
    height: 'auto',
    maxHeight: '72%',
    width: isSmallScreen() ? '92vw' : '75vw'
  }
};


function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    // clean()
    setIsOpen(false)
  }
  const [modalIsOpen1, setIsOpen1] = React.useState(false)
  function openModal1() {
    setIsOpen1(true)
  }
  function closeModal1() {
    // clean()
    setIsOpen1(false)
  }

  const [www, setWww] = useState()
  const [id, setId] = useState()
  const [edit, setEdit] = useState()
  const [title, setTitle] = useState()
  // setFormData({ ...formData, rol:"3", name:"www", email:"www", foto:"www", password:"www" })
  useEffect(() => {
    get()
  }, []);


  const get = async () => {
    await fetch(process.env.REACT_APP_URL + "/api/curses/mesh")
      .then((response) => response.json())
      .then((www) => {
        setWww(www)
        console.log(www)
      })
      // .then(data => { toast.warning(data); get() })
      .catch(error => console.error(error))
  }


  const update = () => {
    fetch(process.env.REACT_APP_URL + "/api/links/" + id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        detail: edit,
        name: title,
      })
    })
      .then(response => response.json())
      .then(data => { toast.info(data); get() })
      .catch(error => console.error(error));

  }

  const wwwww = () => {
    fetch(process.env.REACT_APP_URL + "/api/curses/mesh", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: {
          "nodes": [ { "id": "1", "data": { "label": "Lenguaje" }, "type": "input", "sourcePosition": "right", "targetPosition": "left", "position": { "x": 0, "y": -210 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "2", "data": { "label": "Matemática" }, "type": "input", "sourcePosition": "right", "targetPosition": "left", "position": { "x": 0, "y": -90 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "3", "data": { "label": "Sistemas de representación" }, "type": "input", "sourcePosition": "right", "targetPosition": "left", "position": { "x": 0, "y": 65 }, "measured": { "width": 150, "height": 56 }, "selected": false, "dragging": false }, { "id": "4", "data": { "label": "Metodologia" }, "type": "input", "sourcePosition": "right", "targetPosition": "left", "position": { "x": 0, "y": 255 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "5", "data": { "label": "Ingles I" }, "type": "input", "sourcePosition": "right", "targetPosition": "left", "position": { "x": 0, "y": 205 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "7", "data": { "label": "Teoria del diseño" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 195, "y": 105 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "" } }, { "id": "8", "data": { "label": "Arte prehistórico" }, "type": "input", "sourcePosition": "right", "targetPosition": "left", "position": { "x": 195, "y": 155 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "skyblue" } }, { "id": "9", "data": { "label": "Ingles II" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 195, "y": 205 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "10", "data": { "label": "?" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 195, "y": 255 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "11", "data": { "label": "Estadística descriptiva" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 375, "y": -90 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "12", "data": { "label": "Semiótica" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 375, "y": 100 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "13", "data": { "label": "Sicopatología" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 375, "y": 200 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "" } }, { "id": "14", "data": { "label": "Arte antiguo" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 375, "y": 155 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "skyblue" } }, { "id": "15", "data": { "label": "Escultura I" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 375, "y": 50 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "orange" } }, { "id": "16", "data": { "label": "Estadistica inferencial" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 585, "y": -340 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "17", "data": { "label": "Biomecanica" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 290, "y": -525 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "18", "data": { "label": "Modelado digital 3D I" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 575, "y": -45 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "moccasin" } }, { "id": "19", "data": { "label": "Arte medieval" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 570, "y": 155 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "skyblue" } }, { "id": "20", "data": { "label": "Escultura II" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 575, "y": 50 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "orange" } }, { "id": "21", "data": { "label": "Lógica" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 750, "y": -50 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "22", "data": { "label": "Ontología" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 750, "y": -5 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "23", "data": { "label": "Modelado digital 3D II" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 750, "y": -110 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "moccasin" } }, { "id": "24", "data": { "label": "Arte moderno" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 750, "y": 155 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "skyblue" } }, { "id": "25", "data": { "label": "Escultura III" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 750, "y": 50 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "orange" } }, { "id": "26", "data": { "label": "Epistemología" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 950, "y": -5 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "27", "data": { "label": "Etetica" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 950, "y": -85 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "28", "data": { "label": "Modelado escaneo e impresion 3D" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 670, "y": -230 }, "measured": { "width": 150, "height": 56 }, "selected": true, "dragging": false, "style": { "backgroundColor": "yellow" } }, { "id": "30", "data": { "label": "Escultura IV" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 950, "y": 50 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "orange" } }, { "id": "31", "data": { "label": "Metafisica" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1155, "y": -5 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "32", "data": { "label": "Deontología" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1500, "y": -350 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "" } }, { "id": "33", "data": { "label": "Animaciones y render 3D" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1155, "y": -160 }, "measured": { "width": 150, "height": 56 }, "selected": false, "dragging": false, "style": { "backgroundColor": "moccasin" } }, { "id": "34", "data": { "label": "Arte cotemporaneo" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 950, "y": 155 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "skyblue" } }, { "id": "35", "data": { "label": "Escultura V" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 960, "y": -350 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "orange" } }, { "id": "36", "data": { "label": "Realidad aumentada" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1360, "y": -170 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "moccasin" } }, { "id": "37", "data": { "label": "Restauración" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1355, "y": 230 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "" } }, { "id": "38", "data": { "label": "Videojuegos 3D" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1360, "y": -120 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "moccasin" } }, { "id": "39", "data": { "label": "Sociologia" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1355, "y": 170 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "" } }, { "id": "40", "data": { "label": "Escultura VI" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1355, "y": 50 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "orange" } }, { "id": "41", "data": { "label": "Economia" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1545, "y": 110 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "42", "data": { "label": "Practicas preprofesionales I" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1545, "y": 215 }, "measured": { "width": 150, "height": 56 }, "selected": false, "dragging": false }, { "id": "43", "data": { "label": "Gestion empresarial" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1545, "y": 170 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "44", "data": { "label": "Tesis I" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1545, "y": -195 }, "measured": { "width": 150, "height": 39 } }, { "id": "45", "data": { "label": "Escultura VII" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1235, "y": -340 }, "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "orange" } }, { "id": "46", "data": { "label": "Practicas preprofesionales II" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1755, "y": 215 }, "type": "output", "measured": { "width": 150, "height": 56 }, "selected": false, "dragging": false, "style": { "backgroundColor": "" } }, { "id": "47", "data": { "label": "?" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1755, "y": 55 }, "type": "output", "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false }, { "id": "48", "data": { "label": "Proyectos artísticos culturales" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1755, "y": 140 }, "type": "output", "measured": { "width": 150, "height": 56 }, "selected": false, "dragging": false }, { "id": "49", "data": { "label": "Tesis II" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1755, "y": -195 }, "type": "output", "measured": { "width": 150, "height": 39 } }, { "id": "50", "data": { "label": "Software 3D" }, "sourcePosition": "right", "targetPosition": "left", "position": { "x": 1755, "y": -50 }, "type": "output", "measured": { "width": 150, "height": 39 }, "dragging": false, "selected": false, "style": { "backgroundColor": "orange" } }, { "id": "randomnode_1755441372527", "data": { "label": "Arte peruano" }, "position": { "x": 1155, "y": 155 }, "sourcePosition": "right", "targetPosition": "left", "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "skyblue" } }, { "id": "randomnode_1755443045461", "data": { "label": "Cálculo" }, "position": { "x": 200, "y": -140 }, "sourcePosition": "right", "targetPosition": "left", "measured": { "width": 150, "height": 39 }, "selected": false, "dragging": false, "style": { "backgroundColor": "" } } ], "edges": [ { "id": "e1-3wwwww2w", "source": "5", "target": "8" }, { "id": "e1-4wwwww2w", "source": "5", "target": "9", "style": { "strokeWidth": 2, "stroke": "skyblue" }, "type": "smoothstep" }, { "id": "e1-3wwwwww2w", "source": "4", "target": "8" }, { "source": "12", "target": "19", "id": "xy-edge__12-19", "selected": false, "type": "bezier", "style": { "strokeWidth": "1", "stroke": "black" } }, { "source": "12", "target": "20", "id": "xy-edge__12-20" }, { "source": "11", "target": "16", "id": "xy-edge__11-16", "type": "smoothstep" }, { "source": "21", "target": "26", "id": "xy-edge__21-26" }, { "source": "21", "target": "27", "id": "xy-edge__21-27" }, { "source": "26", "target": "31", "id": "xy-edge__26-31" }, { "source": "16", "target": "44", "id": "xy-edge__16-44" }, { "source": "23", "target": "28", "id": "xy-edge__23-28", "selected": false, "type": "bezier", "style": { "strokeWidth": 2, "stroke": "skyblue" } }, { "source": "18", "target": "23", "id": "xy-edge__18-23" }, { "source": "17", "target": "23", "id": "xy-edge__17-23" }, { "source": "19", "target": "24", "id": "xy-edge__19-24" }, { "source": "33", "target": "38", "id": "xy-edge__33-38", "selected": false, "style": { "stroke": "magenta" } }, { "source": "28", "target": "33", "id": "xy-edge__28-33", "selected": false, "type": "bezier", "style": { "stroke": "blue" } }, { "source": "33", "target": "36", "id": "xy-edge__33-36", "selected": false, "style": { "strokeWidth": 2, "stroke": "skyblue" }, "type": "smoothstep" }, { "source": "42", "target": "46", "id": "xy-edge__42-46" }, { "source": "43", "target": "48", "id": "xy-edge__43-48", "selected": false, "type": "smoothstep", "style": { "strokeWidth": 2, "stroke": "skyblue" } }, { "source": "37", "target": "42", "id": "xy-edge__37-42", "selected": false, "style": { "strokeWidth": 2, "stroke": "skyblue" }, "type": "smoothstep" }, { "source": "39", "target": "43", "id": "xy-edge__39-43" }, { "source": "20", "target": "25", "id": "xy-edge__20-25", "selected": false, "style": { "strokeWidth": "3", "stroke": "orange" } }, { "source": "15", "target": "20", "id": "xy-edge__15-20", "type": "bezier", "selected": false, "style": { "strokeWidth": "3", "stroke": "orange" } }, { "source": "30", "target": "35", "id": "xy-edge__30-35", "selected": false, "style": { "strokeWidth": "3", "stroke": "orange" } }, { "source": "35", "target": "40", "id": "xy-edge__35-40", "selected": false, "style": { "stroke": "blue" }, "type": "bezier" }, { "source": "40", "target": "45", "id": "xy-edge__40-45" }, { "source": "45", "target": "50", "id": "xy-edge__45-50", "type": "bezier", "style": { "stroke": "wheat", "strokeWidth": "3" } }, { "source": "21", "target": "50", "id": "xy-edge__21-50", "type": "smoothstep", "style": { "strokeWidth": 2, "stroke": "orange" } }, { "source": "31", "target": "40", "id": "xy-edge__31-40", "selected": false, "type": "bezier", "style": { "strokeWidth": 2, "stroke": "orange" } }, { "source": "3", "target": "15", "id": "xy-edge__3-15", "type": "smoothstep", "style": { "stroke": "black" }, "selected": false }, { "source": "14", "target": "19", "id": "xy-edge__14-19" }, { "source": "8", "target": "14", "id": "xy-edge__8-14", "style": { "strokeWidth": 2, "stroke": "skyblue" }, "type": "bezier", "selected": false }, { "source": "44", "target": "49", "id": "xy-edge__44-49" }, { "source": "36", "target": "50", "id": "xy-edge__36-50" }, { "source": "11", "target": "18", "id": "xy-edge__11-18", "selected": false, "style": { "stroke": "orange", "strokeWidth": "2" }, "type": "smoothstep" }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "24", "target": "34", "id": "xy-edge__24-34" }, { "type": "bezier", "style": { "stroke": "magenta", "strokeWidth": 2 }, "source": "7", "target": "15", "id": "xy-edge__7-15", "selected": false }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "2", "target": "15", "id": "xy-edge__2-15", "selected": false }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "34", "target": "randomnode_1755441372527", "id": "xy-edge__34-randomnode_1755441372527" }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "2", "target": "11", "id": "xy-edge__2-11" }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "25", "target": "30", "id": "xy-edge__25-30" }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "22", "target": "26", "id": "xy-edge__22-26" }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "randomnode_1755443045461", "target": "11", "id": "xy-edge__randomnode_1755443045461-11" }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "41", "target": "48", "id": "xy-edge__41-48" }, { "type": "bezier", "style": { "stroke": "skyblue", "strokeWidth": 2 }, "source": "randomnode_1755441372527", "target": "40", "id": "xy-edge__randomnode_1755441372527-40" } ], "viewport": { "x": 206.75, "y": 217.75, "zoom": 0.5 }
        },
        codigo: "title",
      })
    })
      .then(response => response.json())
      .then(data => { toast.info(data); get() })
      .catch(error => console.error(error));

  }

  // const onNodeClick = (event, node) => {
  //   // openModal1()
  //   setTitle(node.data.label)
  //   console.log('Clicked Node ID:', event);
  //   console.log('Clicked Node ID:', node.id);
  // }
  const handleNodeClick = (nodeId, customParam) => {
    toast(`Node ${nodeId} clicked! Custom parameter: ${customParam}`);
    // Perform actions based on the clicked node and custom parameter
  }

  const deleteCurse = (item) => {
    const response = window.confirm('Deseas eliminar este archivo?');
    if (response) {
      return fetch(process.env.REACT_APP_URL + '/api/curses/mesh/' + item, {
        method: 'delete'
      })
        .then(response => response.json())
        .then(data => { toast.warning(data); get() })
    }
  }

  const listItems = www ?
    www.map((number, index) =>
      <div key={number._id} style={{ width: '100%', height: '100vh', marginTop: '5em', backgroundColor: 'white' }}>
        {/* <div key={number._id} style={{ marginBottom: '.5em', padding: '.5em', border: '1px solid rgba(255, 155, 155, .7)' }}> */}
        <h3>{number.mencion}
        <Link to={`/new/${number._id}`}> Ir al mesh </Link>
        </h3>
        {/* <ReactFlow */}
          {/* // nodes={number.items[0].nodes}
          // edges={number.items[0].edges}
          // fitView
          // attributionPosition="top-right"
          // onNodeClick={(event, node) => handleNodeClick(node.id, number._id)}
                // onNodeClick={onNodeClick} */}
        {/* > */}
          {/* <Controls /> */}
          {/* <MiniMap /> */}
          {/* <Background color="#fff" gap={16} /> */}
        {/* </ReactFlow> */}
        {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).rol == '1' ?
          <>
          <button className="btn" onClick={() => { setId(number._id); setEdit(number.description); setTitle(number.title); openModal1() }}>Editar</button>
          <button className="btn" onClick={() => { deleteCurse(number._id) }}>Errase</button>
          </>
          :
          null}
        {/* </div> */}
      </div>
    )
    :
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </header>


  return (
    <>
      <div className="contenedor">

        {/* <Suspense fallback={<div>Loading...</div>}>
          <Model />
        </Suspense> */}



        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <h1>{title}</h1>
        </Modal>

        <Modal
          isOpen={modalIsOpen1}
          onRequestClose={closeModal1}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <h3>{title}</h3>
          <input style={{ padding: '.6em', boxSizing: 'border-box', fontSize: 'inherit', width: '100%', marginBottom: '.5em' }} placeHolder="Título" onChange={e => setTitle(e.target.value)} value={title} required />
          <div style={{ width: '100%', height: '60vh', backgroundColor: 'white' }}>
            www
          </div>

          <button onClick={() => { update() }}>Actualizar</button>
        </Modal>

        <div style={{ margin: 'auto', display: 'block', textAlign: 'right' }}>
          {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).rol == '1' ? <button onClick={() => wwwww()}>Crear</button> : <></>}
        </div>

        <div>{listItems}</div>

        <ToastContainer
          position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false}
        />
      </div>
    </>
  )
}

export default App