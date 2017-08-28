import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';
import BucketlistTable from './bucketlistTable';
import LoginForm from './Login';
import { baseUrl } from '../constants';

export default class Bucketlist extends Component {
  constructor(props) {
    super(props);
    this.state = { bucketlists: '', showModal: false, bname: '', isLoggedIn: this.props.isLoggedIn };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addBucketlist = this.addBucketlist.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.getName = this.getName.bind(this);
    this.baseURL = 'https://tofaangapi.herokuapp.com/bucketlists/';
    this.token = this.props.token;
    this.getBucketlists = this.getBucketlists.bind(this);
    this.LogOut = this.LogOut.bind(this);
  }

  getBucketlists(url) {
    const getData = {
      method: 'GET',
      headers: { Authorization: this.token },
    };
    return fetch(url, getData)
      .then(response => response.json()).then(res => this.setState({ bucketlists: res }));
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }
  getName(field, event) {
    const newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  }
  LogOut(e) {
    e.preventDefault();
    this.setState({ isLoggedIn: false });
  }
  addBucketlist(url, data) {
    const postData = {
      method: 'POST',
      body: data,
      headers: { Authorization: this.props.token },
    };
    return fetch(url, postData)
      .then(response => response.json())
      .then((resjson) => {
        if (resjson.bucketlist) {
          console.log(resjson.bucketlist);
          this.getBucketlists(`${baseUrl}bucketlists/`);
        }
      });
  }
  handleAdd(e) {
    e.preventDefault();
    const BlData = new FormData();
    BlData.append('name', this.state.bname);
    this.addBucketlist(`${baseUrl}bucketlists/`, BlData);
    this.setState({ bname: '' });
  }

  componentDidMount() {
    this.getBucketlists(`${baseUrl}bucketlists/`);
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<div>
        <nav className="navbar navbar-inverse">
          <ul className="nav navbar-nav">
            <li><a href="">TOFAANGA</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a onClick={this.LogOut}>Logout</a></li>
          </ul>
        </nav>
        <button className="btn btn-xs" onClick={this.openModal}>
          <i className="glyphicon glyphicon-plus-sign" />Add Bucketlist</button>
        <BucketlistTable
          bucketlists={this.state.bucketlists}
          token={this.props.token}
          getBucketlists={this.getBucketlists}
        />
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
          {...this.props}
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Bucketlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleAdd}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.bname}
                  onChange={this.getName.bind(this, 'bname')}
                />
              </div>
              <button type="submit" className="btn btn-default">Add Bucketlist</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
    }

    return (<LoginForm />);
  }
}

