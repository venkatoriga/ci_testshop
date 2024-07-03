import { createSlice } from "@reduxjs/toolkit"


const initialState={
    isScheduledData:[],
    isVisitData:[]
}

const ScheduledVisitData=createSlice({
  name:'ScheduledVisitData',
  initialState:initialState,
  reducers:{
  
Schedule(state,action){
state.isScheduledData=action.payload.items
console.log("redux schedule data===>>>",action.payload.items)
},
Visit(state,action){
    
state.isVisitData=action.payload.items
console.log("redux visit data ===>>>",action.payload.items)
}
  }  
})
export const ScheduledVisitDataAction=ScheduledVisitData.actions;
export default ScheduledVisitData.reducer;