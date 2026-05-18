import React, { Component } from "react";
import Navigation from "../screens/Navigation.jsx";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Headroom from "react-headroom";
import { ToastContainer, toast } from "react-toastify";
// import io from "socket.io-client";
import axios from "axios"
import { Modal, Row } from "react-bootstrap";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Markdownkatexnew from "./Markdown.js";
// import { IoMdCreate, IoIosAlert, IoMdAlert, IoIosAddCircleOutline, IoIosAirplane, IoIosCreate } from "react-icons/io";
import Socket from "../screens/Chat.jsx";
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import { setLocalStorage, isAuth, } from "../helpers/auth.js";
// import { FaArrowDown } from "react-icons/fa";
// import { FaArrowUp } from "react-icons/fa";
import { MdAddCircleOutline, MdAddHomeWork, MdBusiness, MdBusinessCenter, MdCreate, MdEdit, MdGetApp, MdOutlineAccessibility, MdRemove, MdRemoveCircleOutline } from "react-icons/md";
// import CulqiPayment from "./calculadorajs copy 2.js"
import { Link } from 'react-router-dom';
import authSvgwww from "../assests/www.jpg";
import { FaBuyNLarge } from "react-icons/fa";
import { BiExpand } from "react-icons/bi";

export default class CreateNote extends Component {
	state = {
		showModal: false, title: "", description: "", option: false, calification: "", curses: [], Generated_Curses: [], ipadress: "", likes: "", i: '', j: '', k: '', zz: [], id: "", files: "", submit: "Crear", enable: false, option: false,
	};

	open = () => this.setState({ showModal: true });
	close = () => this.setState({ showModal: false });


	// componentWillUnmount() {
	// 	this.socket.disconnect();
	// }

	async componentDidMount() {
		this.getCurses()
		if (isAuth()) { this.getGenerateCurses() }
		// document.title = `FORO ${process.env.REACT_APP_pagetitle}`
		// this.socket = io(`${process.env.REACT_APP_URL}`)
		// this.socket.emit('foroesfa', '69e5631506598f7ce9c31e21')
		// this.socket.emit("temas", '69e5631506598f7ce9c31e21')
		// this.socket.on("foro", (ww) => {
		// 	this.setState({ zz: ww });
		// 	console.log(ww, "new")
		// })


	}
	deleteCurse = async noteId => {
		const response = window.confirm('Deseas eliminar este curso?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/curses/` + noteId);
			this.getCurses();
			toast.dark('Removido correctamente');
		}
	};


	deleteCurseGenerate = async noteId => {
		const response = window.confirm('Deseas eliminar este curso?');
		if (response) {
			await axios.delete(`${process.env.REACT_APP_API_URL}/curses/generate/` + noteId);
			this.getGenerateCurses();
			toast.dark('Removido correctamente');
		}
	};

	getCurses = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/curses/cursosculqui/cursos`);
		console.log(res.data, "w wwwwww")
		this.setState({ curses: res.data });
	}


	CreateCurses = async () => {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/curses/cursosculqui`, {
			title: this.state.title, description: this.state.description, type: "cursos", show: "true", ciclo: "1",mencion: "Artes", codigo: "WCW",  credito: "355", year: new Date().getFullYear() + '', user: isAuth()._id
		}).then(res => {
			this.close()
			this.getCurses();
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		})
		// this.setState({
		// curses: res.data[0].curses,
		// report: res.data[0].cursesstd ? res.data[0].cursesstd : [],
		// });
	};

	getGenerateCurses = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/curses/Getgeneratecursosculqui/${isAuth()._id}/true`).then(res => {
			this.setState({ enable: false })
			this.setState({ Generated_Curses: res.data });
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		})
	}

	GenerateCurses = async (idcurse) => {
		if (isAuth()) {
			await axios.post(`${process.env.REACT_APP_API_URL}/curses/generatecursosculqui`, {
				user: isAuth()._id, curse: idcurse, type: 'cursos'
			}).then(res => {
				toast.info(res.data)
				this.getGenerateCurses();
			}).catch((err) => {
				console.log(err.response.statusText);
				toast.error(`Error To Your Information ${err.response.statusText}`);
				if (err.response.status === 401) { }
			})
		} else {
			this.props.history.push('/login')
		}
	};


	///////////////////////////////////////////////////////////////////////////////////////////////

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



	CurseUpdate = async () => {
		console.log(this.state.files[0])
		const data = new FormData()
		data.append("img", this.state.files[0])
		data.append("description", this.state.description)
		data.append("title", this.state.title)
		await axios.put(`${process.env.REACT_APP_API_URL}/curses/` + this.state.idcurse, data).then(res => {
			// console.log(res.data, "wwwww");
			toast.dark(res.data)
			this.close()
			this.getCurses();
		}).catch((err) => {
			console.log(err.response.statusText);
			toast.error(`Error To Your Information ${err.response.statusText}`);
			if (err.response.status === 401) { }
		})
	}

	fotto = async (e) => {
		console.log(e.currentTarget);
		var fottto = document.getElementById('refer');
		fottto.click();
	}

	onInputChange = e => {
		console.log(e.target.name, e.target.value)
		this.setState({
			[e.target.name]: e.target.value,
		});
	};


	render() {
		return (
			<>
				<ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />

				<Headroom>
					<Navigation />
				</Headroom>

				<Socket />

				<Modal show={this.state.showModal} onHide={() => { this.close() }} animation={false} >
					<div className="modal-header font-weight-bold ">
						Actualizar Curso
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
						<input type="file" className="form-control d-none" onChange={(e) => { this.fileSelectHandler(e.target.files); }} id="refer"></input>
						<img className="img-fluid" src={this.state.photoSelected ? this.state.photoSelected : `${process.env.REACT_APP_URL}/collections/${this.state.foto}`} alt="Thumb" onClick={this.fotto} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px"; }} />
					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-info" onClick={this.CreateCurses}>
							Crear nuevo curso
						</button>
						<button className="btn btn-info" onClick={this.CurseUpdate}>
							Actualizar curso
						</button>
						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.close() }} >
							Cerrar
						</button>
					</Modal.Footer>
				</Modal>


				<div className="container my-3">

					{isAuth().rol === '1' ? <button className="btn btn-warning w-100 mb-1" onClick={() => { this.open(); this.setState({ title: '', description: '', photoSelected: "" }) }} >
						<MdAddHomeWork style={{ color: '#ff00eeff', fontSize: '34px' }} />	Crear curso
					</button> : ''}

					<div className='row justify-content-center align-items-center bg-info rounded' style={{ padding: this.state.Generated_Curses.length > 0 ? '.1em' : '' }}>
						{this.state.Generated_Curses.map((message, index) => (
							<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4" key={index}>
								<div className="p-1 border rounded contenedor">
									<img className="image" src={`${process.env.REACT_APP_URL}/collections/${message.curses[0].img}`} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px" }} />
									<div className="overlay-text">
										<div className="h5 mb-5 border rounded ffont text-center" style={{ color: 'white', backgroundColor: 'rgba(179, 201, 217, 0.5)' }}>
											{message.curses[0].title} {message.curses[0].credito}
										</div>
										<div className="btn-group w-100">
											<button type="button" className='btn btn-info' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.deleteCurseGenerate(message._id) }}>
												<MdRemoveCircleOutline style={{ color: '#ff00eeff', fontSize: '34px' }} />
											</button>
											<Link className="btn btn-warning" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => setLocalStorage('curse', this.state.curses[index])} to={'/curso/' + message.curses[0]._id} >
												<BiExpand style={{ color: '#005effff', fontSize: '34px' }} />
											</Link>
											{/* <button type="button" className='btn btn-info mt-1 w-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.open(); this.setState({ idcurse: message._id, title: message.title, description: message.description, mencion: message.mencion, files: [], photoSelected: "", foto: message.img }) }}>Actualizar curso</button>
											<button type="button" className='btn btn-info mt-1 w-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.GenerateCurses(message._id) }}>Comprar curso {isAuth()._id} {message._id}www</button> */}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* <h1 style={{ fontFamily: 'Zapfino' }}>AaBbCcDdEeFfGgHhŞşIıİi Example</h1> */}

					<div className='row justify-content-center align-items-center' style={{ padding: '.1em' }}>
						{this.state.curses.map((message, index) => (
							<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4" key={index}>
								<div className="p-1 border rounded contenedor">
									<img className="image" src={`${process.env.REACT_APP_URL}/collections/${message.img}`} onError={(e) => { e.target.src = authSvgwww; e.target.style = "padding: 3px; margin: 1px" }} />
									<div className="overlay-text">
										<div className="border rounded ffont text-center ffont h5" style={{ color: 'white', backgroundColor: 'rgba(54, 119, 166, 0.5)' }}>
											{message.title} - {message.credito}<br/> {message.usser?message.usser[0].email:''}
										</div>
										<div className="btn-group w-100">
											<button disabled={this.state.enable} type="button" className='btn btn-info mt-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.GenerateCurses(message._id); this.setState({ enable: true }) }} >
												<MdBusinessCenter style={{ color: '#ffcc00ff', fontSize: '34px' }} />
											</button></div>
										{isAuth().rol === '1' ?
											<div className="btn-group w-100">
												<Link className="btn btn-info mt-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => setLocalStorage('curse', this.state.curses[index])} to={'/curso/' + message._id} >
													<MdGetApp style={{ color: '#005effff', fontSize: '34px' }} />
												</Link>
												<button type="button" className='btn btn-info mt-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.open(); this.setState({ idcurse: message._id, title: message.title, description: message.description, mencion: message.mencion, files: [], photoSelected: "", foto: message.img }) }}>
													<MdCreate style={{ color: '#8000ffff', fontSize: '34px' }} />
												</button>
												<button type="button" className='btn btn-info mt-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={() => { this.deleteCurse(message._id) }}>
													<MdRemoveCircleOutline style={{ color: '#ff00eeff', fontSize: '34px' }} />
												</button>
											</div> : ''}
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
