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
    console.log('Your bucketlists are: ');
    let bls = this.props.bucketlists;
    for (let key in bls) {
      console.log('For loop: ');
      if (bls.hasOwnProperty(key)) {
        console.log(key + ' -> ' + bls[key]);
        return (<BLRow bucketlist={bls[key]} />)
      }
    }
    return (
      <h1>Bucketlist</h1>
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
      .then(response => response.json(),
        // this.setState({ bucketlists: response.json() });
      ).then(res => this.setState({ bucketlists: res }));
  }

  componentDidMount() {
    this.getBucketlists(this.baseURL);
  }

  render() {
    return (<div>
          <h1>Bucketlists</h1>
      <table>
        <thead>
          <tr>Bucketlists</tr>
        </thead>
        <tbody>
          <BucketlistTable bucketlists={this.state.bucketlists} />
        </tbody>
      </table>
    </div>
    );
  }
}

export default Bucketlist;
