import React from 'react';
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

export default App;
