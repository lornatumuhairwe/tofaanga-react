import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import '../styles/css/bootstrap.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';
import '../styles/css/login.css';
import LoginForm from './Login';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', pwd: '', cpwd: '', resetpwd: true, isLoading: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.baseURL = 'https://tofaangapi.herokuapp.com/auth/reset-password';
        this.displaySignupForm = this.displaySignupForm.bind(this);
    }
    displaySignupForm(event) {
        event.preventDefault();
        this.props.displaySignup();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        const ResetPasswordFormData = new FormData();
        ResetPasswordFormData.append('email', this.state.email);
        ResetPasswordFormData.append('newpassword', this.state.pwd);
        ResetPasswordFormData.append('cnewpassword', this.state.cpwd);
        this.sendLogin(this.baseURL, ResetPasswordFormData);
        // this.setState({ email: '', pwd: '' , cpwd: '' });
    }
    handleChange(field, event) {
        const newState = {};
        newState[field] = event.target.value;
        this.setState(newState);
    }
    sendLogin(url, data) {
        const postData = {
            method: 'POST',
            body: data,
        };
        return fetch(url, postData)
            .then(response => response.json())
            .then((resjson) => {
            console.log(resjson);
            if (resjson.message === 'Password reset successful')
            {
                this.setState({resetpwd: false, email: '', pwd: '' , cpwd: ''})
            }
            });
    }

    // handleClick() {
    //     this.setState({isLoading: true});
    // }

    render() {
        if (this.state.resetpwd) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-md-offset-4">
                            <h1 className="text-center login-title">Sign in to continue to view your bucketlists </h1>
                            <div className="account-wall">
                                <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                     alt="" />
                                <form className="form-signin" onSubmit={this.handleSubmit}>
                                    <input type="text" id="email" className="form-control"
                                           placeholder="Email" value={this.state.email}
                                           required autoFocus onChange={this.handleChange.bind(this, 'email')} />
                                    <input type="password"  className="form-control" id="pwd"
                                           value={this.state.pwd} placeholder="Password" required
                                           onChange={this.handleChange.bind(this, 'pwd')} />
                                    <input type="password"  className="form-control" id="pwd"
                                           value={this.state.cpwd} placeholder="Confirm Password" required
                                           onChange={this.handleChange.bind(this, 'cpwd')} />
                                    <Button disabled={this.state.isLoading} className="btn btn-lg btn-primary btn-block" type="submit">
                                        {this.state.isLoading ? 'Loading...' : 'Reset Password'}</Button>
                                </form>
                            </div>
                            <a href="" className="text-center new-account"
                               onClick={this.displaySignupForm}>Create an account </a>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <LoginForm />
        );
    }
}

export default ResetPasswordForm;
