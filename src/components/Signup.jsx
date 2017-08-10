import React, {Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/style.css';

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {name: '', email: '', dob: '', pwd:''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(event) {
        alert( this.state.email + ' is the email of ' + this.state.name + '. She was born on ' + this.state.dob + ' and ' +
        this.state.pwd + ' is her password.');
        event.preventDefault();
        this.setState({name: '', email: '', dob: '', pwd:''});
    }
    handleChange(field, event) {
        var newState = {};
        newState[field] = event.target.value;
        this.setState(newState);
        // this.setState({name: event.target.value});
    }
    render(){
        return (
            <form className="col-md-offset-3 col-md-4" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" onChange={this.handleChange.bind(this, 'name')} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email" onChange={this.handleChange.bind(this, 'email')} />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" className="form-control" id="dob" onChange={this.handleChange.bind(this, 'dob')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" onChange={this.handleChange.bind(this, 'pwd')}/>
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


