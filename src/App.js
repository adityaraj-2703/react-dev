import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="todo-container">
        <h2>To-Do List 📋</h2>
        <div className="input-section">
          <input type="text" placeholder="Add your task"  />
          <button>ADD</button>
        </div>
        <ul>
          <li>
            <span className="checkbox">⭕</span>
            <span className="task-text">Learn JavaScript projects</span>
            <span className="delete">❌</span>
          </li>
          <li>
            <span className="checkbox">⭕</span>
            <span className="task-text">Make a to do list app</span>
            <span className="delete">❌</span>
          </li>
          <li>
            <span className="checkbox checked">✔️</span>
            <span className="task-text completed">Host it on online server</span>
            <span className="delete">❌</span>
          </li>
          <li>
            <span className="checkbox">⭕</span>
            <span className="task-text">Link it to your resume</span>
            <span className="delete">❌</span>
          </li>
          <li>
            <span className="checkbox">⭕</span>
            <span className="task-text">Get a software job</span>
            <span className="delete">❌</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
