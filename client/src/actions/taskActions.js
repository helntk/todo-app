import {GET_TASKS,LOADING_TASKS,EDIT_TASK} from './types';
import axios from 'axios';

export const getTasks = ()=>dispatch =>{
  dispatch(
    {
      type: LOADING_TASKS,
     
    }
  )
  axios.get('http://localhost:3000/tasks')
  .then(res =>{
      dispatch({
          type: GET_TASKS,
          payload: res.data
      })
      console.log(res.data)
  })
  .catch(e => console.log(e))
}



export const createTask = data => dispatch =>{
 axios.post('http://localhost:3000/tasks',data)
 .then(res =>{
  dispatch(getTasks())
  console.log(res.data)

})
 .catch(e =>{
 console.log(e)
 })
}

export const deleteTasks = () => dispatch =>{
    axios.delete('http://localhost:3000/tasks')
    .then(res =>{
      console.log(res.data)
      dispatch(getTasks())
    })
    .catch(e =>{
      console.log(e)
    })
}

export const deleteTasksById = (id) => dispatch =>{
  axios.delete(`http://localhost:3000/tasks/${id}`)
  .then(res =>{
    console.log(res.data)
    dispatch(getTasks())
  })
  .catch(e =>{
    console.log(e)
  })
}


export const editTask = (id,data)=> dispatch =>{
axios.patch(`http://localhost:3000/tasks/${id}`,data)
.then(res =>{
  console.log(res.data)
  dispatch(getTasks())
})
.catch(e =>{
 console.log(e)
})
}

export const completedTask = id => dispatch =>{
  axios.patch(`http://localhost:3000/tasks/${id}`,{completed: true})
.then(res =>{
  console.log(res.data)
  dispatch(getTasks())
})
.catch(e =>{
 console.log(e)
})
}
