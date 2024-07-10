import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import mediaqueryReducer from "./modules/mediaquery";

export default configureStore({
  reducer: {
    counter: counterReducer,
    mediaquery: mediaqueryReducer,
  }
});