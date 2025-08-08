import logger from "../middlewares/logger";
import monitorReducerEnhancer from "../enhancers/monitorReducer";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/rtkToDoListSlice";

const store = configureStore({
    reducer: {
        todos:todoReducer
    },
    // middleware: logger,
    // enhancers:monitorReducerEnhancer,

});

export default store;