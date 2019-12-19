require('./sass/index.scss');
import Navbar from './components/Navbar'
import Login from './pages/login'
import Signup from './pages/signup'
import {Route,Switch} from 'react-router-dom';
import Home from './pages/home'
import Todo from './pages/Todo'

import Footer from './components/Footer'
import React from 'react'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser,logoutUser} from './actions/authActions'
import store from './store'
import PrivateRoute from './pages/privateRoute';

if(localStorage.token){
  setAuthToken(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}


export default function App() {
    return (
      <div id='container-app'>
        <Navbar />
         <div id='main-content'>
         <Switch>
            <PrivateRoute  path="/todo" component={Todo} />
            <Route exact path='/' component={Home}/>
            <Route  path="/login" component={Login} />
            <Route  path="/signup" component={Signup} />
        </Switch>
         </div>
     
     
        <Footer />
      </div>
    );
}


