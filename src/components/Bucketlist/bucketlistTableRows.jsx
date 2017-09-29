import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import '../../styles/css/bootstrap.min.css';
import '../../styles/css/bucketlist.css';
import BucketlistItems from './bucketlistItems';
import { baseUrl } from "../../constants";
import NotificationSystem from 'react-notification-system';


export default class BLRow extends React.Component {
    constructor(props) {
        super(props);
        this.deleteBucketlist = this.deleteBucketlist.bind(this);
        this.editBucketlist = this.editBucketlist.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
        this.updateAction = this.updateAction.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openAdd = this.openAdd.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getBucketlistItems = this.getBucketlistItems.bind(this);
        this.getBucketlistItemsAction = this.getBucketlistItemsAction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItemToBucketlist = this.addItemToBucketlist.bind(this);
        this.addItemToBucketlistAction = this.addItemToBucketlistAction.bind(this);
        this.state = { bucketlist: '', showModal: false, newname: '', items: [], showAdd: false, status: '',
            deadline: '', title: '', notificationSystem: null, showItemPanel: false };
    }
    openAdd(event) {
        event.preventDefault();
        this.setState({ showAdd: true });
    }

    openModal(event) {
        event.preventDefault();
        this.setState({ showModal: true });
    }

    closeModal(event) {
        event.preventDefault();
        this.setState({ showModal: false });
        this.setState({ showAdd: false });
    }

    getName(field, event) {
        const newState = {};
        newState[field] = event.target.value;
        this.setState(newState);
    }

    deleteBucketlist(event) {
        event.preventDefault();
        const bID = this.refs.bid.value;
        alert(`Do you really want to delete this item? : ${bID}`);
        const BlData = new FormData();
        BlData.append('bucketlistID', bID);

        this.deleteAction(`${baseUrl}/bucketlists/` + bID.toString(), BlData);
    }
    editBucketlist(event) {
        event.preventDefault();
        const bID = this.refs.bid.value;
        const BlData = new FormData();
        BlData.append('bucketlistID', bID);
        BlData.append('newname', this.state.newname);
        this.updateAction(`${baseUrl}/bucketlists/` + bID.toString(), BlData);
        // this.setState({ newname: '', showModal: false });
    }

    updateAction(url, data) {
        const updateData = {
            method: 'PUT',
            body: data,
            headers: { Authorization: localStorage.getItem('token') },
        };
        return fetch(url, updateData)
            .then(response => response.json()).then(res => {
                this.props.getBucketlists(`${baseUrl}/bucketlists/`);
                if (res.message === 'Bucketlist updated successfully'){
                    this.state.notificationSystem.addNotification({
                        message: res.message,
                        level: 'success'
                    });
                    this.setState({ newname: '', showModal: false });
                } else {
                    this.state.notificationSystem.addNotification({
                        message: res.message,
                        level: 'error'
                    });
                    this.setState({ newname: '' });
                }
            });
    }

    componentDidMount(){
        this.setState({ notificationSystem: this.refs.notificationSystem });
    }
    delete(url, data) {
        return fetch(url, data)
            .then(response => response.json()).then(res => {
                this.props.getBucketlists(`${baseUrl}/bucketlists/`);
                console.log(res)
            });
    }

    deleteAction(url, data) {
        // console.log('URL', url);
        const deleteData = {
            method: 'DELETE',
            body: data,
            headers: { Authorization: localStorage.getItem('token') },
        };
        return this.delete(url, deleteData)
        // return fetch(url, deleteData)
        //     .then(response => response.json()).then(res => {
        //         this.props.getBucketlists(`${baseUrl}/bucketlists/`);
        //         // console.log(res)
        //     });
    }

    getBucketlistItems(event) {
        event.preventDefault();
        const bID = this.refs.bid.value;
        const BlData = new FormData();
        BlData.append('bucketlistID', bID);
        this.getBucketlistItemsAction(`${baseUrl}/bucketlists/`+ bID.toString(), BlData);
        this.setState({ showItemPanel: !this.state.showItemPanel })
    }

    getBucketlistItemsAction(url) {
        const getData = {
            method: 'GET',
            headers: { Authorization: localStorage.getItem('token') },
        };
        return fetch(url, getData)
            .then(response => response.json()).then((res) => {
                    if (!res['message']){
                        this.setState({ items: res });
                    }

                    if (Object.keys(this.state.items).length===0){
                        this.setState({showItemPanel: false});
                        this.state.notificationSystem.addNotification({
                            message: 'Bucketlist is Empty!',
                            level: 'warning'
                        });
                    } // else {
                    // console.log(this.state.items);
                    // }
                },
            );
    }
    handleChange(field, event) {
        const newState = {};
        newState[field] = event.target.value;
        this.setState(newState);
    }

    addItemToBucketlist(event) {
        event.preventDefault();
        const bID = this.refs.bid.value;
        const blItemData = new FormData();
        blItemData.append('title', this.state.title);
        blItemData.append('deadline', this.state.deadline);
        blItemData.append('status', this.state.status);
        this.addItemToBucketlistAction(`${baseUrl}/bucketlists/` + bID.toString()+ '/items/', blItemData);
        this.setState({ showAdd: false, title:'', deadline: '', status:'', showItemPanel: false });
    }

    addItemToBucketlistAction(url, data) {
        const postData = {
            method: 'POST',
            body: data,
            headers: { Authorization: localStorage.getItem('token') },
        };
        return fetch(url, postData)
                 .then(response => response.json()).then((response) => {
            if(response.message === "Bucketlist item added successfully"){
                this.state.notificationSystem.addNotification({
                    message: 'Bucketlist item added successfully!',
                    level: 'success'
                });
            } else {
                this.state.notificationSystem.addNotification({
                    message: response.message,
                    level: 'error'
                });
            }
            })
    }
    render() {
        const addBucketlistItemtooltip = (
            <Tooltip id="tooltip">Add item to this bucketlist</Tooltip>
        );
        const editBucketlisttooltip = (
            <Tooltip id="tooltip">Edit bucketlist</Tooltip>
        );
        const deleteBucketlisttooltip = (
            <Tooltip id="tooltip">Delete bucketlist.</Tooltip>
        );
        return (
            <li className="list-group-item col-md-12 item">
                <a onClick={this.getBucketlistItems}>{this.props.bucketlist}</a>
                <div className="pull-right">
                    <form className="form-inline pull-right" >
                        <input
                            type="hidden"
                            name="name"
                            value={this.props.id}
                            ref="bid"
                            required
                        />
                        <OverlayTrigger placement="top" overlay={addBucketlistItemtooltip}>
                        <Button type="submit" className="btn btn-sm btn-success btn-circle"  id="add" onClick={this.openAdd}>
                            <i className="glyphicon glyphicon-plus" /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={editBucketlisttooltip}>
                        <Button type="submit" className="btn btn-sm btn-primary btn-circle" id="edit" onClick={this.openModal}>
                            <i className="glyphicon glyphicon-edit" /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={deleteBucketlisttooltip}>
                        <Button type="submit" className="btn btn-sm btn-danger btn-circle" id="delete" onClick={this.deleteBucketlist}>
                            <i className="glyphicon glyphicon-trash" /></Button>
                        </OverlayTrigger>
                    </form>
                    <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="small" aria-labelledby="contained-modal-title-sm" >
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
                                        defaultValue={this.props.bucketlist}
                                        onChange={this.getName.bind(this, 'newname')}
                                    />
                                </div>
                                <button type="submit" className="btn btn-default" onClick={this.editBucketlist}>Update Bucketlist</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    <Modal show={this.state.showAdd} onHide={this.closeModal} bsSize="small" aria-labelledby="contained-modal-title-sm">
                        <Modal.Header closeButton>
                            <Modal.Title>Add item to {this.props.bucketlist}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={this.addItemToBucketlist} className="addItemForm">
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
                                        type="date"
                                        className="form-control"
                                        id="deadline"
                                        value={this.state.deadline}
                                        onChange={this.handleChange.bind(this, 'deadline')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status:</label>
                                    <select name="status"
                                            onChange={this.handleChange.bind(this, 'status')}
                                            value={this.state.status}>
                                        <option value="">Select option</option>
                                        <option value="Incomplete">Incomplete</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-default">Add item</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                <NotificationSystem ref="notificationSystem" />
                <BucketlistItems bID={this.props.id} items={this.state.items}
                                 token={this.props.token}
                                 showItemPanel={this.state.showItemPanel}
                                 getBucketlistItems={this.getBucketlistItems}
                />
            </li>
        );
    }
}