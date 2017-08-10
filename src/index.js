import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import './index.css';
import App from './App';
import Err404 from './components/Err404';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={App} />
  <Route path="*" component={Err404} />
</Router>,
document.getElementById('root'));
registerServiceWorker();
