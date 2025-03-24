import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],  // Set initial state to an empty array
  reducers: {
    addConnection: (state, action) => {
      return action.payload;  // Replace the entire state with the payload
    },
    updateConnection: (state, action) => {
      state.push(action.payload);  // Push a new connection to the state array
    },
    removeConnection: () => {
      return [];  // Reset to an empty array when removed
    },
  },
});

export const { addConnection, updateConnection, removeConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;
