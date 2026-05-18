import React, { Component } from "react";
import Navigation from "../screens/Navigation.jsx";
// import DatePicker from "react-datepicker";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "react-datepicker/dist/react-datepicker.css";
import Headroom from "react-headroom";
import { ToastContainer, toast } from "react-toastify";
// import io from "socket.io-client";
import axios from "axios"
import { Modal, Row } from "react-bootstrap";
// import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import Markdownkatexnew from "./Markdown.js";
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
// import { setLocalStorage, isAuth, } from "../helpers/auth.js";
import Socket from "../screens/Chat.jsx";
// import { request } from 'undici'


export default class CreateNote extends Component {
	state = {
		showModal: false, title: "", detail: "", option: '', calification: "", curse: this.props.match.params.idcurse, likes: "", i: '', j: '', k: '', zz: [], id: "", files: "", submit: "Crear", editing: false
	};

	open = () => this.setState({ showModal: true });
	close = () => this.setState({ showModal: false });

	getCurses = async () => {

			await axios.get(`${process.env.REACT_APP_API_URL}/users/userCr`).then((res) => {
				console.log(res, "navigation")
			})
			.catch((err) => {
				toast.error(err);
				// if (err.response.status === 401) {
				// }
			})

			// this.setState({
		//   cursesteacher: res.data[0].curses,
		//   report: res.data[0].cursesstd ? res.data[0].cursesstd : [],
		// });
	
		// const options = {
		// 	method: 'GET',
		// 	url: 'https://app.apiinti.dev/api/v1/dni/72578511',
		// 	headers: {
		// 		Authorization: 'Bearer inti_live_c75066875b09bdb9be310b991cda5d26'
		// 	}
		// }

		// try {
		// 	const { data } = await axios.request(options)
		// 	console.log(data)
		// 	toast.info("wwwww");
		// } catch (error) {
		// 	console.error(error)
		// 	toast.info("www");
		// }

		// await axios.get('https://app.apiinti.dev/api/v1/dni/72578511',
		// {
		// 		headers: {
		// 			Authorization: 'Bearer inti_live_c75066875b09bdb9be310b991cda5d26',
		// 		},
		// 	})
		// 	.then((res) => {
		// 		console.log(res, "navigation")
		// 	})
		// 	.catch((err) => {
		// 		toast.error(err);
		// 		// if (err.response.status === 401) {
		// 		// }
		// 	})

	};

	render() {
		return (
			<>
				<ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} closeButton={false} />

				<Modal show={this.state.showModal} onHide={() => { this.close(); }} animation={false}>
					<div className="modal-header font-weight-bold h5"> {this.state.submit} </div>
					<div className="modal-body">
						<div class="mb-3">
							<label for="www" class="form-label">Título</label>
							<input type="text" id="www" className="form-control my-1" placeholder="Título" onChange={this.onInputChange} name="title" value={this.state.title} />
						</div>

						<div class="mb-3">
							<label for="wwwww" class="form-label">Detalle (Escriba texto en formato Markdown [<a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Tutorial!</a>])</label>
							<textarea type="text" id="wwwww" className="form-control scroll" placeholder="Contenido" rows="9" name="detail" onChange={this.onInputChange} value={this.state.detail} required ></textarea>
							<Markdownkatexnew>
								{this.state.detail}
							</Markdownkatexnew>
						</div>
					</div>
					<div className="modal-footer d-flex right-content-center">
						{this.state.option === '1' ? <button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.CreateTheme() }}> CrearTheme </button> : ""}
						<button type="button" className="btn btn-info" data-dismiss="modal" aria-label="Close" onClick={() => { this.close() }}> Close </button>
					</div>
				</Modal >

				<Headroom>
					<Navigation />
				</Headroom>
				<div className="container p-1 my-3">
					<button className="btn btn-primary" onClick={this.getCurses}>
						www
					</button>
					<button className="btn btn-info  text-center" onClick={() => { this.open(); this.setState({ option: "1w", title: 'note.title' }) }} >
						Enviar tramite
						{/* <MdEdit style={{ color: '#062033ff', fontSize: '34px' }} /> */}
					</button>
					< Socket />
				</div>
			</>
		);
	}
}
