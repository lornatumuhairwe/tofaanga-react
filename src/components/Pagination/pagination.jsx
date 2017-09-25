import React from 'react';
import { Pager } from 'react-bootstrap';
import '../../styles/css/bootstrap.min.css';
import '../../styles/css/bucketlist.css';
import { baseUrl } from '../../constants';

export default class PaginationComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
      prev: false,
    };
    this.handleSelectNext = this.handleSelectNext.bind(this);
    this.handleSelectPrev = this.handleSelectPrev.bind(this);
  }

  handleSelectNext(event) {
    const { details } = this.props;
    event.preventDefault();
    this.props.getBucketlists(`${baseUrl}${details.next_url.slice(7)}`);
  }

  handleSelectPrev(event) {
    const { details } = this.props;
    event.preventDefault();
    this.props.getBucketlists(`${baseUrl}${details.prev_url.slice(7)}`);
  }

  render() {
    const { details } = this.props;

    if (details.next_url && details.prev_url) {
      return (
        <div>
          <Pager>
            <Pager.Item previous onClick={this.handleSelectPrev}>&larr; Previous</Pager.Item>
            <Pager.Item next onClick={this.handleSelectNext} >Next &rarr;</Pager.Item>
          </Pager>
        </div>
      );
    } else if (details.next_url) {
      return (
        <div>
          <Pager>
            <Pager.Item next onClick={this.handleSelectNext} >Next &rarr;</Pager.Item>
          </Pager>
        </div>
      );
    } else if (details.prev_url) {
      return (<div>
        <Pager>
          <Pager.Item previous onClick={this.handleSelectPrev}>&larr; Previous</Pager.Item>
        </Pager>
      </div>);
    }
    return (null);
  }
}

