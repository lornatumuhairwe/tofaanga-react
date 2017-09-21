import React from 'react';
import renderer from 'react-test-renderer';
import SignupForm from '../components/Authentication/Signup';

describe('Signup snapshot', () => {
  it('renders snapshot appropriately', () => {
    const signup = renderer.create(<SignupForm />);
    expect(signup.toJSON()).toMatchSnapshot();
  });
});
