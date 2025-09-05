import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from './components/toDoList/ToDoList.jsx'
import CourseCatalogApp from './components/Course/CourseCatalogApp.jsx'
import ToDoListClass from './components/toDoList/ToDoListClass.jsx';
import GameBoard from './components/tictactoe/GameBoard.jsx'
import ToDoListContext from './components/toDoList/ToDoListContext.jsx';

import ToDoListStore from './components/toDoList/ToDoListStore.jsx'
import TodoListRTK from './components/toDoList/TodoListRTK.jsx';
import GameBoardC4 from './components/connect4/GameBoardC4.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <ToDoList/> */}
    {/* <CourseCatalogApp/>
    <ToDoListClass/>  */}
    {/* <GameBoard/> */}
    {/* <ToDoListStore/> */}
    {/* <TodoListRTK/> */}
    <GameBoardC4/>
    </>

  )
}

export default App
