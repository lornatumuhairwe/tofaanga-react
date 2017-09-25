import React from 'react';
import renderer from 'react-test-renderer';
import ResetPasswordForm from '../components/Authentication/ResetPassword';

describe('Reset password Form snapshot', () => {
  it('Login Form renders snapshot', () => {
    const Resetpasswordform = renderer.create(<ResetPasswordForm />);
    expect(Resetpasswordform.toJSON()).toMatchSnapshot();
  });
});

//describe('Reset password function');