import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../components/Authentication/Login';

describe('LoginForm snapshot', () => {
  it('Login Form renders snapshot', () => {
    const Loginform = renderer.create(<LoginForm />);
    expect(Loginform.toJSON()).toMatchSnapshot();
  });
});
