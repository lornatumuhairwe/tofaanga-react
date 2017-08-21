import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';
import BucketlistItems from './bucketlistItems';

class BLRow extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBucketlist = this.deleteBucketlist.bind(this);
    this.editBucketlist = this.editBucketlist.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
    this.updateAction = this.updateAction.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openAdd = this.openAdd.bind(this);
    this.closeAdd = this.closeAdd.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getBucketlistItems = this.getBucketlistItems.bind(this);
    this.getBucketlistItemsAction = this.getBucketlistItemsAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addItemToBucketlist = this.addItemToBucketlist.bind(this);
    this.addItemToBucketlistAction = this.addItemToBucketlistAction.bind(this);
    this.state = { bucketlist: '', showModal: false, newname: '', items: [], showAdd: false, status: '', deadline: '', title: '' };
    this.baseURL = 'https://tofaangapi.herokuapp.com/bucketlists/';
  }
  openAdd(e) {
    e.preventDefault();
    this.setState({ showAdd: true });
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
}

  closeModal(e) {
    e.preventDefault();
    this.setState({ showModal: false });
  }

  closeAdd(e) {
    e.preventDefault();
    this.setState({ showAdd: false });
}

  getName(field, event) {
    const newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  }

  deleteBucketlist(e) {
    e.preventDefault();
    const bID = this.refs.bid.value;
    alert(`Do you really want to delete this item? : ${bID}`);
    const BlData = new FormData();
    BlData.append('bucketlistID', bID);
    this.deleteAction(this.baseURL + bID.toString(), BlData);
    this.props.getBucketlists(this.baseURL);
  }
  editBucketlist(e) {
    e.preventDefault();
    const bID = this.refs.bid.value;
    const BlData = new FormData();
    BlData.append('bucketlistID', bID);
    BlData.append('newname', this.state.newname);
    this.updateAction(this.baseURL + bID.toString(), BlData);
    this.props.getBucketlists(this.baseURL);
    this.setState({ newname: '' });
  }

  updateAction(url, data) {
    const updateData = {
      method: 'PUT',
      body: data,
      headers: { Authorization: this.props.token },
    };
    return fetch(url, updateData)
      .then(response => response.json()).then(res => console.log(res));
  }

  deleteAction(url, data) {
    const deleteData = {
      method: 'DELETE',
      body: data,
      headers: { Authorization: this.props.token },
    };
    return fetch(url, deleteData)
      .then(response => response.json()).then(res => console.log(res));
  }

  getBucketlistItems(e) {
    e.preventDefault();
    const bID = this.refs.bid.value;
    const BlData = new FormData();
    BlData.append('bucketlistID', bID);
    this.getBucketlistItemsAction(this.baseURL + bID.toString(), BlData);
  }

  getBucketlistItemsAction(url) {
    const getData = {
      method: 'GET',
      headers: { Authorization: this.props.token },
    };
    return fetch(url, getData)
      .then(response => response.json()).then((res) => {
        this.setState({ items: res });
        console.log(this.state.items, '-------------------------------');
      },
      );
  }
  handleChange(field, event) {
    const newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  }

  addItemToBucketlist(e) {
    e.preventDefault();
      const bID = this.refs.bid.value;
      const blItemData = new FormData();
      blItemData.append('title', this.state.title);
      blItemData.append('deadline', this.state.deadline);
      blItemData.append('status', this.state.status);
    this.addItemToBucketlistAction(this.baseURL + bID.toString() + '/items/', blItemData);
  }

    addItemToBucketlistAction(url, data) {
        const postData = {
            method: 'POST',
            body: data,
            headers: { Authorization: this.props.token },
        };
        return fetch(url, postData)
            .then(response => response.json()).then(res => console.log(res));
    }

  render() {
    return (
      <li className="list-group-item col-md-12">
        <a onClick={this.getBucketlistItems}>{this.props.bucketlist}</a>
              <div className="pull-right">
          <form className="form-inline">
                      <input
              type="hidden"
              name="name"
              value={this.props.id}
              ref="bid"
              required
            />
            <button type="submit" className="btn btn-xs"  onClick={this.openAdd}>
              <i className="glyphicon glyphicon-plus" /></button>
            <button type="submit" className="btn btn-xs" onClick={this.openModal}>
              <i className="glyphicon glyphicon-edit" /></button>
            <button type="submit" className="btn btn-xs" onClick={this.deleteBucketlist}>
              <i className="glyphicon glyphicon-trash" /></button>
          </form>
          <Modal show={this.state.showModal} onHide={this.closeModal} {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm" >
            <Modal.Header closeButton>
              <Modal.Title>Update Bucketlist: {this.props.bucketlist}</Modal.Title>
            </Modal.Header>
                      <Modal.Body>
                          <form onSubmit={this.handleAdd}>
                <div className="form-group">
                  <label htmlFor="name">New Name:</label>
                  <input
                    type="text"
                    className="form-control"
                                      id="name"
                                      value={this.state.newname}
                    onChange={this.getName.bind(this, 'newname')}
                  />
                </div>
                <button type="submit" className="btn btn-default" onClick={this.editBucketlist}>Update Bucketlist</button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showAdd} onHide={this.closeModal} {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm" >
              <Modal.Header closeButton>
                  <Modal.Title>Add item to {this.props.bucketlist}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <form onSubmit={this.handleAdd}>
                      <div className="form-group">
                          <label htmlFor="title">Title:</label>
                          <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={this.state.title}
                              onChange={this.handleChange.bind(this, 'title')}
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="Deadline">Deadline:</label>
                          <input
                              type="text"
                              className="form-control"
                              id="deadline"
                              value={this.state.deadline}
                              onChange={this.handleChange.bind(this, 'deadline')}
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="status">Status:</label>
                          <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={this.state.status}
                              onChange={this.handleChange.bind(this, 'status')}
                          />
                      </div>
                      <button type="submit" className="btn btn-default" onClick={this.addItemToBucketlist}>Add item</button>
                  </form>
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={this.closeAdd}>Close</Button>
              </Modal.Footer>
          </Modal>
        </div>
       <BucketlistItems bID={this.props.id} items={this.state.items} token={this.props.token} />
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
        rows.push(<BLRow id={key} bucketlist={bls[key]} token={this.props.token} getBucketlists={this.props.getBucketlists} />);
      }
    }
    return (<div>
      <ul className="list-group col-md-12" id="bucketlists">
        {rows}
      </ul>
    </div>
    );
  }
}

export default BucketlistTable;
