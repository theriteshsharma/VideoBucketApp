import bucketReducer from "./bucketSlice";
import cardReducer from "./cardSlice.js";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
export const store = configureStore({
    reducer:{
        user : bucketReducer,
        cards : cardReducer,
    }
    
},applyMiddleware(thunk))