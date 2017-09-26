import React from 'react';
import renderer from 'react-test-renderer';
import SignupForm from '../components/Authentication/Signup';
import {mount} from 'enzyme';

describe('Signup snapshot', () => {
  it('renders snapshot appropriately', () => {
    const signup = renderer.create(<SignupForm />);
    expect(signup.toJSON()).toMatchSnapshot();
  });
});

describe('sign in functions', () => {
  let SignUp;
  beforeEach(() => {
    SignUp = mount(<SignupForm />);
    SignUp.instance().sendRegistration = jest.fn();
  });
  it('captures values in input fields', () => {
    const SignUpForm = SignUp.find('form');
    const nameInput = SignUpForm.find('[type="text"]');
    const emailInput = SignUpForm.find('[type="email"]');
    const passwordInput = SignUpForm.find('[type="password"]');
    const dateInput = SignUpForm.find('[type="date"]');
    const signUpButton = SignUpForm.find('Button');
    expect(SignUp.state().email).toBe('');
    expect(SignUp.state().pwd).toBe('');
    expect(SignUp.state().isLoggedIn).toBe(false);
    expect(SignUp.state().isLoading).toBe(false);
    //signUpButton.simulate('submit');
    expect(signUpButton.text()).toEqual('Sign up');
    dateInput.simulate('change', { target: { value: '2017-07-07' } });
    nameInput.simulate('change', { target: { value: 'Lorna' } });
    emailInput.simulate('change', { target: { value: 'ltt@gmail.com' } });
    passwordInput.simulate('change', { target: { value: 'test' } });
    expect(SignUp.state().email).toBe('ltt@gmail.com');
    expect(SignUp.state().pwd).toBe('test');
    signUpButton.simulate('submit');
    expect(signUpButton.text()).toEqual('Loading...');
    expect(SignUp.state().isLoading).toEqual(true);
  });
});
