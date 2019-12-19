import React, { Component } from 'react'
import TodoItem from './TodoItem';
import {getTasks,createTask,deleteTasks,editTask,completedTask,deleteTasksById} from '../actions/taskActions'
import {connect} from 'react-redux';
import gif from '../assets/loading.gif'
class TodoList extends Component {
    state = {
        create: false,
        input: {
            title: ''
        },
        tasks: [],
        edit: false,
        selected: '',
    }
    componentWillMount(){
    this.props.getTasks()
    }
    componentWillReceiveProps(nextProps){
     this.setState({
         tasks: nextProps.tasks
     })
    }
   createTask(){
       this.setState( {
           create: true,
           edit: false
       })
   }
   onChange(e){
    this.setState( {
        input:  {title:e.target.value}
    })
}  
   onCancel = ()=>{
       this.setState(previousState =>({
           create: !previousState,
           edit: !previousState
       }))
   }
   onEdit = (id)=>{
       this.setState({
          edit: true,
          create: false,
          selected: id
       })


   }
   submitEdit = () => e =>{
     e.preventDefault();
     this.props.editTask(this.state.selected,this.state.input)

     this.setState({
        edit: false
     })
   }

   deleteById = id=>{
    this.props.deleteTasksById(id)
  }
   onCompleted = (id)=>{
    this.props.completedTask(id)

}
   submitTask(e){
    e.preventDefault();
    if(this.state.input.title != ''){
    this.props.createTask(this.state.input)
    this.setState( {
        create: false ,
        input:  {title:e.target.value}
    })
    }
   
}
 deleteTasks(e){
     e.preventDefault();
     this.props.deleteTasks()
 }

    render() {
        let button;

        if(this.state.create === false && this.state.edit === false ){
        button = (<div className='mt-5'><button type="button" onClick={this.createTask.bind(this)} className='btn btn-info mr-2'>Create Task</button>
          <button type="button" onClick={this.deleteTasks.bind(this)} className='btn btn-danger '>Clear all Tasks  </button>
          </div>)
        }
        else if(this.state.create === false && this.state.edit === true){
            button =  (<div className=' mt-2'>
            <button type="button"  onClick={this.submitEdit()}  className='btn btn-info mr-2'>Edit</button>
            <button type="button" onClick={this.onCancel}  className='btn btn-danger mr-2'>Cancel</button>
            </div>)
        }
        else{

         button =  (<div className=' mt-2'>
             <button type="button" onClick={this.submitTask.bind(this)}  className='btn btn-info mr-2'>Create</button>
             <button type="button" onClick={this.onCancel}  className='btn btn-danger mr-2'>Cancel</button>

             </div>)
        }
        
        let create;
        if(this.state.edit === true && this.state.create === false){
            create = (<form >
            <div className="form-group">
               <label >Title</label>
               <input type="text" onChange={this.onChange.bind(this)}className="form-control" placeholder="edit task" />
               <small className="form-text text-muted">Edit the task selected.</small>
            </div>
        
        </form>)
             
        }
        else if(this.state.edit === false && this.state.create === true){
            create = (<form >
                <div className="form-group">
                   <label >Title</label>
                   <input type="text" onChange={this.onChange.bind(this)}className="form-control" placeholder="create task" />
                   <small className="form-text text-muted">add new task.</small>
                </div>
            
            </form>)
             
        }
        else{
            create= ''
        }
   
        
        
        let list;
        
        if(this.state.tasks = []){
        list = this.props.tasks.tasks
        }
        else{list = this.state.task}
    
        const imgStyle = {
            width: '200px',
            height: '200px'
          };

          
        let underline;
        underline = {
            textDecoration: 'line-through'
        }
       
    
        const renderList = (
             list.map(item =>(
                <TodoItem deleteById={this.deleteById} onEdit={this.onEdit} underline={underline} id={item._id} onCompleted={this.onCompleted}key={item._id} title={item.title} completed={item.completed} />
               ))
        )

        const notYet = (
            <img src={gif} style={imgStyle}></img>
       )

        return (
            <div className='container'>
                <h1 className=' '>hi, {this.props.auth.user.payload.name}</h1>
                <p>what's up for today</p>
             <div className='list-group'>
               {this.props.tasks.loading  ?  notYet : renderList}
             </div>
             <div className=''>
             {create}
            { button}
             </div>
         
            </div>
        )
    }
}
const mapStateToProps = state =>({
    tasks: state.tasks,
    auth: state.auth
})

export default connect(mapStateToProps, {getTasks,editTask,completedTask,deleteTasks,createTask,deleteTasksById})(TodoList)