import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TodoProvider } from './context/ToDoContext.jsx';
import { Provider } from 'react-redux';
// import store from './store/store.js';
import store from './store/rtkToDoListStore.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TodoProvider>
      <App />
    </TodoProvider>
    </Provider>
    
  </StrictMode>,
)

