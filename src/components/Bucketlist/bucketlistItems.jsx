import React, { Component } from 'react';
import { Modal, Panel, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import '../../styles/css/bootstrap.min.css';
import '../../styles/css/bucketlist.css';
import { baseUrl } from "../../constants";
import NotificationSystem from 'react-notification-system';

export class BLIRow extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteBucketlistItem = this.deleteBucketlistItem.bind(this);
    this.updateBucketlistItemsAction = this.updateBucketlistItemsAction.bind(this);
    this.deleteBucketlistItemsAction = this.deleteBucketlistItemsAction.bind(this);
    this.state = { showUpdate: false, title: '', deadline: '', status: '', notificationSystem: null };
  }

    componentDidMount(){
        this.setState({ notificationSystem: this.refs.notificationSystem });
    }

  deleteBucketlistItem(event) {
    event.preventDefault();
    const blitemID = this.refs.bid.value;
    const bID = this.props.bID;
      //eslint-disable-next-line
    const getDeleteConfirmation = confirm('Do you really want to delete this? ');
      if (getDeleteConfirmation === true) {
          this.deleteBucketlistItemsAction(`${baseUrl}/bucketlists/` + bID.toString() + '/items/' + blitemID.toString());
          this.props.getBucketlistItems(event);
      }
  }

  deleteBucketlistItemsAction(url){
      const putData = {
          method: 'DELETE',
          headers: { Authorization: localStorage.getItem('token') },
      };
      return fetch(url, putData)
          .then(response => response.json()).then((res) => {
              },
          );
  }

  openModal(event) {
    event.preventDefault();
    this.setState({ showUpdate: true });
  }

  closeModal(event) {
    event.preventDefault();
    this.setState({ showUpdate: false });
  }

  handleUpdate(event) {
    event.preventDefault();
    const blitemID = this.refs.bid.value;
    const bID = this.props.bID;
    const blItemData = new FormData();
    if (this.state.title === ''){
        const stateObject = this.state;
        stateObject.title = this.props.bucketListItem[0];
    }
    if (this.state.deadline === ''){
        const stateObject = this.state;
        stateObject.deadline = this.props.bucketListItem[1];
      }
    if (this.state.status === ''){
        const stateObject = this.state;
        stateObject.status = this.props.bucketListItem[2];
      }
    blItemData.append('title', this.state.title);
    blItemData.append('deadline', this.state.deadline);
    blItemData.append('status', this.state.status);
    this.props.getBucketlistItems(event);
    this.updateBucketlistItemsAction(`${baseUrl}/bucketlists/` + bID.toString() + '/items/' + blitemID.toString(), blItemData);
  }

  updateBucketlistItemsAction(url, data) {
    const putData = {
        method: 'PUT',
        body: data,
        headers: { Authorization: localStorage.getItem('token') },
    };
    return fetch(url, putData)
        .then(response => response.json()).then((res) => {
            if (res.message==="Bucketlist item updated successfully"){
                this.state.notificationSystem.addNotification({
                    message: res.message,
                    level: 'success'
                });
                this.setState({ showUpdate: false });
            } else {
                this.state.notificationSystem.addNotification({
                    message: res.message,
                    level: 'error'
                });
            }
            },
        );
}

  handleChange(field, event) {
    const newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  }

  render() {
      const editItemtooltip = (
          <Tooltip id="tooltip">Edit bucketlist item.</Tooltip>
      );
      const deleteItemtooltip = (
          <Tooltip id="tooltip">Delete bucketlist item.</Tooltip>
      );
    return (
      <tr>
        <td>{this.props.bucketListItem[0]}</td>
          <td>{this.props.bucketListItem[2]!=='Complete' ? this.props.bucketListItem[1] : "Congrats!!"}</td>
        <td>{this.props.bucketListItem[2]}</td>
        <td><div className="pull-right">
            <NotificationSystem ref="notificationSystem" />
          <form className="form-inline">
            <input
              type="hidden"
              name="name"
              value={this.props.id}
              ref="bid"
              required
            />
            <OverlayTrigger placement="top" overlay={editItemtooltip}>
            <Button type="submit" className="btn btn-xs btn-primary btn-circle " onClick={this.openModal}>
              <i className="glyphicon glyphicon-edit" /></Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={deleteItemtooltip}>
            <Button type="submit" className="btn btn-xs btn-danger btn-circle" onClick={this.deleteBucketlistItem}>
              <i className="glyphicon glyphicon-trash" /></Button>
            </OverlayTrigger>
            <Modal show={this.state.showUpdate} onHide={this.closeModal}
                   bsSize="small" aria-labelledby="contained-modal-title-sm" >
              <Modal.Header closeButton>
                <Modal.Title>Update item: {this.props.bucketListItem[0]}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      defaultValue={this.props.bucketListItem[0]}
                      onChange={this.handleChange.bind(this, 'title')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Deadline">Deadline:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="deadline"
                      defaultValue={this.props.bucketListItem[1]}
                      onChange={this.handleChange.bind(this, 'deadline')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status: </label>
                    <select name="status"
                            onChange={this.handleChange.bind(this, 'status')}
                            value={this.state.status}>
                      <option value={this.props.bucketListItem[2]}>{this.props.bucketListItem[2]}</option>
                      <option value="Incomplete">Incomplete</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-default" onClick={this.handleUpdate}>Update item</button>
                </form>
              </Modal.Body>
            </Modal>
          </form>
        </div>
        </td>
      </tr>
    );
  }
}

export default class BucketlistItems extends Component {

  render() {
    const rows = [];
    const blsi = this.props.items;
    for (const key in blsi) {
      if (blsi.hasOwnProperty(key)) {
        rows.push(<BLIRow bID={this.props.bID} id={key} key={key}
                          bucketListItem={blsi[key]} token={this.props.token}
                          getBucketlistItems={this.props.getBucketlistItems} />);
      }
    }
    return (<div className="panel">
          <Panel className="panelpanel" collapsible expanded={this.props.showItemPanel} >
            <table className="table table-responsive table-hover">
              <thead>
              <tr>
                <th>Item</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {rows}
              </tbody>
            </table>
        </Panel>
    </div>
    );
  }
}

