import React from 'react';
import '../../styles/css/bootstrap.min.css';
import '../../styles/css/bucketlist.css';
import BLRow from './bucketlistTableRows';

export default class BucketlistTable extends React.Component {
  render() {
    const rows = [];
    const bls = this.props.bucketlists;
    // const details = this.props.details;
    for (const key in bls) {
      if (bls.hasOwnProperty(key)) {
        rows.push(<BLRow
          key={key}
          id={key}
          bucketlist={bls[key]}
          token={this.props.token}
          getBucketlists={this.props.getBucketlists}
        />);
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

