//brechmanalarcon@esfapa.edu.pe 72578511 
// import Select from 'react-select'
// browser-image-compression
// https://github.com/101arrowz/fflate
//https://github.com/MrBlenny/react-flow-chart/issues/55
// https://codesandbox.io/p/sandbox/fflate-zip-files-yuu21?file=%2Fsrc%2Findex.js
//import DatePicker from "react-datepicker";
// import { IconButton } from '@material-ui/core';
// import 'react-datepicker/dist/react-datepicker.css';
// import io from "socket.io-client";
import React, { Component } from 'react';
// import Socket from "../screens/Chat.jsx";
import Navigation from '../screens/Navigation.jsx';
import Headroom from "react-headroom";
import ExportToPdf from './boletanotas.jsx';
import ExportToExcel from './calculadorajs'
import ReportHtml from './calculadorajs copy'
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Row } from 'react-bootstrap';
import axios from 'axios';
import { setLocalStorage, removeCokie, removeLocalStorage, isAuth } from '../helpers/auth.js';
import { Link } from 'react-router-dom';
import authSvgwww from "../assests/www.jpg";
import 'react-datepicker/dist/react-datepicker.css';
import { MdAdd, MdAddCircle, MdCreate, MdEdit, MdExpandCircleDown, MdGetApp, MdOutlineTransitEnterexit, MdRemove, MdRemoveCircleOutline } from "react-icons/md";
import { GiCaveEntrance, GiExpand, GiOnSight } from 'react-icons/gi';
import { ExpansionPanel } from '@material-ui/core';

export default class CreateNote extends Component {

	state = {
		cursesteacher: [],
		cursesSource: [],
		stdcalification: [],
		stds: [],
		files: [],
		title: "",
		mencion: "ED",
		ciclo: "1",
		year: "2025",
		semestre: "i",
		foto: "",
		option: "2",
		description: "",
		showModal: false,
		Generated_Curses: [],
		submit: '',
		idcurse: '',
		photoSelected: ''
	};


	fileSelectHandler = async (file) => {
		console.log(file[0]);
		// var array = ["image/jpeg", "image/jpg", "image/png", "image/PNG", "image/svg+xml"];
		// console.log(array.includes(files[0].type));
		// if (files) {
		//   if (files[0].size < 105048576 && array.includes(files[0].type)) {
		if (file[0]) {
			// console.log(file[0])
			this.setState({
				files: file[0]
			})
			// setFormData({ ...formData, files: file, namefile: file[0].type })
			const reader = new FileReader();
			reader.onload = e => this.setState({ photoSelected: reader.result, files: file, namefile: file[0].type });
			reader.readAsDataURL(file[0]);
		}
		// } else {
		//   toast.dark(
		//     "Solo se acepta archivos no mayor a 1MB en formatos pdf, jpeg, jpg y png "
		//   );
		// }
		//    }
	};


	open = () => this.setState({ showModal: true });
	close = () => this.setState({ showModal: false });

	getNotes = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/curses/cursosespecificos/${JSON.parse(localStorage.getItem("user"))._id}/true/source`);
		console.log(res.data[0], "w wwwwww")
		this.setState({
			cursesteacher: res.data[0].curses,
			report: res.data[0].cursesstd ? res.data[0].cursesstd : [],
		});
	};

	getSourcesCurses = async (mencion, ciclo) => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/curses/cursossources/${mencion}/${ciclo}`).then(res => {
			console.log(res.data, "w wwwwww")
			this.setState({
				cursesSource: res.data,
			});
			this.open()
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		})

	};

	getGenerateCurses = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/curses/Getgeneratecursosculqui/${isAuth()._id}/true`).then(res => {
			console.log(res.data, "newwwwww");
			this.setState({ enable: false })
			this.setState({ Generated_Curses: res.data });
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		})
	}

	componentWillUnmount() {
		// this.socket.disconnect();
	}

	async componentDidMount() {
		if (JSON.parse(localStorage.getItem("user"))._id) {
			this.getGenerateCurses();
			this.getNotes();
		}
		if (isAuth().rol === '3') { this.getstdcalifications() }

		document.title = "PANEL USUARIO"
		removeCokie('idc');
		removeLocalStorage('idc');
		removeCokie('idcat');
		removeLocalStorage('idcat');
		removeCokie('curse');
		removeLocalStorage('curse');
	}

	getstdcalifications = async () => {
		await fetch(`${process.env.REACT_APP_API_URL}/users/stdnotes/${JSON.parse(localStorage.getItem("user"))._id}`)
			.then((response) => response.json())
			.then((www) => {
				console.log(www, "w1wwwww")
				this.setState({
					stdcalification: www,
					// report: res.data[0].cursesstd ? res.data[0].cursesstd : [],
				});
				var ciclos = []
				for (var i = 0; i < www.length; i++) {
					ciclos.push({ value: www[i]._id, label: www[i]._id })
				}
				// setOptions(ciclos)
				// setSelectedOption({ value: www[www.length - 1]._id, label: www[www.length - 1]._id })
			});
	}


	getstd = async (rol) => {
		await fetch(`${process.env.REACT_APP_API_URL}/users/userAll/${rol}`)
			.then((response) => response.json())
			.then((www) => {
				if(rol==='3'){[www[3], www[4]] = [www[4], www[3]]};
				console.log(www, "zzz")
				this.setState({
					stds: www,
					// report: res.data[0].cursesstd ? res.data[0].cursesstd : [],
				});
				// var ciclos = []
				// for (var i = 0; i < www.length; i++) {
				// 	ciclos.push({ value: www[i]._id, label: www[i]._id })
				// }
				// // setOptions(ciclos)
				// setSelectedOption({ value: www[www.length - 1]._id, label: www[www.length - 1]._id })
			});
	}

	CurseUpdate = async () => {
		console.log(this.state.files[0])
		const data = new FormData()
		data.append("img", this.state.files[0])
		data.append("description", this.state.description)
		data.append("title", this.state.title)
		await axios.put(`${process.env.REACT_APP_API_URL}/curses/` + this.state.idcurse, data).then(res => {
			console.log(res.data, "wwwww");
			toast.dark(res.data)
			this.close()
			this.getNotes();
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		})
	}


	CurseCreate = async (id, title, description, mencion, credito, ciclo, codigo) => {
		console.log(this.state.title, this.state.description)
		await axios.post(`${process.env.REACT_APP_API_URL}/curses/`, { user: isAuth()._id, show: 'true', mencion: mencion, credito: credito, ciclo, codigo, title: title, description, type: 'source', year: new Date().getFullYear() + '', description: description }).then(res => {
			console.log(res.data, "wwwww");
			if (res.data === 'Ya agregó el curso') {
				toast.error(res.data)
			} else {
				toast.dark(res.data)
				this.close()
				this.getNotes();
			}
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		})
	}


	UserUpdate = async (id, rol, mencion, ciclo, tipostd) => {
		// this.state.stds[1] E ED ...
		// this.state.stds[1].records 1 2 3 ...
		// this.state.stds[1].records[1] stds ...
		// [this.state.stds[1].usser[1].records[3], this.state.stds[1].usser[1].records[1]] = [this.state.stds[1].usser[1].records[3], this.state.stds[1].usser[1].records[1]];
		// await console.log(id, rol, mencion, ciclo, tipostd)
		// await console.log(this.state.stds)

		// toast.info(event.target.name)
		await axios.put(`${process.env.REACT_APP_API_URL}/users/user/${id}`, { rol, mencion, ciclo, tipostd }).then(res => {
			console.log(res.data, "wwwww");
			toast.dark(res.data)
			// this.close()
			this.getstd(rol);
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		})
	}



	onInputChange = e => {
		console.log(e.target.name, e.target.value)
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	deleteNote = async noteId => {
		const response = window.confirm('Deseas eliminar este curso?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/categories/` + noteId);
			this.getNotes();
			toast.dark('Removido correctamente');
		}
	};

	cleanFields = () => {
		this.setState({ nombre: '', contenido: '', tarea: '' });
	};

	fotto = async (e) => {
		console.log(e.currentTarget);
		var fottto = document.getElementById('refer');
		fottto.click();
	}


	deleteCurse = async noteId => {
		const response = window.confirm('Deseas eliminar este curso?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/curses/` + noteId);
			this.getNotes();
			toast.dark('Removido correctamente');
		}
	};

	handleChange = (event) => {
		// toast.info(event.target.name)
		this.setState({
			[event.target.name]: event.target.value,
		});
	};


	render() {
		return (
			<>
				<ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />

				<Headroom>
					<Navigation />
				</Headroom>
				<div className="py-3"></div>
				{/* {isAuth().rol === '1' ? <Socket /> : ''} */}
				{/* <Socket /> */}

				<Modal show={this.state.showModal} onHide={() => { this.close() }} animation={false} >
					<div className="modal-header font-weight-bold ">
						{this.state.submit}
					</div>
					<Modal.Body>
						{this.state.option === '1' ?
							<div className='justify-content-center align-items-center' style={{ padding: '.1em' }}>
								{this.state.cursesSource.map((message, index) => (
									<div className="" key={index} style={{ padding: '.1em' }}>
										{/* <div className='bg-info rounded text-center ' style={{ padding: '.2em' }}> */}
										<div className='text-center ffont' style={{ marginTop: '.1em', fontSize: '34px' }}>
											{message._id}
										</div>
										<div className='row justify-content-center align-items-center' style={{ padding: '.1em' }}>
											{message.records.map((messagge, index) => (
												<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4" key={index} style={{ padding: '.1em' }}>
													<button className="btn btn-info w-100" onClick={() => { this.CurseCreate(messagge._id, messagge.title, "message.description", messagge.mencion, messagge.credito, messagge.ciclo, messagge.codigo) }}>
														{messagge.title} <span className='ffont'>[{messagge.mencion} {messagge.ciclo}]</span>
													</button>
												</div>
											))}
										</div>
									</div>
									// </div>
								))}
							</div>
							:
							<>
								<div className="card form-group">
									<div className="componentWrappertextleft">
										Nombre
									</div>
									<input type="text" className="form-control  border-0 rounded-0" placeholder="Nombre" onChange={this.onInputChange} name="title" value={this.state.title} required />
								</div>
								<div className="card form-group">
									<div className="componentWrappertextleft ">
										Contenido
									</div>
									<textarea type="text" className="form-control  border-0 rounded-0" placeholder="Contenido" name="description" rows="2" onChange={this.onInputChange} value={this.state.description} required />
								</div>
								<input type="file" className="form-control d-none" onChange={(e) => { this.fileSelectHandler(e.target.files); }} id="refer"></input>
								<img className="img-fluid" src={this.state.photoSelected ? this.state.photoSelected : `${process.env.REACT_APP_URL}/collections/${this.state.foto}`} alt="Thumb" onClick={this.fotto} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />
							</>}

					</Modal.Body>
					<Modal.Footer>
						{/* <button className="btn btn-info" onClick={this.CurseCreate}>
							Crear nuevo curso
						</button> */}
						{this.state.option === '2' ? <button className="btn btn-info" onClick={this.CurseUpdate}>
							Actualizar curso
						</button> : ''}
						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.close() }} >
							Cerrar
						</button>
					</Modal.Footer>
				</Modal>


				<div className="container">
					<div className="p-1 my-1 text-center ffont h3">
						<span>{isAuth() && JSON.parse(localStorage.getItem("user")).name}</span><br />
						<span className='h5'>{isAuth() && JSON.parse(localStorage.getItem("user")).email}</span>
					</div>




					<div className='row justify-content-center align-items-center border rounded' style={{ padding: '.3em', marginBottom: '1em' }}>
						{this.state.Generated_Curses.map((message, index) => (
							<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4" key={index}>
								<div className="p-1 rounded contenedor">
									<img className="image rounded" src={`${process.env.REACT_APP_URL}/collections/${message.curses[0].img}`} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px" }} />
									<div className="overlay-text">
										<div className="border rounded text-center ffont h5" style={{ color: 'white', backgroundColor: 'rgba(54, 119, 166, 0.5)' }}>
											{message.curses[0].title} {message.curses[0].credito}
										</div>
										<div className="btn-group w-100">
											<Link className="btn btn-warning" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => setLocalStorage('curse', this.state.Generated_Curses[index].curses[0])} to={'/curso/' + message.curses[0]._id} >
												<GiExpand style={{ color: '#ffffffff', fontSize: '34px' }} />
											</Link>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>



					{isAuth() && JSON.parse(localStorage.getItem("user")).rol == '1' ?
						<div className='text-center'>
							<div className='text-center rounded p-1 border'>
								<div className='text-center text-warning ffont h3'>Roles</div>
								<div className='btn-group'>
									<button type="button" className='btn btn-warning' onClick={() => { this.getstd("1") }}>1</button>
									<button type="button" className='btn btn-warning' onClick={() => { this.getstd("2") }}>2</button>
									<button type="button" className='btn btn-warning' onClick={() => { this.getstd("3") }}>3</button>
									<button type="button" className='btn btn-warning' onClick={() => { this.getstd("4") }}>4</button>
									<button type="button" className='btn btn-warning' onClick={() => { this.getstd("5") }}>5</button>
									<button type="button" className='btn btn-warning' onClick={() => { this.getstd("subscriber") }}>Subscriber</button>
								</div>
							</div>

							<div className=''>
								<select className="btn btn-warning" name='year' aria-label="Default select example" value={this.state.year} onChange={this.handleChange}>
									<option value="2022">2022</option>
									<option value="2023">2023</option>
									<option value="2024">2024</option>
									<option value="2025">2025</option>
									<option value="2026">2026</option>
								</select>
								<select className="btn btn-warning" name='mencion' aria-label="Default select example" value={this.state.mencion} onChange={this.handleChange}>
									<option value="ED">ED</option>
									<option value="E">E</option>
									<option value="G">G</option>
									<option value="P">P</option>
								</select>
								<select className="btn btn-warning" name='ciclo' aria-label="Default select example" value={this.state.ciclo} onChange={this.handleChange}>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
								</select>
								<ReportHtml year={this.state.year} ciclo={this.state.ciclo} mencion={this.state.mencion} />
								<ExportToExcel year={this.state.year} ciclo={this.state.ciclo} mencion={this.state.mencion} />
							</div>

							{/* <div >
								{this.state.stds.map((message, iindex) => (
									<div key={iindex}>
										wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
										<button>
											{iindex + 1}</button>
										<div id={iindex} >
											keys {iindex + 1}
											{message.usser.map((messsage, index) => (
												<div key={index}>
													zzz
													<button className="btn dropdown" data-toggle="collapse" data-target={"#collapseOnewww" + index}>
														{index + 1}</button>
													<div className="collapse indent" id={"collapseOnewww" + index} data-parent={"#"+iindex}>
														subkeys {index + 1}
													</div>
												</div>
											))}

										</div>
									</div>
								))}

							</div> */}

							{this.state.stds.map((message, iindex) => (
								<div className="" key={iindex}>
									{message ? <h1 className='text-warning text-center  w-100 ffont' style={{ fontSize: '54px' }}>
										{message._id == 'E' ? 'Escultura' : message._id == 'P' ? 'Pintura' : message._id == 'G' ? 'Grabado' : message._id == 'ED' ? 'Educación Artística' : 'No Matriculados'}
									</h1> : null}

									{message ? <div className="border-primary justify-content-center align-items-center" style={message._id == 'N' ? { backgroundColor: 'skyblue', padding: '.1em' } : {}}>
										{message.usser.map((messsage, index) => (
											<div className="row border justify-content-center align-items-center" style={{ padding: '.1em', marginBottom: '.3em' }} key={index}>
												<div className='text-info text-center w-100 h3 ffont'>
													Ciclo	{messsage._id} <span className='text-warning'>{message._id == 'E' ? 'Escultura' : message._id == 'P' ? 'Pintura' : message._id == 'G' ? 'Grabado' : message._id == 'ED' ? 'Educación Artística' : 'No Matriculados'}</span>
												</div>

												<div id={"www" + messsage._id} className="row justify-content-center align-items-center w-100" style={{ padding: '.1em', margin: '.1em' }}>
													{messsage.records.map((messagge, i) => (
														<div className="col-lg-4 col-md-6 mt-2" key={i}>
															{messagge.email} - {messagge.mencion} - {messagge.ciclo} - {messagge.tipostd} - {messagge.rol}

															<button className="btn btn-warning w-100" style={{ height: '11px', padding: '.1px' }} type="button" data-toggle="collapse" data-target={"#collapseOne" + messagge._id} aria-expanded="false">
															</button>

															<div className="input-group collapse" id={"collapseOne" + messagge._id}
																data-parent={"#www" + messsage._id}>
																<div className='btn-group w-100 pb-1'>
																	<button className='btn btn-outline-info' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, "P", messagge.ciclo, messagge.tipostd) }}>P</button>
																	<button className='btn btn-outline-info' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, "E", messagge.ciclo, messagge.tipostd) }}>E</button>
																	<button className='btn btn-outline-info' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, "G", messagge.ciclo, messagge.tipostd) }}>G</button>
																	<button className='btn btn-outline-info' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, "EDU", messagge.ciclo, messagge.tipostd) }}>ED</button>
																</div>
																<div className='btn-group w-100 pb-1'>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "1", messagge.tipostd) }}>1</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "2", messagge.tipostd) }}>2</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "3", messagge.tipostd) }}>3</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "4", messagge.tipostd) }}>4</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "5", messagge.tipostd) }}>5</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "6", messagge.tipostd) }}>6</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "7", messagge.tipostd) }}>7</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "8", messagge.tipostd) }}>8</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "9", messagge.tipostd) }}>9</button>
																	<button className='btn btn-outline-primary p-0' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, "10", messagge.tipostd) }}>10</button>
																</div>
																<div className='btn-group w-100 pb-1'>
																	<button className='btn btn-outline-info' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, messagge.ciclo, 'R') }}>R</button>
																	<button className='btn btn-outline-info' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, messagge.mencion, messagge.ciclo, 'L') }}>L</button>
																</div>

																<div className='btn-group w-100 pb-1'>
																	<button className='btn btn-outline-warning' onClick={() => { this.UserUpdate(messagge._id, "1", messagge.mencion, messagge.ciclo, messagge.tipostd) }}>1</button>
																	<button className='btn btn-outline-warning' onClick={() => { this.UserUpdate(messagge._id, "2", messagge.mencion, messagge.ciclo, messagge.tipostd) }}>2</button>
																	<button className='btn btn-outline-warning' onClick={() => { this.UserUpdate(messagge._id, "3", messagge.mencion, messagge.ciclo, messagge.tipostd) }}>3</button>
																	<button className='btn btn-outline-warning' onClick={() => { this.UserUpdate(messagge._id, "4", messagge.mencion, messagge.ciclo, messagge.tipostd) }}>4</button>
																	<button className='btn btn-outline-warning' onClick={() => { this.UserUpdate(messagge._id, "5", messagge.mencion, messagge.ciclo, messagge.tipostd) }}>5</button>
																</div>
																<div className='btn-group w-100'>
																	<button type="button" className='btn btn-warning' onClick={() => { this.UserUpdate(messagge._id, messagge.rol, "N", "N", "N") }}>No matriculado</button>
																</div>
																<button type="button" className='btn btn-primary my-1 text-uppercase w-100' onClick={() => { this.setState({ submit: `Agregar cursos de ${message.mencion === 'P' ? 'Pintura' : message.mencion === 'G' ? 'Grabado' : message.mencion === 'ED' ? 'Educación artística' : 'Escultura'} [${message.semestre === 'i' ? 'Impar' : 'Par'}]`, option: '1' }); this.getSourcesCurses(message.mencion, 'i') }}>
																	Convalidar
																</button>

															</div>
														</div>
													))}
												</div>
											</div>
										))}
									</div>
										: null}
								</div>
							))}
						</div>
						: null}


					{isAuth() && JSON.parse(localStorage.getItem("user")).rol == '2' ?
						<div className="container p-0 text-center my-3">

							<div className='btn-group'>
								<select className="btn btn-warning p-2 form-control" name="mencion" aria-label="Default select example" value={this.state.mencion} onChange={this.handleChange}>
									<option value="ED">ED</option>
									<option value="E">E</option>
									<option value="G">G</option>
									<option value="P">P</option>
								</select>
								<select className="btn btn-info p-2 form-control" style={{ width: '15em' }} name="semestre" aria-label="Default select example" value={this.state.semestre} onChange={this.handleChange}>
									<option value="i">Impar</option>
									<option value="p">Par</option>
								</select>
							</div>
							<br />

							<button type="button" className='btn btn-primary my-1 text-uppercase' onClick={() => { this.setState({ submit: `Agregar cursos [Mención: ${this.state.mencion === 'P' ? 'Pintura' : this.state.mencion === 'G' ? 'Grabado' : this.state.mencion === 'ED' ? 'Educación artística' : 'Escultura'}. Semestre: ${this.state.semestre === 'i' ? 'Impar' : 'Par'}]`, option: '1' }); this.getSourcesCurses(this.state.mencion, this.state.semestre) }}>
								Agregar cursos de	{this.state.mencion === 'P' ? 'Pintura' : this.state.mencion === 'G' ? 'Grabado' : this.state.mencion === 'ED' ? 'Educación artística' : 'Escultura'} [{this.state.semestre === 'i' ? 'Impar' : 'Par'}]
							</button>


							<div className='row justify-content-center align-items-center'>
								{this.state.cursesteacher.map((message, index) => (
									<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4" key={index}>
										<div className="p-1 border rounded contenedor">
											<img className="image" src={`${process.env.REACT_APP_URL}/collections/${message.img}`} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px" }} />
											<div className="overlay-text">
												<div className="mb-3 border rounded ffont text-light">
													{message.title} [{message.mencion}] [{message.ciclo}]
												</div>
												<div>
													<Link className="btn btn-warning text-light w-100 mt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => setLocalStorage('curse', this.state.cursesteacher[index])} to={'/curso/' + message._id} >
														Ir al curso
													</Link>
													<button type="button" className='btn btn-info mt-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.open(); this.setState({ idcurse: message._id, title: message.title, description: message.description, mencion: message.mencion, files: [], photoSelected: "", foto: message.img, submit: "Actualizar curso", option: '2' }) }}>	<MdEdit style={{ color: '#8000ffff', fontSize: '34px' }} />
													</button>
													<button type="button" className='btn btn-info mt-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.deleteCurse(message._id) }}>
														<MdRemoveCircleOutline style={{ color: '#ff00eeff', fontSize: '34px' }} />
													</button>
													{/* <button type="button" className='btn btn-info mt-1 w-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.open(); this.setState({ idcurse: message._id, title: message.title, description: message.description, mencion: message.mencion, files: [], photoSelected: "", foto: message.img }) }}>Comprar curso {isAuth()._id} {message._id}</button> */}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div> :
						null}



					{isAuth() && JSON.parse(localStorage.getItem("user")).rol == '3' ?
						<div className="container p-0 text-center my-3">
							<div className='row justify-content-center align-items-center'>
								{this.state.stdcalification.map((message, index) => (
									<div className="col-lg-4 col-md-6 mt-2" key={index}>
										<div className="p-2 border rounded" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}>
											<div className="text-uppercase">
												CICLO {message._id}
											</div>
											<div>
												<ExportToPdf data={this.state.stdcalification} cicle={message._id} yyear={message.mencions[0]._id} />
											</div>
											<table>
												<tr>
													<th>Mención</th>
													<th>Curso</th>
													<th>Nota</th>
													<th>Año</th>
												</tr>
												{message.mencions[0].cycles.map((MessageList, index) => (
													<tr className="col-md-4 mt-2" key={index}>
														<td>{MessageList.mencion}</td>
														<td>{MessageList.title}</td>
														<td>{MessageList.nota} </td>
														<td>{MessageList.year}</td>
													</tr>
												))}
											</table>
										</div>
									</div>
								))}
							</div>
						</div> :
						null}
				</div >
				<div className="py-3"></div>

			</>
		);
	}
}
