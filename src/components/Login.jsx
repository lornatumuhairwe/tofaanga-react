import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/style.css';

class LoginForm extends Component {
    render(){
        return (
            <form className="col-md-offset-3 col-md-4">
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd"/>
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
