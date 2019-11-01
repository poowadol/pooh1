import React,{ Component } from "react"
import { Link } from "react-router-dom";
class Register extends Component  {
    constructor(props){
        super(props)
		this.state = {register:""}
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
					this.setState({
                            register:"ok"
                     })
                    console.log(d)
              });
            });
        });
    }


    sql_register= () =>{
        if(this.refs.pass.value==this.refs.cf_pass.value){
            let data = {username:this.refs.username.value,pass:this.refs.pass.value,email:this.refs.email.value}
            //console.log(data_user);
            
            this.fetchSql("register",data);
        }else{
            alert("test");
        }
        this.refs.username.value = ""
        this.refs.pass.value = ""
        this.refs.cf_pass.value = ""
        this.refs.email.value = ""
    }
    render() {
        return (
            <div>
				<ul>
					<li><Link to="/Login"> Login </Link></li>
				</ul>
                <a>Name : </a><input ref={"username"} /><br/>
                <a>pass : </a><input ref={"pass"} type="password"/><br/>
                <a>pass : </a><input ref={"cf_pass"} type="password"/><br/>
                <a>email : </a><input ref={"email"} /><br/>
                <button onClick={()=>this.sql_register()}>OK</button>
				<center><h1>{this.state.register}</h1></center>
				
            </div>
        );

    }
 }


export default Register;