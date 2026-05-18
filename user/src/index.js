import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as serviceWorker from './serviceWorker';
import React, { Suspense } from "react";
//import { removeCookie, isAuth } from "./helpers/auth";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import App from './App.jsx';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import Activate from './screens/Activate.jsx';
import Private from './screens/Private.jsx';
import Admin from './screens/Admin.jsx';
import GetPassword from './screens/GetPassword.jsx';
import ResetPassword from './screens/ResetPassword.jsx';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import List from './components/Category.jsx';
import Acerca from './components/Forum copy.js';
import Curses from './components/Curses';
import Certificate from './components/getCartificate.js';
import Theme from './components/Theme.js';
import Forum from './components/Forum';
import Foroesfa from './components/ForoESFA.js';
import Cursos from './components/Capacitaciones.js';
// import Sections from './components/Seccions';
// import Timecircle from './components/Timecircle';
import Tramite from "./components/Tramite.js";
// import StudentAll from './components/StudentAll';
import Tests from './components/Tests';
// import Testswww from './components/Testswwwww';
// import Alpha from './components/Testswww';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
// import Line from './components/carreras.js';
import Video from './components/Video.js';
import Home from './components/Meet';
// const Curses = React.lazy(() => import("./components/Curses"));


ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/meet/:curse" exact component={Home} />
			<Route path="/video/:url" component={Video} />
			<Route path="/certificate/:id" component={Certificate} />
			<Route path="/" exact render={props => <App {...props} />} />
			<Route path="/foroesfa"  exact component={Foroesfa} />
			<Route path="/cursos"  exact component={Cursos} />
			{/* <Route path="/line"  exact component={Line} /> */}
			<PrivateRoute path="/carpeta" exact component={List} />
			<PrivateRoute path="/tramites" exact component={Tramite} />
			<PrivateRoute path="/acerca" exact component={Acerca} />
			<PrivateRoute path="/curso/:id" exact component={Curses} />
			<PrivateRoute path="/forum/:idcurse" exact component={Forum} /> 
			<PrivateRoute path="/theme/:theme/:curse" exact component={Theme} />
			{/*
			{/* <Route path="/time" exact render={props => <Timecircle {...props} />} /> */}
			{/* <PrivateRoute path="/estudianteAll" exact component={StudentAll} /> */}
			{/* <PrivateRoute path="/task/:id" exact component={Curses} /> */}
			<PrivateRoute path="/test/:idtest" exact component={Tests} />
			{/* <Route path="/test/:idtest" exact render={props => <Testswww {...props} />} /> */}
			{/* <Route path="/test/:idtest" exact render={props => <Alpha {...props} />} /> */}
			{/* <Route path="blogesfa" element={<Suspense fallback={<div>Loading...</div>}> <Curses /> </Suspense>} /> */}

			{/* <PrivateRoute path="/curso/:id/:categ" exact component={Chapters} /> */}
			{/* <PrivateRoute path="/curso/:chap/:curs/:categ" exact component={Sections} /> */}
			<Route path="/login" exact component={Login} />
			<Route path="/register" exact render={props => <Register {...props} />} />
			<Route path="/users/password/forget" exact render={props => <GetPassword {...props} />} />
			<Route path="/users/password/reset/:token" exact render={props => <ResetPassword {...props} />} />
			<Route path="/users/activate/:token" exact render={props => <Activate {...props} />} />
			<PrivateRoute path="/private" exact component={Private} />
			<AdminRoute path="/admin" exact component={Admin} />
			{/* <Redirect to="/" /> */}
			{/* <PrivateRoute path="/private" exact component={Private} /> */}
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.unregister();
