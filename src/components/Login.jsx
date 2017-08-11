import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/style.css';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {email: '', pwd:''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.baseURL = 'https://tofaangapi.herokuapp.com/auth/login';
    }
    handleSubmit(event) {
        alert( 'User with '+ this.state.email + ' email wants to sign in with this ' + this.state.pwd + ' password' );
        var LoginForm = new FormData();
        LoginForm.append("email", this.state.email)
        LoginForm.append("password", this.state.pwd)
        this.sendLogin(this.baseURL, LoginForm)
        event.preventDefault();
        this.setState({email: '', pwd:''});
    }
    handleChange(field, event) {
        var newState = {};
        newState[field] = event.target.value;
        this.setState(newState);
        // this.setState({name: event.target.value});
    }
    sendLogin(url, data){
        let postData = {
            method: 'POST',
            body: data,
        }
        fetch(url, postData)
            .then(data => console.log(data.json()));
    }
    render(){
        return (
            <form className="col-md-offset-3 col-md-4" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email"
                           className="form-control"
                           id="email" value={this.state.email}
                           onChange={this.handleChange.bind(this, 'email')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password"
                           className="form-control"
                           id="pwd"
                           value={this.state.pwd}
                           onChange={this.handleChange.bind(this, 'pwd')}/>
                </div>
                <button type="submit" className="btn btn-default">Sign up</button>
                <div>
                    <a href="/">Back to Home</a>
                </div>
            </form>
        );
    }
}

export default LoginForm;
