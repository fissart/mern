import React, { Component } from 'react';
//import authSvg from "../assests/update.svg";
import Navigation from '../screens/Navigation.jsx';
//import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Row } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import { MdEdit, MdDelete, MdOpenInNew } from 'react-icons/md';
import { IoMdCreate, IoIosCloseCircleOutline, IoMdTrendingUp } from 'react-icons/io';
import axios from 'axios';
import { removeCookie, removeLocalStorage, isAuth } from '../helpers/auth';

//@ts-checkimport addNotification from "react-push-notification";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {
	state = {
		nombre: '',
		fechaexamen: '',
		fechatarea: '',
		timexa: '',
		contenido: '',
		selectsubmit: false,
		editing: false,
		zz: [],
		www: [],
		wwr: [],
		_id: '',
		_idcurse: '',
		showModal: false,
		submit: '',
		test: '',
	};

	open = () => this.setState({ showModal: true });
	close = () => this.setState({ showModal: false });

	open1 = () => this.setState({ showModal1: true });
	close1 = () => this.setState({ showModal1: false });

	getNotes = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories/categcurseuser/` + isAuth()._id);
		this.setState({
			zz: res.data,
		});
		console.log(this.state.zz);
	};

	async componentDidMount() {
		this.getNotes();

		removeCookie('idc');
		removeLocalStorage('idc');
		removeCookie('idcat');
		removeLocalStorage('idcat');
		removeCookie('namecurse');
		removeLocalStorage('namecurse');
	}

	createCategory = async () => {
		this.setState({
			submit: 'Crear categoria',
			selectsubmit: true,
			editing: false,
		});
	};

	UserUpdateSet = async curseId => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories/` + curseId);
		console.log(res.data);
		this.setState({
			nombre: res.data.nombre,
			contenido: res.data.contenido,
			editing: true,
			selectsubmit: true,
			_id: res.data._id,
			submit: 'Actualizar usuario',
		});
	};

	createCurse = async iduser => {
		const Data = {
			category: iduser,
			nombre: 'Nombre curso',
			contenido: 'Contenido',
			tarea: 'Tarea',
			test: 'Examen',
			fechaexamen: 'December 31, 2021 7:30 PM',
			fechatarea: 'December 31, 2021 7:30 PM',
			timexa: '2',
		};
		await axios.post(`${process.env.REACT_APP_API_URL}/curses`, Data);
		this.getNotes();
		toast.dark('Creado correctamente');
	};

	UserUpdate = async () => {
		const Data = {
			nombre: this.state.nombre,
			contenido: this.state.contenido,
		};
		await axios.put(`${process.env.REACT_APP_API_URL}/categories/` + this.state._id, Data);
		toast.dark('Actualizado correctamente');
		this.getNotes();
		//this.close();
		this.setState({
			nombre: '',
			contenido: '',
		});
		this.close();
	};

	CreateUser = async () => {
		const Data = {
			nombre: 'this.state.nombre',
			contenido: 'this.state.contenido',
		};
		await axios.post(`${process.env.REACT_APP_API_URL}/categories`, Data);
		toast.dark('Creado correctamente');
		this.getNotes();
	};

	upDateCurseSet = async curseId => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/curses/` + curseId);
		this.setState({
			nombre: res.data.nombre,
			contenido: res.data.contenido,
			tarea: res.data.tarea,
			test: res.data.test,
			timexa: res.data.timexa,
			fechaexamen: new Date(res.data.fechaexamen),
			fechatarea: new Date(res.data.fechatarea),
			_idcurse: res.data._id,
		});
	};

	CurseUpdate = async () => {
		const Www = {
			nombre: this.state.nombre,
			contenido: this.state.contenido,
			tarea: this.state.tarea,
			test: this.state.test,
			timexa: this.state.timexa,
			fechaexamen: this.state.fechaexamen,
			fechatarea: this.state.fechatarea,
		};
		await axios.put(`${process.env.REACT_APP_API_URL}/curses/` + this.state._idcurse, Www);
		this.setState({
			category: '',
			nombre: '',
			contenido: '',
			tarea: '',
			test: '',
			fechaexamen: '',
			fechatarea: '',
			timexa: '',
		});
		toast.dark('Actualizado correctamente');
		this.close1();
		this.getNotes();
	};

	onInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onChangeDatetest = fechaexamen => {
		this.setState({ fechaexamen });
	};

	onChangeDatetask = fechatarea => {
		this.setState({ fechatarea });
	};

	deleteNote = async noteId => {
		const response = window.confirm('Deseas eliminar este curso?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/categories/` + noteId);
			this.getNotes();
			toast.dark('Removido correctamente');
		}
	};

	getCateg = async idtask => {
		const resww = await axios.get(`${process.env.REACT_APP_API_URL}/categories/` + idtask + `/` + isAuth()._id);
		console.log(this.state.wwr);
		this.setState({
			wwr: resww.data[0].capitulos,
		});
	};

	addCurso = async idcurse => {
		const ww = await axios.get(`${process.env.REACT_APP_API_URL}/mycurses/www/` + idcurse + `/` + isAuth()._id);
		console.log(ww.data.length);
		const curseAdd = {
			user: isAuth()._id,
			curse: idcurse,
		};

		if (ww.data.length > 0) {
			toast.error('Ya te agregaste al curso');
		} else {
			const wwncurse = await axios.get(`${process.env.REACT_APP_API_URL}/mycurses/` + isAuth()._id);
			//      console.log(wwncurse.data.length);
			if (wwncurse.data.length < 1) {
				const response = window.confirm('Deseas agregarte al curso?');
				if (response) {
					await axios.post(`${process.env.REACT_APP_API_URL}/mycurses`, curseAdd);
				}
			} else {
				toast.dark('Ud solo puede unirse a uno');
			}
		}
		this.getNotes();
	};

	deleteCurso = async curso => {
		const response = window.confirm('Deseas borrarlo el curso?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/curses/` + curso);
		}
		this.getNotes();
		toast.dark('Removido correctamente');
	};

	deletetomyCurso = async midcurso => {
		console.log(midcurso);
		const response = window.confirm('Deseas borrarlo de tus cursos?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/mycurses/` + midcurso);
		}
		this.getNotes();
	};

	cleanFields = () => {
		this.setState({
			nombre: '',
			contenido: '',
			tarea: '',
			test: '',
			fechaexamen: '',
			fechatarea: '',
			timexa: '',
			_id: '',
			_idcurse: '',
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

				<Modal
					show={this.state.showModal}
					onHide={() => {
						this.close1();
					}}
					animation={false}
				>
					<div className="modal-header font-weight-bold ">
						Actualizar Usuario
					</div>
					<Modal.Body>
						<div className="card form-group">
							<div className="componentWrappertextleft ">
								Nombre
							</div>
							<input
								type="text"
								className="form-control  border-0 rounded-0"
								placeholder="Nombre"
								onChange={this.onInputChange}
								name="nombre"
								value={this.state.nombre}
								required
							/>
						</div>

						<div className="card form-group">
							<div className="componentWrappertextleft ">
								Contenido
							</div>
							<textarea
								type="text"
								className="form-control  border-0 rounded-0"
								placeholder="Contenido"
								name="contenido"
								rows="2"
								onChange={this.onInputChange}
								value={this.state.contenido}
								required
							/>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-success" onClick={this.UserUpdate}>
							Actualizar usuario
						</button>
						<button
							type="button"
							className="btn btn-primary"
							data-dismiss="modal"
							onClick={(this.cleanFields, this.close)}
						>
							Cerrar
						</button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={this.state.showModal1}
					onHide={() => {
						this.close();
					}}
					animation={false}
				>
					<div className="modal-header font-weight-bold bg-info">
						Actualizar curso
					</div>
					<Modal.Body className="bg-info">

						<div className="card form-group">
							<div className="componentWrappertextleft ">
								Nombre
							</div>
							<input
								type="text"
								className="form-control  border-0 rounded-0"
								placeholder="Nombre"
								onChange={this.onInputChange}
								name="nombre"
								value={this.state.nombre}
								required
							/>
						</div>

						<div className="card form-group">
							<div className="componentWrappertextleft ">
								Contenido
							</div>
							<textarea
								type="text"
								className="form-control  border-0 rounded-0"
								placeholder="Contenido"
								name="contenido"
								rows="2"
								onChange={this.onInputChange}
								value={this.state.contenido}
								required
							/>
						</div>
						<div>
							<div className="card form-group">
								<div className="componentWrappertextleft ">
									Test
								</div>
								<textarea
									type="text"
									className="form-control  border-0 rounded-0"
									placeholder="Test"
									name="test"
									onChange={this.onInputChange}
									value={this.state.test}
									required
								/>
							</div>
							<div className="card form-group">
								<div className="componentWrappertextleft ">
									Tarea
								</div>
								<textarea
									type="text"
									className="form-control  border-0 rounded-0"
									placeholder="Tarea"
									name="tarea"
									onChange={this.onInputChange}
									value={this.state.tarea}
									required
								/>
							</div>

							<div className="card form-group">
								<div
									className="componentWrappertextleft "
									style={{
										zIndex: 1050,
									}}
								>
									Fecha examen
								</div>
								<DatePicker
									className="form-control  border-0 rounded-0"
									selected={this.state.fechaexamen}
									onChange={this.onChangeDatetest}
									showTimeSelect
									dateFormat="MMMM d, yyyy h:mm aa"
								/>
							</div>
							<div className="card form-group">
								<div
									className="componentWrappertextleft "
									style={{
										zIndex: 1050,
									}}
								>
									Fecha tarea
								</div>
								<DatePicker
									className="form-control  border-0 rounded-0"
									selected={this.state.fechatarea}
									onChange={this.onChangeDatetask}
									showTimeSelect
									dateFormat="MMMM d, yyyy h:mm aa"
								/>
							</div>

							<div className="card form-group mb-0">
								<div className="componentWrappertextleft ">
									Tiempo examen
								</div>
								<input
									type="text"
									className="form-control  border-0 rounded-0"
									placeholder="Tiempo"
									onChange={this.onInputChange}
									name="timexa"
									value={this.state.timexa}
									required
								/>
							</div>
						</div>

					</Modal.Body>
					<Modal.Footer className="bg-info">
						<button className="btn btn-light" onClick={this.CurseUpdate}>
							Actualizar
						</button>
						<button
							type="button"
							className="btn btn-primary"
							data-dismiss="modal"
							onClick={(this.cleanFields, this.close1)}
						>
							Cerrar
						</button>
					</Modal.Footer>
				</Modal>

				<Navigation />
				{isAuth().role === 'admin'
					? <div
							style={{
								position: 'fixed',
								bottom: 0.5 + 'em',
								left: 0.1 + 'em',
								zIndex: 1050,
							}}
						>
							<button
								className="btn btn-info"
								onClick={() => {
									this.CreateUser();
									//this.createCategory();
									//this.open();
								}}
								style={{ color: '#000' }}
							>
								Crear usuario
							</button>
						</div>
					: null}

				<div className="container p-1 text-center my-3">
					<div className="d-none sky text-light  p-1 text-center ">
						{this.state.zz.length} áreas
					</div>

					{this.state.zz.map((message, index) => (
						<div className="card pt-4 pb-3 my-5  sky" key={index}>
							<div className="componentWrapper px-3 p-1 sky1 text-light text-uppercase">
								{message.nombre}
							</div>
							<div className="row p-1 mt-2 mx-1 d-flex justify-content-center align-items-center">
								{message.curse.map(wwwww => (
									<div
										key={wwwww._id}
										className={
											wwwww.mycurse.length === 1
												? 'col-md-6 col-lg-5 blue mx-4 my-5 py-5 text-info'
												: 'col-md-6 col-lg-5 this mx-4 my-5 py-5 text-info'
										}
									>
										{wwwww.mycurse.length === 0
											? <div className="componentWrapper container text-light   -lg this1 p-1 pb-3">
													{wwwww.nombre}
													<small className="componentWrapperbottom text-light    this2 p-1">
														{wwwww.contenido}
													</small>
												</div>
											: <div className="componentWrapper container  -lg blue1 pb-3">
													<a href={'#demo' + wwwww._id} data-toggle="collapse" className="text-light btn btn-sm w-100">
														{wwwww.nombre}
													</a>
													<small className="componentWrapperbottom container text-light   -lg blue2 p-1">
														{wwwww.contenido}
													</small>
												</div>}

										<div>
											{wwwww.mycurse.length === 0 && isAuth().role === 'subscriber'
												? <div className="componentWrapperbottom container p-0   -lg">
														<button onClick={() => this.addCurso(wwwww._id)} className="btn this1 w-100 text-light">
															Unirte
														</button>
													</div>
												: <div>
														<div id={'demo' + wwwww._id} className="collapse mb-4 mt-0">
															<button
																onClick={() => this.getCateg(wwwww._id)}
																className="btn btn-sm btn-success mr-1 mb-1"
																data-toggle="modal"
																data-target=".www"
															>
																Resumen del curso y tareas entregadas
															</button>
															<button
																onClick={() => this.deletetomyCurso(wwwww.mycurse[0]._id)}
																className="btn btn-sm btn-secondary mb-1"
															>
																Eliminar mi curso
															</button>
														</div>
														<div
															className="componentWrapperbottom color p-0 container
                             -lg"
														>
															{isAuth().role !== 'admin'
																? <Link
																		className="btn blue1 w-100 text-light"
																		to={'/curso/' + wwwww._id + '/' + wwwww.category}
																	>
																		Ir al curso
																		{/* de {wwwww.nombre} */}
																		{/* {wwwww.mycurse.length} */}
																	</Link>
																: null}
														</div>
													</div>}
											{isAuth().role === 'admin'
												? <div>
														<Link
															className="componentWrapperbottom container p-1  -lg this1 text-light"
															to={'/curso/' + wwwww._id + '/' + wwwww.category}
														>
															{wwwww._id}--
															{wwwww.mycurse.length}
														</Link>
														<button onClick={() => this.deleteCurso(wwwww._id)} className="btn this1 mt-1">
															Eliminar curso
														</button>
														<button
															data-toggle="modal"
															data-target=".bd-example-modal-lg"
															onClick={() => {
																this.upDateCurseSet(wwwww._id);
																this.open1();
															}}
															className="btn  this2 mt-1 ml-1"
														>
															Editar curso
														</button>
													</div>
												: null}
										</div>
									</div>
								))}
							</div>
							<div className="componentWrapperbottom text-center p-1">
								{isAuth().role === 'admin'
									? <div className="btn-group">
											<button
												className="btn btn-success"
												onClick={() => {
													this.UserUpdateSet(message._id);
													this.open();
												}}
												style={{ color: '#ffff' }}
											>
												Editar usuario
											</button>
											<button
												className="btn btn-danger"
												onClick={() => this.deleteNote(message._id)}
												style={{ color: '#ffff' }}
											>
												Delete user
											</button>
											<button
												className="btn btn-warning"
												onClick={() => {
													//this.onSubmitCurse(message._id);
													this.createCurse(message._id);
													//this.open();
												}}
												style={{ color: '#ffff' }}
											>
												Crear curso
											</button>

										</div>
									: null}
							</div>
						</div>
					))}

					<div
						className="modal fade www"
						id="modalLoginForm"
						role="dialog"
						aria-labelledby="myModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog modal-dialog-scrollable modal-xl" role="document">
							<div className="modal-content">
								<div className="container p-1 ">
									{this.state.wwr.map((message, index) => (
										<div className="container p-1" key={index}>
											<div className="text-center border  ">
												<div className="container text-center   ">
													Capítulo {index + 1}-{message.nombre}
												</div>
												<div className="container">
													<div className="row p-1 d-flex justify-content-center align-items-center">
														{message.sec.map((wwwww, index) => (
															<div key={wwwww._id} className="col-md-6 col-lg-5 border bg-light m-1 p-1 text-info ">
																<div className="container ">
																	<small>
																		Seccion {index + 1} -- {wwwww.nombre}
																	</small>
																</div>

																{wwwww.tasks.map(ww => (
																	<div key={ww._id} className="bg-warning">
																		<small>
																			Tarea S{index + 1} - {ww._id}
																		</small>
																	</div>
																))}
															</div>
														))}
													</div>
												</div>
												<div className="text-center" />
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}
}
