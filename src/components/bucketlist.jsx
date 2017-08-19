import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';

class BLRow extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBucketlist = this.deleteBucketlist.bind(this);
    this.editBucketlist = this.editBucketlist.bind(this);
    this.state = { bucketlist: '' };
  }
  deleteBucketlist(e) {
    e.preventDefault();
    const bID = this.refs.bid.value;
    alert(`Do you really want to delete this item? : ${bID}`);
  }
  editBucketlist(e) {
    e.preventDefault();
    const bID = this.refs.bid.value;
    alert(`Editing: ${bID}`);
  }

  render() {
    return (
      <li className="list-group-item">
        <a href="#">{this.props.bucketlist}</a>
        <div className="pull-right">
          <form className="form-inline">
            <input
              type="hidden"
              name="name"
              value={this.props.id}
              ref="bid"
              required
            />
            <button type="submit" className="btn btn-xs" onClick={this.editBucketlist}>
              <i className="glyphicon glyphicon-edit" /></button>
            <button type="submit" className="btn btn-xs" onClick={this.deleteBucketlist}>
              <i className="glyphicon glyphicon-trash" /></button>
          </form>
        </div>
      </li>
    );
  }
}

class BucketlistTable extends React.Component {
  render() {
    const rows = [];
    const bls = this.props.bucketlists;
    for (const key in bls) {
      if (bls.hasOwnProperty(key)) {
        rows.push(<BLRow id={key} bucketlist={bls[key]} />);
      }
    }
    return (<div>
      <ul className="list-group col-md-3">
        {rows}
      </ul>
    </div>
    );
  }
}

class Bucketlist extends Component {
  constructor(props) {
    super(props);
    this.state = { bucketlists: '', showModal: false, bname: '' };
    this.baseURL = 'https://tofaangapi.herokuapp.com/bucketlists/';
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addBucketlist = this.addBucketlist.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.getName = this.getName.bind(this);
  }

  getBucketlists(url) {
    const getData = {
      method: 'GET',
      headers: { Authorization: this.props.token },
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
          this.getBucketlists(this.baseURL);
        }
      });
  }
  handleAdd(e) {
    e.preventDefault();
    const BlData = new FormData();
    BlData.append('name', this.state.bname);
    this.addBucketlist(this.baseURL, BlData);
    this.setState({ bname: '' });
  }

  componentDidMount() {
    this.getBucketlists(this.baseURL);
  }

  render() {
    return (<div>
      <nav className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
          <li><a href="#">TOFAANGA</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li ><a href="#">Logout</a></li>
        </ul>
      </nav>
      <button className="btn btn-xs" onClick={this.openModal}>
        <i className="glyphicon glyphicon-plus-sign" /></button>
      <BucketlistTable bucketlists={this.state.bucketlists} />
      <Modal show={this.state.showModal} onHide={this.closeModal} {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm" >
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
}

export default Bucketlist;
