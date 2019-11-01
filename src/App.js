import React, { Component } from 'react';
import Login from "./components/login"
import Register from "./components/register"
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
	
	renderRouter(){
		return (
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/Login" component={Login} />
				<Route exact path="/Register" component={Register} />
			</Switch>
		)
	}
	render(){
		return(
			<BrowserRouter>{this.renderRouter()}</BrowserRouter>
		)
	}
}


export default App;
