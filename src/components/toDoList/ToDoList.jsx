import React from 'react'
import { useState } from 'react';
import { v4 as uuidv4} from 'uuid';
import './TodoList.css';

/**
 * 
 * @returns 
 * controlled component
 * 2 way data binding
 * uncontrolled component
 * 
 */

const arr = [1, [2,3]];
const arr1 = [...arr];// shallow copy
console.log(arr[1],arr1[1]); 
const arr2 = structuredClone(arr); //deep clone
arr1[0] = 199;
console.log(arr[0],arr1[0]);

const Todolist = () => {
    const [inputValue,setInputValue] = useState('');
    const [toDoList,setToDoList] = useState([]);
    const [editId,setEditId] = useState(null);
    const[editValue,setEditValue] = useState('');
    /*
        [{title:"",},{}...]
    */
    const handleChange = (e) =>{
        //synthetic event ->cross platform compatibility
        setInputValue(e.target.value);
        //console.log(e, e.target.value);
        
    };
    const handleSubmit = (e) =>{
        const newToDo = {id:uuidv4(),title:inputValue};
        //toDoList.push(newToDo);
        const newToDoList = [...toDoList];
        newToDoList.push(newToDo);
        setToDoList(newToDoList);
        setInputValue('');
        
    };
    const handleDelete = (id) =>{

        //filter -> id
        //splice -> index
        const filteredList = toDoList.filter((item) => {
            return item.id !== id;
        });
        
        setToDoList(filteredList);
        setInputValue('');
    }
    const handleEdit = (id,currTitle) =>{

        //filter -> id
        //splice -> index
        setEditId(id);
        setEditValue(currTitle);
    }
    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    }
    const handleSave = (id) => {
        const updatedList = toDoList.map((item)=>{
            return item.id===id?{...item,title:editValue}:item
        })
        setToDoList(updatedList);
        setEditId(null);
        setEditValue('');
    }
    const handleCancel = () =>{
        setEditId(null);
        setEditValue('');
    }
  return (
    <div>
        <div>
            <input value={inputValue} onChange={handleChange}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
            <ul>
                {toDoList.map((item)=>(
                    <li key={item.id}>
                        {editId===item.id?(
                            <>
                                <input value={editValue} onChange={handleEditChange} />
                                <button onClick={() => handleSave(item.id)}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>

                            </>
                            ):
                            (
                            <>
                                <span>{item.title}</span>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                                <button onClick={() => handleEdit(item.id, item.title)}>Edit</button>
                            </>
                            )}
                    </li>
                ))}
            </ul>
        </div>
        
    </div>
  )
}
export default Todolist;
