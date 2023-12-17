import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  isLoading: false,
};

const tollSlice = createSlice({
  name: "toll",
  initialState,
  reducers: {
    setData: (state, action) => {
      // console.log(action);
      state.value = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, setLoading } = tollSlice.actions;
export default tollSlice.reducer;
