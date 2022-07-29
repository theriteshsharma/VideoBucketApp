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
        },
        addCard(state,action){
            state.cards.push(action.payload);
        },
        deleteCards(state,action){
           
            state.cards = state.cards.filter(item => action.payload.indexOf(item.id) === -1);
        },
        moveCard(state,action){
            state.cards = state.cards.map(ele => ele.id ==  action.payload.id ? {...ele , buckId:action.payload.buckId} : ele)
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

export const addNewCard = (data) =>  async (dispatch) =>{
    const options = {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    }
    
    await fetch(`${api}/cardItems`,options) .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
       
        dispatch(addCard(update))
        }).catch(e => {
        console.log(e);
        });
}
 
export const deleteMultiplCards = (cards) => async (dispatch) =>{
    if(cards.length > 0){
        cards.forEach(async element => {
            await fetch(`${api}/cardItems/${element}`,{
                method:'DELETE',
                headers:{
                    "Content-Type":"application/json",
                }
            }).then(data => dispatch(deleteCards(cards)))
            .catch(err => console.log(err));
        });
    }
}

export const moveCardFromTO = ({id,from,to}) => async (dispatch) =>{
    await fetch(`${api}/cardItems/${id}`,{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            buckId:to
        })
    }).then(response => response.json()).then(data => dispatch(moveCard({id:data.id,from:from,buckId:data.buckId})))
}
export const {loadCards,addCard, deleteCards, moveCard}  = cardSlice.actions;
export default cardSlice.reducer;

