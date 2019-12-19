import {GET_ERRORS,GET_SELECTED_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken'
export  const registerUser = (user,history) => dispatch =>{
    axios.post('http://localhost:3000/users',user).then((res)=>{
        history.push('/login')
        }).catch(e => dispatch({
          type:GET_ERRORS,
          payload: e.response.data
        }))
      
}

export  const loginUser = (user,history) => dispatch =>{
  axios.post('http://localhost:3000/users/login',user).then((res)=>{
      const token = res.data
      localStorage.setItem('token', token)

      const decoded = jwt_decode(token)
      
      setAuthToken(token)
      dispatch(setCurrentUser(decoded))
      history.push('/todo')
      }).catch(e => dispatch({
        type:GET_ERRORS,
        payload: e.response.data
      }))
    
}

export  const logoutUser = (history) => dispatch =>{
      const token = localStorage.token;
      localStorage.removeItem('token')

      setAuthToken(false)
      dispatch(setCurrentUser({}))
      history.push('/login')
      
    
}

export const setCurrentUser = (decoded)=>{
  return {
    type: GET_SELECTED_USER,
    payload: decoded
  }
}


