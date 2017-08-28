import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/style.css';
import Bucketlist from './bucketlist';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', dob: '', pwd: '', token: '', isLoggedIn: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.baseURL = 'https://tofaangapi.herokuapp.com/auth/register';
  }
  handleSubmit(event) {
    event.preventDefault();
    const signupFormData = new FormData();
    signupFormData.append('name', this.state.name);
    signupFormData.append('email', this.state.email);
    signupFormData.append('birthdate', this.state.dob);
    signupFormData.append('password', this.state.pwd);
    this.sendRegistration(this.baseURL, signupFormData);
    this.setState({ name: '', email: '', dob: '', pwd: '' });
  }
  handleChange(field, event) {
    const newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
    // this.setState({name: event.target.value});
  }
  sendRegistration(url, data) {
    const postData = {
      method: 'POST',
      body: data,
    };
    fetch(url, postData)
      .then(response => response.json())
        .then(resjson => {
          if (resjson.message==='Registration Sucessful')
          {
            this.setState({isLoggedIn: true, token: resjson.auth_token})
          }
        }
  )
  }
  render() {
    if (!this.state.isLoggedIn){
        return (
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-4 col-md-offset-4">
                  <h1 className="text-center login-title">Sign up start keeping track of your bucketlists </h1>
                  <div className="account-wall">
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                      <input type="text" id="name" className="form-control"
                             placeholder="Name" value={this.state.name}
                             required autoFocus onChange={this.handleChange.bind(this, 'name')} />
                      <input type="text" id="email" className="form-control"
                             placeholder="Email" value={this.state.email}
                             required autoFocus onChange={this.handleChange.bind(this, 'email')} />
                      <input type="date" id="bd" className="form-control"
                             placeholder="Birth Date" value={this.state.dob}
                             required autoFocus onChange={this.handleChange.bind(this, 'dob')} />
                      <input type="password"  className="form-control" id="pwd"
                             value={this.state.pwd} placeholder="Password" required
                             onChange={this.handleChange.bind(this, 'pwd')} />
                      <button className="btn btn-lg btn-primary btn-block" type="submit">
                        Sign up</button>
                      <a href="" className="pull-right need-help">Forgot Password? </a>
                      <span className="clearfix"/>
                    </form>
                  </div>
                  <a href="" className="text-center new-account"
                     onClick={this.props.displayLoginForm}>Already have an account? Sign in</a>
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

export default SignupForm;

