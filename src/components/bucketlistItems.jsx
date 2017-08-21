import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';

class BLIRow extends Component {
  render() {
    return (
      <li className="list-group-item">
        {this.props.bucketlist}
      </li>
    );
  }
}

class BucketlistItems extends Component {
  render() {
    const rows = [];
    const blsi = this.props.items;
    for (const key in blsi) {
      if (blsi.hasOwnProperty(key)) {
        rows.push(<BLIRow id={key} bucketlist={blsi[key]} token={this.props.token} />);
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

export default BucketlistItems;
