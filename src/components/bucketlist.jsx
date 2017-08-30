import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';
import BucketlistTable from './bucketlistTable';
import LoginForm from './Login';
import { baseUrl } from '../constants';
import Search from './search';

export default class Bucketlist extends Component {
  constructor(props) {
    super(props);
    this.state = { bucketlists: '', showModal: false, bname: '', isLoggedIn: this.props.isLoggedIn, details: '' };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addBucketlist = this.addBucketlist.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.getName = this.getName.bind(this);
    this.getBucketlists = this.getBucketlists.bind(this);
    this.LogOut = this.LogOut.bind(this);
  }

  getBucketlists(url) {
    const getData = {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
    };
    return fetch(url, getData)
      .then(response => response.json()).then(res => {
                // console.log(res);
        this.setState({ bucketlists: res['bucketlists'], details: res['details'] });
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
          console.log(resjson.bucketlist);
          this.getBucketlists(`${baseUrl}/bucketlists/`);
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

  componentDidMount() {
    this.getBucketlists(`${baseUrl}/bucketlists/`);
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
            <button className="btn btn-sm col-md-offset-1 col-md-1" onClick={this.openModal}>
              <i className="glyphicon glyphicon-plus-sign" />Add Bucketlist</button>
            <Search getBucketlists={this.getBucketlists} />
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

