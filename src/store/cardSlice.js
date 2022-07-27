import { createSlice } from "@reduxjs/toolkit";
import { api } from "../config";
const initialState = {
    userid:"",
    cards:[],
}

const cardSlice = createSlice({
    name:'card',
    initialState,
    reducers:{
        loadCards(state,action){
            state.cards = action.payload;
        }
    }
})


export const getCards = () => async (dispatch,action) =>{
    await fetch(`${api}/cardItems`)
  .then((response) => response.json())
  .then((actualData) =>  {
    dispatch(loadCards(actualData));
  })
  .catch((err) => {
   console.log(err.message);
    })
}

export const {loadCards}  = cardSlice.actions;
export default cardSlice.reducer;

