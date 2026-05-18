// import ReactToPrint from "react-to-print";
// https://codesandbox.io/p/sandbox/react-simple-quiz-app-gbfef?file=%2Fsrc%2FApp.js%3A8%2C1
// https://opentdb.com/api_config.php
// import { registerLocale } from "react-datepicker";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { Component } from 'react';
import Navigation from '../screens/Navigation.jsx';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { MdEdit, MdDelete, MdComment } from "react-icons/md";
import Markdownkatexnew from "./Markdown.js";
import App from "./App.js";
import { Modal, Row } from "react-bootstrap";
import { isAuth, isAsignature } from "../helpers/auth.js";
import 'react-datepicker/dist/react-datepicker.css';
import Task from './taskUser.js';

import { parseISO } from "date-fns";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import es from 'timeago.js/lib/lang/es';
timeago.register('es', es);

// import es from 'date-fns/locale/es';
// registerLocale('es', es);

export default class Theme extends Component {

	open = () => this.setState({ showModal: true });
	close = () => this.setState({ showModal: false });

	// constructor(props) {
	// super(props);
	// this.
	state = {
		showModal: false,
		updatable: false,
		// name: props.name,
		// status: props.status,
		nombre: "",
		contenido: "",
		task: "task",
		items: [
			{
				prg: '¿Qué famoso fue un pintor, escultor, grabador y ceramista español. En sus obras reflejó su interés por el subconsciente de lo «infantil» y en la cultura y tradiciones de Cataluña?',
				alt: [
					[''],
					['René Magritteb'],
					['Salvador Dalíc'],
					['Joan Miród'],
					['Max Ernst']],
				rpta: 'Joan Miród'
			},
			{
				prg: '¿Un automóvil viaja en línea recta y recorre una distancia total de 200 km. Si el viaje le toma exactamente 2 horas}, ¿cuál es la rapidez promedio del automóvil durante todo el trayecto?',
				alt: [
					[''],
					['355km/h'],
					['100km/h'],
					['355km/h'],
					['101km/h']
				],
				rpta: '100km/h'
			},
			{
				prg: '¿Cuál es el elemento fundamental de la perspectiva cónica que consiste en una línea imaginaria situada a la altura de los ojos del espectador, donde convergen todas las líneas paralelas en el infinito?',
				alt: [
					[''],
					['Línea de tierra'],
					['Línea de horizonte'],
					['Plano del cuadro'],
					['Punto de vista']
				],
				rpta: 'Línea de horizonte'
			},
			{
				prg: '¿En el sistema de perspectiva cónica, cómo se denomina el punto exacto que coincide con la posición ocular del observador desde la cual se contempla la escena?',
				alt: [
					[''],
					['Punto principal'],
					['Punto métrico'],
					['Punto de fuga'],
					['Punto de vista']
				],
				rpta: 'Punto de vista'
			},
			{
				prg: '¿Cuál es el elemento fundamental en la perspectiva cónica que representa la línea imaginaria situada a la altura de los ojos del observador?',
				alt: [
					[''],
					['La línea de tierra'],
					['La línea de horizonte'],
					['El punto de fuga'],
					['El plano del cuadro']
				],
				rpta: 'La línea de horizonte'
			},
			{
				prg: '¿Qué tipo de perspectiva cónica se caracteriza por tener un único punto de fuga donde convergen las líneas de profundidad?',
				alt: [
					[''],
					['Perspectiva oblicua'],
					['Perspectiva a tres puntos'],
					['Perspectiva frontal'],
					['Perspectiva axonométrica']
				],
				rpta: 'Perspectiva frontal'
			},
			{
				prg: 'En perspectiva cónica, ¿cómo se le denomina al plano vertical sobre el que se proyecta la imagen del objeto y que equivale a nuestro papel de dibujo?',
				alt: [
					[''],
					['Plano geometral'],
					['Plano de horizonte'],
					['Plano del cuadro'],
					['Plano de fuga']
				],
				rpta: 'Plano del cuadro'
			},
			{
				prg: '¿Qué perspectiva cónica se utiliza comúnmente para lograr una "vista de pájaro" o "vista de hormiga", utilizando tres puntos de fuga?',
				alt: [
					[''],
					['Perspectiva frontal'],
					['Perspectiva aérea'],
					['Perspectiva paralela'],
					['Perspectiva cónica oblicua']
				],
				rpta: 'Perspectiva aérea'
			},
			{
				"prg": "¿Cuál es la integral indefinida básica de la función exponencial $\\int e^{x} dx$?",
				"alt": [
					[''],
					['\\ln(x) + C'],
					['e^{x} + C'],
					['\\frac{e^{x+1}}{x+1} + C'],
					['\\frac{1}{x} + C']
				],
				"rpta": "e^{x} + C"
			},
			{
				"prg": "¿Cuál es el resultado de la integral definida $\\int_{0}^{1} x^{2} dx$?",
				"alt": [
					[''],
					['1'],
					['0'],
					['\\frac{1}{3}'],
					['\\frac{1}{2}']
				],
				"rpta": "\\frac{1}{3}"
			},
			{ alt: ['www'], prg: '¿Qué aspectos considera que el docente debería mejorar en su enseñanza?' },
		],
		www: "",
		solution: "solution",
		noww: new Date(),
		ber: "",
		themeall: "",
		fechaexa: new Date(),
		startDate: new Date(),
		timexa: "2",
		editing: false,
		integers: [],
		tassks: [],
		tasskstd: [],
		theme: [],
		title: "",
		description: "",
		articulo: { art1: 'el', art2: 'del', art3: 'al' },
		description: "",
		dateb: new Date(),
		datee: "",
		id: "",
		submit: "",
	};
	// }

	getNotes = async () => {
		await axios.get(
			`${process.env.REACT_APP_API_URL}/seccions/${this.props.match.params.theme}/${this.props.match.params.curse}/${isAuth()._id}`
		).then(res => {
			if (res.data.length === 0) {
				this.props.history.push(`/curso/${this.props.match.params.theme}`)
				// this.createatachTheme()
			} else {
				console.log(res.data.length, res.data[0], "www");
				this.setState({
					id: res.data[0]._id,
					theme: res.data[0],
					tassks: res.data[0].tassks,
					tasskstd: res.data[0].tasskstd,
					dateb: parseISO(res.data[0].dateb),
					datee: parseISO(res.data[0].datee),
					title: res.data[0].title,
					description: res.data[0].description
				})
			}
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		});

	};

	async componentDidMount() {
		this.getNotes();
		document.title = isAsignature().title


		// 	await axios.get('https://opentdb.com/api.php?amount=15&category=25&difficulty=hard').then(res => {
		// 		console.log(res.data.results)
		// 	}).catch((err) => {
		// 		toast.error(`Error To Your Information ${err.response.statusText}`);
		// 	});

	}



	submitTest = async e => {
		e.preventDefault();
		const Data = {
			title: 'this.props.location.state.title',
			description: this.state.description,
			dateb: this.state.dateb,
			datee: this.state.datee
		};
		await axios.put(`${process.env.REACT_APP_API_URL}/seccions/${this.state.id}`, Data).then(res => {
			this.close()
			this.getNotes()
			toast.info(res.data)
			console.log(res, "www")
		});
	};

	onTodoChange(www, wqw) {
		toast.info(www);
		console.log(www);
		toast.info(wqw);
		// this.setState({
		// 	[name]: value
		// });
	}

	calificationsimilar = async () => {
		var ntger = this.state.integers
		//console.log(this.photo.task)
		function calculateSimilaritywww(str1 = "", str2 = "") {
			let longer = str1.trim();
			let shorter = str2.trim();
			// let a1 = longer.toLowerCase().split(" ");
			// let b1 = shorter.toLowerCase().split(" ");
			//let result = a1.every((aa, i) => aa[0] === b1[i][0]);
			if (longer.length < shorter.length) [longer, shorter] = [shorter, longer];
			// var arr = [];
			let count = 0;
			for (var i = 0; i < longer.length; i++) {
				if (shorter && shorter.includes(longer[i])) {
					shorter = shorter.replace(longer[i], "")
					count++
				};
			}
			return {
				score: (count * 100) / longer.length
			}
		}
		var dattes = [];

		for (var j = 0; j < ntger.length; j++) {
			if (ntger[j].Usser[0].tassk.length >= 1) {
				dattes.push(Date.parse(ntger[j].Usser[0].tassk[0].createdAt))
			} else {
				console.log("www")
			}
		}


		for (var k = 0; k < ntger.length; k++) {
			this.charge = k + 1; //console.log(k,  this.charrge)
			if (ntger[k].Usser[0].tassk.length >= 1) {
				var www = [];
				var lenghtt = [];
				var ntgerwww = this.state.integers
				for (var j = 0; j < ntgerwww.length; j++) {
					if (ntgerwww[j].Usser[0].tassk.length >= 1 && ntgerwww[j].Usser[0].tassk[0]._id !== ntger[k].Usser[0].tassk[0]._id) {
						www.push(calculateSimilaritywww(ntgerwww[j].Usser[0].tassk[0].task, ntgerwww[k].Usser[0].tassk[0].task).score);
						lenghtt.push(ntgerwww[j].Usser[0].tassk[0].task.length);
					} else {
						www.push(0);
						lenghtt.push(0);
					}
				}
				var onepoint = (Math.max.apply(Math, dattes) - Math.min.apply(Math, dattes)) / 20
				var alcance = Date.parse(ntger[k].Usser[0].tassk[0].createdAt) - Math.min.apply(Math, dattes)
				const wsum = Object.values(www).reduce((a, b) => a + b, 0)
				var nota = 0.5 * (20 - wsum / (ntger.length - www.filter(w => w === 0).length) * (20 / 100)) + 0.3 * ntgerwww[k].Usser[0].tassk[0].task.length * 20 / Math.max(...lenghtt) + 0.2 * alcance / onepoint
				if (nota) {
					await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${ntger[k].Usser[0].tassk[0]._id}`, { task: ntger[k].Usser[0].tassk[0].task, solution: '', note: Math.round(nota) + '' }).then(res => {
						//console.log(res)
					})
				} else {
					//console.log('sin nota')
				}
				this.setState({
					ber: k + 1
				});
			} else {
				//console.log("www")
			}
		}
		this.getNotes()
	}

	calificationsolution = async () => {
		//this.loading = "false"
		//console.log(this.state.tassks[1].task)
		// var www = [];
		var ntger = this.state.integers

		function calculateSimilaritywww(str1 = "", str2 = "") {
			let longer = str1.trim();
			let shorter = str2.trim();
			// let a1 = longer.toLowerCase().split(" ");
			// let b1 = shorter.toLowerCase().split(" ");
			//let result = a1.every((aa, i) => aa[0] === b1[i][0]);
			if (longer.length < shorter.length) [longer, shorter] = [shorter, longer];
			// var arr = [];
			let count = 0;
			for (var i = 0; i < longer.length; i++) {
				if (shorter && shorter.includes(longer[i])) {
					shorter = shorter.replace(longer[i], "")
					count++
				};
			}
			return {
				score: (count * 100) / longer.length
			}
		}

		for (var k = 0; k < ntger.length; k++) {
			if (ntger[k].Usser[0].tassk.length >= 1) {
				var numero = Number(ntger[k].Usser[0].tassk[0].solution) ? Number(ntger[k].Usser[0].tassk[0].solution) : 0
				var similaroriginal = calculateSimilaritywww(this.state.tassks[numero].task, this.state.tassks[numero].solution).score
				var similar = calculateSimilaritywww(ntger[k].Usser[0].tassk[0].task, this.state.tassks[numero].task).score
				var nota = (similar - similaroriginal) / ((100 - similaroriginal) / 20)

				this.setState({
					ber: k + 1
				});
				//console.log(this.photo.tassks[numero].task,"new")
				if (nota) {
					//this.loading = "false"
					await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${ntger[k].Usser[0].tassk[0]._id}`, { task: ntger[k].Usser[0].tassk[0].task, solution: numero + '', note: Math.round(nota * 1000) / 1000 + '' }).then(res => {
						//console.log(res)
					})
				} else {
					console.log('wwwww')
				}
			} else {
				console.log('www');
			}
		}
		toast.dark('Calificado correctamente')
		this.getNotes()
	}



	calificationsolutionone = async (_id, taskk, solution) => {
		function calculateSimilaritywww(str1 = "", str2 = "") {
			let longer = str1.trim();
			let shorter = str2.trim();
			if (longer.length < shorter.length) [longer, shorter] = [shorter, longer];
			// var arr = [];
			let count = 0;
			for (var i = 0; i < longer.length; i++) {
				if (shorter && shorter.includes(longer[i])) {
					shorter = shorter.replace(longer[i], "")
					count++
				};
			}
			return {
				score: (count * 100) / longer.length
			}
		}
		var similaroriginal = calculateSimilaritywww(this.state.tassks[solution].task, this.state.tassks[solution].solution).score
		var similar = calculateSimilaritywww(taskk, this.state.tassks[solution].task).score
		console.log(this.state.tassks[solution].task, "new")
		var nota = (similar - similaroriginal) / ((100 - similaroriginal) / 20)
		console.log(nota)

		this.loading = "false"
		await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, { task: taskk, solution: solution + '', note: Math.round(nota * 1000) / 1000 + '' }).then(res => {
			//console.log(res)
		})
		this.getNotes()
	}

	calificationclean = async () => {
		// var dattes = [];
		var ntger = this.state.integers

		for (var k = 0; k < ntger.length; k++) {
			if (ntger[k].Usser[0].tassk.length >= 1) {
				// var numero = Number(ntger[k].Usser[0].tassk[0].solution) ? Number(ntger[k].Usser[0].tassk[0].solution) : 0
				await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${ntger[k].Usser[0].tassk[0]._id}`, { task: ntger[k].Usser[0].tassk[0].task, solution: ntger[k].Usser[0].tassk[0].solution, note: '' }).then(res => {
					console.log(res)
				})
			} else {
				console.log('www');
			}
		}
		toast.dark('Notas limpiadas correctamente')
		this.getNotes()
	}


	createTask = async () => {
		console.log(this.state.themeall.dateb, this.state.themeall.datee)
		await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { note: "", task: this.state.task, items: this.state.items, solution: this.state.solution, theme: this.state.id, codetheme: this.props.match.params.curse, curse: this.props.match.params.theme, user: isAuth()._id, dateb: this.state.dateb, datee: this.state.datee })
			.then(res => {
				console.log(res)
			})
		this.getNotes()
	}

		createTaskstd = async (www) => {
		console.log(this.state.themeall.dateb, this.state.themeall.datee)
		await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { note: "", task: this.state.task, items: www, solution: this.state.solution, theme: this.state.id, codetheme: this.props.match.params.curse, curse: this.props.match.params.theme, user: isAuth()._id, dateb: new Date(), datee: (new Date())+ 2 * 60 * 60 * 1000 })
			.then(res => {
				console.log(res)
			})
		this.getNotes()
	}

	getRandomIntInclusive = async (min, max) => {
		// const minCeiled = Math.ceil(min);
		// const maxFloored = Math.floor(max);
		// // The maximum is exclusive and the minimum is inclusive
		// const rand = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
		const task = this.state.tassks[0]
		// console.log(task.items)
		// this.setState({
		// 	items: task.items,
		// 	// solution: 'task.solution',
		// });
		if (this.state.tasskstd.length === 0) {
			this.createTaskstd(task.items)
		} else {
			toast.info("www")
		}

	}


	//clean tasks
	cleantasks = async () => {
		if (window.confirm('Desea eliminar las tareas?')) {
			var ntger = this.state.integers
			for (var k = 0; k < ntger.length; k++) {
				if (ntger[k].Usser[0].tassk.length >= 1) {
					console.log(ntger[k].Usser[0].tassk[0]._id)
					await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${ntger[k].Usser[0].tassk[0]._id}`).then(res => {
						console.log(res)
					})
					//this.loading = "false"
					// this.themesService.deletetask(ntger[k].Usser[0].tassk[0]._id)
					// 	.subscribe(res => {
					// 		this.gettheme()
					// 	})
				} else {
					console.log('www');
				}
			}
			this.getNotes()
		}
	}

	onInputChange = (e) => {
		console.log(e.target.name, e.target.value);
		this.setState({ [e.target.name]: e.target.value })
	};


	cleantaskone = async (_id) => {
		if (window.confirm('Desea eliminar la tarea?')) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${_id}`).then(res => {
				console.log(res)
			})
			this.getNotes()
		}
	}

	onSubmitRemove = async () => {
		const response = window.confirm('Deseas eliminar este capítulo?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/seccions/` + this.state.id);
			this.getNotes();
			toast.dark('Removido correctamente');
		}
	};

	getStdNativescalification = async (id) => {
		toast.info(id)
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/users/stdaveragesnative/` + id
		);
		this.setState({
			integers: res.data,
		});
		console.log(res)

	};


	render() {
		return (
			<div>
				<ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />
				<Navigation />

				{/* <button onClick={reactToPrintFn}>Imprimir sesión</button> */}
				{/* <button onClick={this.calificationclean()}>Imprimir sesión</button> */}
				{/* <div ref={(refer) => (this.componentRef = refer)}>Export my HTMl component to a PDF File</div>
						<ReactToPrint
							content={() => this.componentRef}
							trigger={() => (
								<button className="btn btn-primary">Print to PDF!</button>
							)}
						/>
						*/}

				<div className='container'>

					{isAuth().rol === "1" ?
						<button className="btn btn-info text-center w-100" onClick={() => { this.open(); this.setState({ option: true, title: '', detail: '' }) }} > Editar </button>
						: ''}

					{/* <h5 className="text-center">
						<span className='ffont h3 text-info'> {this.props.location.state.title}</span> <span className='ffont h1 text-center text-dark'>[{this.props.location.state.unittitle}] </span>
					</h5> */}

					<Modal show={this.state.showModal} onHide={() => { this.close(); }} animation={false}>
						<div className="modal-header font-weight-bold h5">Actualizar</div>
						<div className="modal-body">
							<div className="mb-3">
								<label className="form-label">Detalle (Escriba texto en formato Markdown [<a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Tutorial!</a>])</label>
								<textarea type="text" className="form-control scroll" placeholder="Contenido" rows="9" name="description" onChange={this.onInputChange} value={this.state.description} required ></textarea>
								<Markdownkatexnew>
									{this.state.description}
								</Markdownkatexnew>
							</div>
						</div>
						<div className="modal-footer d-flex right-content-center">
							<button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={this.submitTest}> Actualizar </button>
							<button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.close() }}> Close </button>
						</div>
					</Modal >

					<div className='rounded' style={{ backgroundColor: 'WhiteSmoke', padding: '3px' }}>
						<Markdownkatexnew>
							{this.state.description}
						</Markdownkatexnew>
					</div>

					<div className='rounded' style={{ backgroundColor: this.state.tassks && this.state.tassks.length > 0 ? 'skyblue' : 'white', padding: this.state.tassks && this.state.tassks.length > 0 ? '1px' : '' }}>

						{isAuth().rol === "1" ?
							<button className='btn btn-primary w-100' onClick={() => { this.createTask() }}>Crear tarea</button>
							: ''}

						{/* //////////////////////////////////////////////////////////////////////////// */}
						{this.state.tassks.length > 0 && this.state.tasskstd.length === 0 && isAuth().rol != '1' ?
							<button className='btn btn-primary w-100' onClick={() => { this.getRandomIntInclusive(0, this.state.tassks.length) }}>Generar Test (Acumular horas)</button>
							: ''}


						{this.state.tasskstd.length > 0 ?
							<div className="text-center p-1" style={{ margin: '.1em' }} >
								<div className='rounded' >
									[{this.state.tasskstd[0].task}-{this.state.tasskstd[0].solution}]
								</div>
								Inició <TimeAgo datetime={this.state.tasskstd[0].dateb} locale='es' />. Culnima <TimeAgo datetime={this.state.tasskstd[0].datee} locale='es' />
								<Task idtheme={this.props.match.params.theme} codetheme={this.props.match.params.curse} task_id={this.state.tasskstd[0]._id} />
							</div>
							: null}



						{isAuth().rol === '1' ?
							<div className="row d-flex justify-content-center">
								{this.state.tassks.map((notew) => (
									<div className="text-center col-md-3 p-1" style={{ margin: '.1em' }} key={notew._id} >
										<div className='rounded' style={{ backgroundColor: this.state.dateb < this.state.noww && this.state.noww < this.state.datee ? 'orange' : 'gray' }}>
											[{notew.task.length}-{notew.solution.length}]
											Inició <TimeAgo datetime={notew.dateb} locale='es' />. Culnima <TimeAgo datetime={notew.datee} locale='es' />
											<div className="p-1 btn-group w-100">
												<Link className="btn w-100 btn-info" to={'/test/' + notew._id} >
													Actualizar
												</Link>
												<Link className="btn w-100 btn-primary" to={'/test/' + notew._id} >
													Copiar
												</Link>
												<button className="btn btn-secondary w-100" onClick={() => { this.cleantaskone(notew._id) }}>
													Borrar
												</button>
											</div>
										</div>
									</div>
								))}
							</div> : null}
					</div>



					{/* {isAuth() && this.state.tassks.length > 0 ? <div className="mt-1 p-1 border rounded justify-content-center align-items-center">
						{isAuth().rol === "1" ?
							<button className='btn btn-info w-100' disabled={this.state.isDisabled === 'true'} onClick={() => {
								this.getStdNativescalification(this.props.match.params.theme)
							}}>Calificar nativos</button>
							: ''}

						{this.state.integers.length > 0 ?
							<div className="btn-group w-100 mt-1">
								<button className="btn-control btn btn-warning" onClick={this.cleantasks}>Limpiar tareas</button>
								<button className="btn-control btn btn-info" onClick={this.calificationclean}>Limpiar notas</button>
								<button className="btn-control btn btn-primary" onClick={this.calificationsimilar}>Calificar similaridad</button>
								{this.state.tassks !== '' ?
									<button className="btn-control btn btn-primary" onClick={this.calificationsolution}>Calificar sesión</button>
									:
									null
								}
							</div>
							: null
						}

						<div className="row justify-content-center align-items-center">
							{this.state.integers.map((note, i) => (
								<div className="col-md-4 p-1 m-0 text-center" key={i}>
									<div className="bg-info rounded text-center">
										<div>{i + 1}</div>
										<div>
											{note.usser[0].name}
										</div>
									</div>
								</div>
							))
							}
						</div >
					</div > : ''} */}

					{/* //////////////////////////////////////////////////////////////////////////// */}

					{/* <App /> */}

					{isAuth().rol === "1" ?
						<div className="p-1 rounded my-3" style={{ backgroundColor: this.state.dateb < this.state.noww && this.state.noww < this.state.datee ? 'Gold' : 'WhiteSmoke' }}>
							{this.state.dateb < this.state.noww && this.state.noww < this.state.datee ?
								<div className="h3 w-100 text-center ffont" style={{ fontWeight: 'bold' }}>FECHA ACTIVADA</div> :
								<div className="h3 w-100 text-center ffont" style={{ fontWeight: 'bold' }}>FECHA NO ACTIVADA</div>
							}
							<div className="row p-1 d-flex">
								<div className="col-md-6 p-1 text-center">
									Inicia <TimeAgo datetime={this.state.dateb} locale='es' />
									<br /><DatePicker className='btn btn-info w-100' locale="es" showTimeSelect showIcon dateFormat="Pp"
										selected={this.state.dateb}
										onChange={(date) => {
											this.setState({ noww: new Date(), dateb: date })
										}}
									/>
								</div>
								<div className="col-md-6 p-1 text-center">
									Culmina <TimeAgo datetime={this.state.datee} locale='es' /><br /><DatePicker className='btn btn-info w-100' locale="es" showTimeSelect showIcon dateFormat="Pp"
										selected={this.state.datee}
										onChange={(date) => {
											this.setState({ noww: new Date(), datee: date })
										}}
									/>
								</div>
							</div>
							<button className='btn btn-info w-100 my-1' onClick={this.submitTest}>Actualizar campos</button>
							<button className='btn btn-danger w-100' onClick={this.onSubmitRemove}>Remover sesión</button>
						</div>
						: ''}

					{/* <div className="text-warning w-100 text-center">{this.state.ber}</div> */}

				</div >
				<div className="py-3"></div>
			</div>)
	}
}

