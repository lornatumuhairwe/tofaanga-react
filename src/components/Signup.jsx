import React, {Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/style.css';

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {name: '', email: '', dob: '', pwd:''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.baseURL = 'https://tofaangapi.herokuapp.com/auth/register';
    }
    handleSubmit(event) {
        var signupForm = new FormData();
        signupForm.append("name", this.state.name)
        signupForm.append("email", this.state.email)
        signupForm.append("birthdate", this.state.dob)
        signupForm.append("password", this.state.pwd)
        this.sendRegistration(this.baseURL, signupForm)
        event.preventDefault();
        this.setState({name: '', email: '', dob: '', pwd:''});
    }
    handleChange(field, event) {
        var newState = {};
        newState[field] = event.target.value;
        this.setState(newState);
        // this.setState({name: event.target.value});
    }
    sendRegistration(url, data) {
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
                    <label htmlFor="name">Name:</label>
                    <input type="text"
                           className="form-control"
                           id="name"
                           value={this.state.name}
                           required={true}
                           onChange={this.handleChange.bind(this, 'name')} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           value={this.state.email}
                           required={true}
                           onChange={this.handleChange.bind(this, 'email')} />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date"
                           className="form-control"
                           id="dob"
                           value={this.state.dob}
                           required={true}
                           onChange={this.handleChange.bind(this, 'dob')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password"
                           className="form-control"
                           id="pwd"
                           value={this.state.pwd}
                           required={true}
                           onChange={this.handleChange.bind(this, 'pwd')}/>
                </div>
                <button type="submit" className="btn btn-default">Sign up</button>
                <div>
                    <a href="/">Back to Home</a>
                </div>
            </form>
        )
    }
    };

export default SignupForm;


