import { createSlice } from "@reduxjs/toolkit";
import { api } from "../config";

const historySlice = createSlice({
    name:'history',
    initialState:{
        history:[]
    },
    reducers:{
        addToHistory(state,action){
            state.history.push(action.payload)
        },
        loadHistory(state,action){
            state.history = action.payload
        }
    }

});

export const getHistory = () => async (dispatch) =>{
    await fetch(`${api}/history`)
    .then(rslt => rslt.json())
    .then( data => dispatch(loadHistory(data)))
    .catch(err  => console.log(err))
}
export const addVideoToHistory = (vid) => async (dispatch) =>{
    await fetch(`${api}/history`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(vid)
    }).then(rslt => rslt.json())
    .then(data => dispatch(addToHistory(data)))
    
}


export const {addToHistory, loadHistory}  = historySlice.actions;
export default historySlice.reducer;