import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Router} from 'react-router-dom';
import {history} from './history';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import store from './store'
ReactDOM.render(
<Provider store={store}>
<Router history={history}>
    <App />
 </Router >
</Provider>


, document.getElementById('root'))
