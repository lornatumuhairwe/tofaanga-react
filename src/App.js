// @flow
import React, { Component } from 'react';
import SignupForm from './components/Signup';
import LoginForm from './components/Login';
import './App.css';
import Bucketlist from "./components/bucketlist";

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { signIn: true, signUp: false, resetPassword: false, isLoggedIn: false, token: '' };
    this.displaySignup = this.displaySignup.bind(this);
    this.getToken = this.getToken.bind(this);
    this.displayLoginForm = this.displayLoginForm.bind(this)
  }
  displaySignup() {
    this.setState({ signUp: true });
    this.setState({ signIn: false });
  }
  displayLoginForm() {
        this.setState({ signUp: false });
        this.setState({ signIn: true });
    }
  getToken(token) {
    this.setState({ token: token });
  }

  render() {
    if (this.state.signIn) {
      return (
        <LoginForm displaySignup={this.displaySignup} getToken={this.getToken} />
      );
    } else if (this.state.signUp) {
      return (<SignupForm getToken={this.getToken} displayLoginForm={this.displayLoginForm} />);
    }
    else if (this.state.token) {
      return (<Bucketlist token={this.state.token} />);
    }
  }
}

export default App;
