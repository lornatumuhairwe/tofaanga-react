import React, { Component } from 'react';
import '../../styles/css/bootstrap.min.css';
import '../../styles/css/bucketlist.css';
import { FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { baseUrl } from '../../constants';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '', result: [] };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, event) {
    const newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  }

  search() {
    this.props.getBucketlists(`${baseUrl}/bucketlists/?q=${this.state.search}`);
  }

  handleSearch(event) {
    event.preventDefault();
    this.search();
  }

  render() {
    return (<div>
      <form className="navbar-form navbar-right search" onSubmit={this.handleSearch}>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" onChange={this.handleChange.bind(this, 'search')} />
            <InputGroup.Button>
              <Button type="submit">
                <i className="glyphicon glyphicon-search" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </div>);
  }
}
