import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';
import BucketlistTable from './bucketlistTable';
import LoginForm from './Login/Login';
import { baseUrl } from '../constants';
import Search from './search';
import NotificationSystem from 'react-notification-system';
import Loader from './loader'

export default class Bucketlist extends Component {
  constructor(props) {
    super(props);
    this.state = { bucketlists: '', showModal: false, bname: '', isLoggedIn: this.props.isLoggedIn, details: '',
        notificationSystem: null, loading: true };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addBucketlist = this.addBucketlist.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.getName = this.getName.bind(this);
    this.getBucketlists = this.getBucketlists.bind(this);
    this.LogOut = this.LogOut.bind(this);
  }

  componentDidMount() {
      this.setState({ notificationSystem: this.refs.notificationSystem});
  }

  getBucketlists(url) {

    const getData = {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
    };
    return fetch(url, getData)
      .then(response => response.json()).then(res => {
            if (res['bucketlists']){
                this.setState({ bucketlists: res['bucketlists'], details: res['details'], loading: false });
            }
            },
        )
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
  LogOut(event) {
    localStorage.removeItem('token');
    event.preventDefault();
    this.setState({ isLoggedIn: false });
  }
  addBucketlist(url, data) {
    const postData = {
      method: 'POST',
      body: data,
      headers: { Authorization: localStorage.getItem('token') },
    };
    return fetch(url, postData)
      .then(response => response.json())
      .then((resjson) => {
        if (resjson.bucketlist) {
            this.state.notificationSystem.addNotification({
                message: 'Bucketlist added successfully',
                level: 'success',
            });
          this.getBucketlists(`${baseUrl}/bucketlists/`);
        }
        else {
            this.state.notificationSystem.addNotification({
                message: resjson.message,
                level: 'error',
            });
        }
      });
  }
  handleAdd(event) {
    event.preventDefault();
    const BlData = new FormData();
    BlData.append('name', this.state.bname);
    this.addBucketlist(`${baseUrl}/bucketlists/`, BlData);
    this.setState({ showModal: false });
    this.setState({ bname: '' });
  }

  componentWillMount() {
    this.getBucketlists(`${baseUrl}/bucketlists/`);
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<div>
        <NotificationSystem ref="notificationSystem" />
        <nav className="navbar navbar-inverse">
          <ul className="nav navbar-nav">
            <li><a href="">TOFAANGA</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a onClick={this.LogOut}>Logout</a></li>
          </ul>
        </nav>
            <button className="btn btn-sm col-md-offset-1 col-md-1" onClick={this.openModal}>
              <i className="glyphicon glyphicon-plus-sign" />Add Bucketlist</button>
            <Search getBucketlists={this.getBucketlists} />
              {this.state.loading
                  ? <Loader/>
                  : null
              }
        <BucketlistTable
          bucketlists={this.state.bucketlists}
          token={localStorage.getItem('token')}
          getBucketlists={this.getBucketlists}
          details={this.state.details}
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
        </Modal>
      </div>
      );
    }

    return (<LoginForm displaySignup={this.props.displaySignup}/>);
  }
}

