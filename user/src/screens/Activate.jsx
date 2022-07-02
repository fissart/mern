import React, { useState, useEffect } from 'react';
//import authSvg from "../assests/welcome.svg";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';

const Activate = ({ match }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		token: '',
		show: true,
	});

	useEffect(
		() => {
			let token = match.params.token;
			let { name } = jwt.decode(token);
			if (token) {
				setFormData({ ...formData, name, token });
			}
			console.log(token, name);
			// eslint-disable-next-line
		},
		[ match.params ]
	);

	const { name, token } = formData;

	const handleSubmit = e => {
		e.preventDefault();

		axios
			.post(`${process.env.REACT_APP_API_URL}/activation`, {
				token,
			})
			.then(res => {
				setFormData({
					...formData,
					show: false,
				});

				toast.success(res.data.message);
			})
			.catch(err => {
				toast.error(err.response.data.errors);
			});
	};

	return (
		<div className="container">
			{isAuth() ? <Redirect to="/" /> : null}
			<ToastContainer />
			<div className="row">
				<div className="container col-md-4 border text-center">
					<h5 className="">Bienvenido wwwww {name}</h5>
					<form className="" onSubmit={handleSubmit}>
						<div className="">
							<button type="submit" className="btn btn-info">
								Active su cuenta
							</button>
						</div>
						<div className="">
							<div className="">O inicie sesion con una cuenta ya creada</div>
						</div>
						<div className="flex flex-col items-center">
							<a className="btn btn-info" href="/register" target="_self">
								Registrarse
							</a>
						</div>
					</form>
				</div>
				{/*      <div className="container col-md-8 rounded-right bg-secondary">
          <img className="img-fluid" src={authSvg} alt="img" />
        </div>*/
				}
			</div>
		</div>
	);
};

export default Activate;
