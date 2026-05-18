//https://stackoverflow.com/questions/71086276/typeerror-u-readfile-is-not-a-function-in-angular
import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// import { Link } from 'react-router-dom';

const ExportToExcel = ({ year, ciclo, mencion }) => {

  // console.log(ciclo,mencion,year)

  const exportExcel = async () => {
    // console.log(data)
    fetch(process.env.REACT_APP_URL + '/api/users/' + ciclo + '/' + mencion + '/' + year)
      .then((response) => response.json())
      .then(async (www) => {

        console.log(www)

        let user = www.order
        let teacher = www.orderTEACHER
        let cursses = www.ordercurses

        var curses = [];
        var codigo = []
        var creditos = [];
        var creditosuma = 0

        for (var w1w = 0; w1w < cursses.length; w1w++) {
          codigo.push(cursses[w1w].codigo)
          curses.push(cursses[w1w].title);
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

        var codigos = []
        // const curses = www.ordercurses

        for (var k = 0; k < cursses.length; k++) {//4
          codigos.push(cursses[k].codigo)
        }
        // console.log(codigos)

        var notas = []

        for (var k = 0; k < www.order.length; k++) {//4
          /////////////////////////////////////////////////////////////////////////////////////////
          var calftns = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
          var tipo = ['[L]', '[I]', '[C]', '[E]', '[N]', '[C]', '[I]', '[A]', '', '', '', '']
          var tipowww = ['[R]', '[E]', '[T]', '[I]', '[R]', '[A]', '[D]', '[O]', '', '', '', '']

          const avggs = www.order[k].records
          var indices = []

          for (var j = 0; j < avggs.length; j++) {
            indices.push(codigos.indexOf(avggs[j].codigo))
          }

          for (var i = 0; i < cursses.length; i++) {
            if (indices.includes(i)) {
              for (var j = 0; j < avggs.length; j++) {
                if (codigos.indexOf(avggs[j].codigo) == i) {
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
            } else {
              // notas.push('0')
              calftns.splice(2 * i, 1, tipowww[i])
            }
          }
          var newwww_w = [k + 1, www.order[k].usser.length > 0 ? www.order[k].usser[0].dni : "", www.order[k].usser.length > 0 ? www.order[k].usser[0].name : ""].concat(calftns)
          // console.log(newwww_w)
          notas.push(newwww_w)
        }

        console.log(notas)

        const menccion = mencion === "ED" ? "EDUCACIÓN ARTÍSTICA - ARTES PLÁSTICAS" : mencion === "P" ? "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (PINTURA)" : mencion === "E" ? "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (ESCULTURA)" : "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (GRABADO)"

        var amautas1 = amautas.slice(0, 6);
        var amautas2 = amautas.slice(6, amautas.length);
        var dnis1 = dnis.slice(0, 6);
        var dnis2 = dnis.slice(6, dnis.length);


        var notas1 = notas.slice(0, 32);
        var notas2 = notas.slice(32, user.length);

        const workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet('1', {
          pageSetup: { paperSize: 8, orientation: 'landscape' },
          properties: { showGridLines: false }
        });//pagina 
        //let worksheet = workbook.addWorksheet('2', {pageSetup:{paperSize: 9, orientation:'landscape'}});//pagina2
        worksheet.pageSetup.margins = {
          left: 0.8, right: 0.35,
          top: 0.35, bottom: 0.35,
          header: 0.0, footer: 0.0
        };
        // Set Print Area for a sheet 
        worksheet.pageSetup.printArea = 'A1:AJ110';

        const imageSrc2 = './esfap.jpg';
        const response2 = await fetch(imageSrc2);
        const bufferwww2 = await response2.arrayBuffer();
        let logo2 = workbook.addImage({
          buffer: bufferwww2,
          extension: 'png',
        });
        worksheet.addImage(logo2, {
          tl: { col: 1, row: 0 },
          ext: { width: 198, height: 185 },
        });

        const imageSrc = './logo.svg';
        const response = await fetch(imageSrc);
        const bufferwww = await response.arrayBuffer();
        let logo = workbook.addImage({
          buffer: bufferwww,
          extension: 'svg',
        });
        worksheet.addImage(logo, {
          tl: { col: 32.999, row: 0 },
          ext: { width: 185, height: 185 },
          editAs: 'absolute'
        });
        // worksheet.addImage(logo, 'AH1:AI9');


        [
          'C4',
          'C6',
        ].forEach((key, index) => {
          worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' }
          worksheet.getCell(key).font = { bold: true }
        });

        worksheet.mergeCells('C4:AG4');
        worksheet.mergeCells('C6:AG6');
        worksheet.getCell('C4').value = 'ESCUELA SUPERIOR DE FORMACIÓN ARTÍSTICA PÚBLICA "FELIPE GUAMÁN POMA DE AYALA" DE AYACUCHO';
        worksheet.getCell('C6').value = 'ACTA CONSOLIDADA DE EVALUACIÓN DEL RENDIMIENTO ACADÉMICO'
        worksheet.getCell('C4').font = { name: 'arial', family: 4, size: 19, bold: true }
        worksheet.getCell('C6').font = { name: 'arial', family: 4, size: 19, bold: true }

        worksheet.mergeCells('AE11:AJ11');
        worksheet.getCell('AE11').value = 'LEYENDA'

        worksheet.mergeCells('AE12:AF12');
        worksheet.getCell('AF12').value = 'CLTF '
        worksheet.mergeCells('AG12:AJ12');
        worksheet.getCell('AG12').value = 'CALIFICACIÓN'

        worksheet.mergeCells('AE13:AF13');
        worksheet.getCell('AE13').value = 'PTJ '
        worksheet.mergeCells('AG13:AJ13');
        worksheet.getCell('AG13').value = 'PUNTAJE'

        worksheet.mergeCells('AE14:AF14');
        worksheet.getCell('AE14').value = 'L '
        worksheet.mergeCells('AG14:AJ14');
        worksheet.getCell('AG14').value = 'LICENCIA'

        worksheet.mergeCells('AE15:AF15');
        worksheet.getCell('AE15').value = 'R '
        worksheet.mergeCells('AG15:AJ15');
        worksheet.getCell('AG15').value = 'RETIRADO'

        worksheet.mergeCells('AE16:AF16');
        worksheet.getCell('AE16').value = 'RP '
        worksheet.mergeCells('AG16:AJ16');
        worksheet.getCell('AG16').value = 'RETIRADO PARCIAL'

        worksheet.mergeCells('AE17:AF17');
        worksheet.getCell('AE17').value = 'CT '
        worksheet.mergeCells('AG17:AJ17');
        worksheet.getCell('AG17').value = 'CANTIDAD'


        worksheet.mergeCells('A11:B11');
        worksheet.mergeCells('A12:B12');
        worksheet.getCell('A11').value = 'Código Modular'
        worksheet.getCell('A12').value = '0419978'

        worksheet.getCell('C11').value = 'D.S./R.D de Creación y R.D. de Revalidación'
        worksheet.getCell('C12').value = 'RESOLUCIÓN Nº 0266-2012-ANR-13-03-2012'

        worksheet.mergeCells('D11:G11');
        worksheet.mergeCells('D12:G12');
        worksheet.getCell('D11').value = 'Denominación'
        worksheet.getCell('D12').value = 'ESFA Púb'

        worksheet.mergeCells('H11:K11');
        worksheet.mergeCells('H12:K12');
        worksheet.getCell('H11').value = 'Gestión'
        worksheet.getCell('H12').value = 'Público'


        worksheet.mergeCells('L11:O11');
        worksheet.mergeCells('L12:O12');
        worksheet.getCell('L11').value = 'Dirección'
        worksheet.getCell('L12').value = 'Provincia'

        worksheet.mergeCells('P11:AC11');
        worksheet.getCell('P11').value = 'Jr. Mariano Melgar Nº 398'
        worksheet.mergeCells('P12:S12');
        worksheet.getCell('P12').value = 'HUAMANGA'

        worksheet.mergeCells('T12:X12');
        worksheet.getCell('T12').value = 'Distrito'
        worksheet.mergeCells('Y12:AC12');
        worksheet.getCell('Y12').value = 'JESÚS NAZARENO'

        ////////////////////////////

        worksheet.mergeCells('A14:B14');
        worksheet.mergeCells('A15:B15');
        worksheet.getCell('A14').value = 'Carrera - Especialidad'
        worksheet.getCell('A15').value = 'Autorización'

        worksheet.mergeCells('C14:G14');
        worksheet.mergeCells('C15:G15');
        worksheet.getCell('C14').value = menccion;
        worksheet.getCell('C15').value = 'R. Nº 0266-2012 - ANR - 13-03-2012';

        worksheet.mergeCells('H14:L14');
        worksheet.mergeCells('H15:L15');
        worksheet.getCell('H14').value = 'Periodo Académico';
        worksheet.getCell('H15').value = 'Ciclo Académico';

        worksheet.mergeCells('M14:O14');
        worksheet.mergeCells('M15:O15');
        worksheet.getCell('M14').value = year;
        worksheet.getCell('M15').value = ciclo;

        //////////////////////////////////

        worksheet.mergeCells('A17:B17');
        worksheet.getCell('A17').value = 'Director(a) General'
        worksheet.getCell('C17').value = 'TAIPE CARBAJAL, MARCELINO EFRAIN'

        worksheet.mergeCells('D17:N17');
        worksheet.mergeCells('O17:AC17');
        worksheet.getCell('D17').value = 'R.D. de Nombramiento o Encargatura'
        worksheet.getCell('O17').value = 'R.D.R.S. N° 00165-202-GRA/GOB-GG-GRDS-DREA-DR';

        worksheet.getCell('A24').font = { name: 'arial', family: 4, size: 11, bold: true }

        worksheet.addRows(notas1);
        //worksheet.addRow({id: 1, name: 'John Doe', age: 35}).addPageBreak()

        worksheet.mergeCells('D19:AC19');
        worksheet.getCell('D19').value = 'ASIGNAGTURAS/ÁREAS';

        worksheet.mergeCells('A19:A24');
        worksheet.getCell('A19').value = 'NÚMERO DE ORDEN';
        worksheet.mergeCells('B19:B24');
        worksheet.getCell('B19').value = 'DNI';
        worksheet.mergeCells('C19:C24');
        worksheet.getCell('C19').value = 'APELLIDOS Y NOMBRES (Por orden alfabético)';

        worksheet.mergeCells('AD19:AD24');
        worksheet.getCell('AD19').value = 'Puntaje del semestre académico';
        worksheet.mergeCells('AE19:AE24');
        worksheet.getCell('AE19').value = 'Crédito del semestre académico';
        worksheet.mergeCells('AF19:AF24');
        worksheet.getCell('AF19').value = 'Promedio ponderado del semestre académico';
        worksheet.mergeCells('AG19:AJ24');
        worksheet.getCell('AG19').value = 'OBSERVACIONES';

        worksheet.mergeCells('D21:E21');
        worksheet.getCell('D21').value = curses[0];
        worksheet.mergeCells('F21:G21');
        worksheet.getCell('F21').value = curses[1];
        worksheet.mergeCells('H21:I21');
        worksheet.getCell('H21').value = curses[2];
        worksheet.mergeCells('J21:K21');
        worksheet.getCell('J21').value = curses[3];
        worksheet.mergeCells('L21:M21');
        worksheet.getCell('L21').value = curses[4];
        worksheet.mergeCells('N21:O21');
        worksheet.getCell('N21').value = curses[5];
        worksheet.mergeCells('P21:Q21');
        worksheet.getCell('P21').value = curses[6];
        worksheet.mergeCells('R21:S21');
        worksheet.getCell('R21').value = curses[7];
        worksheet.mergeCells('T21:U21');
        worksheet.getCell('T21').value = curses[8];
        worksheet.mergeCells('V21:W21');
        worksheet.getCell('V21').value = curses[9];
        worksheet.mergeCells('X21:Y21');
        worksheet.getCell('X21').value = curses[10];
        worksheet.mergeCells('Z21:AA21');
        worksheet.getCell('Z21').value = curses[11];
        worksheet.mergeCells('AB21:AC21');
        worksheet.getCell('AB21').value = curses[12];

        worksheet.mergeCells('D20:E20');
        worksheet.getCell('D20').value = '1';
        worksheet.mergeCells('F20:G20');
        worksheet.getCell('F20').value = '2';
        worksheet.mergeCells('H20:I20');
        worksheet.getCell('H20').value = '3';
        worksheet.mergeCells('J20:K20');
        worksheet.getCell('J20').value = '4';
        worksheet.mergeCells('L20:M20');
        worksheet.getCell('L20').value = '5';
        worksheet.mergeCells('N20:O20');
        worksheet.getCell('N20').value = '6';
        worksheet.mergeCells('P20:Q20');
        worksheet.getCell('P20').value = '7';
        worksheet.mergeCells('R20:S20');
        worksheet.getCell('R20').value = '8';
        worksheet.mergeCells('T20:U20');
        worksheet.getCell('T20').value = '9';
        worksheet.mergeCells('V20:W20');
        worksheet.getCell('V20').value = '10';
        worksheet.mergeCells('X20:Y20');
        worksheet.getCell('X20').value = '11';
        worksheet.mergeCells('Z20:AA20');
        worksheet.getCell('Z20').value = '12';
        worksheet.mergeCells('AB20:AC20');
        worksheet.getCell('AB20').value = '13';

        worksheet.mergeCells('D22:E22');
        worksheet.getCell('D22').value = 'Créditos';
        worksheet.mergeCells('F22:G22');
        worksheet.getCell('F22').value = 'Créditos';
        worksheet.mergeCells('H22:I22');
        worksheet.getCell('H22').value = 'Créditos';
        worksheet.mergeCells('J22:K22');
        worksheet.getCell('J22').value = 'Créditos';
        worksheet.mergeCells('L22:M22');
        worksheet.getCell('L22').value = 'Créditos';
        worksheet.mergeCells('N22:O22');
        worksheet.getCell('N22').value = 'Créditos';
        worksheet.mergeCells('P22:Q22');
        worksheet.getCell('P22').value = 'Créditos';
        worksheet.mergeCells('R22:S22');
        worksheet.getCell('R22').value = 'Créditos';
        worksheet.mergeCells('T22:U22');
        worksheet.getCell('T22').value = 'Créditos';
        worksheet.mergeCells('V22:W22');
        worksheet.getCell('V22').value = 'Créditos';
        worksheet.mergeCells('X22:Y22');
        worksheet.getCell('X22').value = 'Créditos';
        worksheet.mergeCells('Z22:AA22');
        worksheet.getCell('Z22').value = 'Créditos';
        worksheet.mergeCells('AB22:AC22');
        worksheet.getCell('AB22').value = 'Créditos';

        worksheet.getCell('D24').value = 'CLF';
        worksheet.getCell('E24').value = 'PTJ';
        worksheet.getCell('F24').value = 'CLF';
        worksheet.getCell('G24').value = 'PTJ';
        worksheet.getCell('H24').value = 'CLF';
        worksheet.getCell('I24').value = 'PTJ';
        worksheet.getCell('J24').value = 'CLF';
        worksheet.getCell('K24').value = 'PTJ';
        worksheet.getCell('L24').value = 'CLF';
        worksheet.getCell('M24').value = 'PTJ';
        worksheet.getCell('N24').value = 'CLF';
        worksheet.getCell('O24').value = 'PTJ';
        worksheet.getCell('P24').value = 'CLF';
        worksheet.getCell('Q24').value = 'PTJ';
        worksheet.getCell('R24').value = 'CLF';
        worksheet.getCell('S24').value = 'PTJ';
        worksheet.getCell('T24').value = 'CLF';
        worksheet.getCell('U24').value = 'PTJ';
        worksheet.getCell('V24').value = 'CLF';
        worksheet.getCell('W24').value = 'PTJ';
        worksheet.getCell('X24').value = 'CLF';
        worksheet.getCell('Y24').value = 'PTJ';
        worksheet.getCell('Z24').value = 'CLF';
        worksheet.getCell('AA24').value = 'PTJ';
        worksheet.getCell('AB24').value = 'CLF';
        worksheet.getCell('AC24').value = 'PTJ';

        worksheet.mergeCells('D23:E23');
        worksheet.getCell('D23').value = creditos[0];
        worksheet.mergeCells('F23:G23');
        worksheet.getCell('F23').value = creditos[1];
        worksheet.mergeCells('H23:I23');
        worksheet.getCell('H23').value = creditos[2];
        worksheet.mergeCells('J23:K23');
        worksheet.getCell('J23').value = creditos[3];
        worksheet.mergeCells('L23:M23');
        worksheet.getCell('L23').value = creditos[4];
        worksheet.mergeCells('N23:O23');
        worksheet.getCell('N23').value = creditos[5];
        worksheet.mergeCells('P23:Q23');
        worksheet.getCell('P23').value = creditos[6];
        worksheet.mergeCells('R23:S23');
        worksheet.getCell('R23').value = creditos[7];
        worksheet.mergeCells('T23:U23');
        worksheet.getCell('T23').value = creditos[8];
        worksheet.mergeCells('V23:W23');
        worksheet.getCell('V23').value = creditos[9];
        worksheet.mergeCells('X23:Y23');
        worksheet.getCell('X23').value = creditos[10];
        worksheet.mergeCells('Z23:AA23');
        worksheet.getCell('Z23').value = creditos[11];
        worksheet.mergeCells('AB23:AC23');
        worksheet.getCell('AB23').value = creditos[12];


        worksheet.getCell('A62').font = { name: 'arial', family: 4, size: 11, bold: true }
        if (user.length > 32) {
          worksheet.addRows(notas2);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////


        worksheet.mergeCells('D57:AC57');
        worksheet.getCell('D57').value = 'ASIGNAGTURAS/ÁREAS';

        worksheet.mergeCells('A57:A62');
        worksheet.getCell('A57').value = 'NÚMERO DE ORDEN';
        worksheet.mergeCells('B57:B62');
        worksheet.getCell('B57').value = 'DNI';
        worksheet.mergeCells('C57:C62');
        worksheet.getCell('C57').value = 'APELLIDOS Y NOMBRES (Por orden alfabético)';

        worksheet.mergeCells('AD57:AD62');
        worksheet.getCell('AD57').value = 'Puntaje del semestre académico';
        worksheet.mergeCells('AE57:AE62');
        worksheet.getCell('AE57').value = 'Crédito del semestre académico';
        worksheet.mergeCells('AF57:AF62');
        worksheet.getCell('AF57').value = 'Promedio ponderado del semestre académico';
        worksheet.mergeCells('AG57:AJ62');
        worksheet.getCell('AG57').value = 'OBSERVACIONES';

        worksheet.mergeCells('D59:E59');
        worksheet.getCell('D59').value = curses[0];
        worksheet.mergeCells('F59:G59');
        worksheet.getCell('F59').value = curses[1];
        worksheet.mergeCells('H59:I59');
        worksheet.getCell('H59').value = curses[2];
        worksheet.mergeCells('J59:K59');
        worksheet.getCell('J59').value = curses[3];
        worksheet.mergeCells('L59:M59');
        worksheet.getCell('L59').value = curses[4];
        worksheet.mergeCells('N59:O59');
        worksheet.getCell('N59').value = curses[5];
        worksheet.mergeCells('P59:Q59');
        worksheet.getCell('P59').value = curses[6];
        worksheet.mergeCells('R59:S59');
        worksheet.getCell('R59').value = curses[7];
        worksheet.mergeCells('T59:U59');
        worksheet.getCell('T59').value = curses[8];
        worksheet.mergeCells('V59:W59');
        worksheet.getCell('V59').value = curses[9];
        worksheet.mergeCells('X59:Y59');
        worksheet.getCell('X59').value = curses[10];
        worksheet.mergeCells('Z59:AA59');
        worksheet.getCell('Z59').value = curses[11];
        worksheet.mergeCells('AB59:AC59');
        worksheet.getCell('AB59').value = curses[12];

        worksheet.mergeCells('D58:E58');
        worksheet.getCell('D58').value = '1';
        worksheet.mergeCells('F58:G58');
        worksheet.getCell('F58').value = '2';
        worksheet.mergeCells('H58:I58');
        worksheet.getCell('H58').value = '3';
        worksheet.mergeCells('J58:K58');
        worksheet.getCell('J58').value = '4';
        worksheet.mergeCells('L58:M58');
        worksheet.getCell('L58').value = '5';
        worksheet.mergeCells('N58:O58');
        worksheet.getCell('N58').value = '6';
        worksheet.mergeCells('P58:Q58');
        worksheet.getCell('P58').value = '7';
        worksheet.mergeCells('R58:S58');
        worksheet.getCell('R58').value = '8';
        worksheet.mergeCells('T58:U58');
        worksheet.getCell('T58').value = '9';
        worksheet.mergeCells('V58:W58');
        worksheet.getCell('V58').value = '10';
        worksheet.mergeCells('X58:Y58');
        worksheet.getCell('X58').value = '11';
        worksheet.mergeCells('Z58:AA58');
        worksheet.getCell('Z58').value = '12';
        worksheet.mergeCells('AB58:AC58');
        worksheet.getCell('AB58').value = '13';

        worksheet.mergeCells('D60:E60');
        worksheet.getCell('D60').value = 'Créditos';
        worksheet.mergeCells('F60:G60');
        worksheet.getCell('F60').value = 'Créditos';
        worksheet.mergeCells('H60:I60');
        worksheet.getCell('H60').value = 'Créditos';
        worksheet.mergeCells('J60:K60');
        worksheet.getCell('J60').value = 'Créditos';
        worksheet.mergeCells('L60:M60');
        worksheet.getCell('L60').value = 'Créditos';
        worksheet.mergeCells('N60:O60');
        worksheet.getCell('N60').value = 'Créditos';
        worksheet.mergeCells('P60:Q60');
        worksheet.getCell('P60').value = 'Créditos';
        worksheet.mergeCells('R60:S60');
        worksheet.getCell('R60').value = 'Créditos';
        worksheet.mergeCells('T60:U60');
        worksheet.getCell('T60').value = 'Créditos';
        worksheet.mergeCells('V60:W60');
        worksheet.getCell('V60').value = 'Créditos';
        worksheet.mergeCells('X60:Y60');
        worksheet.getCell('X60').value = 'Créditos';
        worksheet.mergeCells('Z60:AA60');
        worksheet.getCell('Z60').value = 'Créditos';
        worksheet.mergeCells('AB60:AC60');
        worksheet.getCell('AB60').value = 'Créditos';

        worksheet.getCell('D62').value = 'CLF';
        worksheet.getCell('E62').value = 'PTJ';
        worksheet.getCell('F62').value = 'CLF';
        worksheet.getCell('G62').value = 'PTJ';
        worksheet.getCell('H62').value = 'CLF';
        worksheet.getCell('I62').value = 'PTJ';
        worksheet.getCell('J62').value = 'CLF';
        worksheet.getCell('K62').value = 'PTJ';
        worksheet.getCell('L62').value = 'CLF';
        worksheet.getCell('M62').value = 'PTJ';
        worksheet.getCell('N62').value = 'CLF';
        worksheet.getCell('O62').value = 'PTJ';
        worksheet.getCell('P62').value = 'CLF';
        worksheet.getCell('Q62').value = 'PTJ';
        worksheet.getCell('R62').value = 'CLF';
        worksheet.getCell('S62').value = 'PTJ';
        worksheet.getCell('T62').value = 'CLF';
        worksheet.getCell('U62').value = 'PTJ';
        worksheet.getCell('V62').value = 'CLF';
        worksheet.getCell('W62').value = 'PTJ';
        worksheet.getCell('X62').value = 'CLF';
        worksheet.getCell('Y62').value = 'PTJ';
        worksheet.getCell('Z62').value = 'CLF';
        worksheet.getCell('AA62').value = 'PTJ';
        worksheet.getCell('AB62').value = 'CLF';
        worksheet.getCell('AC62').value = 'PTJ';

        worksheet.mergeCells('D61:E61');
        worksheet.getCell('D61').value = creditos[0];
        worksheet.mergeCells('F61:G61');
        worksheet.getCell('F61').value = creditos[1];
        worksheet.mergeCells('H61:I61');
        worksheet.getCell('H61').value = creditos[2];
        worksheet.mergeCells('J61:K61');
        worksheet.getCell('J61').value = creditos[3];
        worksheet.mergeCells('L61:M61');
        worksheet.getCell('L61').value = creditos[4];
        worksheet.mergeCells('N61:O61');
        worksheet.getCell('N61').value = creditos[5];
        worksheet.mergeCells('P61:Q61');
        worksheet.getCell('P61').value = creditos[6];
        worksheet.mergeCells('R61:S61');
        worksheet.getCell('R61').value = creditos[7];
        worksheet.mergeCells('T61:U61');
        worksheet.getCell('T61').value = creditos[8];
        worksheet.mergeCells('V61:W61');
        worksheet.getCell('V61').value = creditos[9];
        worksheet.mergeCells('X61:Y61');
        worksheet.getCell('X61').value = creditos[10];
        worksheet.mergeCells('Z61:AA61');
        worksheet.getCell('Z61').value = creditos[11];
        worksheet.mergeCells('AB61:AC61');
        worksheet.getCell('AB61').value = creditos[12];


        for (let x = 63; x <= 65 + 27; x++) {
          worksheet.mergeCells('AG' + x + ':AJ' + x);
        }


        [
          'A11',
          'C11',
          'D11',
          'H11',
          'L11',
          'L12',
          'T12',
          'A14',
          'A15',
          'H14',
          'H15',
          'A17',
          'D17',
          'AE11',
          'AE12',
          'B12',
          'C12',
          'D12',
          'H12',
          'P12',
          'P11',
          'Y12',
          'AE13',
          'AE14',
          'C14',
          'M14',
          'C15',
          'M15',
          'AE15',
          'AE16',
          'AE17',
          'C17',
          'O17',
          'C95',
          'AB95',
          'B95',
          'I95',
          'D95',
          'M95',
          'W95',
          'AC95',
        ].forEach(key => {
          worksheet.getCell(key).font = { name: 'arial', family: 4, size: 11, bold: true }
          worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
          worksheet.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D3D3D3' },
            bgColor: { argb: 'D3D3D3' }
          };
          worksheet.getCell(key).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
        });


        [
          'A12',
          'C12',
          'D12',
          'H12',
          'P12',
          'P11',
          'Y12',
          'C14',
          'C15',
          'M14',
          'M15',
          'O17',
          'C17',
          'AG12',
          'AG13',
          'AG14',
          'AG15',
          'AG16',
          'AG17',
        ].forEach((key, index) => {
          // worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
          worksheet.getCell(key).font = { name: 'arial', family: 4, size: 11, bold: true }
          worksheet.getCell(key).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
        });

        for (let x = 95; x <= 95 + 6; x++) {
          worksheet.mergeCells('D' + x + ':G' + x);
          worksheet.mergeCells('I' + x + ':L' + x);
          worksheet.mergeCells('M' + x + ':V' + x);
          worksheet.mergeCells('W' + x + ':Z' + x);
          worksheet.mergeCells('AC' + x + ':AI' + x);
          worksheet.getCell('B' + x).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
          worksheet.getCell('C' + x).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
          worksheet.getCell('D' + x).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
          worksheet.getCell('I' + x).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
          worksheet.getCell('M' + x).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
          worksheet.getCell('W' + x).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
          worksheet.getCell('AB' + x).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
          worksheet.getCell('AC' + x).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
          };
          worksheet.getRow(x).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

        }
        worksheet.getCell('B95').value = 'DNI';
        worksheet.getCell('C95').value = 'APELLIDOS Y NOMBRES DEL DOCENTE';
        worksheet.getCell('D95').value = 'FIRMA';

        worksheet.getCell('I95').value = 'DNI';
        worksheet.getCell('M95').value = 'APELLIDOS Y NOMBRES DEL DOCENTE';
        worksheet.getCell('W95').value = 'FIRMA';

        worksheet.getCell('AB95').value = 'CT';
        worksheet.getCell('AC95').value = 'RESUMEN';
        //worksheet.getCell('AB94').value = this.year;
        //worksheet.getCell('AB96').value = this.year;
        //worksheet.getCell('AB95').value = this.year;

        worksheet.getCell('AC96').value = 'APROBADOS';
        if (notas.length <= 32) {
          worksheet.getCell('AB96').value = { formula: '=countif(AF25:AF56,">=10.5")', date1904: true };
        } else {
          worksheet.getCell('AB96').value = { formula: '=countif(AF25:AF56,">=10.5")+countif(AF63:AF' + (62 + (notas.length - 32)) + ', ">=10.5")', date1904: true };
        }

        //worksheet.getCell('AC95').value = ' APROBADOS PARCIALES';
        //worksheet.getCell('AB95').value = { formula: '=countif(AF25:AF56,">10")+countif(AF63:AF' + (62 + (notas.length - 32)) + ', ">10")', date1904: true };

        worksheet.getCell('AC97').value = 'DESAPROBADOS';
        if (notas.length <= 32) {
          worksheet.getCell('AB97').value = { formula: '=countifs(AF25:AF56, "<=10.5", AF25: AF56,">0")', date1904: true };
        } else {
          worksheet.getCell('AB97').value = { formula: '=countifs(AF25:AF56, "<=10.5", AF25: AF56,">0")+countifs(AF63: AF' + (62 + notas.length - 32) + ', "<=10.5", AF63: AF' + (62 + notas.length - 32) + ', ">0")', date1904: true };
        }
        //worksheet.getCell('AC97').value = ' DESAPROBADOS PARCIALES';
        //worksheet.getCell('AB97').value = { formula: '=countifs(AF25:AF56, "<11", AF25: AF56,">0")+countifs(AF25: AF' + (25 + notas.length) + ', "<11", AF25: AF' + (25 + notas.length) + ', ">0")', date1904: true };

        worksheet.getCell('AC98').value = 'RETIRADOS';
        if (notas.length <= 32) {
          worksheet.getCell('AB98').value = { formula: '=countif(AF25: AF56, "R")', date1904: true };
        } else {
          worksheet.getCell('AB98').value = { formula: '=countif(AF25: AF56, "R")+countif(AF63:AF' + (62 + notas.length - 32) + ', "R")', date1904: true };
        }
        worksheet.getCell('AC99').value = 'RETIRADOS PARCIALES';
        if (notas.length <= 32) {
          worksheet.getCell('AB99').value = { formula: '=countif(AF25: AF56, "RP")', date1904: true };
        } else {
          worksheet.getCell('AB99').value = { formula: '=countif(AF25: AF56, "RP")+countif(AF63:AF' + (62 + notas.length - 32) + ', "RP")', date1904: true };
        }
        worksheet.getCell('AC100').value = 'LICENCIA';
        if (notas.length <= 32) {
          worksheet.getCell('AB100').value = { formula: '=countif(AF25: AF56, "L")', date1904: true };
        } else {
          worksheet.getCell('AB100').value = { formula: '=countif(AF25: AF56, "L")+countif(AF63:AF' + (62 + notas.length - 32) + ', "L")', date1904: true };
        }
        worksheet.getCell('AC101').value = 'TOTAL';
        worksheet.getCell('AB101').value = user.length;

        //worksheet.getCell('AB97').value = this.year;


        for (let x = 96; x <= 101; x++) {
          worksheet.getCell('B' + x).value = dnis1[x - 96];
          worksheet.getCell('C' + x).value = amautas1[x - 96];
        }

        for (let x = 96; x <= 101; x++) {
          worksheet.getCell('I' + x).value = dnis2[x - 96];
          worksheet.getCell('M' + x).value = amautas2[x - 96];
        }
        var meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SETIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']

        worksheet.mergeCells('D92:AF92');
        worksheet.getCell('AD92').value = 'AYACUCHO, ' + new Date().getDate() + ' DE ' + meses[new Date().getMonth()] + ' DEL ' + new Date().getFullYear();
        worksheet.getCell('D92').alignment = { vertical: 'middle', horizontal: 'center' };

        // worksheet.getCell('D92').value = 'Ayacucho, 9797';
        worksheet.getCell('D92').font = { name: 'arial', family: 4, size: 11, bold: true }
        // worksheet.getCell('D92').alignment = { vertical: 'middle', horizontal: 'center', textRotation: 90, wrapText: true };


        for (let x = 57; x <= 62; x++) {
          ['A' + x, 'B' + x, 'D' + x, 'C' + x, 'E' + x, 'F' + x, 'G' + x, 'H' + x, 'I' + x, 'J' + x, 'K' + x, 'L' + x, 'M' + x, 'N' + x, 'O' + x, 'P' + x, 'P' + x, 'Q' + x, 'R' + x, 'S' + x, 'T' + x, 'U' + x, 'V' + x, 'W' + x, 'X' + x, 'Y' + x, 'Z' + x, 'AA' + x, 'AB' + x,
          'AC' + x, 'AD' + x, 'AE' + x, 'AF' + x, 'AG' + x, 'AH' + x, 'AI' + x, 'AJ' + x].forEach((key, index) => {
            if (x === 59) { } else {
              worksheet.getCell(key).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D3D3D3' },
                bgColor: { argb: 'D3D3D3' }
              };
            }
          })
        }


        for (let x = 19; x <= 19 + 70; x++) {
          ['A' + x, 'B' + x, 'D' + x, 'C' + x, 'E' + x, 'F' + x, 'G' + x, 'H' + x, 'I' + x, 'J' + x, 'K' + x, 'L' + x, 'M' + x, 'N' + x, 'O' + x, 'P' + x, 'P' + x, 'Q' + x, 'R' + x, 'S' + x, 'T' + x, 'U' + x, 'V' + x, 'W' + x, 'X' + x, 'Y' + x, 'Z' + x, 'AA' + x, 'AB' + x,
          'AC' + x, 'AD' + x, 'AE' + x, 'AF' + x, 'AG' + x, 'AH' + x, 'AI' + x, 'AJ' + x].forEach((key, index) => {
            worksheet.getCell(key).border = {
              top: { style: 'medium' },
              left: { style: 'medium' },
              bottom: { style: 'medium' },
              right: { style: 'medium' }
            };

            if (key !== 'C' + x) {
              worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
            }
            if (key === 'C19' || key === 'C57') {
              worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
            }
          })
        }

        for (let x = 25; x <= 56; x++) {
          worksheet.getCell('C' + x).alignment = { vertical: 'middle', horizontal: 'left' };
        }
        for (let x = 63; x <= 89; x++) {
          worksheet.getCell('C' + x).alignment = { vertical: 'middle', horizontal: 'left' };
        }


        for (let x = 12; x <= 18; x++) {
          worksheet.getCell('AE' + x).alignment = { vertical: 'middle', horizontal: 'right' };
          // worksheet.getCell('AG' + x).alignment = { vertical: 'middle', horizontal: 'left' };
        }

        for (let x = 12; x <= 18; x++) {
          worksheet.getCell('AG' + x).alignment = { vertical: 'middle', horizontal: 'left' };
          // worksheet.getCell('AG' + x).alignment = { vertical: 'middle', horizontal: 'left' };
        }

        for (let x = 96; x <= 101; x++) {
          worksheet.getCell('C' + x).alignment = { vertical: 'middle', horizontal: 'left' };
          worksheet.getCell('M' + x).alignment = { vertical: 'middle', horizontal: 'left' };
          worksheet.getCell('AB' + x).alignment = { vertical: 'middle', horizontal: 'right' };
          worksheet.getCell('AC' + x).alignment = { vertical: 'middle', horizontal: 'left' };
        }



        for (let x = 25; x <= 25 + 31; x++) {
          worksheet.mergeCells('AG' + x + ':AJ' + x);
        }

        for (let x = 25; x <= 25 + 32; x++) {
          // worksheet.getCell('C' + x).alignment = { vertical: 'middle', horizontal: 'left' };
        }
        for (let x = 63; x <= 89; x++) {
          // worksheet.getCell('C' + x).alignment = { vertical: 'middle', horizontal: 'left' };
        }

        worksheet.getColumn(1).width = 7;
        worksheet.getColumn(36).width = 7;
        worksheet.getColumn(35).width = 2.5;
        worksheet.getColumn(33).width = 22.5;
        worksheet.getColumn(2).width = 19;
        worksheet.getColumn(3).width = 57;
        worksheet.getRow(4).height = 25;
        worksheet.getRow(6).height = 25;
        for (let x = 4; x <= 32; x++) {
          worksheet.getColumn(x).width = 6;
        }


        ['B19', 'C19'].forEach(key => {
          worksheet.getCell(key).font = { color: { argb: '3a80d5' }, name: 'arial', family: 4, size: 6, bold: false }
          // worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });

        ['A19', 'D21', 'F21', 'H21', 'J21', 'L21', 'N21', 'P21', 'R21', 'T21', 'AD19', 'AE19', 'AF19'].forEach(key => {
          worksheet.getCell(key).font = { color: { argb: '3a80d5' }, name: 'arial', family: 4, size: 6, bold: false }
          worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center', textRotation: 90, wrapText: true };
        });

        ['B57', 'C57'].forEach(key => {
          //worksheet.getCell(key).font = { color: { argb: '3a80d5' }, name: 'arial', family: 4, size: 6, bold: false }
          // worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });
        ['A57', 'D59', 'G59', 'H59', 'J59', 'L59', 'N59', 'P59', 'R59', 'T59', 'AD57', 'AE57', 'AF57'].forEach(key => {
          worksheet.getCell(key).font = { color: { argb: '3a80d5' }, name: 'arial', family: 4, size: 6, bold: true }
          worksheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center', textRotation: 90, wrapText: true };
        });

        worksheet.addConditionalFormatting({
          ref: 'D25:AF56',
          rules: [
            {
              priority: 1,
              type: 'expression',
              formulae: ['D25<11'],
              style: {
                font: { color: { argb: 'FF0000' } },
                //fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'blue'}}
              },
            }
          ]
        })
        if (notas.length > 32) {
          worksheet.addConditionalFormatting({
            ref: 'D63:AF' + (63 + (notas.length - 32)),
            rules: [
              {
                priority: 1,
                type: 'expression',
                formulae: ['D63<11'],
                style: {
                  font: { color: { argb: 'FF0000' } },
                  //fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'blue'}}
                },
              }
            ]
          })
        }

        worksheet.mergeCells('B106:L109');
        worksheet.getCell('B106').value = 'DIRECTOR(A) GENERAL';
        worksheet.getCell('B106').alignment = { vertical: 'bottom', horizontal: 'center' };

        worksheet.mergeCells('B110:L110');
        worksheet.getCell('B110').value = 'Firma, Post Firma y Sello';
        worksheet.getCell('B110').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('P106:AI109');
        worksheet.getCell('P106').value = 'SECRETARÍA ACADÉMICA';
        worksheet.getCell('P106').alignment = { vertical: 'bottom', horizontal: 'center' };

        worksheet.mergeCells('P110:AI110');
        worksheet.getCell('P110').value = 'Firma, Post Firma y Sello';
        worksheet.getCell('P110').alignment = { vertical: 'middle', horizontal: 'center' };


        for (let x = 11; x <= 11 + 99; x++) {
          const number = [95, 96, 97, 98, 99, 100, 101]
          if (number.includes(x)) {
            worksheet.getRow(x).height = 21.5;
          } else {
            worksheet.getRow(x).height = 21.5;
          }
          worksheet.getRow(21).height = 110;
          worksheet.getRow(59).height = 110;

          worksheet.getRow(x).font = { name: 'arial', family: 4, size: 11 }
          // worksheet.getRow(x).alignment = { vertical: 'middle', horizontal: 'center' };
        }


        for (let x = 19; x <= 24; x++) {
          ['A' + x, 'B' + x, 'D' + x, 'C' + x, 'E' + x, 'F' + x, 'G' + x, 'H' + x, 'I' + x, 'J' + x, 'K' + x, 'L' + x, 'M' + x, 'N' + x, 'O' + x, 'P' + x, 'P' + x, 'Q' + x, 'R' + x, 'S' + x, 'T' + x, 'U' + x, 'V' + x, 'W' + x, 'X' + x, 'Y' + x, 'Z' + x, 'AA' + x, 'AB' + x,
          'AC' + x, 'AD' + x, 'AE' + x, 'AF' + x, 'AG' + x, 'AH' + x, 'AI' + x, 'AJ' + x].forEach((key, index) => {
            if (x === 21) { } else {
              worksheet.getCell(key).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D3D3D3' },
                bgColor: { argb: 'D3D3D3' }
              };
            }
          })
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${menccion} CICLO ${ciclo} AÑO ${year}.xlsx`);
      });

  };

  return (
    <>
      <button onClick={exportExcel} className="btn btn-primary">ACTA en EXCEL {mencion} {ciclo} {year}</button>
    </>
  );
};

export default ExportToExcel