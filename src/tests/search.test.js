import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../components/Search/search';
import {mount} from 'enzyme';
import {stub} from 'sinon';


describe('search snapshot', () => {
  it('matches snapshot', () => {
    const search = renderer.create(<Search />);
    expect(search.toJSON()).toMatchSnapshot();
  },

  );
});

describe('search functions', () => {
  let searchComponent;
  const getBucketlists = () => {
    return true;
  };
  beforeEach(() => {
    searchComponent = mount(<Search getBucketlists={getBucketlists} />);
  });
  it('captures search item', () => {
    const searchInput = searchComponent.find('form').find('FormGroup').find('FormControl');
    expect(searchComponent.state().search).toBe('');
    searchInput.simulate('change', {target: {value: 'se'}});
    expect(searchComponent.state().search).toBe('se');
  });

  it('calls search function', () => {
    const spy = stub(Search.prototype, 'search').returns(true);
    const searchButton = searchComponent.find('form').find('FormGroup').find('Button');
    searchButton.simulate('submit');
    expect(spy.called).toBe(true);

  })
});
