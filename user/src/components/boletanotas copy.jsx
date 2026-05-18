import React, { useEffect, useState } from 'react'
import jsPDF from "jspdf"
// import autoTable from 'jspdf-autotable'
// import { Link } from 'react-router-dom';
// import './Lucida Calligra Regular-normal';
// import { fontneww } from './ghotico';
// import { fontww } from './Zapfino Extra LT Ligatures-normal';
// import { font } from "./Lucida Calligra Regular-normal";
import { wfont } from './Sketch Gothic School-normal';
import { fonnt } from './HEIDH___-normal';
import { fontzap } from './Zapfino-new';
import { fontt } from "./Zapfino-normal";
import { subdir, wwwdir, logo, logowww } from "./logo";
import QRCode from 'qrcode';
import axios from "axios";
import { parseISO, format } from "date-fns";
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { isAuth } from '../helpers/auth';
registerLocale('es', es);

const ExportToPdf = ({ datacurse, user, nota }) => {

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    ip: [],
    textChange: "Iniciar sesión",
  });

  const { email, password1, ip } = formData;

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "wwwwwwww")
        setFormData({ ...formData, ip: data });
      })
      .catch((err) => console.error("Error fetching IP location:", err))

  }, []);

  const wwwww =
  {
    "title": datacurse.title,
    "institute": process.env.REACT_APP_institute,
    "faculty": process.env.REACT_APP_page,
    "scola": process.env.REACT_APP_institute,
    "user": isAuth()._id,
    "username": isAuth().name,
    "code": datacurse._id,
    "dateb": datacurse.updatedAt,
    "datee": datacurse.updatedAt,
    "description": '',
    "nota": nota,
    "ip": ip,
    "units": datacurse.units,
    "Módulos": nota,
    "Número": "",
    "QR": `${process.env.REACT_APP_API_URL}/diploma/${user._id}/${datacurse._id}`,
    "type": "DIPLOMADO",
    "signature1": "Sophia, Charles Harper",
    "signature2": "George, Asher Edward",
    "signature3": "Noah, James Esdras",
  }


  const sendTest = async (w, ww) => {
    console.log(wwwww)
    await axios.post(`${process.env.REACT_APP_API_URL}/tasks/test/diploma`, wwwww)
      .then((www) => {
        // toast.success(www.data)
        // getTask()
      }).catch((error) => { console.log("ERROR", error.response) })
  }


  const [qrBase64, setQrBase64] = useState('');
  const [today, setToday] = useState(new Date());

  QRCode.toDataURL(`${process.env.REACT_APP_API_URL}/diploma/${user._id}/${datacurse._id}`, {
    errorCorrectionLevel: 'H', // Can be 'L', 'M', 'Q', 'H' or 'low', 'medium', 'quartile', 'high'
    margin: 2,
    color: {
      dark: '#ffffffff',
      light: '#0d2539ff'
    }
  })
    .then(url => {
      setQrBase64(url);
    })
    .catch(err => {
      console.error(err);
    });

  const onchange = async () => {

    // console.log("62cf8d3194bde2c00225a36f", datacurse.units)

    var neww = []
    for (var i = 0; i < datacurse.units.length; i++) {
      neww.push([{ content: `${datacurse.units[i].title.toUpperCase()} ${format(parseISO(datacurse.units[i].createdAt), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}`, colSpan: 3, styles: { halign: 'center', font: 'courier', fillColor: [240, 240, 150] } }]);
      for (var j = 0; j < datacurse.units[i].themes.length; j++) {
        // console.log(datacurse.units[i].themes[j])
        var www = [datacurse.units[i].themes[j].title, datacurse.units[i].themes[j].idtheme, format(parseISO(datacurse.units[i].createdAt), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })]
        neww.push(www);
      }
    }



    const doc = new jsPDF({ unit: 'cm', orientation: "landscape", format: [32, 21] })

    doc.addFileToVFS('Sketch Gothic School-normal.ttf', wfont);
    doc.addFont('Sketch Gothic School-normal.ttf', 'Sketch Gothic School', 'normal');

    doc.addFileToVFS('HEIDH___-normal.ttf', fonnt);
    doc.addFont('HEIDH___-normal.ttf', 'HEIDH___', 'normal');

    // doc.addFileToVFS('Pauls Swirly Gothic Font-normal.ttf', fontneww);
    // doc.addFont('Pauls Swirly Gothic Font-normal.ttf', 'Pauls Swirly Gothic Font', 'normal');

    // doc.addFileToVFS('Lucida Calligra Regular-normal.ttf', font);
    // doc.addFont('Lucida Calligra Regular-normal.ttf', 'Lucida Calligra Regular', 'normal');

    // doc.addFileToVFS('Zapfino Extra LT Ligatures-normal.otf', fontww);
    // doc.addFont('Zapfino Extra LT Ligatures-normal.otf', 'Zapfino Extra LT Ligatures', 'normal');


    // doc.addFileToVFS('sketch_gothic_school-normal.ttf', fontnew);
    // doc.addFont('sketch_gothic_school-normal.ttf', 'sketch_gothic_school', 'normal');


    doc.addFileToVFS('Zapfino.ttf', fontt);
    doc.addFont('Zapfino.ttf', 'Zapfino', 'normal');


    doc.addFileToVFS('zapfino-extra-lt-two_vq9Lj-normal.ttf', fontzap);
    doc.addFont('zapfino-extra-lt-two_vq9Lj-normal.ttf', 'zapfino-extra-lt-two_vq9Lj', 'normal');

    const opacityState = new doc.GState({ opacity: 0.1 });


    doc.advancedAPI(() => {
      doc.saveGraphicsState();
      // Use DOMMatrix to create a transformation matrix (translate, rotate, scale)
      let { a, b, c, d, e, f } = new DOMMatrix()
        .translate(-5, doc.internal.pageSize.height / 2)
        .rotate(-45);

      doc.setCurrentTransformationMatrix(doc.Matrix(a, b, c, d, e, f));
      // Draw the shape at a relative origin (e.g., 0, 0)
      for (let i = 1; i < 6; i++) {
        // doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'S');
        doc.setLineWidth(5 / i)
        doc.setDrawColor(255, 155, nota * (5 * i))
        // doc.setFillColor(155, 155, 155)
        let offset = 10;
        doc.rect(-3 + i, 1 + i, 36 - (2 * i), 23 - (2 * i), 'S');
        // doc.rect(0, 0, doc.internal.pageSize.width - i, doc.internal.pageSize.height - i, 'S');
      }
      doc.fill();
      doc.restoreGraphicsState();
    })

    doc.setLineWidth(.03)
    doc.setFillColor(255, 255, 255)

    doc.setDrawColor(255, 255, 255)
    doc.roundedRect(.5, .5, doc.internal.pageSize.width - 1, doc.internal.pageSize.height - 1, 1, 1, 'S')
    doc.setDrawColor(255, 35, 0)
    doc.roundedRect(1, 1, doc.internal.pageSize.width - 2, doc.internal.pageSize.height - 2, 1, 1, 'FD')



    const widthh = doc.internal.pageSize.width
    const heightt = doc.internal.pageSize.height

    doc.setFont("Sketch Gothic School");
    // doc.setFont("HEIDH___");
    var ytag = 2.6;
    doc.setFontSize(23)
    var splittedText = doc.splitTextToSize(process.env.REACT_APP_institute, 8 * widthh / 9)
    var lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    var blockHeight = splittedText.length * lineHeight
    doc.text(splittedText, widthh / 2, ytag, { maxWidth: 8 * widthh / 9, align: 'center' })
    ytag += blockHeight + .3

    doc.setFont("helvetica", "normal")
    // doc.setFont('courier', 'normal')
    doc.setFontSize(15)
    var splittedText = doc.splitTextToSize("Otorga el presente", 2 * widthh / 3)
    var lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    var blockHeight = splittedText.length * lineHeight
    doc.text(splittedText, widthh / 2, ytag, { maxWidth: 2 * widthh / 3, align: 'center' })
    ytag += blockHeight + 1

    doc.setFontSize(21)
    var splittedText = doc.splitTextToSize("DIPLOMA A", 2 * widthh / 3)
    var lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    var blockHeight = splittedText.length * lineHeight
    doc.text(splittedText, widthh / 2, ytag, { maxWidth: 2 * widthh / 3, align: 'center' })
    ytag += blockHeight + 1.1

    doc.setFont("Sketch Gothic School");
    doc.setFontSize(38)
    var splittedText = doc.splitTextToSize(user.name, 3 * widthh / 2)
    var lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    var blockHeight = splittedText.length * lineHeight
    doc.text(splittedText, widthh / 2, ytag, { maxWidth: 3 * widthh / 2, align: 'center' })
    ytag += blockHeight + .1

    doc.setFont("helvetica", "normal")
    // doc.setFont('courier', 'normal')
    const detail = `Por haber cumplido y aprobado satisfactoriamente los requisitos académicos del DIPLOMADO EN ${datacurse.title.toUpperCase()}. Desarrollado del ${format(parseISO(datacurse.createdAt), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })} al ${format(parseISO(datacurse.updatedAt), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}, con una intensidad horaria de ${nota} horas. Dado en Huamanga Ayacucho, el ${format(new Date(), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}`

    doc.setFontSize(14)
    doc.text(detail, widthh / 19, ytag, { maxWidth: 17 * widthh / 19, align: 'justify' })
    var splittedText = doc.splitTextToSize(detail, 17 * widthh / 19)
    var lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    var blockHeight = splittedText.length * lineHeight
    ytag += blockHeight + .5

    doc.text(format(today, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es }), widthh - 1.7, ytag, { align: 'right' })

    doc.setFont('courier', 'normal')

    ytag += 1
    doc.text(`ID del curso ${datacurse._id}`, widthh - 1.7, ytag, { align: 'right' })
    ytag += 1
    doc.text(`ID del usuario ${user._id}`, widthh - 1.7, ytag, { align: 'right' })
    ytag += 1

    doc.setFont("Zapfino");
    doc.text(process.env.REACT_APP_page, widthh / 19, ytag, { maxWidth: 17 * widthh / 19, align: 'justify' })

    doc.setFont('courier', 'normal')
    var imLogo = 'data:image/jpeg;base64,' + logo
    doc.addImage(imLogo, 'jpeg', 3, 3, 3, 3, "", 'NONE')
    doc.setFont('courier', 'normal')
    var imLoggo = 'data:image/jpeg;base64,' + logowww
    doc.addImage(imLoggo, 'jpeg', widthh - 6, 3, 3, 3, "", 'NONE')

    // (interior) agregar imagen(imageData, formato, x, y, ancho, alto, alias, compresión, rotación)
    var imgData = 'data:image/jpeg;base64,' + wwwdir
    doc.addImage(imgData, 'jpeg', 1.5, 15.2, 8, 3.6, "", 'NONE')
    var imgData2 = 'data:image/jpeg;base64,' + subdir
    doc.addImage(imgData2, 'jpeg', 12.5, 15.2, 8, 3.2, "", 'NONE', -1)
    var imgData3 = 'data:image/jpeg;base64,' + wwwdir
    doc.addImage(imgData3, 'png', 22.5, 15.2, 8, 3.6, "", 'NONE', 1)

    // doc.setFont("Zapfino");
    // doc.setFontSize(12)
    // doc.setTextColor("#0f0b38ff");

    doc.text(wwwww.signature1, 1 * widthh / 6, 14.5 * heightt / 16, { maxWidth: 2 * widthh / 6, align: 'center' });
    doc.text(wwwww.signature2, 3 * widthh / 6, 14.5 * heightt / 16, { maxWidth: 2 * widthh / 6, align: 'center' });
    doc.text(wwwww.signature3, 5 * widthh / 6, 14.5 * heightt / 16, { maxWidth: 2 * widthh / 6, align: 'center' });



    doc.setTextColor(1, 1, 1);





    /////////////////////////////////////////////////////////////////////////////////
    doc.addPage();
    /////////////////////////////////////////////////////////////////////////////////


    doc.advancedAPI(() => {
      doc.saveGraphicsState();
      // Use DOMMatrix to create a transformation matrix (translate, rotate, scale)
      let { a, b, c, d, e, f } = new DOMMatrix()
        .translate(-5, doc.internal.pageSize.height / 2)
        .rotate(-45);

      doc.setCurrentTransformationMatrix(doc.Matrix(a, b, c, d, e, f));
      // Draw the shape at a relative origin (e.g., 0, 0)
      for (let i = 1; i < 6; i++) {
        // doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'S');
        doc.setLineWidth(5 / i)
        doc.setDrawColor(255, 155, nota * (5 * i))
        // doc.setFillColor(155, 155, 155)
        let offset = 10;
        doc.rect(-3 + i, 1 + i, 36 - (2 * i), 23 - (2 * i), 'S');
        // doc.rect(0, 0, doc.internal.pageSize.width - i, doc.internal.pageSize.height - i, 'S');
      }
      doc.fill();
      doc.restoreGraphicsState();
    })

    doc.setLineWidth(.03)
    // doc.setFillColor(255, 255, 255)
    doc.saveGraphicsState();
    doc.setGState(opacityState);

    doc.setDrawColor(255, 255, 255)
    doc.roundedRect(.5, .5, doc.internal.pageSize.width - 1, doc.internal.pageSize.height - 1, 1, 1, 'S')
    // doc.setDrawColor(155, 35, 0)
    doc.setDrawColor(255, 35, 0)
    // doc.roundedRect(1, 1, doc.internal.pageSize.width - 2, doc.internal.pageSize.height - 2, 1, 1, 'FD')

    doc.restoreGraphicsState();

    doc.setFont('courier', 'normal')
    var ytag = 2;
    // doc.setFontSize(21)
    var splittedText = doc.splitTextToSize(process.env.REACT_APP_institute, 6 * widthh / 7)
    var lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    var blockHeight = splittedText.length * lineHeight
    doc.text(splittedText, widthh / 2, ytag, { maxWidth: 6 * widthh / 7, align: 'center' })
    ytag += blockHeight + 1


    const columnWidthThird = (widthh - 2.8) / 3;

    doc.autoTable({
      styles: {
        font: 'courier', // or your custom font name
        fontStyle: 'normal', // 'normal', 'bold', 'italic'
        fontSize: 11
      },
      margin: { top: 2.5, right: widthh / 2 + .1 },
      columnStyles: {
        0: { columnWidth: columnWidthThird },    // First column (ID) = 15 units wide
        1: { columnWidth: columnWidthThird },    // Second column (Name) = 50 units wide
        2: { columnWidth: columnWidthThird } // Third column (Role) auto-wraps based on text size
      },
      head: [['ID', 'Name', 'Details']],
      body: [
        ['', '', ''],
      ],
      didDrawCell: function (data) {
        // Specify the column and section for the nested table
        if (data.column.index === 0 && data.cell.section === 'head') {
          doc.autoTable({
            startY: data.cell.y + 1,
            margin: { left: data.cell.x },
            tableWidth: data.cell.width,
            // tableWidth: 'wrap',
            // theme: 'grid',
            head: [['Key', 'Value']],
            body: neww,
            // styles: { fontSize: 8, cellPadding: 1 }
          });
        }

        if (data.column.index === 1 && data.cell.section === 'head') {

          // Generate nested table inside the current cell
          doc.autoTable({
            startY: data.cell.y + 1,
            margin: { left: data.cell.x },
            tableWidth: data.cell.width,
            // tableWidth: 'wrap',
            // theme: 'grid',
            head: [['Key', 'Value']],
            body: neww
            // styles: { fontSize: 8, cellPadding: 1 }
          });
        }
        if (data.column.index === 2 && data.cell.section === 'head') {
          doc.autoTable({
            startY: data.cell.y + 1,
            margin: { left: data.cell.x },
            tableWidth: data.cell.width,
            // tableWidth: 'wrap',
            // theme: 'grid',
            head: [['Key', 'Value']],
            body: [
              ['Data 1', 'Data 2', 'Data 3'],
              ['Data 1', 'Data 2', 'Data 3'],
              ['Data 1', 'Data 2', 'Data 3'],
              ['Data 1', 'Data 2', 'Data 3'],
              ['Data 1', 'Data 2', 'Data 3'],
            ],
          });
        }
        if (data.column.index === 2 && data.cell.section === 'body') {
          doc.autoTable({
            startY: doc.lastAutoTable.finalY,
            margin: { left: data.cell.x },
            tableWidth: data.cell.width,
            // tableWidth: 'wrap',
            // theme: 'grid',
            head: [['Key', 'Value', 'Value']],
            body: [
              ['www 1', 'www 2', 'Data 3'],
              ['www 1', 'www 2', 'Data 3'],
              ['www 1', 'www 2', 'Data 3'],
              ['www 1', 'www 2', 'Data 3'],
              ['www 1', 'www 2', 'Data 3'],
              ['www 1', 'www 2', 'Data 3'],
            ],
          });
        }
      }
    });


    doc.setFont('courier')
    // doc.setFontSize(15)
    doc.setTextColor("#0f0b38ff");



    // (interior) agregar imagen(imageData, formato, x, y, ancho, alto, alias, compresión, rotación)
    // var imgData = 'data:image/jpeg;base64,' + qrBase64.split(',')[1]
    // doc.addImage(imgData, 'jpeg', 1.5, 15.2, 3.1, 3.1, "", 'NONE')
    // var imgData2 = 'data:image/jpeg;base64,' + qrBase64.split(',')[1]
    // doc.addImage(imgData2, 'jpeg', 12.5, 15.2, 3.1, 3.1, "", 'NONE')
    var imgData3 = 'data:image/jpeg;base64,' + qrBase64.split(',')[1]
    doc.addImage(imgData3, 'png', 26.5, 15.2, 3.5, 3.5, "", 'NONE')


    doc.text(process.env.REACT_APP_institute, 6, 18.2, { maxWidth: 2 * widthh / 6, align: 'center' })

    doc.text(datacurse._id, 3 * widthh / 6, 14.7 * heightt / 16, { maxWidth: 2 * widthh / 6, align: 'center' });
    doc.text(format(parseISO(datacurse.updatedAt), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es }), 5 * widthh / 6, 14.7 * heightt / 16, { maxWidth: 2 * widthh / 6, align: 'center' });




    doc.save('downloaded-pdf-with-image.pdf');

  }

  return (
    <>
      <button onClick={() => { onchange(); sendTest() }} className='btn btn-primary'>IMPRIMIR DIPLOMA [Crédito {nota}]</button >
    </>
  )
}

export default ExportToPdf





    