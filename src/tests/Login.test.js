import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../components/Authentication/Login/Login';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import App from '../App';

global.localStorage = {
  setItem: () => {}, getItem: () => {},
};

describe('LoginForm snapshot', () => {
  it('Login Form renders snapshot', () => {
    const Loginform = renderer.create(<LoginForm />);
    expect(Loginform.toJSON()).toMatchSnapshot();
  });
});

describe('Button changes the text after click', () => {
  let Login;
  const displaySignup = () => {

  };
  beforeEach(() => {
    Login = mount(<LoginForm displaySignup={displaySignup} />);
  });

  it('loads in when both parameter are put', () => {
    const loginButton = Login.find('Button');
    Login.instance().sendLogin = jest.fn();
    const loginForm = Login.find('form');
    const emailInput = loginForm.find('[type="email"]');
    const passwordInput = loginForm.find('[type="password"]');
    expect(loginButton.text()).toEqual('Sign in');
    emailInput.simulate('change', { target: { value: 'ltumuhairwe@gmail.com' } });
    passwordInput.simulate('change', { target: { value: 'test' } });
    expect(Login.state().email).toEqual('ltumuhairwe@gmail.com');
    expect(Login.state().pwd).toEqual('test');
    loginButton.simulate('submit'); // submit
    expect(Login.state().isLoading).toEqual(true);
    expect(loginButton.text()).toEqual('Loading...');
  });

  it('displays reset password form when link is clicked', () => {
    const loginForm = Login.find('form');
    const resetpasswordlink = loginForm.find('a');
    resetpasswordlink.simulate('click');
    expect(Login.state().resetpwd).toEqual(true);
  });

//   it('displays signup form when link is clicked', () => {
//     const Appi = mount(<App />);
//     console.log(Appi.state());
//     Login.instance().displaySignup = jest.fn();
//     const signuplink = Login.find('#sp');
//     signuplink.simulate('click');
//     console.log(Appi.state());
//   });
});

