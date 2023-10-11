import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    feedItems: []
  },
  reducers: {
    setPosts:(state, action) =>{

      state.feedItems = [
        ...state.feedItems,
        ...action.payload,
      ]
    },
    addFeedItem: (state, action) => {
       state.feedItems.unshift(action.payload);
    },
    deleteFeedItem: (state, action) => {
      state.feedItems = state.feedItems.filter((item) => item.id !== action.payload)
    }
  }
})

export const { setPosts, addFeedItem ,deleteFeedItem } = feedSlice.actions
export default feedSlice.reducer;