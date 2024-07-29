import React, { useState, useEffect } from 'react';
//import authSvg from "../assests/update.svg";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCokie, signout } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';

const Admin = ({ history }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password1: '',
		textChange: 'Actualizar',
		role: '',
	});

	//const idcurso = getCookie("id");
	//toast.info(`${getCookie("id")}`);

	//const us= JSON.parse(localStorage.getItem("user"));
	//toast(`${us.name}`);

	useEffect(
		() => {
			loadProfile();
		},
		[]
	);

	const loadProfile = () => {
		const token = getCokie('token');
		axios
			.get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				const { role, name, email } = res.data;
				console.log(res.data);
				setFormData({ ...formData, role, name, email });
			})
			.catch(err => {
				toast.error(`Error To Your Information ${err.response.statusText}`);
				if (err.response.status === 401) {
					signout(() => {
						history.push('/login');
					});
				}
			});
	};

	const { name, email, password1, textChange, role } = formData;

	const handleChange = text => e => {
		//    console.log(e.target.value);
		setFormData({ ...formData, [text]: e.target.value });
	};

	const handleSubmit = e => {
		const token = getCokie('token');
		//console.log(token);
		e.preventDefault();
		setFormData({ ...formData, textChange: 'Submitting' });
		axios
			.put(
				`${process.env.REACT_APP_API_URL}/admin/update`,
				{
					name,
					email,
					password: password1,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(res => {
				updateUser(res, () => {
					toast.success('Perfil actualizado correctamente');
					setFormData({ ...formData, textChange: 'Update' });
				});
			})
			.catch(err => {
				console.log(err.response);
			});
	};

	return (
		<div className="container my-3">
			<div className="row">
				<ToastContainer />
				<div className="container col-md-4 p-3 rounded-left text-center bg-info">
					<h5 className="">Admin Update</h5>
					<form onSubmit={handleSubmit}>
						<input disabled className="form-control my-1" type="text" placeholder="Role" value={role} />
						<input className="form-control my-1" type="email" placeholder="Email" disabled value={email} />
						<input
							className="form-control my-1"
							type="text"
							placeholder="Name"
							onChange={handleChange('name')}
							value={name}
						/>

						<input
							className="form-control my-1"
							type="password"
							placeholder="Password"
							onChange={handleChange('password1')}
							value={password1}
						/>
						<button type="submit" className="btn btn-light my-1">
							{textChange}
						</button>

						<div className="flex flex-col items-center">

							<Link className="btn btn-warning" to="/">
								Inicio
							</Link>
						</div>
					</form>
				</div>

				{/*     <div className="container col-md-8 bg-info rounded-right p-5">
          <img className="img-fluid" src={authSvg} alt="img" />
        </div>
  */
				}
				{' '}
			</div>
		</div>
	);
};

export default Admin;
