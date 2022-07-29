import {createSlice} from '@reduxjs/toolkit';
import { api } from '../config';
import { Dispatch } from 'redux';
import { configConsumerProps } from 'antd/lib/config-provider';

const initialState = {
    userid:"",
    buckets:[]
}

const bucketSlice = createSlice({
    name: "Buckets",
    initialState,
    reducers:{
        addBucket(state,action){
             state.buckets.push({...action.payload})
        },
        loadBuckets(state,action){
            
             state.buckets = [...action.payload]
        },
        deleteBucket(state,action){
            state.buckets = state.buckets.filter(item => item.id != action.payload.id)
        }
    }
})

export const getBuckets = ()=>  async (dispatch,payload) => {
    await fetch(`${api}/buckets`)
    .then((response) => response.json())
    .then((actualData) =>  {
      dispatch(loadBuckets(actualData));
    })
    .catch((err) => {
     console.log(err.message);
      })
  
}
export const addNewBucket = (data) => async (dispatch,payload) =>{
    const options = {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    }
    
    await fetch(`${api}/buckets`,options) .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
       
        dispatch(addBucket(update))
        }).catch(e => {
        console.log(e);
        });
}

export const deleteBucketById = ({id}) => async (dispatch) =>{
    const options = {
        method: 'DELETE',
        headers:{
            "Content-Type":"application/json",
        }
    }
    await fetch(`${api}/buckets/${id}`,options)
        .then(data => dispatch(deleteBucket({id})))
        .catch(err => console.log(err));
}
export const  { addBucket,loadBuckets,deleteBucket } = bucketSlice.actions;
export default bucketSlice.reducer;
