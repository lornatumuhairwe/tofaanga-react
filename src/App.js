// @flow
import React, { Component } from 'react';
import SignupForm from './components/Signup';
import LoginForm from './components/Login/Login';
import './App.css';
import Bucketlist from './components/bucketlist';

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { signIn: true, signUp: false, resetPassword: false, isLoggedIn: false, token: localStorage.getItem('token') };
    this.displaySignup = this.displaySignup.bind(this);
    this.getToken = this.getToken.bind(this);
    this.displayLoginForm = this.displayLoginForm.bind(this);
    this.changeLoggedin = this.changeLoggedin.bind(this);
    this.renderItems = this.renderItems.bind(this);
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
    this.setState({ token });
  }

  changeLoggedin() {
    if (!this.state.isLoggedIn) {
      this.setState({ isLoggedIn: true });
      return ( <Bucketlist token={localStorage.getItem('token')} /> );
    }
  }

  renderItems() {
    if (this.state.token) {
      return (<Bucketlist token={localStorage.getItem('token')} isLoggedIn={!this.state.isLoggedIn} displaySignup={this.displaySignup} />);
    } else if (this.state.signIn) {
      return (
        <LoginForm displaySignup={this.displaySignup} />
      );
    } else if (this.state.signUp) {
      return (<SignupForm getToken={this.getToken} displayLoginForm={this.displayLoginForm} />);
    }
  }

  render() {
    return (<div>
      {this.renderItems()}
    </div>);
  }
}

export default App;
