import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/style.css';

class Bucketlist extends Component {
  constructor(props) {
    super(props);
    // this.state = { name: '', email: '', dob: '', pwd: '' };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.baseURL = 'https://tofaangapi.herokuapp.com/bucketlists/';
  }

  getBucketlists(url) {
    const getData = {
      method: 'GET',
      headers: { Authorization: this.props.token },
    };
    return fetch(url, getData)
      .then(response => console.log(response.json()));
  }

  componentDidMount() {
    this.getBucketlists(this.baseURL);
  }

  // handleSubmit(event) {
  //   const signupFormData = new FormData();
  //   signupFormData.append('name', this.state.name);
  //   signupFormData.append('email', this.state.email);
  //   signupFormData.append('birthdate', this.state.dob);
  //   signupFormData.append('password', this.state.pwd);
  //   this.sendRegistration(this.baseURL, signupFormData);
  //   event.preventDefault();
  //   this.setState({ name: '', email: '', dob: '', pwd: '' });
  // }
  // handleChange(field, event) {
  //   const newState = {};
  //   newState[field] = event.target.value;
  //   this.setState(newState);
  //   // this.setState({name: event.target.value});
  // }
  returnBucketlists(url) {
    const getData = {
      method: 'GET',
      headers: {Authorization: this.props.token}
    };
    fetch(url, getData)
      .then(response => console.log(response.json().message));
  }
  render() {
    return (
      <h1>Bucketlists</h1>
    );
  }
}

export default Bucketlist;
