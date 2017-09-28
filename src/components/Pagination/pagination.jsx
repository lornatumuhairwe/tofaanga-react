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
    this.setState({next: true, prev: false });
  }

  handleSelectPrev(event) {
    const { details } = this.props;
    event.preventDefault();
    this.props.getBucketlists(`${baseUrl}${details.prev_url.slice(7)}`);
    this.setState({next: false, prev: true });
  }

  render() {
    const { details } = this.props;

    if (details.next_url && details.prev_url) {
      return (
        <div>
          <Pager>
            <div className="paginationItem">
              <Pager.Item previous id="next" onClick={this.handleSelectPrev}>&larr; Previous</Pager.Item>
            </div>
            <div className="paginationItem">
              <Pager.Item next id="prev" onClick={this.handleSelectNext} >Next &rarr;</Pager.Item>
            </div>
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

