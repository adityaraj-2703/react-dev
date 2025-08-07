import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import todoReducer from "../slices/ToDoListSlice";
import monitorReducerEnhancer from "../enhancers/monitorReducer";
import logger from "../middlewares/logger";


const myCreateStore = (reducer,preloadedState,enhancer)=>{
    const store = {
        state:preloadedState,
        callbackFns: [],
    }
    if(enhancer!== undefined){
        enhancer(myCreateStore);
    }

    store.getState = () =>{
        return store.state;
    }
    store.dispatch = (action) => {
        store.state = reducer(store.state,action);
        store.callbackFns.forEach((cb)=>cb());
    }

    store.subscribe = (cb)=>{
        store.callbackFns.push(cb);
        return ()=>{
            store.callbackFns.filter((fn)=>fn!=cb);
        }
    }
    store.dispatch({type:"@@INIT"});

    return store;

}

const rootReducer = combineReducers({
    todoReducer,
})

const middlewareEnhancer = applyMiddleware(logger);
const composedEnhancers = compose(monitorReducerEnhancer,middlewareEnhancer);
const store = createStore(rootReducer,undefined,composedEnhancers);



export default store;