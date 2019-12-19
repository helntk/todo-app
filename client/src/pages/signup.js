import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import {history} from '../history';
import {registerUser} from '../actions/authActions'
import {connect} from 'react-redux';
import classnames from 'classnames';

class Signup extends Component {
   constructor(){
     super()
     this.state = {
      email: '',
      password: '',
      name: '',
      errors: {}
  }
}  


    onChange = (e)=>{
     this.setState({
        [e.target.name]: e.target.value
     })
    }

    componentWillMount(){
      if(this.props.auth.authenticated){
        history.push('/todo')
      }
    }
    handleSubmit = (e) =>{
        e.preventDefault();

      const newUser = {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
      }
      this.props.registerUser(newUser,history)

    }
    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({
          errors: nextProps.errors
        })
      }
    }
    render() {
        const {errors} = this.state

        return (
            <div className='login-form container' onSubmit={this.handleSubmit}>
            <h1>Sign up</h1>
            <form className='form-container'>
              <div className='form-group'>
              <label>Name</label>
              <input className={classnames('form-control', {
                      'is-invalid': errors.name
                    })} onChange={this.onChange} type='name' name='name' placeholder='enter Name'></input>
              {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
              </div>

              <div className='form-group'>
              <label>Password</label>
              <input className={classnames('form-control',{'is-invalid':errors.password})}onChange={this.onChange} type='password' name='password' placeholder='enter password'></input>
              {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
              </div>

              <div className='form-group'>
              <label>Email</label>
              <input className={classnames('form-control',{
                  'is-invalid':errors.email})}
                  onChange={this.onChange} type='email' name='email' placeholder='enter email'></input>
               {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
              </div>

    

              <button className='btn btn-dark' type='submit'>Submit</button>
              <Link className='ml-2' to='/login'>Already have an account?</Link>
               
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth

});
export default connect(mapStateToProps, {registerUser})(Signup)