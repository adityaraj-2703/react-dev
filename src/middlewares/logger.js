const logger = (store) => (next) => (action) => {
    if(action.type==="ADD_TODO" && typeof action.payload==="string"){
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth()+1).padStart(2,'0');
        const d = String(today.getDate()).padStart(2,'0');

        const date = `${y}-${m}-${d}`;
        const newTitle = `Added at ${date}: ${action.payload}`;
        action = {...action,payload:newTitle};
    }
    console.group(action.type);
    console.info("dispatching",action);
    let result = next(action);
    console.log("next State",store.getState());
    console.groupEnd();
    return result;

};

export default logger;