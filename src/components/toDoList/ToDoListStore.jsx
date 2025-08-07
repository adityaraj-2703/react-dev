import React, { useContext, useRef, useEffect } from "react";
import { TodoContext } from "../../context/ToDoContext.jsx";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";

const TodoListStore = () => {
//   const { state, dispatch } = useContext(TodoContext);
  const inputRef = useRef(null);

 

    const todoList = useSelector((state) => state.todoReducer); // selector function
    const dispatch = useDispatch();
    console.log(todoList);
     const {
    pendingTasks,
    completedTasks,
    editId,
    editValue,
    inputValue,
  } = todoList;


  useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  return (
    <div className="container">
      <h2>Todo App Context</h2>
      <div className="input-section">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) =>
            dispatch({ type: "SET_INPUT", payload: e.target.value })
          }
          placeholder="Enter new task"
        />
        <button onClick={() => dispatch({ type: "ADD_TODO" , payload: inputValue })}>Submit</button>
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
                      onChange={(e) =>
                        dispatch({ type: "EDIT_VALUE", payload: e.target.value })
                      }
                    />
                    <button onClick={() => dispatch({ type: "SAVE_TODO", payload: { id: item.id, isCompleted: false } })}>Save</button>
                    <button onClick={() => dispatch({ type: "CANCEL_EDIT" })}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => dispatch({ type: "EDIT_TODO", payload: item })}>✏️</button>
                    <button onClick={() => dispatch({ type: "DELETE_TODO", payload: item.id })}>🗑️</button>
                    <button onClick={() => dispatch({ type: "MOVE_TO_COMPLETED", payload: item.id })}>➡️</button>
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
                      onChange={(e) =>
                        dispatch({ type: "EDIT_VALUE", payload: e.target.value })
                      }
                    />
                    <button onClick={() => dispatch({ type: "SAVE_TODO", payload: { id: item.id, isCompleted: true } })}>Save</button>
                    <button onClick={() => dispatch({ type: "CANCEL_EDIT" })}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => dispatch({ type: "MOVE_TO_PENDING", payload: item.id })}>⬅️</button>
                    <span>{item.title}</span>
                    <button onClick={() => dispatch({ type: "EDIT_TODO", payload: item })}>✏️</button>
                    <button onClick={() => dispatch({ type: "DELETE_TODO", payload: item.id })}>🗑️</button>
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

export default TodoListStore;
