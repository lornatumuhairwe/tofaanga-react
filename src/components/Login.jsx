import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';
import '../styles/css/style.css';
import Bucketlist from './bucketlist';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', pwd: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.baseURL = 'https://tofaangapi.herokuapp.com/auth/login';
    this.displaySignupForm = this.displaySignupForm.bind(this);
    this.token = '';
  }
    // getToken() {
    //     this.props.getToken(this.token);
    //     this.props.displaySignup(false);
    // }

  displaySignupForm() {
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
    // console.log(this.props, this)
    // this.props.displaySignup(false);
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
        console.log(this);
        if (resjson.status === 'success') {
          this.token = resjson.auth_token;
        } else if (resjson.message === 'Password mismatch') {
          window.location = '/auth/login';
        } else {
          window.location = '/auth/signup';
        }
      });
  }

  render() {
    return (
      <div>
        <ul className="navigation">
          <button id="si" onClick={this.displaySignupForm}>Sign up</button>
          <li><a href="#"><strong>TOFAANGA</strong></a></li>
        </ul>
        <div className="signupbackground">
          <div className="overlay">
            <div className="signinbox">
              <div className="title"><strong>Sign in</strong></div>
              <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-at" /></span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={this.state.email}
                    placeholder="email"
                    required
                    onChange={this.handleChange.bind(this, 'email')}
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock" /></span>
                  <input
                    type="password"
                    className="form-control"
                    id="pwd"
                    value={this.state.pwd}
                    required
                    onChange={this.handleChange.bind(this, 'pwd')}
                  />
                </div>
                <button type="submit" className="btn btn-default">Sign in</button>
                <div>
                  <a href="#">Forgot Password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
