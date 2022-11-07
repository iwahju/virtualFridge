import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/feature/userSlice";

export default configureStore({
    reducer:{
        user: userReducer,
    },
});