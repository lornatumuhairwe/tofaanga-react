import React from 'react';
// import fetch from 'isomorphic-fetch';
import LoginForm from './components/Login';
import './App.css';

const App = () => {
  return (
    <div>
      <h1>Welcome to Tofaanga</h1>
      <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/signup">Sign Up</a></li>
        <LoginForm />
      </ul>
    </div>
  );
};

const url = 'https://facebook.github.io/react-native/movies.json';
fetch(url).then(data => console.log(data.json()));

export default App;
