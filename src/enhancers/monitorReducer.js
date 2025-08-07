const round = (number) => Math.round(number*100)/100;
//currying
const monitorReducerEnhancer = (createStore) => {
    return (reducer,initialState,enhancer) => {
        const monitoredReducer = (state,action) => {
            const start = performance.now();
            const newState = reducer(state,action);
            const end = performance.now();
            const diff = round(end - start);

            console.log("reducer process time:",diff,start,end);

            return newState;
        };
        return createStore(monitoredReducer,initialState,enhancer);
    };
};

export default monitorReducerEnhancer;