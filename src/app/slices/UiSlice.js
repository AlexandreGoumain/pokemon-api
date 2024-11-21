import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: true,
    },
    reducers: {
        changeTheme: (state) => {
            state.value = !state.value;
        },
    },
});

export const selectTheme = (state) =>
    state.theme.value ? "gray-700" : "gray-300";

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
