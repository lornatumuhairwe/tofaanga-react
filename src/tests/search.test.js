import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../components/Search/search';


describe('search snapshot', () => {
  it('matches snapshot', () => {
    const search = renderer.create(<Search />);
    expect(search.toJSON()).toMatchSnapshot();
  },

  );
});
