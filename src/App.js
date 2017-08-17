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
    this.displaySignUp = this.displaySignUp.bind(this);
    this.changeToken = this.changeToken.bind(this);
  }
  displaySignUp(signUp) {
    this.setState({ signUp: signUp });
    this.setState({ signIn: false });
  }
  changeToken(token) {
    this.setState({ token: token });
  }

  render() {
    if (this.state.signIn) {
      return (
        <LoginForm displaySignup={this.displaySignUp} getToken={this.changeToken} />
      );
    } else if (this.state.signUp) {
      return (<SignupForm getToken={this.changeToken} />);
    }
    else if (this.state.token) {
      return (<Bucketlist token={this.state.token} />);
    }
  }
}

export default App;
