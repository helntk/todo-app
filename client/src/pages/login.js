import {Link} from 'react-router-dom';
import React, { Component } from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions'
import {history} from '../history';
class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }
    componentWillMount(){
      if(this.props.auth.authenticated){
        history.push('/todo')
      }
    }
    onChange = (e)=>{
     this.setState({
        [e.target.name]: e.target.value
     })
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.errors){
          this.setState({
            errors: nextProps.errors
          })
        }
      }
    handleSubmit = (e) =>{
      e.preventDefault();
      const user = {
          email: this.state.email,
          password: this.state.password
      } 

      this.props.loginUser(user,history)
    
    }
    render() {
        const {errors} = this.state

        return (
            <div className='login-form container'>
            <h1>Login</h1>
            <form className='form-container' onSubmit={this.handleSubmit}>
              <div className='form-group'>
              <label>Email</label>
              <input className={classnames('form-control',{'is-invalid':errors.email})} onChange={this.onChange} type='email' name='email' placeholder='enter email'></input>
              {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
              )}
              </div>

              <div className='form-group'>
              <label>Password</label>
              <input className={classnames('form-control',{'is-invalid':errors.password})} onChange={this.onChange} type='password' name='password' placeholder='enter password'></input>
              {errors.password && (
                  <div className='invalid-feedback'>{errors.password}</div>
              )}
              </div>
              
              <button className='btn btn-dark' type='submit'>Submit</button>
              <Link className='ml-2' to='/signup'>Doesn't have an account?</Link>

            </form>
        </div>
        )
    }
}
const mapStateToProps = state=>{
  return {
      errors: state.errors,
      auth: state.auth
  }
}
export default connect(mapStateToProps,{loginUser})(Login)