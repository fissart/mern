import { useEffect, useState } from 'react'
import React from 'react';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import { Link } from 'react-router-dom';

const Www = ({ year, ciclo, mencion }) => {

  const [www, setWww] = useState()
  const [title, setTitle] = useState()
  const [teachers, setTeachers] = useState()
  const [curses, setCurses] = useState()
  const [histograma, setHistograma] = useState()
  const [histogramareal, setHistogramareal] = useState()
  const [inttervalos, setInttervalos] = useState()
  // console.log(ciclo,mencion,year)

  const exportExcel = async () => {
    // console.log(data)
    fetch(process.env.REACT_APP_URL + '/api/users/' + ciclo + '/' + mencion + '/' + year)
      .then((response) => response.json())
      .then(async (www) => {

        console.log(www)
        setCurses(www.ordercurses)
        setTeachers(www.orderTEACHER)

        let user = www.order
        let teacher = www.orderTEACHER
        let cursses = www.ordercurses

        var cursess = [];
        var codigo = []
        var creditos = [];
        var creditosuma = 0

        for (var w1w = 0; w1w < cursses.length; w1w++) {
          codigo.push(cursses[w1w].codigo)
          cursess.push(cursses[w1w].title);
          creditos.push(cursses[w1w].credito);
          creditosuma += + cursses[w1w].credito
        }


        var amautas = [];
        var dnis = [];

        for (var w2w = 0; w2w < teacher.length; w2w++) {
          if (teacher[w2w].uSSer.length >= 1 && teacher[w2w].uSSer[0].rol === '2') {
            amautas.push(teacher[w2w].uSSer[0].name.toUpperCase())
            dnis.push(teacher[w2w].uSSer[0].dni)
          }
        }

        const menccion = mencion === "ED" ? "Educación Artística - Artes Plásticas" : mencion === "P" ? "Artista Profesional - Artes Plásticas y Visuales (Pintura)" : mencion === "E" ? "Artista Profesional - Artes Plásticas y Visuales (Escultura)" : "Artista Profesional - Artes Plásticas y Visuales (Grabado)"
        setTitle(menccion)


        var intervalos = [-0.1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.1]
        var intervalosnew = []
        var histogramaw = []
        var histogramawreal = []
        // var notas = []
        var nottas = []
        var codigos = []
        const curses = www.ordercurses

        for (var k = 0; k < curses.length; k++) {//4
          codigos.push(curses[k].codigo)
        }

        var notttas = []


        for (var k = 0; k < www.order.length; k++) {//4
          /////////////////////////////////////////////////////////////////////////////////////////
          var calftns = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
          var tipo = ['**[L]**', '**[I]**', '**[C]**', '**[E]**', '**[N]**', '**[C]**', '**[I]**', '**[A]**', '', '', '', '']
          var tipowww = ['**[R]**', '**[E]**', '**[T]**', '**[I]**', '**[R]**', '**[A]**', '**[D]**', '**[O]**', '', '', '', '']
          /////////////////////////////////////////////////////////////////////////////////////////


          const avggs = www.order[k].records
          // console.log(avggs)
          var notas = []
          var indices = []
          // var nativonotas = []

          for (var j = 0; j < avggs.length; j++) {
            indices.push(codigos.indexOf(avggs[j].codigo))
            // nativonotas.push(codigos.indexOf(avggs[j].codigo))
          }
          console.log(indices)

          for (var i = 0; i < curses.length; i++) {
            if (indices.includes(i)) {
              for (var j = 0; j < avggs.length; j++) {
                if (codigos.indexOf(avggs[j].codigo) == i) {
                  notas.push(avggs[j].nota)
                  /////////////////////////////////////////////////////////////////////////////////////////
                  calftns.splice(2 * codigo.indexOf(avggs[j].codigo), 1, avggs[j].nota === '-0' ? tipo[codigo.indexOf(avggs[j].codigo)] : avggs[j].nota === '0' ? tipowww[codigo.indexOf(avggs[j].codigo)] : Number(avggs[j].nota))

                  calftns.splice(2 * codigo.indexOf(avggs[j].codigo) + 1, 1, avggs[j].nota === '-0' ? '' : avggs[j].nota === '0' ? '' : Number(avggs[j].nota * avggs[j].credito))
                  /////////////////////////////////////////////////////////////////////////////////////////
                } else {
                }
              }
              /////////////////////////////////////////////////////////////////////////////////////////
              calftns.splice(26, 1, user[k].records[0].nota === '-0' ? 'L' : user[k].total === 0 ? 'R' : (user[k].total / creditosuma) > 0 && (user[k].total / creditosuma) <= 5 ? 'RP' : user[k].total)
              calftns.splice(27, 1, creditosuma)

              calftns.splice(28, 1, user[k].records[0].nota === '-0' ? 'L' : user[k].total === 0 ? 'R' : (user[k].total / creditosuma) > 0 && (user[k].total / creditosuma) <= 5 ? 'RP' : Number((user[k].total / creditosuma).toFixed(2)))
              // var newwww_w = [k + 1, user[k].usser.length > 0 ? user[k].usser[0].dni : "", user[k].usser.length > 0 ? user[k].usser[0].name : ""].concat(calftns)
              // notas.push(newwww_w)

              /////////////////////////////////////////////////////////////////////////////////////////
            } else {
              notas.push('0')
              /////////////////////////////////////////////////////////////////////////////////////////
              calftns.splice(2 * i, 1, tipowww[i])
              /////////////////////////////////////////////////////////////////////////////////////////
            }
          }
          var newwww_w = [k + 1, www.order[k].usser.length > 0 ? www.order[k].usser[0].dni : "", www.order[k].usser.length > 0 ? www.order[k].usser[0].name : ""].concat(calftns)
          nottas.push(notas)
          notttas.push(newwww_w)
          console.log(calftns)
        }

        console.log(notttas)
        setWww(notttas)

        var notttas = nottas.reduce((prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])), [])
        // console.log(notttas)

        for (var j = 0; j < notttas.length; j++) {
          var intervalosw = []
          for (var k = 0; k < intervalos.length - 1; k++) {
            intervalosw.push(notttas[j].filter(function (x) { return intervalos[k] < Number(x) && Number(x) <= intervalos[k + 1] }).length)
          }
          histogramawreal.push(intervalosw)
        }

        for (var k = 0; k < intervalos.length - 1; k++) {
          if (k == 0) { intervalosnew.push('R') }
          else {
            intervalosnew.push((intervalos[k] == -0.1 ? 0 : intervalos[k]) + '-' + (intervalos[k + 1] == 20.1 ? 20 : intervalos[k + 1]))
          }
        }


        for (var i = 0; i < notttas.length; i++) {
          var wwwww = []
          wwwww.push(notttas[i].filter(function (x) { return x == '-0' }).length,
            notttas[i].filter(function (x) { return x == '0' }).length,
            notttas[i].filter(function (x) { return Number(x) <= 10 && Number(x) > 0 }).length,
            notttas[i].filter(function (x) { return Number(x) > 10 && Number(x) <= 20 }).length)
          histogramaw.push(wwwww)
        }

        setHistograma(histogramaw)
        setInttervalos(intervalosnew)
        setHistogramareal(histogramawreal)
        console.log(histograma)

      });

  };

  var bg = ['orange', 'gray', 'skyblue', 'blue', 'cyan', 'pink', 'yellow', 'teal', 'brown', 'red', 'white', 'orange']

  const listUser = www ? www.map((number) =>
    <tr key={number._id}>
      {number.map((numberr, k) =>
        <td key={k} style={{ textAlign: 'center', color: (isNaN(numberr) || numberr < 11) && k > 2 ? 'brown' : 'black' }}>
          {numberr}
        </td>)}
    </tr >
  ) : ''

  const histoGrama = histograma ? histograma.map((number) =>
    <th colspan="2" key={number._id} style={{ textAlign: 'center', background: 'white' }}>
      <tr>
        {number.map((numberr, k) =>
          <td key={k} style={{ background: 'white' }} className="nborder">
            <div style={{ marginBottom: '3px', fontSize: '11px' }} className="vertical">{numberr / www.length * 100 === 0 ? '-' : (numberr / www.length * 100).toFixed(2) + '%'}</div>
            <div style={{ fontSize: '11px', height: (numberr / www.length) * 9 + 'em', background: bg[k] }}>
            </div>
          </td>)}
      </tr>
      <tr>
        {number.map((numberr, k) =>
          <td key={k} style={{ fontSize: '9px', background: 'white' }} className="vertical nborder">
            {numberr}
          </td>)}
      </tr>
      <tr >
        <td style={{ fontSize: '9px', background: 'white' }} className="vertical nborder">Retirados</td>
        <td style={{ fontSize: '9px', background: 'white' }} className="vertical nborder">Licencicas</td>
        <td style={{ fontSize: '9px', background: 'white' }} className="vertical nborder">Desaprobados</td>
        <td style={{ fontSize: '9px', background: 'white' }} className="vertical nborder">Aprobados</td>
      </tr>
    </th >
  ) : ''

  const histoGramareal = histogramareal ? histogramareal.map((number) =>
    <td colspan="2" key={number._id} style={{ padding: '0%', textAlign: 'center', width: '100%', background: 'white' }}>
      {number.map((numberr, k) =>
        <td key={k} style={{ padding: '0%', textAlign: 'right', background: 'white' }} className="nborder">
          <div style={{ marginBottom: '3px', padding: '0%', fontSize: '7px' }} className="vertical">{numberr / www.length * 100 === 0 ? '-' : (numberr / www.length * 100).toFixed(2) + '%'}</div>
          <div style={{ height: (numberr / www.length) * 9 + 'em', width: '100%', background: bg[k] }}>
          </div>
        </td>)}
      <tr valign='bottom'>
        {inttervalos.map((numberr, g) =>
          <td key={g} style={{ fontSize: '7px', padding: '0%', textAlign: 'right', background: 'white' }} className="vertical nborder">
            {numberr}
          </td>)}
      </tr>
    </td >
  ) : ''

  const listCurses = curses ? curses.map((number) =>
    <td colspan="2" key={number._id} className="vertical" style={{ background: 'orange' }}>
      <div style={{ textAlign: 'center' }}>{number.title} [{number.credito}]</div>
    </td >
  ) : ''

  const listCurseswww = curses ? curses.map((number) =>
    <>
      <td key={number._id} className="vertical">
        <div style={{ textAlign: 'center' }}>Nota</div>
      </td >
      <td key={number._id} className="vertical">
        <div style={{ textAlign: 'center' }}>Puntaje</div>
      </td >
    </>
  ) : ''

  const listTeachers = teachers ? teachers.map((number) =>
    <tr key={number._id}>
      {number}
    </tr >
  ) : ''



  return (
    <>
      <div className='text-warning text-center w-100 ffont h1'>
        {title !== '' ? title : ''}
      </div>
      <button onClick={exportExcel} className="btn btn-warning mr-1">ACTA en HTML {year} {ciclo} {mencion}</button>
      {www ?
        <div className='w-100' style={{ maxWidth: '100%' }}>
          <table>
            <tr valign='center'>
              <td></td>
              <td></td>
              <td></td>
              {listCurses}
            </tr>
            <tr valign='center'>
              <td></td>
              <td></td>
              <td></td>
              {listCurseswww}
            </tr>

            {listUser}

            <tr valign='bottom'>
              <td></td>
              <td></td>
              <td></td>
              {histoGrama}
            </tr>

            <tr valign='bottom'>
              <td></td>
              <td></td>
              <td></td>
              {histoGramareal}
            </tr>
            {/* <tr valign='bottom'>
              <td></td>
              <td></td>
              <td></td>
              {listTeachers}
            </tr> */}
          </table>

        </div> : ''}

    </>
  );
};

export default Www  