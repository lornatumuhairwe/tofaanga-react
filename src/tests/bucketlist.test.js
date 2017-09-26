import React from 'react';
import renderer from 'react-test-renderer';
import Bucketlist from '../components/Bucketlist/bucketlist';
import { mount } from 'enzyme';
import { stub } from 'sinon';

global.localStorage = {
  setItem: () => {}, getItem: () => {},
};

describe('bucketlist snapshot', () => {
  const isLoggedIn = true;
  const displaySignup = () => {};
  beforeEach(() => {
    stub(Bucketlist.prototype, 'getBucketlists').returns(true);
  });
  it('renders', () => {
    const bucketlist = renderer.create(<Bucketlist isLoggedIn={isLoggedIn} displaySignup={displaySignup} />);
    expect(bucketlist.toJSON()).toMatchSnapshot();
  });

  // it('button opens modal onclick', () => {
  //   const bucketlist = mount(<Bucketlist />);
  // });
});
