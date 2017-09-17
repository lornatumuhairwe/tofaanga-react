import React from 'react';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bucketlist.css';
import { baseUrl } from '../constants';

export default class PaginationComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { next: '', prev: '' };
    this.handleSelectNext = this.handleSelectNext.bind(this);
    this.handleSelectPrev = this.handleSelectPrev.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  handleSelectNext(event) {
    event.preventDefault();
    this.props.getBucketlists(`${baseUrl}${this.state.next.slice(7)}`);
  }

  handleSelectPrev(event) {
    event.preventDefault();
    this.props.getBucketlists(`${baseUrl}${this.state.prev.slice(7)}`);
  }

  renderPagination() {
    const details = this.props.details;

    if (details.next_url && details.prev_url) {
      this.setState({ next: details.next_url, prev: details.prev_url });
      return (<div>
        <ul className="pagination">
          <li className="pull-right"><a onClick={this.handleSelectNext}>Next &raquo;</a></li>
          <li className="pull-left"><a onClick={this.handleSelectPrev} >Prev &laquo; </a></li>
        </ul></div>);
    } else if (details.next_url) {
      this.setState({ next: details.next_url });
      return (<div>
        <ul className="pagination">
          <li className="pull-right"><a onClick={this.handleSelectNext}>Next &raquo;</a></li>
        </ul></div>);
    } else if (details.prev_url) {
      // console.log(details.next_url);
      this.setState({ prev: details.prev_url });
      // this.setState({ prev: details.prev_url });
      return (<div>
        <ul className="pagination">
          <li className="pull-left"><a onClick={this.handleSelectPrev} >Prev &laquo; </a></li>
        </ul></div>);
    }

    return (<div />);
  }
  render() {
    return (<div>
      {this.renderPagination()}
    </div>
    );
  }
}

