// feedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: {},  // Set initial state to an empty array
  reducers: {
    addConnection: (state, action) => {
      console.log(action.payload,'====')
      return action.payload;  // Replace the entire state with the payload
    },
    removeConnection: () => {
      return [];  // Reset to an empty array when removed
    },
  },
});

export const { addConnection, removeConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;
