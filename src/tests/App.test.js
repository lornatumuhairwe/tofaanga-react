import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Login from '../components/Authentication/Login';

global.localStorage = {
  setItem: () => {}, getItem: () => {},
};

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});

describe('Login', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
  });
});
