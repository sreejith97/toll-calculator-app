import { configureStore } from "@reduxjs/toolkit";
import tollReducer from "./tollSlice";

const store = configureStore({
  reducer: {
    toll: tollReducer,
  },
});

export default store;
