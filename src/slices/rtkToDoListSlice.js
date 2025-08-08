import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    pendingTasks: [],
    completedTasks: [],
    editId:null,
    editValue:"",
    inputValue:"",
    loading:false,
    error:null,
}

export const fetchToDos = createAsyncThunk(
    "todos/fetchToDos",
    async (_,{rejectWithValue}) => {
        try{
            const res = await fetch("https://jsonplaceholder.typicode.com/todos");
            console.log(res);
            if(!res.ok){
                throw new Error(`HTTP:${res.status}`);
            }
            
            const data = await res.json();
            const pending = data.filter((t)=>!t.completed)
                            .slice(0,4)
                            .map((t)=>({id:t.id,title:t.title}));
            const completed = data.filter((t)=>t.completed)
                            .slice(0,4)
                            .map((t)=>({id:t.id,title:t.title}));

            return {pendingTasks:pending,completedTasks:completed};

        }
        catch(err){
            return rejectWithValue(err.message || "Failed To Fetch");
        }
    }
);

export const rtkToDoListSlice = createSlice({
    name: "todos",
    initialState,
    reducers:{
        setInput: (state,action)=>{
            state.inputValue = action.payload;
        },
        addToDo: (state,action) => {
            state.pendingTasks.push({
                id:action.payload.id,
                title:action.payload.title,
            });
            state.inputValue = "";
        },
        deleteToDo: (state,action)=>{
            const id = action.payload;
            state.pendingTasks = state.pendingTasks.filter((t)=>t.id!==id);
            state.completedTasks = state.completedTasks.filter((t)=>t.id!==id);
        },
        editToDo: (state,action)=>{
            state.editId= action.payload.id;
            state.editValue = action.payload.title;
        },
        cancelEdit: (state,action)=>{
            state.editId = null;
            state.editValue = "";
        },
        editValue: (state,action)=>{
            state.editValue = action.payload;
        },
        saveToDo : (state,action)=>{
            const{id,isCompleted} = action.payload;
            const listKey = isCompleted? "completedTasks":"pendingTasks";
            if(isCompleted){
                state.completedTasks = state.completedTasks.map((item)=>{
                    return item.id === id ? {...item,title:state.editValue}:item
                })
            }
            else{
                state.pendingTasks = state.pendingTasks.map((item)=>{
                    return item.id === id ? {...item,title:state.editValue}:item
                })
            }
            state[listKey] = state[listKey].map((item)=>{
                return item.id === id? {...item,title:state.editValue}:item
            });
            state.editId = null;
            state.editValue = "";
        },
        moveToCompleted:(state,action)=>{
            const id = action.payload;
            const task = state.pendingTasks.find((t)=>t.id===id);
            if(task){
                state.pendingTasks= state.pendingTasks.filter((t)=>t.id!==id);
                state.completedTasks.push(task);
            }
        },
        moveToPending:(state,action)=>{
            const id = action.payload;
            const task = state.completedTasks.find((t)=>t.id===id);
            if(task){
                state.completedTasks= state.completedTasks.filter((t)=>t.id!==id);
                state.pendingTasks.push(task);
            }
        },

    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchToDos.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchToDos.fulfilled, (state,action)=>{
            state.loading = false;
            state.error = null;
            state.pendingTasks = action.payload.pendingTasks;
            state.completedTasks = action.payload.completedTasks;

        })
        .addCase(fetchToDos.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });

    },
});

export const toDoActions = rtkToDoListSlice.actions;
export default rtkToDoListSlice.reducer;