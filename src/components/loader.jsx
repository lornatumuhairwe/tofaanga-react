import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';

export default class Loader extends Component {
  render() {
    return (
      <ReactLoading className="loader" type={'spin'} color={'red'} height="50" width="50" delay={0} />
    );
  }
}

