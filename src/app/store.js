import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/UiSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});
