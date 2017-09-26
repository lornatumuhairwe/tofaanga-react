import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ResetPasswordForm from '../components/Authentication/ResetPassword';

describe('Reset password Form snapshot', () => {
  it('Login Form renders snapshot', () => {
    const Resetpasswordform = renderer.create(<ResetPasswordForm />);
    expect(Resetpasswordform.toJSON()).toMatchSnapshot();
  });
});

describe('Reset password function', () => {
  let ResetPassword;
  beforeEach(() => {
    ResetPassword = mount(<ResetPasswordForm />);
    ResetPassword.instance().sendLogin = jest.fn();
  });

  it('Captures values in the fields', () => {
    const form = ResetPassword.find('form');
    const emailInput = form.find('[type="email"]');
    const passwordInput = form.find('#pwd');
    const cpasswordInput = form.find('#cpwd');
    const resetPwdButton = form.find('Button');
    expect(ResetPassword.state().email).toBe('');
    expect(ResetPassword.state().pwd).toBe('');
    expect(ResetPassword.state().cpwd).toBe('');
    expect(ResetPassword.state().resetpwd).toBe(true);
    expect(ResetPassword.state().isLoading).toBe(false);
    expect(resetPwdButton.text()).toBe('Reset Password');
    expect(emailInput.length).toEqual(1);
    emailInput.simulate('change', { target: { value: 'ltt@gmail.com' } });
    passwordInput.simulate('change', { target: { value: 'test' } });
    cpasswordInput.simulate('change', { target: { value: 'test' } });
    expect(ResetPassword.state().email).toBe('ltt@gmail.com');
    expect(ResetPassword.state().pwd).toBe('test');
    expect(ResetPassword.state().cpwd).toBe('test');
    resetPwdButton.simulate('submit');
    expect(resetPwdButton.text()).toBe('Loading...');
  });
});