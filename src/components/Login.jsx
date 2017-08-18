import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';
import '../styles/css/login.css';
import Bucketlist from './bucketlist';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', pwd: '', isLoggedIn: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.baseURL = 'https://tofaangapi.herokuapp.com/auth/login';
    this.displaySignupForm = this.displaySignupForm.bind(this);
    this.token = '';
  }
  displaySignupForm(event) {
    event.preventDefault();
    this.props.displaySignup(true);
  }

  handleSubmit(event) {
    event.preventDefault();
    const LoginFormData = new FormData();
    LoginFormData.append('email', this.state.email);
    LoginFormData.append('password', this.state.pwd);
    this.sendLogin(this.baseURL, LoginFormData);
    this.setState({ email: '', pwd: '' });
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
            this.setState({ isLoggedIn: true });
          }
        } else if (resjson.message === 'Password mismatch') {
          window.location = '/auth/login';
        } else {
          window.location = '/auth/signup';
        }
      });
  }

  render() {
    if (!this.state.isLoggedIn) {
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
                    required autofocus onChange={this.handleChange.bind(this, 'email')} />
                  <input type="password"  className="form-control" id="pwd"
                    value={this.state.pwd} placeholder="Password" required
                    onChange={this.handleChange.bind(this, 'pwd')} />
                  <button className="btn btn-lg btn-primary btn-block" type="submit">
                    Sign in</button>
                  <a href="#" className="pull-right need-help">Forgot Password? </a>
                  <span className="clearfix"/>
                </form>
              </div>
              <a href="#" className="text-center new-account"
                onClick={this.displaySignupForm}>Create an account </a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Bucketlist token={this.token} />
    );
  }
}

export default LoginForm;
