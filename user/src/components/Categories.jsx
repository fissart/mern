import React, { Component } from 'react';
import Navigation from '../screens/Navigation.jsx';
//https://github.com/MrBlenny/react-flow-chart/issues/55
//import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Row } from 'react-bootstrap';
import io from "socket.io-client";
// import { IconButton } from '@material-ui/core';
import axios from 'axios';
import { setLocalStorage, removeCokie, removeLocalStorage, isAuth } from '../helpers/auth';
import authSvgwww from "../assests/www.jpg";

// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {

	state = {
		zz: [],
		zzstd: [],
		title: "",
		mencion: "",
		foto: "",
		description: "",
		files: [],
		showModal: false,
		submit: '',
		idcurse: '',
		photoSelected: ''
	};


	fileSelectHandler = async (file) => {
		//console.log(formData.files, file);
		// var array = ["image/jpeg", "image/jpg", "image/png", "image/PNG", "image/svg+xml"];
		// console.log(array.includes(files[0].type));
		// if (files) {
		//   if (files[0].size < 105048576 && array.includes(files[0].type)) {
		if (file[0]) {
			// console.log(file[0])
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
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/curses/cursosespecificos/${JSON.parse(localStorage.getItem("user"))._id}/true`);
		console.log(res.data[0], "w wwwwww")
		this.setState({
			zz: res.data[0].curses,
			zzstd: res.data[0].cursesstd,
		});
	};

	componentWillUnmount() {
		this.socket.disconnect();
	}

	async componentDidMount() {
		if (JSON.parse(localStorage.getItem("user"))._id) {
			this.getNotes();
		}
		console.log(JSON.parse(localStorage.getItem("user"))._id, "w wwwwww");

		document.title = "PANEL"
		this.socket = io(`${process.env.REACT_APP_URL}`)
		this.socket.on("www", (ww) => {
			console.log(ww, "wwwnewww")
			// this.setState({ zz: ww });
		})
		// console.log(JSON.parse(localStorage.getItem("user")).name, "wwwwww_w")
		removeCokie('idc');
		removeLocalStorage('idc');
		removeCokie('idcat');
		removeLocalStorage('idcat');
		removeCokie('curse');
		removeLocalStorage('curse');
	}


	UserUpdate = async () => {
		const data = new FormData()
		data.append('foto', this.state.files[0])
		data.append("title", this.state.title)
		data.append("description", this.state.description)
		console.log(this.state.files[0], this.state.title, this.state.idcurse)
		await axios.put(`${process.env.REACT_APP_API_URL}/curses/` + this.state.idcurse, data);
		toast.dark('Actualizado correctamente');
		//this.setState({ nombre: '', contenido: '' });
		this.getNotes()
		this.close();
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
		console.log(e.currentTarget.id);
		// var fottto = document.getElementById('refer');
		// fottto.click();
	}


	render() {
		return (
			<>
				<ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />

				<Modal show={this.state.showModal} onHide={() => { this.close() }} animation={false} >
					<div className="modal-header font-weight-bold ">
						Actualizar Usuario
					</div>
					<Modal.Body>
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
						<input type="file" className="form-control d-none" onChange={(e) => { this.fileSelectHandler(e.target.files); }} id="fottto"></input>
						<img className="img-fluid" src={this.state.photoSelected ? this.state.photoSelected : `${process.env.REACT_APP_URL}/asignature/${this.state.foto}`} alt="Thumb" onClick={this.fotto} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />
					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-info" onClick={this.UserUpdate}>
							Actualizar curso
						</button>
						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {  this.close() }} >
							Cerrar
						</button>
					</Modal.Footer>
				</Modal>

				<Navigation />

				<div className="container">
					<div className="p-1 my-1 text-center h5">
						{isAuth() && JSON.parse(localStorage.getItem("user")).name}
					</div>

					{JSON.parse(localStorage.getItem("user")).rol == '2' ?
						<div className="container p-0 text-center my-3">
							<div className='row justify-content-center align-items-center'>
								{this.state.zz.map((message, index) => (
									<div className="col-md-4 mt-2" key={index}>
										<div className="p-2 border rounded" style={{
											backgroundImage: `url(${process.env.REACT_APP_URL}/asignature/${message.img})`,
											// backgroundImage: `url(${externalImage})`,
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											// backgroundPosition: 'center',
											// height: '100px',
										}}>
											<div className="text-uppercase bg-light border rounded">
												{message.title} - {message.mencion}
											</div>
											<img className="p-0 wrapperestperfillcursecarpeta" src={`${process.env.REACT_APP_URL}/asignature/${message.img}`} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px" }} /> <div>
												<Link className="btn btn-info w-100 text-uppercase" style={{ color: 'white' }} onClick={() => setLocalStorage('curse', this.state.zz[index])} to={'/curso/' + message._id} >
													Ir al curso
												</Link>
												<button type="button" className='btn btn-warning mt-1 w-100' onClick={() => { this.open(); this.setState({ idcurse: message._id, title: message.title, description: message.description, mencion: message.mencion, foto: message.img }) }}>Actualizar curso</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div> :
						null}

					<div className='row justify-content-center align-items-center'>
						{this.state.zzstd.map((message, index) => (
							<div className="col-md-4" style={{
								backgroundImage: `url(${process.env.REACT_APP_URL}/asignature/${message.cursse[0].img})`,
								// backgroundImage: `url(${externalImage})`,
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								// backgroundPosition: 'center',
								// height: '100px',
							}} key={index}>
								<div className="p-1 rounded border border-info text-center">
									<div className="text-uppercase" style={{ backgroundColor: "rgba(144, 186, 189, 0.7)" }}>
										{message.cursse[0].title}--
										<span>{message.cursse[0].mencion}</span>
									</div>
									<img className="wrapperestperfillcursecarpeta" src={`${process.env.REACT_APP_URL}/asignature/${message.cursse[0].img}`} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />
									<div>
										<Link className="btn btn-light w-100 text-uppercase border" style={{ color: 'black' }} to={'/curso/' + message.cursse[0]._id} onClick={() => setLocalStorage('curse', message.cursse[0])} >
											Ir al curso
										</Link>
										<button className="btn btn-outline-warning w-100 mt-1 text-uppercase" onClick={() => this.deleteNote(message._id)} style={{ color: 'orange' }} >
											Borrar curso
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</>
		);
	}
}
