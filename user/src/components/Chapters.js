import React, { Component } from 'react';
import authSvg from '../assests/file.jpg';
import Navigation from '../screens/Navigation.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IconButton, TextareaAutosize, ThemeProvider } from '@material-ui/core';
import { Modal, Row } from 'react-bootstrap';

import {
	Badge,
	Input,
	Button,
	Textarea,
	CircularProgress,
	CircularProgressWithLabel,
	LinearProgress
} from '@material-ui/core';
import { IoMdText } from 'react-icons/io';

import { MdDescription, MdEdit, MdDelete, MdOpenInNew, MdAssignment } from 'react-icons/md';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { MdAddCircle, MdWork, MdBook } from 'react-icons/md';
import KatexMarkdown from './Markdown';

import axios from 'axios';
import {
	//  removeCookie,
	//  removeLocalStorage,
	setCokie,
	setLocalStorage,
	isAuth,
	getCokie
} from '../helpers/auth';

export default class CreateNote extends Component {
	state = {
		category: this.props.match.params.categ,
		curse: this.props.match.params.id,
		chapter: '',
		section: '',
		nombre: '',
		showModal: false,
		contenido: '',
		preguntas: '',
		respuestas: '',
		tarea: '',
		fechaexa: new Date(),
		timexa: '',
		editing: false,
		zz: [],
		zzz: [],
		_id: '',
		id: '',
		files: '',
		testrespchp: '',
		ccss: [],
		ccs: [],
		submit: '',
		index: '',
		option: '',
		task: false,
		nota: '',
		tasksendl: '',
		tasksend: '',
	};
	openChat = () => this.setState({ showModal: true, newmessages: 0 });
	closeChat = () => this.setState({ showModal: false });
	openTask = () => this.setState({ showModaltask: true });
	closeTask = () => this.setState({ showModaltask: false });

	getNotes = async () => {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/chapters/www/` + isAuth()._id + `/` + this.props.match.params.id
		);
		//    console.log(res.data[0].nombre);
		this.setState({
			zz: res.data[0].capitulos,
			ccss: res.data[0].testschp,
			testrespchp: res.data[0].testrespschp,
			tasksendl: res.data[0].tasksend,
			tasksend: res.data[0].tasksend[0],
			ccs: res.data[0],
		});
		setLocalStorage('namecurse', this.state.ccs.nombre);
		setCokie('namecurse', this.state.ccs.nombre);
		//    console.log(new Date(this.state.ccs.fechaexamen).toString());
		//    console.log(this.state.zz);
	};

	async componentDidMount() {
		this.getNotes();
		// console.log(this.props.match.params.id);
		// console.log(this.props.match.params.categ);

		setCokie('idc', this.props.match.params.id);
		setLocalStorage('idc', this.props.match.params.id);
		setCokie('idcat', this.props.match.params.categ);
		setLocalStorage('idcat', this.props.match.params.categ);
		// setLocalStorage("namecurse", this.state.ccs.nombre);
		// setCookie("namecurse", res.data[0].nombre);
	}

	createcurso = async () => {
		console.log(this.props.match.params.id);
		const Www = {
			curse: this.props.match.params.id,
			nombre: 'this.state.nombre',
			contenido: 'this.state.contenido',
			test: 'this.state.tarea',
			fechaexa: '2022-06-25T16:23:08.196Z',
			timexa: '1',
		};
		await axios.post(`${process.env.REACT_APP_API_URL}/chapters`, Www);
		toast.dark('Creado correctamente');
		this.getNotes();
		this.closeChat();
		this.setState({
			nombre: '',
			chapter: '',
			contenido: '',
			editing: '',
			tarea: '',
			_id: '',
			fechaexa: new Date(),
			timexa: '',
		});
	};
	upDate = async curseId => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/chapters/` + curseId);
		// console.log(res);

		this.setState({
			category: res.data.category,
			nombre: res.data.nombre,
			contenido: res.data.contenido,
			tarea: res.data.test,
			fechaexa: new Date(res.data.fechaexa),
			timexa: res.data.timexa,
			editing: true,
			_id: res.data._id,
			submit: 'Actualizar capítulo',
			option: '',
		});
	};

	onSubmit = async e => {
		e.preventDefault();
		const Data = {
			curse: this.state.category,
			curse: this.state.curse,
			nombre: this.state.nombre,
			contenido: this.state.contenido,
			test: this.state.tarea,
			fechaexa: this.state.fechaexa,
			timexa: this.state.timexa,
		};
		if (this.state.editing) {
			await axios.put(`${process.env.REACT_APP_API_URL}/chapters/` + this.state._id, Data);
			toast.info('Actualizado correctamente');
		} else {
			await axios.post(`${process.env.REACT_APP_API_URL}/chapters`, Data);
			toast.dark('Creado correctamente');
		}
		this.getNotes();
		this.closeChat();
		this.setState({
			nombre: '',
			chapter: '',
			contenido: '',
			editing: '',
			tarea: '',
			_id: '',
			fechaexa: new Date(),
			timexa: '',
		});
	};

	onInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onChangeDate = fechaexa => {
		this.setState({ fechaexa });
	};

	getS = (w1, w2, w3, index) => {
		//    console.log(w3);
		this.setState({
			nombre: w1,
			contenido: w2,
			tarea: w3,
			task: false,
			submit: w1,
			index: index,
		});
	};

	deleteNote = async noteId => {
		const response = window.confirm('Deseas eliminar este capítulo?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/chapters/` + noteId);
			this.getNotes();
			toast.dark('Removido correctamente');
		}
	};

	///////////////////////////////////////////////////////////////////////////////////Seccion
	///////////////////////////////////////////////////////////////////////////////////

	CreateSeccion = async id => {
		const newNote = {
			chapter: id,
			nombre: 'Name',
			contenido: 'Content',
			tarea: 'Task',
			fechaexa: '2022-06-25T16:23:08.196Z',
		};
		await axios.post(`${process.env.REACT_APP_API_URL}/seccions`, newNote);
		toast.dark('Theme creada correctamente');
		this.getNotes();
		this.setState({
			nombre: '',
			chapter: '',
			editing: '',
			contenido: '',
			tarea: '',
			_id: '',
			fechaexa: '',
		});
	};

	upDateS = async curseId => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/seccions/` + curseId);
		// console.log(res);

		this.setState({
			chapter: res.data.chapter,
			nombre: res.data.nombre,
			contenido: res.data.contenido,
			tarea: res.data.tarea,
			fechaexa: new Date(res.data.fechaexa),
			editing: true,
			_id: res.data._id,
			submit: 'Actualizar sección',
			option: 'sec',
		});
	};

	SubmitS = async e => {
		e.preventDefault();
		// console.log(this.state.editing);
		if (this.state.editing) {
			const updatedNote = {
				category: this.state.category,
				curse: this.state.curse,
				chapter: this.state.chapter,
				nombre: this.state.nombre,
				contenido: this.state.contenido,
				tarea: this.state.tarea,
				fechaexa: this.state.fechaexa,
			};
			await axios.put(`${process.env.REACT_APP_API_URL}/seccions/` + this.state._id, updatedNote);
			toast.dark('Seccion actualizado correctamente');
		} else {
			const newNote = {
				category: this.state.category,
				chapter: this.state.chapter,
				curse: this.state.curse,
				nombre: this.state.nombre,
				contenido: this.state.contenido,
				tarea: this.state.tarea,
				fechaexa: this.state.fechaexa,
			};
			// console.log(newNote);
			await axios.post(`${process.env.REACT_APP_API_URL}/seccions`, newNote);
			toast.dark('Seccion creada correctamente');
		}
		this.getNotes();
		this.closeChat();
		this.setState({
			nombre: '',
			chapter: '',
			editing: '',
			contenido: '',
			tarea: '',
			_id: '',
			fechaexa: '',
		});
	};

	deleteSs = async noteId => {
		const response = window.confirm('Deseas eliminar este curso?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/seccions/` + noteId);
			this.getNotes();
			toast.dark('Removido correctamente');
		}
	};

	///////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////
	//Task
	///////////////////////////////////////////////////////////////////

	fileSelectHandler = files => {
		// console.log(files);
		var array = [ 'application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/PNG' ];
		// console.log(array.includes(files[0].type));
		if (files) {
			if (files[0].size < 1048576 && array.includes(files[0].type)) {
				this.setState({
					files,
				});
			} else {
				alert('Solo se acepta archivos no mayor a 1MB en formatos pdf, jpeg, jpg y png ');
			}
		}
	};

	fileSelectHandlerww = (idsec, idchp) => {
		// console.log(idsec);
		this.setState({
			section: idsec,
			chapter: idchp,
			task: true,
			editing: false,
			submit: 'Entregar tarea y seguir editando',
		});
	};

	fileUploadHandler = async e => {
		e.preventDefault();
		//console.log(this.state.files[0]);
		const data = new FormData();
		data.append('archivo', this.state.files[0]);
		data.append('idsec', this.state.section);
		data.append('contenido', this.state.contenido);
		data.append('chapter', this.state.chapter);
		data.append('curse', getCokie('idc'));
		data.append('user', isAuth()._id);
		// console.log(data);
		
		if (!this.state.editing) {
			axios
				.post(`${process.env.REACT_APP_API_URL}/tasks/`, data, {})
				.then(res => {
					// console.log(res);
					this.getNotes();
				})
				.catch(err => console.log(err));
			toast.dark('Tarea entregada correctamente');
		} else {
			await axios.put(`${process.env.REACT_APP_API_URL}/tasks/` + this.state._id, data);
			this.getNotes();
			toast.dark('Tarea actualizada correctamente');
		}
		this.closeTask();
		this.setState({
			id: '',
			contenido: '',
			files: '',
		});
	};

	getTask = async (file, content) => {
		this.setState({
			file: file,
			task: true,
			contenido: content,
			editing: false,
			submit: 'Tu tarea',
		});
	};
	upDateTasks = async idtask => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/` + idtask);
		// console.log(res.data[0]);

		this.setState({
			files: res.data[0].file,
			idsec: res.data[0].section,
			_id: res.data[0]._id,
			contenido: res.data[0].content,
			editing: true,
			submit: 'Actualizar tarea',
		});
	};

	CleanFields = async () => {
		this.setState({
			nombre: '',
			chapter: '',
			contenido: '',
			tarea: '',
			files: '',
			timexa: '',
			editing: '',
			option: '',
			task: true,
			_id: '',
			fechaexa: new Date(),
		});
	};
	deleteTask = async IdT => {
		// console.log(IdT);
		const response = window.confirm('Deseas eliminar este tarea?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/` + IdT);
			this.getNotes();
			toast.dark('Removido correctamente');
		}
	};

	createTest = idc => {
		// console.log(idc);
		this.setState({
			_id: idc,
			submit: 'Crear examen',
		});
	};
	updateTest = async (idchp, idc) => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/tests/` + idchp);
		// console.log(res.data);

		this.setState({
			preguntas: res.data[0].preguntas,
			respuestas: res.data[0].respuestas,
			_id: idc,
			submit: 'Actualizar Examen',
			editing: true,
		});
	};
	submitTest = async e => {
		e.preventDefault();
		// console.log(this.state.editing);
		const Data = {
			preguntas: this.state.preguntas,
			respuestas: this.state.respuestas,
			foreign: this.state._id,
			user: isAuth()._id,
		};
		if (this.state.editing) {
			await axios.put(`${process.env.REACT_APP_API_URL}/tests/` + this.state._id, Data);
			this.getNotes();
			toast.success('Seccion actualizado correctamente');
		} else {
			// console.log(Data);
			await axios.post(`${process.env.REACT_APP_API_URL}/tests`, Data);
			this.getNotes();
		}
		this.setState({
			preguntas: '',
			respuestas: '',
			_id: '',
		});
	};
	render() {
		return (
			<div>
				<ToastContainer
					position="bottom-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				{/* ////////////////////////////////////////////////////////////// Actualizar curso y seccion */}
				<Modal
					show={this.state.showModal}
					onHide={() => {
						this.closeChat();
						this.CleanFields();
					}}
					animation={false}
				>
					<div className="modal-header font-weight-bold text-uppercase">
						{this.state.submit}
					</div>
					<Modal.Body>
						<div className="card my-3">
							<div className="componentWrappertextleft text-uppercase">
								Nombre
							</div>
							<Input
								style={{ width: '100%' }}
								onChange={this.onInputChange}
								name="nombre"
								value={this.state.nombre}
								required
							/>
						</div>
						<div className="card my-3">
							<div className="componentWrappertextleft text-uppercase">
								{this.state.submit === 'Actualizar capítulo' || this.state.submit === 'Crear curso'
									? 'Examen'
									: 'Teoría'}
							</div>

							<TextareaAutosize
								placeholder={
									this.state.submit === 'Actualizar capítulo' || this.state.submit === 'Crear curso'
										? 'Examen'
										: 'Teoría'
								}
								name="contenido"
								rows="3"
								onChange={this.onInputChange}
								value={this.state.contenido}
								required
							/>
						</div>
						{/*}<CircularProgress variant="determinate" value={90} />*/}
						<div className="card form-group">
							<div className="componentWrappertextleft text-uppercase">
								Tarea
							</div>
							<TextareaAutosize
								placeholder="Tarea"
								name="tarea"
								rows="3"
								onChange={this.onInputChange}
								value={this.state.tarea}
								required
							/>
						</div>

						<div className="card form-group">
							<div
								className="componentWrappertextleft text-uppercase"
								style={{
									zIndex: 1050,
								}}
							>
								{this.state.submit === 'Actualizar capítulo' || this.state.submit === 'Crear curso'
									? 'fecha examen'
									: 'fecha entrega tarea'}
							</div>
							<DatePicker
								style={{ zIndex: '-1' }}
								className="form-control"
								selected={this.state.fechaexa}
								onChange={this.onChangeDate}
								showTimeSelect
								dateFormat="MMMM d, yyyy h:mm aa"
							/>
						</div>
						{this.state.option === 'sec'
							? null
							: <div className="card form-group">
									<div className="componentWrappertext text-uppercase">
										Tiempo de examen
									</div>
									<Input onChange={this.onInputChange} name="timexa" value={this.state.timexa} required />
								</div>}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="contained"
							color="primary"
							margin="dense"
							onClick={this.state.option === 'sec' ? this.SubmitS : this.onSubmit}
						>
							{this.state.submit}
						</Button>
						<Button
							style={{ margin: '2px', backgroundColor: 'rgb(15, 78, 87)' }}
							color="secondary"
							margin="none"
							variant="contained"
							onClick={() => {
								this.closeChat();
								this.CleanFields();
							}}
						>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>

				{/* //////////////////////////////////////////////////////////////Show Contenido y tarea */}

				<div className="modal fade bd-example" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
					<div className="modal-dialog  modal-dialog-scrollable modal-xl" role="document">
						<div className="modal-content">
							<div className="modal-header text-uppercase">
								Seccion {this.state.index}: {this.state.submit}
							</div>
							<div className="modal-body p-1 text-info">
								{this.state.task && this.state.file != ''
									? <div className="text-center">
											<img
												src={`${process.env.REACT_APP_URL}/tasks/` + this.state.file}
												className="img-fluid m-auto my-1"
												alt="www"
												onError={e => {
													e.target.src = authSvg; //replacement image imported above
													e.target.style = 'padding: 3px; margin: 1px;'; // inline styles in html format
												}}
											/>
											<div>
												<a
													className="btn btn-light mt-1 btn-sm small"
													target="_blank"
													href={`${process.env.REACT_APP_URL}/tasks/${this.state.file}`}
												>
													Descargar {this.state.file}
												</a>
											</div>
										</div>
									: null}
								<div className="card mt-2 p-2 sky">
									<div className="componentWrappertext  sky2   text-uppercase text-center">
										{!this.state.task ? 'Teoría de la sección' : 'Su tarea'}
									</div>

									<KatexMarkdown>{this.state.contenido}</KatexMarkdown>
								</div>
								{!this.state.task
									? <div className="card mt-3 p-2 sky">
											<div className="componentWrappertext  sky2  text-uppercase text-center">
												Tarea de la sección
											</div>
											<KatexMarkdown>{this.state.tarea}</KatexMarkdown>
										</div>
									: null}
							</div>
							<div className="modal-footer p-1">
								<button
									type="button"
									data-dismiss="modal"
									aria-label="Close"
									className="btn this2 text-light"
									onClick={this.CleanFields}
								>
									Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* //////////////////////////////////////////////////////////////Entrega y actualización tarea */}

				<Modal
					show={this.state.showModaltask}
					onHide={() => {
						this.closeTask();
						this.CleanFields();
					}}
					animation={false}
				>
					<div className="modal-header text-uppercase">{this.state.submit}</div>

					<Modal.Body>
						<input
							type="file"
							className="my-2"
							accept=".doc,.docx,.pdf,image/*"
							onChange={e => {
								this.fileSelectHandler(e.target.files);
							}}
						/>

						<TextareaAutosize
							type="text"
							rows="10"
							className="form-control"
							placeholder="Contenido"
							name="contenido"
							onChange={this.onInputChange}
							value={this.state.contenido}
							required
						/>

						<KatexMarkdown>{this.state.contenido}</KatexMarkdown>
					</Modal.Body>

					<Modal.Footer>
						<Button
							style={{ margin: '2px', backgroundColor: 'rgb(15, 78, 87)' }}
							color="primary"
							variant="contained"
							onClick={this.fileUploadHandler}
						>
							wwwwwwwwwww
						</Button>
						<Button
							style={{
								margin: '2px',
								backgroundColor: 'rgb(15, 78, 250)',
							}}
							color="secondary"
							variant="contained"
							onClick={() => {
								this.CleanFields();
								this.closeTask();
							}}
						>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>

				<Navigation />

				{isAuth().role === 'admin'
					? <div
							style={{
								position: 'fixed',
								bottom: 0 + 'em',
								left: 0,
								zIndex: 1050,
							}}
						>
							<button
								className="btn btn-info"
								style={{ color: '#000' }}
								onClick={() => {
									this.createcurso();
									//this.openChat();
								}}
							>
								New Cpt
							</button>
						</div>
					: null}

				{/* ////////////////////////////////////////////////////////////// Test */}
				<div
					className="modal fade bd-exa"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="myLargeModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-xl" role="document">
						<div className="modal-content">
							<form onSubmit={this.submitTest}>
								<div className="modal-header font-weight-bold">
									{this.state.submit}
								</div>
								<div className="modal-body mx-3">
									<textarea
										type="text"
										className="form-control mb-1"
										placeholder="Preguntas"
										name="preguntas"
										rows="7"
										onChange={this.onInputChange}
										value={this.state.preguntas}
										required
									/>
									<KatexMarkdown>{this.state.preguntas}</KatexMarkdown>
									<textarea
										type="text"
										className="form-control"
										placeholder="Respuestas"
										name="respuestas"
										rows="7"
										onChange={this.onInputChange}
										value={this.state.respuestas}
										required
									/>
									<KatexMarkdown>{this.state.respuestas}</KatexMarkdown>
								</div>
								<div className="modal-footer d-flex right-content-center">
									<button className="btn btn-info">
										{this.state.submit} --
										{this.state._id}
									</button>
									<button
										type="button"
										className="btn btn-secondary"
										data-dismiss="modal"
										aria-label="Close"
										onClick={this.CleanFields}
									>
										Cerrar
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="container my-3 text-center">
					<div className="text-light text-uppercase">
						{this.state.ccs.nombre}
					</div>

					<div className="row d-flex justify-content-center align-items-center p-0 m-0 border">
						{this.state.zz.map((note, index) => (
							<div className="col-md-6 p-1 m-0 text-center" key={index}>
								<div className="text-uppercase text-light">
									Unidad {index + 1}: {note.nombre}
								</div>

								{isAuth().role === 'admin'
									? <div className="container text-center">
											<div className="btn-group">
												<button
													className="btn btn-success"
													onClick={() => {
														this.upDate(note._id);
														this.openChat();
													}}
												>
													Edit chapter
												</button>
												<button
													onClick={() => {
														this.CreateSeccion(note._id);
														//this.openChat();
													}}
													className="btn btn-light"
												>
													New theme
												</button>

												<button onClick={() => this.deleteNote(note._id)} className="btn btn-warning">
													Delete chapter
												</button>
											</div>
										</div>
									: null}
								<div className="text-white">
									{Date.parse(new Date(note.fechaexa)) / 1000 < Date.parse(new Date()) / 1000 &&
										Date.parse(new Date()) / 1000 < Date.parse(new Date(note.fechaexa)) / 1000 + note.timexa * 3600
										? <Link to={'/test/' + note._id + '/' + (index + 1)} className="text-white">
												<div className="text-center p-1">
													Exam. ahora.{' '}
													{new Date(note.fechaexa).toLocaleString().substring(0, 21)}
													{'. '}
													{note.timexa} H
												</div>
											</Link>
										: Date.parse(new Date(note.fechaexa)) / 1000 + note.timexa * 3600 < Date.parse(new Date()) / 1000
												? <div className="text-center p-1">
														Exam. cap. fue{' '}
														{new Date(note.fechaexa).toLocaleString().substring(0, 21)}{' '}
														{note.timexa}
													</div>
												: <div className="text-center p-1">
														Exam. cap. es{' '}
														{new Date(note.fechaexa).toLocaleString().substring(0, 21)}{' '}
														{note.timexa} horas
													</div>}
								</div>

								<div className="row d-flex justify-content-center align-items-center p-0 m-0">
									{note.sec.map((wwwww, index) => (
										<div key={wwwww._id} className="col-md-6 p-1 m-0 text-center">
											<div className="card border p-1">
												<div>
													<div className="text-uppercase text-light">
														T {index + 1}: {wwwww.nombre}
													</div>
													<div className={wwwww.tasks.length === 0 ? 'bg-info' : 'bg-warning'}>
														<button
															data-toggle="modal"
															data-target=".bd-example"
															onClick={() => this.getS(wwwww.nombre, wwwww.contenido, wwwww.tarea, index + 1)}
															className="btn btn-info"
														>
															Show theme
														</button>
														{wwwww.tasks.length === 0
															? <div>
																	{Date.parse(new Date(wwwww.fechaexa)) / 1000 > Date.parse(new Date()) / 1000
																		? <div>
																				<button
																					onClick={() => {
																						this.fileSelectHandlerww(wwwww._id, note._id);
																						this.openTask();
																					}}
																					className="btn btn-light"
																				>
																					Entregar tarea
																				</button>
																				<div className="blue1 p-1 text-light">
																					Hasta{' '}
																					{new Date(wwwww.fechaexa).toLocaleString().substring(0, 21)}
																				</div>
																			</div>
																		: <div className="blue1 p-1  text-light">
																				Culminó{' '}
																				{new Date(wwwww.fechaexa).toLocaleString().substring(0, 21)}
																			</div>}
																</div>
															: null}
														{isAuth().role === 'admin'
															? <div className="btn-group">
																	{' '}
																	<button
																		data-toggle="modal"
																		data-target=".bd-example-modal-lg"
																		onClick={() => {
																			this.upDateS(wwwww._id);
																			this.openChat();
																		}}
																		className="btn btn-light"
																	>
																		Edit theme
																	</button>
																	<button onClick={() => this.deleteSs(wwwww._id)} className="btn btn-success">
																		Delete theme
																	</button>
																</div>
															: null}
														<div>
															{wwwww.tasks.map(ww => (
																<div>
																	{0 === 0
																		? <div key={ww._id} className="text-uppercase">
																				<div className="text-uppercase">
																					Tarea entregada{' '}
																					{Date.parse(new Date(wwwww.fechaexa)) / 1000 > Date.parse(new Date()) / 1000
																						? 'editar hasta'
																						: 'Culminó'}
																					{' '}
																					{new Date(wwwww.fechaexa).toLocaleString().substring(0, 21)}
																				</div>
																				<button
																					className="btn btn-light"
																					data-toggle="modal"
																					data-target=".bd-example"
																					onClick={() => this.getTask(ww.file, ww.content)}
																				>
																					Show task
																				</button>
																				{Date.parse(new Date(wwwww.fechaexa)) / 1000 > Date.parse(new Date()) / 1000
																					? <div className="btn-group">
																							<button
																								data-toggle="modal"
																								data-target="#modalLoginFormWW"
																								onClick={() => {
																									this.upDateTasks(ww._id);
																									this.openTask();
																								}}
																								className="btn btn-info"
																								style={{ color: 'sky' }}
																							>
																								Edit task
																							</button>
																							<button
																								onClick={() => this.deleteTask(ww._id)}
																								className="btn btn-light"
																								style={{ color: 'sky' }}
																							>
																								Delete task
																							</button>
																						</div>
																					: null}
																			</div>
																		: <div className="bg-danger">
																				Tarea entregada {ww.fechatarea}
																			</div>}
																</div>
															))}
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>

							</div>
						))}
					</div>

					<div className="container text-uppercase text-white">
						{Date.parse(new Date(this.state.ccs.fechaexamen)) / 1000 < Date.parse(new Date()) / 1000 &&
							Date.parse(new Date()) / 1000 <
								Date.parse(new Date(this.state.ccs.fechaexamen)) / 1000 + this.state.ccs.timexa * 3600
							? <Link to={'/test/' + this.props.match.params.id + '/' + 'curse'} className="text-white">
									<div className="container bg-warning text-center p-1">
										Ex. final ahora.{' '}
										{new Date(this.state.ccs.fechaexamen).toLocaleString().substring(0, 24)}
										{'. '}
										{this.state.ccs.timexa} H
									</div>
								</Link>
							: Date.parse(new Date(this.state.ccs.fechaexamen)) / 1000 + this.state.ccs.timexa * 3600 <
									Date.parse(new Date()) / 1000
									? <div className=" container text-light text-center p-1">
											Ex. final fue{' '}
											{new Date(this.state.ccs.fechaexamen).toLocaleString().substring(0, 24)}{' '}
											con duración de {this.state.ccs.timexa} horas.{' '}
											{this.state.testrespchp.length}
										</div>
									: <div className=" container text-light text-center p-1">
											Ex. final es{' '}
											{new Date(this.state.ccs.fechaexamen).toLocaleString().substring(0, 24)}{' '}
											con duración de {this.state.ccs.timexa} horas
										</div>}
					</div>

					<div className="border text-uppercase text-light">
						<div>
							<a href={'#taskend'} data-toggle="collapse" className="pt-1 text-center text-uppercase  text-light">
								TAREA DEL CURSO
							</a>
							<div id={'taskend'} className="collapse p-1">
								{this.state.ccs.tarea}
							</div>

							<div className="small p-1 text-uppercase text-light">
								Entregada -{' '}
								{Date.parse(new Date(this.state.ccs.fechatarea)) / 1000 > Date.parse(new Date()) / 1000
									? 'puede editar hasta'
									: 'culminó fecha '}
								{new Date(this.state.ccs.fechatarea).toLocaleString().substring(0, 21)}
							</div>
							<div>
								{this.state.tasksendl.length === 0
									? <div className="">
											<button
												style={{ color: 'sky' }}
												onClick={() => {
													this.fileSelectHandlerww(this.state.ccs._id, this.state.ccs._id);
													this.openTask();
												}}
												className="btn btn-light"
											>
												Show taskChp
											</button>
										</div>
									: null}

								<button
									onClick={() => this.getTask(this.state.tasksend.file, this.state.tasksend.content)}
									data-toggle="modal"
									data-target=".bd-example"
									className="btn btn-success"
								>
									Task
								</button>
								{Date.parse(new Date(this.state.ccs.fechatarea)) / 1000 > Date.parse(new Date()) / 1000
									? <div>
											<button
												onClick={() => {
													this.upDateTasks(this.state.tasksend._id);
													this.openTask();
												}}
												className="btn btn-light"
											>
												Edit
											</button>
											<button
												onClick={() => this.deleteTask(this.state.tasksend._id)}
												style={{ color: 'sky' }}
												className="btn btn-info"
											>
												Trash
											</button>
										</div>
									: null}
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}
