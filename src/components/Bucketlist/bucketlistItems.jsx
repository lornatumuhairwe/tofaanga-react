import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import '../../styles/css/bootstrap.min.css';
import '../../styles/css/bucketlist.css';
import BLIRow from './BLIRow';

export default class BucketlistItems extends Component {
  render() {
    const rows = [];
    const blsi = this.props.items;
    for (const key in blsi) {
      if (blsi.hasOwnProperty(key)) {
        rows.push(<BLIRow
          bID={this.props.bID}
          id={key}
          key={key}
          bucketListItem={blsi[key]}
          token={this.props.token}
          getBucketlistItems={this.props.getBucketlistItems}
        />);
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

