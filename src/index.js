import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import './index.css';
import App from './App';
import Err404 from './components/Err404';
import LoginForm from './components/Authentication/Login/Login';
import SignupForm from './components/Authentication/Signup';
import registerServiceWorker from './registerServiceWorker';
import Bucketlist from './components/Bucketlist/bucketlist';

ReactDOM.render(<Router history={browserHistory}>
  <Route path="/" component={App} />
  <Route path="/auth/login" component={LoginForm} />
  <Route path="/auth/signup" component={SignupForm} />
  <Route path="/b" component={Bucketlist} />
  <Route path="*" component={Err404} />
</Router>,
document.getElementById('root'));
registerServiceWorker();
