import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from './components/toDoList/ToDoList.jsx'
import CourseCatalogApp from './components/Course/CourseCatalogApp.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    // <ToDoList/>
    <CourseCatalogApp/>

  )
}

export default App
