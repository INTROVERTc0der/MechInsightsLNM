import { configureStore } from "@reduxjs/toolkit";
import studentauthSlice from "./studentauthSlice";
import facultyauthSlice from "./facultyauthSlice";
import distributeSlice from "./distributeSlice";
import miscSlice from "./miscSlice";
import HODSlice from "./HODSlice";

const store = configureStore({
  reducer: {
    studentauth: studentauthSlice,
    facultyauth: facultyauthSlice,
    distribute: distributeSlice,
    misc : miscSlice,
    HOD : HODSlice,
  },
});

export default store;
