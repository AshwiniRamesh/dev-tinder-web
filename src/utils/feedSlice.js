// feedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],  // Set initial state to an empty array
  reducers: {
    addFeed: (state, action) => {
      return action.payload;  // Replace the entire state with the payload
    },
    removeFeed: () => {
      return [];  // Reset to an empty array when removed
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
