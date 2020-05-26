import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddUser from './AddUser';
import Home from './Home';


function App() {
	return (
		<Router>
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/add-user" component={AddUser} />
				</Switch>
			</React.Fragment>
		</Router>
	);
}

export default App;
