import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/style.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', dob: '', pwd: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.baseURL = 'https://tofaangapi.herokuapp.com/auth/register';
  }
  handleSubmit(event) {
    const signupFormData = new FormData();
    signupFormData.append('name', this.state.name);
    signupFormData.append('email', this.state.email);
    signupFormData.append('birthdate', this.state.dob);
    signupFormData.append('password', this.state.pwd);
    this.sendRegistration(this.baseURL, signupFormData);
    event.preventDefault();
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
      .then(response => console.log(response.json().message));
  }
  render() {
    return (
      <form className="col-md-offset-3 col-md-4" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={this.state.name}
            required
            onChange={this.handleChange.bind(this, 'name')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={this.state.email}
            required
            onChange={this.handleChange.bind(this, 'email')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            value={this.state.dob}
            required
            onChange={this.handleChange.bind(this, 'dob')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            value={this.state.pwd}
            required
            onChange={this.handleChange.bind(this, 'pwd')}
          />
        </div>
        <button type="submit" className="btn btn-default">Sign up</button>
        <div>
          <a href="/">Back to Home</a>
        </div>
      </form>
    );
  }
}

export default SignupForm;

