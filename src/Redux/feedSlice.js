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
    },
    // Inside your feedSlice

    saveOrRemoveSaved: (state, action) => {
      const { postId, saved } = action.payload;
      console.log("Action payload:", action.payload);
      const postToUpdate = state.feedItems.find((item) => item.id === postId);
      console.log(postToUpdate, "consoling post to update value")
      console.log(postId, "consoling postId")

      if (postToUpdate) {
        console.log("checking if is is entering to the conditional statemdent")
        postToUpdate.saved = saved;
      }
    }

  }
})

export const { setPosts, addFeedItem ,deleteFeedItem ,resetFeed, updateLikedStatus, saveOrRemoveSaved} = feedSlice.actions
export default feedSlice.reducer;