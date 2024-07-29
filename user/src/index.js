import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as serviceWorker from './serviceWorker';
import React from 'react';
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
import 'react-toastify/dist/ReactToastify.css';
 import List from './components/Categories.jsx';
import Timecircle from './components/Timecircle';
import Curses from './components/Curses';
import Chapters from './components/Chapters';
import Sections from './components/Seccions';
// import Student from './components/Student';
// import StudentAll from './components/StudentAll';
import Forum from './components/Forum';
import Theme from './components/Theme.js';
// import Tests from './components/Tests';
// import Testswww from './components/Testswwwww';
// import Alpha from './components/Testswww';
import './App.css';
import Video from './components/Video';
import Home from './components/Meet';
ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<PrivateRoute path="/meet/:curse" exact component={Home} />
			<PrivateRoute path="/video/:url" component={Video} />
			<Route path="/" exact render={props => <App {...props} />} />
			<PrivateRoute path="/carpeta" exact component={List} />
			<Route path="/time" exact render={props => <Timecircle {...props} />} />
			<PrivateRoute path="/private" exact component={Private} />
			{/* <PrivateRoute path="/estudiante" exact component={Student} /> */}
			{/* <PrivateRoute path="/estudianteAll" exact component={StudentAll} /> */}
			<PrivateRoute path="/curso/:id" exact component={Curses} />
			<PrivateRoute path="/task/:id" exact component={Curses} />
			<PrivateRoute path="/forum/:idcurse" exact component={Forum} />
			<PrivateRoute path="/theme/:theme/:curse" exact component={Theme} />
			{/* <PrivateRoute path="/test/:idtest" exact component={Tests} /> */}
			{/* <Route path="/test/:idtest" exact render={props => <Testswww {...props} />} /> */}
			{/* <Route path="/test/:idtest" exact render={props => <Alpha {...props} />} /> */}
   
			<PrivateRoute path="/curso/:id/:categ" exact component={Chapters} />
			<PrivateRoute path="/curso/:chap/:curs/:categ" exact component={Sections} />
			<Route path="/login" exact render={props => <Login {...props} />} />
			<Route path="/register" exact render={props => <Register {...props} />} />
			<Route path="/users/password/forget" exact render={props => <GetPassword {...props} />} />
			<Route path="/users/password/reset/:token" exact render={props => <ResetPassword {...props} />} />
			<Route path="/users/activate/:token" exact render={props => <Activate {...props} />} />
			<PrivateRoute path="/private" exact component={Private} />
			<AdminRoute path="/admin" exact component={Admin} />
			<Redirect to="/" />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.unregister();
