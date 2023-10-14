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
    },
    resetFeed: (state) => {
      state.feedItems = [];
    },
    updateLikedStatus: (state, action) => {
      const { likable_id, liked } = action.payload

      const postToUpdate = state.feedItems.find((item) => item.id === likable_id)
      if(postToUpdate){
        postToUpdate.liked = liked;

        if (liked){
          postToUpdate.likes_count++
        }else{
          postToUpdate.likes_count--
        }
      }
    }

  }
})

export const { setPosts, addFeedItem ,deleteFeedItem ,resetFeed, updateLikedStatus} = feedSlice.actions
export default feedSlice.reducer;