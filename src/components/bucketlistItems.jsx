import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';
import { baseUrl} from "../constants";

class BLIRow extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteBucketlistItem = this.deleteBucketlistItem.bind(this);
    this.updateBucketlistItemsAction = this.updateBucketlistItemsAction.bind(this);
    this.deleteBucketlistItemsAction = this.deleteBucketlistItemsAction.bind(this);
    this.state = { showUpdate: false, title: '', deadline: '', status: '' };
  }

  deleteBucketlistItem(e) {
    e.preventDefault();
    alert('Delete Bucketlist item');
    const blitemID = this.refs.bid.value;
    const bID = this.props.bID;
    this.deleteBucketlistItemsAction(`${baseUrl}bucketlists/` + bID.toString() + '/items/' + blitemID.toString());
  }

  deleteBucketlistItemsAction(url){
      const putData = {
          method: 'DELETE',
          headers: { Authorization: this.props.token },
      };
      return fetch(url, putData)
          .then(response => response.json()).then((res) => {
                  // this.setState({ items: res });
                  console.log(res, '-------------------------------');
              },
          );
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ showUpdate: true });
  }

  closeModal(e) {
    e.preventDefault();
    this.setState({ showUpdate: false });
  }

  handleUpdate(e) {
    e.preventDefault();
    const blitemID = this.refs.bid.value;
    const bID = this.props.bID;
    const blItemData = new FormData();
    blItemData.append('title', this.state.title);
    blItemData.append('deadline', this.state.deadline);
    blItemData.append('status', this.state.status);
    console.log(blitemID, bID);
    this.updateBucketlistItemsAction(`${baseUrl}bucketlists/` + bID.toString() + '/items/' + blitemID.toString(), blItemData);
  }

  updateBucketlistItemsAction(url, data) {
    const putData = {
        method: 'PUT',
        body: data,
        headers: { Authorization: this.props.token },
    };
    return fetch(url, putData)
        .then(response => response.json()).then((res) => {
            // this.setState({ items: res });
                console.log(res, '-------------------------------');
            },
        );
}

  handleChange(field, event) {
    const newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <li className="list-group-item">
        {this.props.bucketListItem}
        <div className="pull-right">
          <form className="form-inline">
            <input
              type="hidden"
              name="name"
              value={this.props.id}
              ref="bid"
              required
            />
            <button type="submit" className="btn btn-xs" onClick={this.openModal}>
              <i className="glyphicon glyphicon-edit" /></button>
            <button type="submit" className="btn btn-xs" onClick={this.deleteBucketlistItem}>
              <i className="glyphicon glyphicon-trash" /></button>
            <Modal show={this.state.showUpdate} onHide={this.closeModal} {...this.props}
                   bsSize="small" aria-labelledby="contained-modal-title-sm" >
              <Modal.Header closeButton>
                <Modal.Title>Update item: {this.props.bucketListItem}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      defaultValue={this.props.bucketListItem}
                      onChange={this.handleChange.bind(this, 'title')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Deadline">Deadline:</label>
                    <input
                      type="date"
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
                  <button type="submit" className="btn btn-default" onClick={this.handleUpdate}>Update item</button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </li>
    );
  }
}

export default class BucketlistItems extends Component {
  render() {
    const rows = [];
    const blsi = this.props.items;
    for (const key in blsi) {
      if (blsi.hasOwnProperty(key)) {
        rows.push(<BLIRow bID={this.props.bID} id={key} bucketListItem={blsi[key]} token={this.props.token} />);
      }
    }
    return (<div>
      <ul className="list-group">
        {rows}
      </ul>
    </div>
    );
  }
}

