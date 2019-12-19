import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'
import React, { Component } from 'react'
import {history} from '../history'
class Navbar extends Component {

  onLogout = ()=>{
    this.props.logoutUser(history)
  }
  render() {
    const loggedLinks = (    <ul className='navbar-nav ml-auto'>
    <li className='nav-item'>
     <a href='#' onClick={this.onLogout}     className='nav-link'>
        logout
     </a>
    </li>
  
  </ul>
  )
    const offlineLinks = (   
    <ul className='navbar-nav ml-auto'>
    <li className='nav-item'>
     <Link to='/login'     className='nav-link'>
        login
     </Link>
    </li>
  
    <li className='nav-item'>
    <Link to='/signup'     className='nav-link'>
    sign up
    </Link>
    </li>
  </ul>
  )

  const  logoAuth = (<Link to='/todo'     className='navbar-brand'>
  Todo App
</Link>)

const  logoOff = (<Link to='/'     className='navbar-brand'>
Todo App
</Link>)
    return (
      <div>
           <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
           {this.props.auth.authenticated ? logoAuth : logoOff}
           <button className='navbar-toggler' data-target='#navbarCollapse' data-toggle='collapse'>
               <span className='navbar-toggler-icon'></span>
           </button>
         <div className='navbar-collapse collapse' id='navbarCollapse'>
          
           {this.props.auth.authenticated ? loggedLinks : offlineLinks}
         </div>
         </nav>
      </div>
    )
  }
}
const mapStateToProps = state =>{
  return{
    auth: state.auth
  }
}


export default connect(mapStateToProps,{logoutUser})(Navbar);
