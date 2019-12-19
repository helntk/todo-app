import React from 'react'

export default function TodoItem({title,completed,onEdit,onCompleted,id,underline,deleteById}) {
    let line;
    
    if(completed){
       
    line = underline
    
    }
    else{
        line 
    }
  
    return (
            <li className='list-group-item d-flex justify-content-between align-items-center' style={line}>{title} 
            <div>
            {!completed  && (    <a href='#'  onClick={()=>onCompleted(id)}><span className="badge"><i className="fas fa-check fa-2x"></i></span></a>
            )}
            <a href='#'   onClick={()=>onEdit(id)}><span className='badge'><i className="fas fa-edit fa-2x"></i></span></a>
            <a href='#' onClick={()=>deleteById(id)}><span className='badge'><i className="fas fa-trash-alt"></i></span></a>
            </div>
            </li>

    )
}
<i class="fas fa-trash-alt"></i>
