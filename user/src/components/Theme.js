import React, { Component, useState } from 'react';
//import authSvg from '../assests/file.jpg';
import Navigation from '../screens/Navigation.jsx';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
//import { IconButton, TextareaAutosize, ThemeProvider } from '@material-ui/core';
//import { Modal, Row } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as moduleName from '../../public/ckeditor.js';
import { MdEdit, MdDelete, MdOpenInNew, MdComment } from "react-icons/md";


export default class Theme extends Component {

	constructor(props) {
		super(props);
		this.state = {
			updatable: false,
			name: props.name,
			status: props.status,
			nombre: "",
			contenido: "",
			tarea: "",
			www: "",
			noww: "",
			ber: "",
			themeall: "",
			fechaexa: new Date(),
			timexa: "2",
			editing: false,
			integers: [],
			tassks: [],
			title: "",
			description: "",
			dateb: "",
			datee: "",
			_id: "",
			submit: "",
		};
	}

	getNotes = async () => {
		await axios.get(
			`${process.env.REACT_APP_API_URL}/seccions/${this.props.match.params.theme}/${this.props.match.params.curse}`
		).then(res => {
			this.setState({
				integers: res.data[0].integgers,
				tassks: res.data[0].tassks,
				themeall: res.data[0],
				title: res.data[0].title,
				description: res.data[0].description,
				dateb: res.data[0].dateb,
				datee: res.data[0].datee,
			});
			console.log(res.data[0]);
		});

	};

	async componentDidMount() {
		this.timeNow()
		this.getNotes();
		console.log(this.props.match.params.id)
		if (this.props.match.params.id) {
			//console.log(this.props.match.params.id);
			//setCookie("id", this.props.match.params.id);
			//setLocalStorage("id", this.props.match.params.id);
		} else {
			//removeCookie("id");
			//removeLocalStorage("id");
		}
	}


	submitTest = async e => {
		e.preventDefault();
		console.log(this.state.title, this.state.description, this.props.match.params.theme, this.props.match.params.curse, this.state.themeall._id, this.state.dateb, this.state.datee);
		const Data = {
			title: this.state.title,
			description: this.state.description,
			dateb: this.state.dateb,
			datee: this.state.datee
		};
		await axios.put(`${process.env.REACT_APP_API_URL}/seccions/${this.props.match.params.theme}/${this.props.match.params.curse}`, Data).then(res => {
			console.log(res)
		});
		await axios.post(`${process.env.REACT_APP_API_URL}/tasks/Updaterestricted_date/${this.props.match.params.theme}`, { dateb: this.state.dateb, datee: this.state.datee }).then(res => {
			console.log(res)
			toast.dark('Actualizado correctamente')
		});
	};

	timeNow() {
		var str = new Date()
		let day = str.getDate()
		let month = str.getMonth() + 1
		let year = str.getFullYear()
		let hour = str.getHours()
		let mnt = str.getMinutes()
		let scn = str.getSeconds()
		let format1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${mnt < 10 ? '0' + mnt : mnt}`
		this.state.noww = format1
	}

	onTodoChange(event) {
		const { name, value } = event.target;
		console.log(name, value);
		this.setState({
			[name]: value
		});
		this.timeNow()

	}

	calificationsimilar = async () => {
		var ntger = this.state.integers
		//console.log(this.photo.task)
		function calculateSimilaritywww(str1 = "", str2 = "") {
			let longer = str1.trim();
			let shorter = str2.trim();
			let a1 = longer.toLowerCase().split(" ");
			let b1 = shorter.toLowerCase().split(" ");
			//let result = a1.every((aa, i) => aa[0] === b1[i][0]);
			if (longer.length < shorter.length) [longer, shorter] = [shorter, longer];
			var arr = [];
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
					if (ntgerwww[j].Usser[0].tassk.length >= 1 && ntgerwww[j].Usser[0].tassk[0]._id != ntger[k].Usser[0].tassk[0]._id) {
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
		var ntger = this.state.integers
		//console.log(this.state.tassks[1].task)
		var www = [];
		function calculateSimilaritywww(str1 = "", str2 = "") {
			let longer = str1.trim();
			let shorter = str2.trim();
			let a1 = longer.toLowerCase().split(" ");
			let b1 = shorter.toLowerCase().split(" ");
			//let result = a1.every((aa, i) => aa[0] === b1[i][0]);
			if (longer.length < shorter.length) [longer, shorter] = [shorter, longer];
			var arr = [];
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
			var arr = [];
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
		var dattes = [];
		var ntger = this.state.integers

		for (var k = 0; k < ntger.length; k++) {
			if (ntger[k].Usser[0].tassk.length >= 1) {
				var numero = Number(ntger[k].Usser[0].tassk[0].solution) ? Number(ntger[k].Usser[0].tassk[0].solution) : 0
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

	createTask = async (user) => {
		console.log(this.state.themeall.dateb, this.state.themeall.datee)
		await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { note: "", task: "task", solution: "3", theme: this.state.themeall._id, unidad: this.state.themeall.unidad, curse: this.state.themeall.curse, user: user, dateb: this.state.themeall.dateb, datee: this.state.themeall.datee }).then(res => {
			console.log(res)
		})
		this.getNotes()
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

	cleantaskone = async (_id) => {
		if (window.confirm('Desea eliminar la tarea?')) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${_id}`).then(res => {
				console.log(res)
			})
			this.getNotes()
		}
	}

	render() {
		return (
			<div className='container'>
				<Navigation />
				<div className='container'>
					<ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />

					<h5 className='text-uppercase text-center bg-info rounded text-light p-1'>
						{this.state.themeall.title}
					</h5>


					<input defaultValue={this.state.title} name="title" onChange={e => this.onTodoChange(e)} className="form-control my-3" />

					<CKEditor
						editor={ClassicEditor}
						disabled = {true}

						data={this.state.themeall.description}
						onReady={editor => {
							// You can store the "editor" and use when it is needed.
							console.log('Editor is ready to use!', editor);
						}}
						onChange={(event, editor) => {
							this.setState({
								description: editor.getData()
							});
							console.log(editor.getData());
						}}
						onBlur={(event, editor) => {
							console.log('Blur.', editor.getData());
						}}
						onFocus={(event, editor) => {
							console.log('Focus.', editor);
						}}
					/>

					<div className="container bg-light border border-dark rounded my-3">
						<div className="row p-1 d-flex">
							<div className="col-md-6 p-1">
								<input defaultValue={this.state.dateb} name="dateb" onChange={e => this.onTodoChange(e)} className="form-control" type="datetime-local" />
							</div>
							<div className="col-md-6 p-1">
								<input defaultValue={this.state.datee} name="datee" onChange={e => this.onTodoChange(e)} className="form-control" type="datetime-local" />
							</div>
						</div>
						<button className='btn btn-info w-100' onClick={this.submitTest}>Actualizar campos</button>
						{this.state.dateb < this.state.noww && this.state.noww < this.state.datee ?
							<div className="text-warning w-100 text-center">ACTIVADO</div> :
							<div className="text-darck w-100 text-center">NO ACTIVADO</div>
						}
					</div>

					<button className='btn btn-outline-info w-100 my-3' onClick={() => { this.createTask(this.state.themeall.user) }}>Crear tarea</button>

					<div className="row  d-flex justify-content-center">
						{this.state.tassks.map((notew) => (
							<div
								className="my-1 text-center col-md-3 p-1 border rounded"
								key={notew._id}
							>
								<div className="">
									{notew.task.length}--{notew.solution.length}
								</div>
								<div className="border border-success p-1 rounded btn-group w-100">
									<Link
										className="btn w-100 btn-primary"
										to={'/test/' + notew._id}
									>
										Actualizar
									</Link>
									<button className="btn btn-danger w-100" onClick={() => {
										this.cleantaskone(notew._id)
									}}>
										Borrar
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="text-warning w-100 text-center">{this.state.ber}</div>

					<div className="row d-flex justify-content-center bg-light p-1 border rounded">
						<div className="col-md-3 p-1">
							<button className="btn btn-warning w-100" onClick={this.cleantasks}>Limpiar tareas</button>
						</div>
						<div className="col-md-3 p-1">
							<button className="btn btn-info w-100" onClick={this.calificationclean}>Limpiar notas</button>
						</div>
						<div className="col-md-3 p-1">
							<button className="btn btn-outline-primary w-100" onClick={this.calificationsimilar}>Calificar similaridad</button>
						</div>
						{this.state.tassks != '' ?
							<div className="col-md-3 p-1">
								<button className="btn btn-primary w-100" onClick={this.calificationsolution}>Calificar sesión</button>
							</div>
							: null}
					</div>

					<table>
						<thead>
							<tr>
								<th>N</th>
								<th>Apellidos y nombres</th>
								<th>Nota</th>
								<th>Editors</th>
								<th>nCharacters</th>
								<th>Fecha</th>
							</tr>
						</thead >
						<tbody>
							{this.state.integers.map((note, i) => (
								<tr key={note._id}>
									<td>{i + 1}</td>
									<td>{note.Usser[0].name}
									</td>
									{note.Usser[0].tassk.length == 0 ? <td><button className='btn btn-warning' onClick={() => { this.createTask(note.Usser[0]._id) }}>Crear tarea</button></td> : null}
									{note.Usser[0].tassk.map((notew, ii) => (
										<React.Fragment key={ii}>
											<td>
												{notew.note}
											</td>
											<td>
												<div className="btn-group">
													<Link className="btn btn-outline-secondary" to={'/test/' + notew._id} >
														<MdEdit />
													</Link>
													<button className="btn btn-outline-secondary" onClick={() => { this.cleantaskone(notew._id) }} >
														<MdDelete />
													</button>
													<button className="btn btn-outline-secondary" type="button" data-toggle="collapse" data-target={"#collapseOne" + note._id} aria-expanded="false" onClick={() => { this.calificationsolutionone(notew._id, notew.task, notew.solution) }}>
														<MdComment />
													</button>
												</div>
											</td>
											<td>
												{notew.task.length}
											</td>
											<td>
												{notew.createdAt}
											</td>
										</React.Fragment>
									))}
								</tr>
							))
							}
						</tbody>
					</table>
				</div >
			</div>
		)
	}
}

