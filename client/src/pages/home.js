import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {history} from '../history';
class Home extends React.Component{
    componentWillMount(){
        if(this.props.auth.authenticated){
          history.push('/todo')
        }
      }
      render(){
        return <div className='todo-container container'>
            <h1>Todo App</h1>
            <p>It was made with React, Redux, Node, Express, Mongodb and Bootstrap/sass</p> 
            <p>
             made by @helntk<br></br>
             <a href='https://github.com/helntk'>See other projects of mine</a>
              
             </p>
          
                <Link to='/login' className='btn btn-primary '>
                    login
                </Link>
         

           
                <Link to='/signup' className='ml-2'>
                    haven't registered yet?
                </Link>
           

  
          </div>
      
    
      }

}
const mapStateToProps = state=>({
    auth: state.auth
})
export default connect(mapStateToProps)(Home);