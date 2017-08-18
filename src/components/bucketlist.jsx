import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/style.css';

class BLRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.bucketlist}</td>
      </tr>
    );
  }
}

class BucketlistTable extends React.Component {
  render() {
    const rows = [];
    const bls = this.props.bucketlists;
    for (const key in bls) {
      if (bls.hasOwnProperty(key)) {
        rows.push(<BLRow bucketlist={bls[key]} />);
      }
    }
    return (<div>
      <table>
        <thead>
          <tr><b>Bucketlists</b></tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
    );
  }
}

class Bucketlist extends Component {
  constructor(props) {
    super(props);
    this.state = { bucketlists: '' };
    this.baseURL = 'https://tofaangapi.herokuapp.com/bucketlists/';
  }

  getBucketlists(url) {
    const getData = {
      method: 'GET',
      headers: { Authorization: this.props.token },
    };
    return fetch(url, getData)
      .then(response => response.json()).then(res => this.setState({ bucketlists: res }));
  }

  componentDidMount() {
    this.getBucketlists(this.baseURL);
  }

  render() {
    return (<div>
      <BucketlistTable bucketlists={this.state.bucketlists} />
    </div>
    );
  }
}

export default Bucketlist;
