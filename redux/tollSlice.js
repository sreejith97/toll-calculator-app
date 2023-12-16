import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  isLoading: false,
};

const tollSlice = createSlice({
  name: "toll",
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log(action);
      state.value = action.payload;
    },
  },

  setLoading: (state, action) => {
    // Set loading state based on the boolean payload
    state.isLoading = action.payload;
  },
});

export const { setData, checkValueIsNull, setLoading } = tollSlice.actions;
export default tollSlice.reducer;
