import React, { useContext, useRef, useEffect } from "react";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { fetchToDos, toDoActions } from "../../slices/rtkToDoListSlice.js";

const TodoListRTK = () => {
  

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    
    const {
    pendingTasks,
    completedTasks,
    editId,
    editValue,
    inputValue,
    loading,
    error,
  } = useSelector((state) => state.todos);
 

  useEffect(()=>{
    dispatch(fetchToDos());
  },[dispatch])


  useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  if(loading){
    return (
        <div className="container">
            <h2>ToDo (Redux Toolkit)</h2>
            <p>Loading Todos...</p>
        </div>
    )
  }
  if(error){
    return (
        <div className="container">
            <h2>ToDo (Redux Toolkit)</h2>
            <p>Error loading data</p>
            <button onClick={()=>dispatch(fetchToDos())}>Retry</button>
        </div>
    )
  }

  return (
    <div className="container">
      <h2>Todo App RTK</h2>
      <div className="input-section">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) =>
            dispatch(toDoActions.setInput(e.target.value))
          }
          placeholder="Enter new task"
        />
        <button onClick={() => {
            const title = inputValue.trim();
            if (!title) return;
            dispatch(toDoActions.addToDo({ id: uuidv4(), title }));
          }}>Submit</button>
      </div>

      <div className="lists">
        <div className="list">
          <h3>Pending Tasks ({pendingTasks.length})</h3>
          <ul>
            {pendingTasks.map((item) => (
              <li key={item.id}>
                {editId === item.id ? (
                  <>
                    <input
                      ref={inputRef}
                      value={editValue}
                      onChange={(e) => dispatch(toDoActions.editValue(e.target.value))}
                    />
                    <button onClick={() =>
                        dispatch(toDoActions.saveToDo({ id: item.id, isCompleted: false }))}>Save</button>
                    <button onClick={() => dispatch(toDoActions.cancelEdit())}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => dispatch(toDoActions.editToDo(item))}>✏️</button>
                    <button onClick={() => dispatch(toDoActions.deleteToDo(item.id))}>🗑️</button>
                    <button onClick={() => dispatch(toDoActions.moveToCompleted(item.id))}>➡️</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
          <h3>Completed Tasks ({completedTasks.length})</h3>
          <ul>
            {completedTasks.map((item) => (
              <li key={item.id}>
                {editId === item.id ? (
                  <>
                    <input
                      ref={inputRef}
                      value={editValue}
                      onChange={(e) => dispatch(toDoActions.editValue(e.target.value))}
                    />
                    <button onClick={() =>
                        dispatch(toDoActions.saveToDo({ id: item.id, isCompleted: true }))}>Save</button>
                    <button onClick={() => dispatch(toDoActions.cancelEdit())}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => dispatch(toDoActions.moveToPending(item.id))}>⬅️</button>
                    <span>{item.title}</span>
                    <button onClick={() => dispatch(toDoActions.editToDo(item))}>✏️</button>
                    <button onClick={() => dispatch(toDoActions.deleteToDo(item.id))}>🗑️</button>
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

export default TodoListRTK;
