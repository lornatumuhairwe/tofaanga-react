import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';
import '../styles/css/login.css';
import Bucketlist from './bucketlist';
import ResetPasswordForm from './ResetPassword';
import { Button } from 'react-bootstrap';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', pwd: '', isLoggedIn: false, resetpwd: false, isLoading: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.baseURL = 'https://tofaangapi.herokuapp.com/auth/login';
    this.displaySignupForm = this.displaySignupForm.bind(this);
    this.displayResetPasswordForm = this.displayResetPasswordForm.bind(this);
    this.token = '';
  }
  displaySignupForm(event) {
    event.preventDefault();
    this.props.displaySignup();
  }

  handleSubmit(event) {
    event.preventDefault();
    const LoginFormData = new FormData();
    LoginFormData.append('email', this.state.email);
    LoginFormData.append('password', this.state.pwd);
    this.sendLogin(this.baseURL, LoginFormData);
    this.setState({ isLoading: true });
    this.props.getToken(this.token);
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
        if (resjson.status === 'success') {
          if (resjson.auth_token.length > 0) {
            this.token = resjson.auth_token;
            this.setState({ isLoggedIn: true, email: '', pwd: '' });
          }
        } else if (resjson.message === 'Password mismatch') {
          window.location = '/auth/login';
        } else {
          window.location = '/auth/signup';
        }
      });
  }

  displayResetPasswordForm(event) {
    event.preventDefault();
    this.setState({ resetpwd: true });
  }

  render() {
    if (this.state.resetpwd) {
      return (<ResetPasswordForm />);
    } else if (!this.state.isLoggedIn) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
              <h1 className="text-center login-title">Sign in to continue to view your bucketlists </h1>
              <div className="account-wall">
                <img
                  className="profile-img"
                  src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                  alt=""
                />
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={this.state.email}
                    required
                    autoFocus
                    onChange={this.handleChange.bind(this, 'email')}
                  />
                  <input
                    type="password"
                    className="form-control"
                    id="pwd"
                    value={this.state.pwd}
                    placeholder="Password"
                    required
                    onChange={this.handleChange.bind(this, 'pwd')}
                  />
                  <Button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={this.state.isLoading}
                  >
                    {this.state.isLoading ? 'Loading...' : 'Sign in'}</Button>
                  <a
                    href=""
                    className="pull-right need-help"
                    onClick={this.displayResetPasswordForm}
                  >
                    Forgot Password? </a>
                  <span className="clearfix" />
                </form>
              </div>
              <a
                href=""
                className="text-center new-account"
                onClick={this.displaySignupForm}
              >Create an account </a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Bucketlist token={this.token} isLoggedIn={this.state.isLoggedIn} />
    );
  }
}

