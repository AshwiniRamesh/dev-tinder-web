import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return state.filter((request) => request.emailId !== action.payload);
    },
    clearRequests: () => {
      return [];  // Clears all requests
    },
  },
});

export const { addRequest, removeRequest, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;
