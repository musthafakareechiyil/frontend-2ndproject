import {createSlice} from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading:false,
    chatHistory: [],
    error: null
  },
  reducers:{
    setChats: (state, action) =>{
      state.chatHistory = action.payload
    },
    setNewMessageIntoHistory: (state, action) =>{
       state.chatHistory = [...state.chatHistory, action.payload];
    }
  }
})

export const {setChats, setNewMessageIntoHistory} = chatSlice.actions
export default chatSlice.reducer