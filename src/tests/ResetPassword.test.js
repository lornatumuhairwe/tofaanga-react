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
  let ResetPasswordFormm;
  beforeEach(() => {
    ResetPasswordFormm = mount(<ResetPasswordForm />);
  });

  it('Captures values in the fields', () => {
    const form = ResetPasswordFormm.find('form');
    const emailInput = form.find('[type="email"]');
    const passwordInput = form.find('#pwd');
    const cpasswordInput = form.find('#cpwd');
    // emailInput.simulate('change', { target: { value: 'ltumuhairwe@gmail.com' } });
    // passwordInput.simulate('change', { target: { value: 'test' } });
    // cpasswordInput.simulate('change', { target: { value: 'test' } });
    // console.log(ResetPasswordFormm.state());
  });
});