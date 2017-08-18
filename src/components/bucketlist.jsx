import React, { Component } from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';

class BLRow extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <a href="#">{this.props.bucketlist}</a>
        <div className="pull-right">
          <form className="form-inline">
            <input type="hidden" name="name" value={this.props.id} required />
            <button type="submit" className="btn btn-xs">
              <i className="glyphicon glyphicon-trash" /></button>
            <button type="submit" className="btn btn-xs">
              <i className="glyphicon glyphicon-edit" /></button>
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
      <nav className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
          <li><a href="#">TOFAANGA</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li ><a href="#">Logout</a></li>
        </ul>
      </nav>
      <button type="submit" className="btn btn-xs">
        <i className="glyphicon glyphicon-trash" /></button>
      <BucketlistTable bucketlists={this.state.bucketlists} />
    </div>
    );
  }
}

export default Bucketlist;
