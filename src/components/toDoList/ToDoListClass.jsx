import React, { createRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ToDoList.css';
import TodoList from './ToDoList';

class ToDoListClass extends React.Component{
    
    state = {
        inputValue: '',
        pendingTasks:[],
        completedTasks:[],
        editId:null,
        editValue:'',
    }
    inputRef = createRef();


    componentDidMount(){
        const defaultTasks = [
            {id: uuidv4(),title:'complete tictactoe'},
            {id: uuidv4(),title:'complete todo class Implementation'},
        ]
        this.setState({pendingTasks:[...defaultTasks]})
    }

    shouldComponentUpdate(nextProps,nextState){
        if(
            this.state.inputValue !== nextState.inputValue ||
            this.state.pendingTasks !== nextState.pendingTasks ||
            this.state.completedTasks !== nextState.completedTasks ||
            this.state.editId !== nextState.editId ||
            this.state.editValue !== nextState.editValue
        ){
            return true;
        }
        return false;
    }

    handleChange = (e) => {
        this.setState({inputValue:e.target.value});
    }

    handleSubmit = () => {
        if(!this.state.inputValue.trim()) return;
        const newTask = {id: uuidv4(),title:this.state.inputValue};
        this.setState((prevState)=>({
            pendingTasks: [...prevState.pendingTasks,newTask],
            inputValue:''
        }));
    }

    handleDelete = (id,isCompleted = false) =>{
        if(isCompleted){
            this.setState((prevState)=>({
                completedTasks: prevState.completedTasks.filter((item)=>item.id !== id)
            }))
        }
        else{
            this.setState((prevState)=>({
                pendingTasks: prevState.pendingTasks.filter((item)=>item.id!==id)
            }))
        }
    };

    handleEdit = (id,title) =>{
        this.setState({editId:id , editValue:title});
    }   

    handleEditChange = (e) => {
        this.setState({editValue: e.target.value});
    }

    handleSave = (id,isCompleted = false) => {
        if(isCompleted){
            this.setState((prevState)=>({
                completedTasks : prevState.completedTasks.map((item)=>
                item.id===id?{...item,title:prevState.editValue}:item),
                editId:null,
                editValue:''

            }));
        }
        else{
            this.setState((prevState)=>({
                pendingTasks: prevState.pendingTasks.map((item)=>
                item.id===id?{...item,title:prevState.editValue}:item),
                editId:null,
                editValue:''
            }));
        }
    }

    handleCancel = (id) => {
        this.setState({editId:null,editValue:''})
    }

    moveToCompleted = (id) => {
        const task = this.state.pendingTasks.find((t)=>t.id===id);
        if(task){
            this.setState((prevState)=>({
                completedTasks:[...prevState.completedTasks,task],
                pendingTasks: prevState.pendingTasks.filter((item)=>item.id!==id)
            }))
        }
    }
    moveToPending = (id) => {
        const task = this.state.completedTasks.find((t)=>t.id===id);
        if(task){
            this.setState((prevState)=>({
                pendingTasks:[...prevState.pendingTasks,task],
                completedTasks: prevState.completedTasks.filter((item)=>item.id!==id)
            }))
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.editId && prevState.editId !== this.state.editId && this.inputRef.current){
            this.inputRef.current.focus();
        }
    }

    render(){
        const {inputValue,pendingTasks,completedTasks,editId,editValue} = this.state;

        return (
            <div className='container'>
                <h2>ToDo App</h2>
                <div className='input-section'>
                    <input
                    ref={this.inputRef}
                    value={inputValue}
                    onChange={this.handleChange}
                    placeholder='Enter New Task'
                    />
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                <div className='lists'>
                    {/* Pending task */}
                    <div className='list'>
                        <h3>Pending Tasks({pendingTasks.length})</h3>
                        <ul>
                            {pendingTasks.map((item)=>(
                                <li key={item.id}>
                                    {editId==item.id ? (
                                        <>
                                        <input
                                            ref ={this.inputRef}
                                            value={editValue}
                                            onChange={this.handleEditChange}
                                        />
                                        <button onClick={()=>this.handleSave(item.id)}>Save</button>
                                        <button onClick={this.handleCancel}>Cancel</button>

                                        </>
                                    ):
                                    (
                                        <>
                                        <span>{item.title}</span>
                                        <button onClick={()=>this.handleEdit(item.id,item.title)}>✏️</button>
                                        <button onClick={()=>this.handleDelete(item.id)}>🗑️</button>
                                        <button onClick={()=>this.moveToCompleted(item.id)}>⬇️</button>

                                        </>
                                )}
                                </li>
                            ))}
                        </ul>

                    </div>
                    {/* Completed Task */}
                    <div className='list'>
                        <h3>Completed Tasks({completedTasks.length})</h3>
                        <ul>
                            {completedTasks.map((item)=>(
                                <li key={item.id}>
                                    {editId === item.id ? (
                                        <>
                                        <input
                                            ref ={this.inputRef}
                                            value={editValue}
                                            onChange={this.handleEditChange}
                                        />
                                        <button onClick={()=>this.handleSave(item.id,true)}>Save</button>
                                        <button onClick={this.handleCancel}>Cancel</button>

                                        </>
                                    ):
                                    (
                                        <>
                                        <span>{item.title}</span>
                                        <button onClick={()=>this.handleEdit(item.id,item.title)}>✏️</button>
                                        <button onClick={()=>this.handleDelete(item.id,true)}>🗑️</button>
                                        <button onClick={()=>this.moveToPending(item.id)}>⬆️</button>

                                        </>
                                )}
                                </li>
                            ))}
                        </ul>

                    </div>

                </div>
                
            </div>
        );
    }
}

export default ToDoListClass;