import React,{ Component } from "react"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Login extends Component  {
    constructor(props){
        super(props)
        this.state = {data_login:{username:localStorage.getItem("username"),email:localStorage.getItem("email")}}
		
    }
	
	click_login = () =>{
		this.sql_Login()
		this.refs.username.value = ""
        this.refs.pass.value = ""
	}
	
	sql_Login = async() => {
		let data_user = {username:this.refs.username.value,pass:this.refs.pass.value}
        await this.fetchSql("login",data_user);
	}

    fetchSql = (path,data) =>{
        return new Promise((resolve,reject)=>{
          fetch('https://dull-moth-4.localtunnel.me/'+path,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            .then((response) => {
                response.json().then((d) => {
                    if(path == "login"){
                        this.setState({
                            data_login:{username:d[0].username,email:d[0].email}
                        })
						console.log(this.state.data_login.username)
						localStorage.setItem("username",d[0].username)
						localStorage.setItem("email",d[0].email)
                    }
                        console.log(this.state)
              });
            });
        });
    }
	
	clearlocal = () =>{
		//localStorage.clear()
		localStorage.setItem("username","")
		localStorage.setItem("email","")
		this.setState({
            data_login:{username:localStorage.getItem("username"),email:localStorage.getItem("email")}
        })
	}

    render() {
        return (
            <div>
				<ul>
					<li><Link to="/Register"> Register </Link></li>
					<li><Link to="/Login" onClick={()=>this.clearlocal()}> clearLocalStorage </Link></li>
				</ul>
                <a>Name : </a><input ref={"username"} />
                <a>pass : </a><input ref={"pass"} type="password"/>
                <button onClick={()=>this.click_login()}>Login</button>
				<br></br>
				<center> <h1>username::{this.state.data_login.username}</h1> </center>
				<center> <h1>email::{this.state.data_login.email}</h1> </center>
            </div>
        );

    }
 }


export default Login;