// import React from 'react'
// import { useState } from 'react';
// import { v4 as uuidv4} from 'uuid';
// import './TodoList.css';

// /**
//  * 
//  * @returns 
//  * controlled component
//  * 2 way data binding
//  * uncontrolled component
//  * 
//  */

// const arr = [1, [2,3]];
// const arr1 = [...arr];// shallow copy
// console.log(arr[1],arr1[1]); 
// const arr2 = structuredClone(arr); //deep clone
// arr1[0] = 199;
// console.log(arr[0],arr1[0]);

// const Todolist = () => {
//     const [inputValue,setInputValue] = useState('');
//     const [toDoList,setToDoList] = useState([]);
//     const [editId,setEditId] = useState(null);
//     const[editValue,setEditValue] = useState('');
//     /*
//         [{title:"",},{}...]
//     */
//     const handleChange = (e) =>{
//         //synthetic event ->cross platform compatibility
//         setInputValue(e.target.value);
//         //console.log(e, e.target.value);
        
//     };
//     const handleSubmit = (e) =>{
//         const newToDo = {id:uuidv4(),title:inputValue};
//         //toDoList.push(newToDo);
//         const newToDoList = [...toDoList];
//         newToDoList.push(newToDo);
//         setToDoList(newToDoList);
//         setInputValue('');
        
//     };
//     const handleDelete = (id) =>{

//         //filter -> id
//         //splice -> index
//         const filteredList = toDoList.filter((item) => {
//             return item.id !== id;
//         });
        
//         setToDoList(filteredList);
//         setInputValue('');
//     }
//     const handleEdit = (id,currTitle) =>{

//         //filter -> id
//         //splice -> index
//         setEditId(id);
//         setEditValue(currTitle);
//     }
//     const handleEditChange = (e) => {
//         setEditValue(e.target.value);
//     }
//     const handleSave = (id) => {
//         const updatedList = toDoList.map((item)=>{
//             return item.id===id?{...item,title:editValue}:item
//         })
//         setToDoList(updatedList);
//         setEditId(null);
//         setEditValue('');
//     }
//     const handleCancel = () =>{
//         setEditId(null);
//         setEditValue('');
//     }
//   return (
//     <div>
//         <div>
//             <input value={inputValue} onChange={handleChange}/>
//             <button onClick={handleSubmit}>Submit</button>
//         </div>
//         <div>
//             <ul>
//                 {toDoList.map((item)=>(
//                     <li key={item.id}>
//                         {editId===item.id?(
//                             <>
//                                 <input value={editValue} onChange={handleEditChange} />
//                                 <button onClick={() => handleSave(item.id)}>Save</button>
//                                 <button onClick={handleCancel}>Cancel</button>

//                             </>
//                             ):
//                             (
//                             <>
//                                 <span>{item.title}</span>
//                                 <button onClick={() => handleDelete(item.id)}>Delete</button>
//                                 <button onClick={() => handleEdit(item.id, item.title)}>Edit</button>
//                             </>
//                             )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
        
//     </div>
//   )
// }
// export default Todolist;
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const inputRef = useRef(null);

  // focus input when edit mode starts
  useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  // Memoized count for efficiency
  const stats = useMemo(() => {
    return {
      totalPending: pendingTasks.length,
      totalCompleted: completedTasks.length,
    };
  }, [pendingTasks, completedTasks]);

  const handleChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) return;
    const newTask = { id: uuidv4(), title: inputValue };
    setPendingTasks((prev) => [...prev, newTask]);
    setInputValue('');
  }, [inputValue]);

  const handleDelete = useCallback((id, isCompleted = false) => {
    if (isCompleted) {
      setCompletedTasks((prev) => prev.filter((item) => item.id !== id));
    } else {
      setPendingTasks((prev) => prev.filter((item) => item.id !== id));
    }
  }, []);

  const handleEdit = useCallback((id, title) => {
    setEditId(id);
    setEditValue(title);
  }, []);

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = (id, isCompleted = false) => {
    if (isCompleted) {
      setCompletedTasks((prev) =>
        prev.map((item) => (item.id === id ? { ...item, title: editValue } : item))
      );
    } else {
      setPendingTasks((prev) =>
        prev.map((item) => (item.id === id ? { ...item, title: editValue } : item))
      );
    }
    setEditId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditId(null);
    setEditValue('');
  };

  const moveToCompleted = (id) => {
    const task = pendingTasks.find((t) => t.id === id);
    if (task) {
      setPendingTasks((prev) => prev.filter((t) => t.id !== id));
      setCompletedTasks((prev) => [...prev, task]);
    }
  };

  const moveToPending = (id) => {
    const task = completedTasks.find((t) => t.id === id);
    if (task) {
      setCompletedTasks((prev) => prev.filter((t) => t.id !== id));
      setPendingTasks((prev) => [...prev, task]);
    }
  };

  return (
    <div className="container">
      <h2>Todo App</h2>
      <div className="input-section">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter new task"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="lists">
        <div className="list">
          <h3>Pending Tasks ({stats.totalPending})</h3>
          <ul>
            {pendingTasks.map((item) => (
              <li key={item.id}>
                {editId === item.id ? (
                  <>
                    <input
                      ref={inputRef}
                      value={editValue}
                      onChange={handleEditChange}
                    />
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => handleEdit(item.id, item.title)}>✏️</button>
                    <button onClick={() => handleDelete(item.id)}>🗑️</button>
                    <button onClick={() => moveToCompleted(item.id)}>⬇️</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
          <h3>Completed Tasks ({stats.totalCompleted})</h3>
          <ul>
            {completedTasks.map((item) => (
              <li key={item.id}>
                {editId === item.id ? (
                  <>
                    <input
                      ref={inputRef}
                      value={editValue}
                      onChange={handleEditChange}
                    />
                    <button onClick={() => handleSave(item.id, true)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    
                    <span>{item.title}</span>
                    <button onClick={() => handleEdit(item.id, item.title)}>✏️</button>
                    <button onClick={() => handleDelete(item.id, true)}>🗑️</button>
                    <button onClick={() => moveToPending(item.id)}>⬆️</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

